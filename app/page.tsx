import SmoothScroll from "@/components/ui/SmoothScroll/SmoothScroll";
import VideoRig from "@/components/VideoRig/VideoRig";
import SceneTracker from "@/components/SceneTracker/SceneTracker";
import FilmProgress from "@/components/FilmProgress/FilmProgress";
import Loader from "@/components/Loader/Loader";
import Nav from "@/components/Nav/Nav";
import Cursor from "@/components/Cursor/Cursor";
import Hero from "@/components/sections/Hero/Hero";
import Prancha from "@/components/sections/Prancha/Prancha";
import Film from "@/components/sections/Film/Film";
import Stats from "@/components/sections/Stats/Stats";
import Finale from "@/components/sections/Finale/Finale";
import Obras from "@/components/sections/Obras/Obras";
import Estudio from "@/components/sections/Estudio/Estudio";
import Processo from "@/components/sections/Processo/Processo";
import Cta from "@/components/sections/Cta/Cta";
import Footer from "@/components/sections/Footer/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <SmoothScroll />
      <VideoRig />
      <SceneTracker />
      <FilmProgress />
      <Cursor />
      <Nav />
      <main className="relative z-10">
        {/* ato 1 — o filme da obra 041 sobre o vídeo fixo */}
        <Hero />
        <Prancha />
        <Film />
        <Stats />
        <Finale />

        {/* ato 2 — o arquivo do escritório, em breu sólido */}
        <div data-scene="after">
          <Obras />
          <Estudio />
          <Processo />
          <Cta />
        </div>
      </main>
      <Footer />
    </>
  );
}
