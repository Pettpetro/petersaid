const $=(selector,scope=document)=>scope.querySelector(selector);
const $$=(selector,scope=document)=>[...scope.querySelectorAll(selector)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;

addEventListener('load',()=>setTimeout(()=>$('.pageLoader')?.classList.add('done'),700));

const menuButton=$('.menuToggle');
const menuPanel=$('.menuPanel');
function setMenu(open){
  document.body.classList.toggle('menuOpen',open);
  menuButton.setAttribute('aria-expanded',String(open));
  menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');
  menuPanel.setAttribute('aria-hidden',String(!open));
}
menuButton.addEventListener('click',()=>setMenu(!document.body.classList.contains('menuOpen')));
$$('.menuPanel a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false)});

const slides=$$('.slide');
const count=$('.slideCount b');
const progress=$('.slideProgress i');
let active=0,timer;
function resetProgress(){
  progress.classList.add('restart');
  void progress.offsetWidth;
  progress.classList.remove('restart');
}
function showSlide(next){
  slides[active].classList.remove('isActive');
  active=(next+slides.length)%slides.length;
  slides[active].classList.add('isActive');
  count.textContent=String(active+1).padStart(2,'0');
  document.documentElement.style.setProperty('--slide-tone',slides[active].dataset.tone);
  resetProgress();
  clearInterval(timer);
  if(!reduced)timer=setInterval(()=>showSlide(active+1),6000);
}
$('.slidePrev').addEventListener('click',()=>showSlide(active-1));
$('.slideNext').addEventListener('click',()=>showSlide(active+1));
showSlide(0);
addEventListener('keydown',event=>{
  if(document.body.classList.contains('menuOpen'))return;
  if(event.key==='ArrowRight')showSlide(active+1);
  if(event.key==='ArrowLeft')showSlide(active-1);
});
let touchX=0;
$('.homeSlider').addEventListener('pointerdown',event=>touchX=event.clientX);
$('.homeSlider').addEventListener('pointerup',event=>{const delta=event.clientX-touchX;if(Math.abs(delta)>55)showSlide(active+(delta<0?1:-1))});

const languageButton=$('.langToggle');
let language='en';
languageButton.addEventListener('click',()=>{
  language=language==='en'?'ar':'en';
  document.documentElement.lang=language;
  document.documentElement.dir=language==='ar'?'rtl':'ltr';
  languageButton.textContent=language==='en'?'AR':'EN';
  $$('[data-en]').forEach(element=>element.innerHTML=element.dataset[language]);
});

if(matchMedia('(pointer:fine)').matches){
  const cursor=$('.cursor');
  addEventListener('pointermove',event=>cursor.animate({left:`${event.clientX}px`,top:`${event.clientY}px`},{duration:180,fill:'forwards'}));
  $$('.workCard,.slideCopy>a').forEach(item=>{
    item.addEventListener('mouseenter',()=>cursor.classList.add('view'));
    item.addEventListener('mouseleave',()=>cursor.classList.remove('view'));
  });
}

if(!reduced){
  addEventListener('pointermove',event=>{
    const current=slides[active].querySelector('img');
    const x=(event.clientX/innerWidth-.5)*16,y=(event.clientY/innerHeight-.5)*16;
    current.style.translate=`${x}px ${y}px`;
  });
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting)entry.target.animate([{opacity:0,transform:'translateY(55px)'},{opacity:1,transform:'none'}],{duration:900,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});
  }),{threshold:.12});
  $$('.introGrid,.workHeading,.workCard,.serviceRow,footer h2').forEach(item=>observer.observe(item));
}

$$('a[href$=".html"],a[href*="project.html"]').forEach(link=>link.addEventListener('click',event=>{
  if(event.metaKey||event.ctrlKey||link.target==='_blank')return;
  event.preventDefault();
  $('.pageWipe').classList.add('go');
  setTimeout(()=>location.href=link.href,620);
}));
