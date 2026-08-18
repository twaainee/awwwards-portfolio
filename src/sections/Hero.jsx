import React, { useRef } from 'react'
import AnimatedTextLines from '../components/AnimatedTextLines'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Canvas } from '@react-three/fiber';
import { Planet } from '../components/Planet';
import { Environment, Float, Lightformer } from '@react-three/drei';
import { useMediaQuery } from 'react-responsive';

const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 853 });

    const contextRef = useRef(null)
    const headerRef = useRef(null)
    const aboutText = "I help growing brands and startups gain an\n unfair advantage through premium\n results driven web/apps"

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from(contextRef.current, {
            y: "50vh",
            duration: 1,
            ease: "circ.out",
        });
        tl.from(headerRef.current,{
            opacity: 0,
            y: '200',
            duration: 1,
            ease: "circ.out",
        },
        "<+0.2"
        );
    }, [])
  return (
    <section className="flex flex-col justify-end min-h-screen" id="home">
        <div ref={contextRef}>
            <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"}}>
                <div ref={headerRef} className="flex flex-col justify-center gap-12 pt-16 sm:gap-16">
                    <p className="text-sm font-light tracking-[0.5rem] uppercase px-10 text-black">404 No Bugs Found</p>
                    <div className="px-10">
                        <h1 className="flex flex-col flex-wrap gap-12 text-black uppercase banner-text-responsive sm:gap-16 md:block">Elijah Twaine</h1>
                    </div>
                </div>
            </div>
            <div className="relative px-10 text-black">
                <div className="absolute inset-x-0 border-t-2" />
                <div className="py-12 sm:py-16 text-end">
                    <AnimatedTextLines text={aboutText} className="font-light uppercase value-text-responsive" />
                </div>
            </div>
        </div>
        <figure className='absolute inset-0 -z-50' style={{width: '100vw', height: '100vh'}}>

            <Canvas shadows camera={{position: [0,0,-10], fov: 17.5, near:1, far: 20}}>
                <ambientLight intensity={0.5} />
                <Float speed={0.5}>
                    <Planet scale={isMobile ? 0.7 : 1} />
                </Float>
                <Environment resolution={256}>
                    <group rotation={[-Math.PI / 3, 4, 1]}>
                        <Lightformer form="circle" intensity={2} position={[0, 5, -9]} scale={10} />
                        <Lightformer form="circle" intensity={2} position={[0, 3, 1]} scale={10} />
                        <Lightformer form="circle" intensity={2} position={[-5, -1, -1]} scale={10} />
                        <Lightformer form="circle" intensity={2} position={[10, 1, 0]} scale={16} />
                    </group>
                </Environment>
            </Canvas>
        </figure>
    </section>
  )
}

export default Hero