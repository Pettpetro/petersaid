const $=(selector,scope=document)=>scope.querySelector(selector);
const $$=(selector,scope=document)=>[...scope.querySelectorAll(selector)];
const slider=$('.homeSlider');
const slides=$$('.slide');
const currentLabel=$('.currentSlide');
const totalLabel=$('.totalSlides');
const timeline=$('.slideTimeline');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let active=0;
let changing=false;
let pointerStart=null;
let pointerDragged=false;
let suppressClick=false;
let wheelLocked=false;

addEventListener('DOMContentLoaded',()=>{
  setTimeout(()=>$('.pageLoader').classList.add('done'),650);
  animateTimeline();
});

totalLabel.textContent=String(slides.length).padStart(2,'0');
document.documentElement.style.setProperty('--tone',slides[0].dataset.tone);

function animateTimeline(){
  timeline.classList.remove('animate');
  void timeline.offsetWidth;
  timeline.classList.add('animate');
}

function pauseSlideMedia(slide){
  const video=slide.querySelector('video');
  const frame=slide.querySelector('.driveFrame');
  if(video){
    video.pause();
    video.muted=true;
    video.volume=0;
  }
  if(frame&&frame.src!=='about:blank'){
    frame.dataset.previewSrc=frame.src;
    frame.src='about:blank';
  }
  slide.classList.remove('playerActive');
  const button=slide.querySelector('.soundToggle');
  if(button){
    button.textContent=frame?'ENABLE PLAYER':'SOUND OFF';
    button.setAttribute('aria-label',frame?'Enable the video player to turn sound on':'Turn video sound on');
  }
}

function revealDrivePlayer(video){
  if(!video.isConnected||video.dataset.fallback==='true')return;
  const driveId=video.dataset.driveId;
  if(!driveId)return;
  video.dataset.fallback='true';
  const slide=video.closest('.slide');
  const frame=document.createElement('iframe');
  frame.className='slideMedia driveFrame';
  frame.src=`https://drive.google.com/file/d/${driveId}/preview?autoplay=1`;
  frame.title='AI motion film';
  frame.allow='autoplay; fullscreen';
  frame.setAttribute('allowfullscreen','');
  video.replaceWith(frame);
  if(!slide.classList.contains('isActive')){
    frame.dataset.previewSrc=frame.src;
    frame.src='about:blank';
  }
  const button=slide.querySelector('.soundToggle');
  if(button){
    button.textContent='ENABLE PLAYER';
    button.setAttribute('aria-label','Enable the video player to turn sound on');
  }
}

$$('.slideVideo').forEach(video=>{
  video.addEventListener('error',()=>revealDrivePlayer(video),{once:true});
  setTimeout(()=>{if(video.isConnected&&video.readyState===0)revealDrivePlayer(video)},9000);
});

function raiseVideoVolume(video){
  let level=0;
  const fade=setInterval(()=>{
    if(!video.isConnected||video.paused){
      clearInterval(fade);
      return;
    }
    level=Math.min(1,level+.1);
    video.volume=level;
    if(level===1)clearInterval(fade);
  },55);
}

function playSlideMedia(slide,requestSound=false){
  const frame=slide.querySelector('.driveFrame');
  if(frame&&frame.dataset.previewSrc){
    frame.src=frame.dataset.previewSrc;
    return;
  }
  const video=slide.querySelector('video');
  if(!video)return;
  video.volume=0;
  video.muted=!requestSound;
  const attempt=video.play();
  if(!attempt)return;
  attempt.then(()=>{
    const button=slide.querySelector('.soundToggle');
    if(requestSound&&!video.muted){
      raiseVideoVolume(video);
      if(button){
        button.textContent='SOUND ON';
        button.setAttribute('aria-label','Turn video sound off');
      }
    }
  }).catch(()=>{
    video.muted=true;
    video.volume=0;
    video.play().catch(()=>{});
  });
}

function changeSlide(next,direction,requestSound=true){
  if(changing)return;
  const target=(next+slides.length)%slides.length;
  if(target===active)return;
  const outgoing=slides[active];
  const incoming=slides[target];
  const way=direction||(target>active?'next':'prev');
  changing=true;
  document.documentElement.style.setProperty('--tone',incoming.dataset.tone);
  playSlideMedia(incoming,requestSound);

  if(reduced){
    pauseSlideMedia(outgoing);
    outgoing.classList.remove('isActive');
    incoming.classList.add('isActive');
    active=target;
    currentLabel.textContent=String(active+1).padStart(2,'0');
    animateTimeline();
    changing=false;
    return;
  }

  outgoing.classList.add('isOutgoing',way==='next'?'leaveNext':'leavePrev');
  incoming.classList.add('isIncoming',way==='next'?'enterNext':'enterPrev','isActive');
  currentLabel.textContent=String(target+1).padStart(2,'0');
  animateTimeline();

  setTimeout(()=>{
    const oldMedia=outgoing.querySelector('img,video,.driveFrame');
    if(oldMedia)oldMedia.style.removeProperty('translate');
    pauseSlideMedia(outgoing);
    outgoing.classList.remove('isActive','isOutgoing','leaveNext','leavePrev');
    incoming.classList.remove('isIncoming','enterNext','enterPrev');
    active=target;
    changing=false;
  },1140);
}

