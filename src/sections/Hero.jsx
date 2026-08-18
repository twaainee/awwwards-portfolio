import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const text = `I help growing brands and startups gain an
unfair advantage through premium
results driven webs/apps`;
  return (
    <section
      id="home"
      className="relative flex flex-col justify-end min-h-screen overflow-hidden"
    >
      <div className="relative z-10">
        <AnimatedHeaderSection
          subTitle={"404 No Bugs Found"}
          title={"Eli Twaine"}
          text={text}
          textColor={"text-black"}
        />
      </div>
      <figure
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas
          dpr={isMobile ? [1, 1.25] : [1, 2]}
          shadows={!isMobile}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
        >
          <ambientLight intensity={0.5} />
          <Float speed={isMobile ? 0.25 : 0.5} floatIntensity={isMobile ? 0.5 : 1}>
            <Planet scale={isMobile ? 0.7 : 1} />
          </Float>
          <Environment resolution={isMobile ? 128 : 256}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 5, -9]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 3, 1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[-5, -1, -1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[10, 1, 0]}
                scale={16}
              />
            </group>
          </Environment>
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;
