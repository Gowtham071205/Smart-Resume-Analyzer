import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="bg-[#fcf8ff] text-gray-900 font-sans">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <Hero />

      {/* FEATURES */}
      <Features />

      {/* CTA */}
      <CTA />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}