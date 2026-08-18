import { useRef } from 'react'
import AnimatedHeaderSection from '../components/AnimatedHeaderSection'
import { projects } from '../constants'
import { Icon } from '@iconify/react';
import { useState } from "react";
import gsap from "gsap"
import { useGSAP } from '@gsap/react'

const Works = () => {
    const overlayRefs = useRef([])
    const previewRef = useRef(null)
    const [currentIndex, setcurrentIndex] = useState(null)
    const text = 'Featured projects that have been meticulously \ncrafted with passion to drive \nresults and impact.'

    const mouse = useRef({x:0, y:0})

    const moveX = useRef(null)
    const moveY = useRef(null)

    useGSAP(() => {
        moveX.current = gsap.quickTo(previewRef.current, "x", {
            duration: 1.5,
            ease: "power3.out",
        })

        moveY.current = gsap.quickTo(previewRef.current, "y", {
            duration: 2,
            ease: "power3.out",
        })

    gsap.from("#project", {
        y: 100,
        opacity: 0,
        delay: 0.5,
        duration: 1,
        stagger: 0.3,
        ease: "back.out",
        scrollTrigger: {
            trigger: "#project"
        }
    })
    })

    const handleMouseEnter = (index) => {
        if(window.innerWidth < 768) return;
        setcurrentIndex(index)

        const el = overlayRefs.current[index]
        if(!el) return;

        gsap.killTweensOf(el);
        gsap.fromTo(el, {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"
        }, {
            clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
            duration: 0.15,
            ease: "power2.out"
        })

        gsap.to(previewRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        })
    }
    const handleMouseLeave = (index) => {
        if(window.innerWidth < 768) return;
        setcurrentIndex(null)

        const el = overlayRefs.current[index]
        if(!el) return;

        gsap.killTweensOf(el);
        gsap.to(el, {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
            duration: 0.2,
            ease: "power2.in"
        })

        gsap.to(previewRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        })

        gsap.to(previewRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: "power2.out"
        })
    }

    const handleMouseMove = (e) => {
        if(window.innerWidth < 768) return;
        mouse.current.x = e.clientX + 24
        mouse.current.y = e.clientY + 24
        moveX.current(mouse.current.x)
        moveY.current(mouse.current.y)
    }
  return (
    <section id="work" className='flex flex-col min-h-screen overflow-x-clip'>
        <AnimatedHeaderSection
        subTitle={"Logic meets Aesthetics, Seamlessly"}
        title={"works"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      <div className='relative flex flex-col w-full overflow-x-clip font-light' onMouseMove={handleMouseMove}>
        {projects.map((project, index) => (
          <div key={project.id} id="project" className='relative flex flex-col w-full gap-1 py-5 overflow-hidden cursor-pointer group md:gap-0' onMouseEnter={() =>handleMouseEnter(index)}
          onMouseLeave={()=>handleMouseLeave(index)}
          >
                {/* overlay */}
                <div ref={(el) =>{overlayRefs.current[index]=el}} className='absolute inset-0 hidden md:block duration-200 bg-black -z-10 clip-path' />            
                {/*title*/}
                <div className='flex justify-between gap-4 px-6 text-black transition-all duration-500 md:px-10 md:group-hover:px-12 md:group-hover:text-white'>
                    <h2 className='min-w-0 lg-text-[32px] text-[26px] leading-none text-pretty'>{project.name}</h2>
                    <Icon icon="iconoir:arrow-up-right" className='shrink-0 md:size-6 size-5' />
                </div>
                {/*divider*/}
                <div className='w-full h-0.5 bg-black/80' />

                {/*framework*/}
                <div className='flex flex-wrap px-6 text-sx leading-loose uppercase transition-all duration-500 md:px-10 md:text-small gap-x-4 md:gap-x-5 md:group-hover:px-12'>
                    {project.frameworks.map((framework) => (
                        <p key={framework.id} className='text-black transition-colors duration-500 md:group-hover:text-white '>{framework.name}</p>
                    ))}
                </div>

                {/*mobile preview images*/}
                <div className='relative flex items-center justify-center w-full px-6 py-4 md:hidden'>
                    <img src={project.image} alt={`${project.name}-image`} className='object-cover w-full max-w-full rounded-md aspect-[4/3]' />
                </div>
            </div>
        ))}
        {/* desktop floating image prewview */ }
        <div ref={previewRef} className='fixed -top-2/6 left-0 z-50 overflow-hidden border-8 border-black pointer-events-none w-[760px] hidden md:block opacity-0'>
            {currentIndex !== null && (
                <img src={projects[currentIndex].image} alt="preview" className='object-cover w-full h-full' />
            )}
        </div>
      </div>
    </section>
  )
}

export default Works
