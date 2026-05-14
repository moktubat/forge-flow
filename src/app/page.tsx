import BMICalculator from "@/components/page/Home/BMICalculator";
import Contact from "@/components/page/Home/Contact";
import CTASection from "@/components/page/Home/CTASection";
import FAQ from "@/components/page/Home/FAQ";
import Gallery from "@/components/page/Home/Gallery";
import Hero from "@/components/page/Home/Hero";
import Membership from "@/components/page/Home/Membership";
import Programs from "@/components/page/Home/Programs";
import Reasons from "@/components/page/Home/Reasons";
import Schedule from "@/components/page/Home/Schedule";
import Stats from "@/components/page/Home/Stats";
import Testimonials from "@/components/page/Home/Testimonials";
import Tips from "@/components/page/Home/Tips";
import Trainers from "@/components/page/Home/Trainers";

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <Programs />
      <Reasons />
      <Trainers />
      <BMICalculator />
      <Gallery />
      <Membership />
      <Schedule />
      <Testimonials />
      <FAQ />
      <Tips />
      <CTASection />
      <Contact />
    </div>
  );
}
