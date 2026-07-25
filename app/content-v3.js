const contentLoader=document.querySelector('.contentLoader');
const contentWipe=document.querySelector('.contentWipe');

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
