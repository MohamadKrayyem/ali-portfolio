import { motion } from "framer-motion";
import { memo } from "react";
import { Video, TrendingUp, Share2, Lightbulb, ArrowRight } from "lucide-react";
import LuxuryButton from "./LuxuryButton";

const services = [
  {
    icon: Video,
    title: "Cinematic Video Production",
    description:
      "AI-generated cinematic scenes and short films.",
  },
  {
    icon: TrendingUp,
    title: "Commercial & Advertising Visuals",
    description:
      "AI concept ads and commercial visuals for brands.",
  },
  {
    icon: Share2,
    title: "Photography & Studio Imagery",
    description:
      "AI-generated studio-quality imagery (no physical shoots).",
  },
  {
    icon: Lightbulb,
    title: "Social Media Visual Content",
    description:
      "AI visuals optimized for digital platforms.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "Understanding your vision and goals",
  },
  {
    number: "02",
    title: "Creation",
    description: "AI-powered content development",
  },
  {
    number: "03",
    title: "Refinement",
    description: "Polishing to perfection",
  },
  {
    number: "04",
    title: "Delivery",
    description: "Final assets ready to elevate your brand",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const ServicesSection = memo(() => {
  return (
    <section
      id="services"
      className="relative py-32 bg-background overflow-hidden"
    >

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

      <div className="container mx-auto px-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-primary text-sm tracking-[0.3em] uppercase font-montserrat block mb-4"
          >
            What I Offer
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-playfair mb-6"
          >
            <span className="text-foreground">MY </span>
            <span className="text-gradient-gold">SERVICES</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto font-montserrat"
          >
            Elevating brands through AI-powered content creation and storytelling
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className="group relative p-10 rounded-lg glass-morphism border border-transparent hover:border-primary/50 transition-all duration-300 hover:shadow-glow cursor-pointer"
              style={{ willChange: "transform" }}
            >
              {/* Icon */}
              <motion.div
                className="mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <service.icon
                  size={60}
                  className="text-primary transition-all duration-300"
                  strokeWidth={1.5}
                />
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-cinzel text-foreground mb-4 tracking-wide">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-base leading-relaxed font-montserrat">
                {service.description}
              </p>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Process Section */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm tracking-[0.3em] uppercase font-montserrat block mb-4">
              How I Work
            </span>
            <h3 className="text-3xl md:text-5xl font-playfair">
              <span className="text-foreground">MY </span>
              <span className="text-gradient-gold">PROCESS</span>
            </h3>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20 hidden md:block" />

            <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-4 md:gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative text-center"
                >
                  {/* Number circle */}
                  <motion.div
                    className="w-16 h-16 rounded-full border-2 border-primary bg-background flex items-center justify-center mx-auto mb-6 relative z-10"
                    whileHover={{ scale: 1.1, borderColor: "hsl(43 74% 49%)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-primary font-playfair text-xl font-bold">
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <h4 className="text-lg font-cinzel text-foreground mb-2 tracking-wide">
                    {step.title}
                  </h4>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm font-montserrat">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
});

ServicesSection.displayName = "ServicesSection";

export default ServicesSection;