const contentLoader=document.querySelector('.contentLoader');
const contentWipe=document.querySelector('.contentWipe');

const films=[
  {title:'TWUKIES',tag:'AI BRAND FILM',video:'asst/ai-motion/videos/01-twukies.mp4',cover:'asst/ai-motion/covers/01-twukies.png',description:'A playful AI-led brand film shaped through bold characters, energetic pacing and a colorful visual world.'},
  {title:'PERFUME',tag:'LUXURY PRODUCT FILM',video:'asst/ai-motion/videos/02-Perfum.mp4',cover:'asst/ai-motion/covers/02-Perfum.png',description:'A sensory perfume film using atmosphere, light and elegant movement to turn a product into a cinematic experience.'},
  {title:'HS BAG',tag:'PRODUCT / MOTION',video:'asst/ai-motion/videos/03-HS bag.mp4',cover:'asst/ai-motion/covers/03-HS bag.png',description:'A product-focused motion experiment built around a branded delivery bag with playful pacing and energetic scenes.'},
  {title:'RING',tag:'LUXURY PRODUCT FILM',video:'asst/ai-motion/videos/04-ring.mp4',cover:'asst/ai-motion/covers/04-ring.png',description:'A refined product film where controlled light, material detail and close-up motion give the ring a premium presence.'},
  {title:'BAG',tag:'FASHION PRODUCT FILM',video:'asst/ai-motion/videos/05-bag.mp4',cover:'asst/ai-motion/covers/05-bag.jpeg',description:'An editorial fashion piece presenting the bag through strong composition, tactile detail and confident movement.'},
  {title:'JAZEERA WORLD CUP',tag:'SPORTS CAMPAIGN',video:'asst/ai-motion/videos/06-Jazeera world cup.mp4',cover:'asst/ai-motion/covers/06-Jazeera world cup.png',description:'A high-energy World Cup visual created around momentum, competition and the shared emotion of the game.'},
  {title:'JAZEERA MAROTEX',tag:'MATERIAL STORY',video:'asst/ai-motion/videos/07-Jazeera marotex.mp4',cover:'asst/ai-motion/covers/07-Jazeera marotex.png',description:'A material-led brand sequence that combines texture, product detail and polished cinematic art direction.'},
  {title:'JAZEERA MAXIM',tag:'AI STORYTELLING',video:'asst/ai-motion/videos/08-Jazeera Maxim.mp4',cover:'asst/ai-motion/covers/08-Jazeera Maxim.png',description:'A narrative-driven visual experiment where editorial rhythm and AI imagery build a focused brand story.'},
  {title:'JAZEERA COLORS',tag:'COLOR / MOTION STUDY',video:'asst/ai-motion/videos/09-Jazeera Colors.mp4',cover:'asst/ai-motion/covers/09-Jazeera Colors.png',description:'A vibrant motion study exploring color as the central character through transitions, contrast and expressive scenes.'},
  {title:'LIMITLESS ALPHA',tag:'CONCEPT FILM',video:'asst/ai-motion/videos/10-limtless Alpha.mp4',cover:'asst/ai-motion/covers/10-limtless Alpha.png',description:'A cinematic exploration of power and transformation, combining surreal imagery with an ambitious visual scale.'},
  {title:'CHILLOUT / 01',tag:'ATMOSPHERE STUDY',video:'asst/ai-motion/videos/11-Chilout.mp4',cover:'asst/ai-motion/covers/11-Chilout.png',description:'The opening chapter of a calm visual series built around quiet rhythm, open space and an immersive atmosphere.'},
  {title:'CHILLOUT / 02',tag:'MOOD FILM',video:'asst/ai-motion/videos/12-Chilout.mp4',cover:'asst/ai-motion/covers/12-Chilout.png',description:'A slow-paced mood film using gentle movement and cinematic framing to create a moment of visual escape.'},
  {title:'CHILLOUT / 03',tag:'AI VISUAL DIRECTION',video:'asst/ai-motion/videos/13-Chilout.mp4',cover:'asst/ai-motion/covers/13-Chilout.png',description:'An AI-directed sequence balancing natural textures, relaxed motion and a carefully controlled visual tone.'},
  {title:'CHILLOUT / 04',tag:'CINEMATIC MOMENT',video:'asst/ai-motion/videos/14-Chilout.mp4',cover:'asst/ai-motion/covers/14-Chilout.png',description:'A compact cinematic moment focused on atmosphere, subtle detail and a smooth, contemplative visual flow.'},
  {title:'CHILLOUT / 05',tag:'VISUAL ESCAPE',video:'asst/ai-motion/videos/15-Chilout.mp4',cover:'asst/ai-motion/covers/15-Chilout.png',description:'A dreamlike visual escape that turns stillness, light and environmental details into a concise motion story.'},
  {title:'CHILLOUT / 06',tag:'SERIES FINALE',video:'asst/ai-motion/videos/16-Chilout.mp4',cover:'asst/ai-motion/covers/16-Chilout.png',description:'The closing chapter of the Chillout series, bringing its relaxed pace and cinematic atmosphere together.'},
  {title:'ALSHAMS / 01',tag:'LIGHT STUDY',video:'asst/ai-motion/videos/17-Alshams.mp4',cover:'asst/ai-motion/covers/17-Alshams.png',description:'The first Alshams chapter explores sunlight as a visual language through warmth, contrast and expressive motion.'},
  {title:'ALSHAMS / 02',tag:'AI CAMPAIGN FILM',video:'asst/ai-motion/videos/18-Alshams.mp4',cover:'asst/ai-motion/covers/18-Alshams.png',description:'A warm campaign sequence shaped by glowing color, cinematic transitions and a distinct sun-led atmosphere.'},
  {title:'ALSHAMS / 03',tag:'VISUAL STORY',video:'asst/ai-motion/videos/19-Alshams.mp4',cover:'asst/ai-motion/covers/19-Alshams.png',description:'The final Alshams film develops the series into a richer visual story filled with light, energy and emotion.'},
  {title:'HAPPINESS MERCHANT / 01',tag:'NARRATIVE FILM',video:'asst/ai-motion/videos/20-تاجر السعادة .mp4',cover:'asst/ai-motion/covers/20-تاجر السعادة .png',description:'The opening chapter of a character-led AI story exploring warmth, generosity and small moments of happiness.'},
  {title:'HAPPINESS MERCHANT / 02',tag:'CHARACTER STORY',video:'asst/ai-motion/videos/21-تاجر السعادة .mp4',cover:'asst/ai-motion/covers/21-تاجر السعادة .png',description:'A narrative continuation that develops the character through expressive environments and emotional visual beats.'},
  {title:'HAPPINESS MERCHANT / 03',tag:'AI STORYTELLING',video:'asst/ai-motion/videos/22-تاجر السعادة .mp4',cover:'asst/ai-motion/covers/22-تاجر السعادة .png',description:'A cinematic chapter combining AI-generated scenes, human emotion and a deliberate storytelling rhythm.'},
  {title:'HAPPINESS MERCHANT / 04',tag:'SERIES FINALE',video:'asst/ai-motion/videos/23-تاجر السعادة.mp4',cover:'asst/ai-motion/covers/23-تاجر السعادة.png',description:'The final chapter closes the story with an uplifting visual resolution and a warm, memorable atmosphere.'}
];

