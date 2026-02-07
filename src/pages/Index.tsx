import { memo, useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";

import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import PageLoader from "@/components/PageLoader";
import CursorTrail from "@/components/CursorTrail";
import MobileSidebar from "@/components/MobileSidebar";
import HamburgerButton from "@/components/HamburgerButton";
import useSecurity from "@/hooks/useSecurity";

const Index = memo(() => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Enable security features
  useSecurity();

  return (
    <div className="bg-background min-h-screen relative select-none">
      <PageLoader />
      <CursorTrail />
      <AnimatedBackground />
      <ScrollProgress />
      <Navigation />
      
      {/* Mobile Navigation */}
      <HamburgerButton isOpen={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)} />
      <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      
      <PortfolioSection />
      <ContactSection />
      <Footer />
      <BackToTop />
    </div>
  );
});

Index.displayName = "Index";

export default Index;
