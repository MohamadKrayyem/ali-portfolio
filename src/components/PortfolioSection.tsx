import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, memo, useCallback } from "react";
import { Play, ExternalLink, X } from "lucide-react";

// Import images for ES6 module bundling
import cinematicDrone from "@/assets/portfolio/1000088153.webp";
import studioPortrait from "@/assets/portfolio/1000088155.webp";
import cosmeticAd from "@/assets/portfolio/1000088157.webp";
import cinematicCity from "@/assets/portfolio/1000088161.webp";
import jewelryAd from "@/assets/portfolio/1000088163.webp";
import realEstateDrone from "@/assets/portfolio/1000088165.webp";
import emotionalCinematic from "@/assets/portfolio/1000088167.webp";
import minimalStillLife from "@/assets/portfolio/m2.webp";

const portfolioItems = [
  {
    id: 1,
    title: "Visual Concept — Mountain Landscape",
    category: "AI-Generated Visual",
    image: cinematicDrone,
  },
  {
    id: 2,
    title: "Visual Concept — Portrait",
    category: "AI-Generated Visual",
    image: studioPortrait,
   
  },
  {
    id: 3,
    title: "Visual Concept — Cosmetic Product",
    category: "AI-Generated Visual",
    image: cosmeticAd,
   
    badge: "Concept Project",
  },
  {
    id: 4,
    title: "Visual Concept — City Aerial",
    category: "AI-Generated Visual",
    image: cinematicCity,
   
  },
  {
    id: 5,
    title: "Visual Concept — Jewelry Product",
    category: "AI-Generated Visual",
    image: jewelryAd,
   
    badge: "Concept Project",
  },
  {
    id: 6,
    title: "Visual Concept — Architectural Property",
    category: "AI-Generated Visual",
    image: realEstateDrone,
   
    badge: "Concept Project",
  },
  {
    id: 7,
    title: "Visual Concept — Human Eye Close-Up",
    category: "AI-Generated Visual",
    image: emotionalCinematic,
    
  },
  {
    id: 8,
    title: "Visual Concept — Minimal Still Life",
    category: "AI-Generated Visual",
    image: minimalStillLife,
    
  },
];

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  badge?: string;
}

const PortfolioCard = memo(
  ({
    item,
    index,
    isInView,
    onOpen,
  }: {
    item: PortfolioItem;
    index: number;
    isInView: boolean;
    onOpen: (item: PortfolioItem) => void;
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, delay: index * 0.03 }}
        className="group relative overflow-hidden aspect-[4/3] cursor-pointer"
        onClick={() => onOpen(item)}>
        {/* Skeleton Loader */}
        {!isLoaded && <div className="absolute inset-0 bg-muted/50" />}

        <img
          src={item.image}
          alt={item.title}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          loading={index < 6 ? "eager" : "lazy"}
          decoding="async"
          style={{ willChange: "transform" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block" />

        {/* Content */}
        <div className="absolute inset-0 flex-col justify-end p-6 hidden lg:flex opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <span className="text-primary text-xs tracking-widest uppercase mb-2 font-cinzel">
            {item.category}
          </span>
          <h3 className="text-xl font-bold text-foreground mb-2 font-playfair">
            {item.title}
          </h3>
          {item.badge && (
            <span className="inline-block px-3 py-1 text-[10px] tracking-wider uppercase bg-primary/20 text-primary rounded-full mb-3 w-fit font-cinzel">
              {item.badge}
            </span>
          )}
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform duration-200">
              <Play size={16} />
            </button>
            <button className="w-10 h-10 rounded-full border border-foreground text-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors duration-200">
              <ExternalLink size={16} />
            </button>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-4 right-4 w-0 h-0 border-t-[40px] border-t-primary border-l-[40px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block" />
      </motion.div>
    );
  },
);

PortfolioCard.displayName = "PortfolioCard";

const Lightbox = memo(
  ({ item, onClose }: { item: PortfolioItem | null; onClose: () => void }) => {
    if (!item) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-background/95"
        onClick={onClose}>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-4xl w-full bg-card border border-border rounded-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}>
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-auto max-h-[60vh] object-cover"
            loading="eager"
          />
          <div className="p-6 md:p-8">
            <span className="text-primary text-xs tracking-widest uppercase mb-2 block font-cinzel">
              {item.category}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-playfair">
              {item.title}
            </h3>
            {item.badge && (
              <span className="inline-block px-4 py-2 text-xs tracking-wider uppercase bg-primary/20 text-primary rounded-full mb-4 font-cinzel">
                {item.badge}
              </span>
            )}
            <p className="text-muted-foreground">{item.description}</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 border border-muted flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors duration-200">
            <X size={20} />
          </button>
        </motion.div>
      </motion.div>
    );
  },
);

Lightbox.displayName = "Lightbox";

const PortfolioSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const handleOpen = useCallback((item: PortfolioItem) => {
    setSelectedItem(item);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedItem(null);
  }, []);

  return (
    <section
      id="portfolio"
      className="py-32 bg-background-secondary relative"
      ref={ref}>
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12">
          <span className="text-primary text-sm tracking-[0.3em] uppercase mb-4 block font-cinzel">
            My Work
          </span>
          <h2 className="text-4xl md:text-5xl font-light font-playfair mb-6">
            FEATURED{" "}
            <span className="font-bold text-gradient-gold">PORTFOLIO</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-montserrat">
            AI-generated digital visual projects.
          </p>
        </motion.div>

        {/* Portfolio Grid - 2 columns mobile, 4 columns desktop */}
        <motion.div
          layout
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <AnimatePresence mode="popLayout">
            {portfolioItems.map((item, index) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={index}
                isInView={isInView}
                onOpen={handleOpen}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && <Lightbox item={selectedItem} onClose={handleClose} />}
      </AnimatePresence>
    </section>
  );
});

PortfolioSection.displayName = "PortfolioSection";

export default PortfolioSection;