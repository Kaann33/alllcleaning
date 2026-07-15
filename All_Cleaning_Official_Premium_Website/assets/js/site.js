const toggle=document.querySelector(".hamburger"),menu=document.querySelector(".menu");
if(toggle&&menu){toggle.addEventListener("click",()=>{const o=menu.classList.toggle("open");toggle.setAttribute("aria-expanded",o);document.body.classList.toggle("menu-open",o)});menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{menu.classList.remove("open");toggle.setAttribute("aria-expanded","false");document.body.classList.remove("menu-open")}))}
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll(".reveal").forEach(e=>obs.observe(e));
document.querySelectorAll(".faq button").forEach(b=>b.addEventListener("click",()=>{const f=b.closest(".faq"),a=f.querySelector(".faq-answer"),o=f.classList.contains("open");document.querySelectorAll(".faq.open").forEach(x=>{if(x!==f){x.classList.remove("open");x.querySelector(".faq-answer").style.maxHeight=null}});f.classList.toggle("open",!o);a.style.maxHeight=!o?a.scrollHeight+"px":null}));
const topBtn=document.querySelector(".top");if(topBtn){window.addEventListener("scroll",()=>topBtn.classList.toggle("visible",scrollY>650));topBtn.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}))}
document.addEventListener("DOMContentLoaded",()=>{const c=document.querySelector(".cookie"),b=document.querySelector("#acceptCookies"),k="allCleaningConsentV4";if(c&&b){if(localStorage.getItem(k)==="yes")c.style.display="none";b.addEventListener("click",()=>{localStorage.setItem(k,"yes");c.style.display="none"})}});
const form=document.querySelector("#quoteForm"),msg=document.querySelector("#formMessage");if(form&&msg){form.addEventListener("submit",e=>{if(form.dataset.demo==="true"){e.preventDefault();if(!form.checkValidity()){form.reportValidity();return}msg.textContent="Bedankt. Uw aanvraag is klaar om verzonden te worden.";form.reset()}})}

const beforeAfter = document.getElementById("beforeAfter");
if (beforeAfter) {
  const slider = beforeAfter.querySelector('input[type="range"]');
  const afterWrap = beforeAfter.querySelector(".after-wrap");
  const divider = beforeAfter.querySelector(".ba-divider");
  slider.addEventListener("input", () => {
    const value = slider.value + "%";
    afterWrap.style.width = value;
    divider.style.left = value;
  });
}


// Hero image slider
const heroBg = document.querySelector(".hero-bg");
const heroDots = document.querySelectorAll(".hero-slide-dots button");
const heroImages = [
  "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=2000&q=88",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2000&q=88",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=88"
];
let heroIndex = 0;

function showHeroSlide(index){
  if(!heroBg) return;
  heroIndex = index;
  heroBg.style.backgroundImage = `url("${heroImages[index]}")`;
  heroDots.forEach((dot,i)=>dot.classList.toggle("active", i===index));
}
heroDots.forEach(dot => dot.addEventListener("click", () => {
  showHeroSlide(Number(dot.dataset.slide));
}));
if(heroBg && heroDots.length){
  setInterval(()=>showHeroSlide((heroIndex+1)%heroImages.length), 6000);
}

// Image lightbox
const lightbox = document.getElementById("lightbox");
if(lightbox){
  const lightboxImage = lightbox.querySelector("img");
  const lightboxClose = lightbox.querySelector("button");

  document.querySelectorAll(".gallery img, .project-card img").forEach(image => {
    image.addEventListener("click", () => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add("open");
    });
  });

  const closeLightbox = () => lightbox.classList.remove("open");
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", event => {
    if(event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", event => {
    if(event.key === "Escape") closeLightbox();
  });
}
