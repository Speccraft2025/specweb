import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Artists from "@/components/Artists";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Services from "@/components/Services";
import Packages from "@/components/Packages";
import Testimonials from "@/components/Testimonials";
import Ecosystem from "@/components/Ecosystem";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Artists />
        <Portfolio />
        <About />
        <Services />
        <Packages />
        <Testimonials />
        <Ecosystem />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
