function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
locomotive();

function loadingAnime() {
    let loader = document.querySelector("#line1-part1 h5")
const tl = gsap.timeline()
tl.from(".line h1",{
    y: 100,
    stagger: 0.25,
    delay: .5,
    duration:0.6
})
tl.from("#line1-part1, #animatedNow",{
    opacity:0,
    onStart: function(){
        
let count  = 0;
let counting = setInterval(() => {
    if(count <100){
        count++
        loader.textContent = count
    }
    else{
        clearInterval(counting)
    }
},28);
    }
})
tl.to(".line #animatedNow",{
    animationName: 'anime'
})
tl.to("#loader",{
    opacity: 0,
    delay:2.5,
    duration: 0.5
})
tl.from("#page1",{
    y:1600,
})
tl.to('#loader',{
    display:"none",
    duration: 0.5,
})
tl.from("nav",{
    opacity:1
})
tl.from(".hero h1,.hero h2,#hero3 h3",{
    y: 100,
    stagger:0.2,
})
tl.from("#hero1,#page2",{
    opacity:0
},'-=1.2')
}
loadingAnime();

function cursorAnimation() {
    document.addEventListener("mousemove",(dts)=>{
        gsap.from("#crsr",{
            x:dts.x,
            y:dts.y
        })
    })
}
// cursorAnimation();

function sheryAnimation(){
    Shery.imageEffect(".project",{
        style:5,
        debugger:true,
        gooey:true
    })

    Shery.makeMagnet("#nav-part2 h4", {
    });
    Shery.makeMagnet("#menu", {
    });
}
sheryAnimation();


function videoFunction() {
    let isplay = false
let videoContainer = document.querySelector("#video-container")
let videoCursor = document.querySelector("#video-cursor")
let video = document.querySelector('#video-container video')

     videoContainer.addEventListener("mouseenter",()=>{
        videoContainer.addEventListener('mousemove',(dts)=>{
            if (isplay === false) {
                videoContainer.addEventListener('click',()=>{
                    video.play();
                    videoCursor.innerHTML = `<i class="ri-pause-fill"></i>`;
                    isplay = true;
                    video.style.opacity = 1
                    videoContainer.style.background = none;
                    gsap.to("#video-cursor",{
                        scale:0.5
                    })
                })
            }
            else{
                videoContainer.addEventListener('click',()=>{
                    video.pause();
                    videoCursor.innerHTML = `<i class="ri-play-fill"></i>`;
                    isplay = false;
                    video.style.opacity = 0
                    gsap.to("#video-cursor",{
                        scale:1
                    })
                })
            }
            gsap.from("#crsr",{
                opacity:0
            })
            gsap.from("#video-cursor",{
                left:dts.x-300,
                top:dts.y-200
            })
        })
     })
     videoContainer.addEventListener("mouseleave",()=>{
        gsap.from("#crsr",{
            opacity:1
        })
        gsap.to("#video-cursor",{
            top:"-15%",
            left:"70%",
            scale:1
        })
     })

     document.addEventListener('mousemove',(dts)=>{
        gsap.from("#flag",{
            x:dts.x,
            y:dts.y
        })
     })
    
}
videoFunction();

document.querySelector("#hero3").addEventListener('mouseenter',()=>{
    gsap.to("#flag",{
        opacity:1
    })
})
document.querySelector("#hero3").addEventListener('mouseleave',()=>{
    gsap.to("#flag",{
        opacity:0
    })
})

function footerTextAnime(){
    let span = '';
    let footerText = document.querySelector('#footer-content h1');
    let contentText = footerText.textContent;
    let splitedText = contentText.split('');
    splitedText.forEach((e)=>{
       span += `<span>${e}</span>`
    })
    footerText.innerHTML = span
    footerText.addEventListener("mouseenter",()=>{
        gsap.to("#footer-content h1 span",{
            stagger: 0.05,
            color: 'transparent',
            webkitTextStroke: "1px #fff",
            fontFamily:"silk serif",
            fontWeight: 200,
        })
    })
    footerText.addEventListener("mouseleave",()=>{
        gsap.to("#footer-content h1 span",{
            stagger:0.05,
            fontWeight: 900,
            color: '#fff',
            fontFamily:"plain light",
        })
    })
}
footerTextAnime();