$('.slidePrev').addEventListener('click',()=>changeSlide(active-1,'prev',true));
$('.slideNext').addEventListener('click',()=>changeSlide(active+1,'next',true));

addEventListener('keydown',event=>{
  if(document.body.classList.contains('menuOpen'))return;
  if(event.key==='ArrowLeft')changeSlide(active-1,'prev',true);
  if(event.key==='ArrowRight')changeSlide(active+1,'next',true);
});

slider.addEventListener('pointerdown',event=>{
  pointerStart=event.clientX;
  pointerDragged=false;
  slider.classList.add('isDragging');
});
slider.addEventListener('pointermove',event=>{
  if(pointerStart!==null&&Math.abs(event.clientX-pointerStart)>8)pointerDragged=true;
});
slider.addEventListener('pointerup',event=>{
  if(pointerStart===null)return;
  const delta=event.clientX-pointerStart;
  slider.classList.remove('isDragging');
  if(Math.abs(delta)>55){
    suppressClick=true;
    changeSlide(active+(delta<0?1:-1),delta<0?'next':'prev',true);
    setTimeout(()=>suppressClick=false,0);
  }
  pointerStart=null;
});
slider.addEventListener('pointercancel',()=>{
  pointerStart=null;
  pointerDragged=false;
  slider.classList.remove('isDragging');
});
slider.addEventListener('click',event=>{
  if(suppressClick||pointerDragged){
    event.preventDefault();
    event.stopPropagation();
    pointerDragged=false;
  }
},true);
slider.addEventListener('wheel',event=>{
  event.preventDefault();
  if(wheelLocked||Math.abs(event.deltaY)+Math.abs(event.deltaX)<12)return;
  wheelLocked=true;
  const amount=Math.abs(event.deltaX)>Math.abs(event.deltaY)?event.deltaX:event.deltaY;
  changeSlide(active+(amount>0?1:-1),amount>0?'next':'prev',true);
  setTimeout(()=>wheelLocked=false,1180);
},{passive:false});

const menuButton=$('.menuToggle');
const menuPanel=$('.menuPanel');
function setMenu(open){
  document.body.classList.toggle('menuOpen',open);
  menuButton.setAttribute('aria-expanded',String(open));
  menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');
  menuPanel.setAttribute('aria-hidden',String(!open));
}
menuButton.addEventListener('click',()=>setMenu(!document.body.classList.contains('menuOpen')));
$('[data-close-menu]').addEventListener('click',event=>{
  event.preventDefault();
  setMenu(false);
});
addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false)});

if(!reduced&&matchMedia('(pointer:fine)').matches){
  slider.addEventListener('pointermove',event=>{
    if(changing)return;
    const media=slides[active].querySelector('img,video');
    if(!media)return;
    const x=(event.clientX/innerWidth-.5)*14;
    const y=(event.clientY/innerHeight-.5)*10;
    media.style.translate=`${x}px ${y}px`;
  });
}

$$('.soundToggle').forEach(button=>button.addEventListener('click',event=>{
  event.stopPropagation();
  const slide=button.closest('.slide');
  const video=slide.querySelector('video');
  const frame=slide.querySelector('.driveFrame');
  if(frame){
    slide.classList.toggle('playerActive');
    button.textContent=slide.classList.contains('playerActive')?'PLAYER ENABLED':'ENABLE PLAYER';
    return;
  }
  if(!video)return;
  video.muted=!video.muted;
  if(video.muted){
    video.volume=0;
    button.textContent='SOUND OFF';
    button.setAttribute('aria-label','Turn video sound on');
  }else{
    video.volume=1;
    video.play().catch(()=>{});
    button.textContent='SOUND ON';
    button.setAttribute('aria-label','Turn video sound off');
  }
}));

$$('[data-page-link]').forEach(link=>link.addEventListener('click',event=>{
  if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();
  $('.pageWipe').classList.add('go');
  setTimeout(()=>location.href=link.href,560);
}));

document.addEventListener('visibilitychange',()=>{
  if(document.hidden)slides.forEach(pauseSlideMedia);
  else playSlideMedia(slides[active],false);
});

slides.forEach((slide,index)=>{if(index!==active)pauseSlideMedia(slide)});
