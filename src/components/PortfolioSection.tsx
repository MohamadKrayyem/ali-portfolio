import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, memo, useCallback, useMemo } from "react";
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
    title: "Extraordinary Cinematic Shot",
    category: "Cinematic",
    image: cinematicDrone,
    description:
      "Ultra-realistic — Emotional — Atmospheric — Makes people pause.",
  },
  {
    id: 2,
    title: "Studio Portrait",
    category: "Photography",
    image: studioPortrait,
    description: "Clean studio lighting — Editorial — High-end look.",
  },
  {
    id: 3,
    title: "Product Ad — Cosmetic",
    category: "Commercial",
    image: cosmeticAd,
    description: "Perfume / Skincare — Stone / Water / Leaves / Natural light.",
  },
  {
    id: 4,
    title: "Cinematic City Shot",
    category: "Cinematic",
    image: cinematicCity,
    description: "Landscape / City / Nature — Feels like a movie opening.",
  },
  {
    id: 5,
    title: "Jewelry Ad",
    category: "Commercial",
    image: jewelryAd,
    description: "Ring / Necklace / Watch — Minimal — Luxury lighting.",
  },
  {
    id: 6,
    title: "Real Estate Drone Shot",
    category: "Commercial",
    image: realEstateDrone,
    description: "Towers / Architecture — Clean, premium look.",
  },
  {
    id: 7,
    title: "Deep Emotional Cinematic",
    category: "Cinematic",
    image: emotionalCinematic,
    description: "Human-focused — Strong feeling — Story in one frame.",
  },
  {
    id: 8,
    title: "Minimal Still Life",
    category: "Commercial",
    image: minimalStillLife,
    description: "Object / Texture / Composition — Artistic, editorial feel.",
  },
];

const categories = ["All", "Cinematic", "Commercial", "Photography"];

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const PortfolioCard = memo(
  ({
    item,
    index,
    isInView,
    onOpen,
    isVisible,
  }: {
    item: PortfolioItem;
    index: number;
    isInView: boolean;
    onOpen: (item: PortfolioItem) => void;
    isVisible: boolean;
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    // Don't render hidden category items until visible
    if (!isVisible) return null;

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, delay: index * 0.03 }}
        className="group relative overflow-hidden aspect-[4/3] cursor-pointer"
        onClick={() => onOpen(item)}>
        {/* Skeleton Loader - simple bg, no blur */}
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

        {/* Overlay - only transform + opacity, no blur */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block" />

        {/* Content - hidden on mobile for raw look */}
        <div className="absolute inset-0 flex-col justify-end p-6 hidden lg:flex opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <span className="text-primary text-xs tracking-widest uppercase mb-2 font-cinzel">
            {item.category}
          </span>
          <h3 className="text-xl font-bold text-foreground mb-2 font-playfair">
            {item.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {item.description}
          </p>
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform duration-200">
              <Play size={16} />
            </button>
            <button className="w-10 h-10 rounded-full border border-foreground text-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors duration-200">
              <ExternalLink size={16} />
            </button>
          </div>
        </div>

        {/* Corner accent - simple, no animation overhead */}
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
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Memoize filtered items to avoid re-computation
  const filteredItems = useMemo(
    () =>
      activeCategory === "All"
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  const handleOpen = useCallback((item: PortfolioItem) => {
    setSelectedItem(item);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
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
          <h2 className="text-4xl md:text-5xl font-light font-playfair">
            FEATURED{" "}
            <span className="font-bold text-gradient-gold">PORTFOLIO</span>
          </h2>
        </motion.div>

        {/* Category Filter - Luxury Editorial Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-16 md:mb-20">
          {/* Mobile: Horizontal scroll | Desktop: Centered row */}
          <div className="flex items-center gap-3 md:gap-6 overflow-x-auto scrollbar-hide px-4 md:px-0 pb-2 md:pb-0 max-w-full">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryChange(category)}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                className={`
                  relative flex-shrink-0 px-5 md:px-7 py-2.5 md:py-3
                  text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase font-cinzel
                  border rounded-full transition-all duration-300 ease-out
                  ${
                    activeCategory === category
                      ? "border-primary/80 text-primary shadow-[0_0_20px_hsl(43_74%_49%/0.15)]"
                      : "border-muted/40 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }
                `}
                style={{
                  minWidth: "max-content",
                }}>
                {/* Text */}
                <span className="relative z-10">{category}</span>

                {/* Active indicator - subtle underline reveal */}
                <span
                  className={`
                    absolute bottom-2 left-1/2 -translate-x-1/2 h-px bg-primary
                    transition-all duration-300 ease-out
                    ${activeCategory === category ? "w-6 opacity-100" : "w-0 opacity-0"}
                  `}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={index}
                isInView={isInView}
                onOpen={handleOpen}
                isVisible={true}
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