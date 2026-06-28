import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Artists from "@/components/Artists";
import Packages from "@/components/Packages";
import Testimonials from "@/components/Testimonials";
import Ecosystem from "@/components/Ecosystem";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Artists />
      <Packages />
      <Testimonials />
      <Ecosystem />
      <Blog />
      <Contact />
    </>
  );
}
