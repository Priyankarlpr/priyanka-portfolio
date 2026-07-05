/* ===========================
   Smooth Scroll
=========================== */

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if(target){
            target.scrollIntoView({
                behavior:'smooth'
            });
        }
    });
});

/* ===========================
   Navbar Shadow
=========================== */

const navbar=document.querySelector("nav");

window.addEventListener("scroll",()=>{

    if(window.scrollY>60){

        navbar.style.background="rgba(255,255,255,.82)";
        navbar.style.boxShadow="0 15px 40px rgba(0,0,0,.12)";

    }
    else{

        navbar.style.background="rgba(255,255,255,.55)";
        navbar.style.boxShadow="0 20px 50px rgba(0,0,0,.08)";

    }

});

/* ===========================
   Animated Counters
=========================== */

const counters=document.querySelectorAll(".stat h2");

const speed=50;

const startCounter=()=>{

    counters.forEach(counter=>{

        const update=()=>{

            const target=parseInt(counter.innerText.replace(/\D/g,''));

            const current=parseInt(counter.dataset.count)||0;

            const increment=Math.ceil(target/speed);

            if(current<target){

                counter.dataset.count=current+increment;

                counter.innerText=current+increment+"+";

                requestAnimationFrame(update);

            }
            else{

                if(counter.innerText.includes("%")){
                    counter.innerText=target+"%";
                }
                else if(counter.innerText.includes("+")){
                    counter.innerText=target+"+";
                }
                else{
                    counter.innerText=target;
                }

            }

        }

        update();

    });

}

/* ===========================
   Start Counter when Visible
=========================== */

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

startCounter();

observer.disconnect();

}

});

});

const stats=document.querySelector(".stats");

if(stats){

observer.observe(stats);

}

/* ===========================
   Reveal Animation
=========================== */

const revealObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

}

});

},{
threshold:.15
});

document.querySelectorAll(".card,.project,.glass,.stat").forEach(item=>{

item.classList.add("reveal");

revealObserver.observe(item);

});

/* ===========================
   Mouse Tilt Effect
=========================== */

const tilt=document.querySelectorAll(".project,.card,.profile-card");

tilt.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateY=((x/rect.width)-0.5)*16;

const rotateX=((y/rect.height)-0.5)*-16;

card.style.transform=

`perspective(1000px)
 rotateX(${rotateX}deg)
 rotateY(${rotateY}deg)
 translateY(-8px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="perspective(1000px) rotateX(0) rotateY(0)";

});

});

/* ===========================
   Floating Animation
=========================== */

document.querySelectorAll(".floating").forEach((box,index)=>{

setInterval(()=>{

box.animate([

{transform:'translateY(0px)'},

{transform:'translateY(-12px)'},

{transform:'translateY(0px)'}

],{

duration:3000+index*400,

iterations:1

});

},3000);

});

/* ===========================
   Typing Effect
=========================== */

const heading=document.querySelector(".hero h1 span");

if(heading){

const text="AI-Powered Products";

heading.innerHTML="";

let i=0;

function typing(){

if(i<text.length){

heading.innerHTML+=text.charAt(i);

i++;

setTimeout(typing,70);

}

}

typing();

}

/* ===========================
   Dark Mode
=========================== */

const toggle=document.createElement("button");

toggle.innerHTML="🌙";

toggle.style.position="fixed";
toggle.style.bottom="30px";
toggle.style.right="30px";
toggle.style.width="55px";
toggle.style.height="55px";
toggle.style.borderRadius="50%";
toggle.style.border="none";
toggle.style.cursor="pointer";
toggle.style.fontSize="22px";
toggle.style.boxShadow="0 15px 30px rgba(0,0,0,.15)";
toggle.style.zIndex="999";

document.body.appendChild(toggle);

toggle.onclick=()=>{

document.body.classList.toggle("dark");

toggle.innerHTML=document.body.classList.contains("dark")?"☀️":"🌙";

};
