import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { servicesData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const text = `I build secure, high-performance full-stack apps
    with smooth UX to drive growth 
    not headaches.`;
  const serviceRefs = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); //768px
  useGSAP(() => {
    serviceRefs.current.forEach((el) => {
      if (!el) return;

      gsap.fromTo(
        el,
        {
          y: isDesktop ? 160 : 48,
          scale: isDesktop ? 0.96 : 1,
        },
        {
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: el,
            start: isDesktop ? "top bottom" : "top 90%",
            end: isDesktop ? "top 55%" : "top 70%",
            scrub: true,
            invalidateOnRefresh: true,
          },
          ease: "circ.out",
        }
      );
    });

    ScrollTrigger.refresh();
  }, { dependencies: [isDesktop], revertOnUpdate: true });
  return (
    <section id="services" className="min-h-screen bg-black rounded-t-4xl">
      <AnimatedHeaderSection
        subTitle={"Behind the scene, Beyond the screen"}
        title={"Service"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      {servicesData.map((service, index) => (
        <div
          ref={(el) => (serviceRefs.current[index] = el)}
          key={index}
          className="sticky px-6 pt-5 pb-10 text-white bg-black border-t-2 md:px-10 md:pt-6 md:pb-12 border-white/30"
          style={
            isDesktop
              ? {
                  top: `calc(10vh + ${index * 5}em)`,
                  marginBottom: `${(servicesData.length - index - 1) * 5}rem`,
                }
              : { top: "4.5rem" }
          }
        >
          <div className="flex items-center justify-between gap-4 font-light">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl">
                {service.title}
              </h2>
              <p className="text-lg leading-relaxed tracking-widest sm:text-xl lg:text-2xl text-white/60 text-pretty">
                {service.description}
              </p>
              <div className="flex flex-col gap-2 text-xl sm:gap-4 sm:text-2xl lg:text-3xl text-white/80">
                {service.items.map((item, itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`}>
                    <h3 className="flex">
                      <span className="mr-6 text-base sm:mr-12 sm:text-lg text-white/30">
                        0{itemIndex + 1}
                      </span>
                      {item.title}
                    </h3>
                    {itemIndex < service.items.length - 1 && (
                      <div className="w-full h-px my-2 bg-white/30" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Services;
