import SmoothScroll from "@/components/ui/SmoothScroll/SmoothScroll";
import VideoRig from "@/components/VideoRig/VideoRig";
import SceneTracker from "@/components/SceneTracker/SceneTracker";
import Loader from "@/components/Loader/Loader";
import Nav from "@/components/Nav/Nav";
import Hero from "@/components/sections/Hero/Hero";
import Film from "@/components/sections/Film/Film";
import Stats from "@/components/sections/Stats/Stats";
import Finale from "@/components/sections/Finale/Finale";
import Footer from "@/components/sections/Footer/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <SmoothScroll />
      <VideoRig />
      <SceneTracker />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Film />
        <Stats />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