const filmList=document.querySelector('#filmList');
if(filmList){
  filmList.innerHTML=films.map((film,index)=>`
    <article class="filmCard">
      <div class="filmMeta"><div><small>AI FILM / ${String(index+1).padStart(2,'0')}</small><h2>${film.title}</h2></div><small>${film.tag}</small></div>
      <div class="videoShell" data-video="${film.video}" data-title="${film.title}">
        <button class="videoCover" type="button" aria-label="Play ${film.title}"><img src="${encodeURI(film.cover)}" alt="${film.title} cover" loading="lazy" decoding="async"><span class="playMark"><i></i>PLAY FILM</span></button>
      </div>
      <div class="filmDescription"><p>${film.description}</p><div class="filmCaption"><span>${film.tag}</span><span>PETER SAID / 2026</span></div></div>
    </article>`).join('');
}

addEventListener('DOMContentLoaded',()=>setTimeout(()=>contentLoader?.classList.add('done'),500));

document.querySelectorAll('[data-page-link]').forEach(link=>link.addEventListener('click',event=>{
  if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();
  contentWipe?.classList.add('go');
  setTimeout(()=>location.href=link.href,520);
}));

const cards=[...document.querySelectorAll('.filmCard')];
if(cards.length){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  }),{rootMargin:'120px 0px'});
  cards.forEach(card=>observer.observe(card));
}

document.querySelectorAll('.videoCover').forEach(cover=>cover.addEventListener('click',()=>{
  const shell=cover.closest('.videoShell');
  document.querySelectorAll('.videoShell.isPlaying').forEach(activeShell=>{
    if(activeShell===shell)return;
    const activeVideo=activeShell.querySelector('video');
    activeVideo?.pause();
    activeVideo?.remove();
    activeShell.classList.remove('isPlaying');
  });
  if(shell.classList.contains('isPlaying'))return;
  const video=document.createElement('video');
  video.src=encodeURI(shell.dataset.video);
  video.title=shell.dataset.title;
  video.controls=true;
  video.autoplay=true;
  video.playsInline=true;
  video.preload='metadata';
  shell.append(video);
  shell.classList.add('isPlaying');
  video.play().catch(()=>{});
}));
