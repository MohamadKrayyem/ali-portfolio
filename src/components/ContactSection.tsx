import { motion } from "framer-motion";
import { memo, useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import LuxuryButton from "./LuxuryButton";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@alikrayem.com",
    href: "mailto:hello@alikrayem.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Los Angeles, CA",
    href: "#",
  },
];

const ContactSection = memo(() => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      className="relative py-32 bg-background overflow-hidden"
    >

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.03] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-primary text-sm tracking-[0.3em] uppercase font-montserrat block mb-4"
          >
            Get In Touch
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-playfair mb-6"
          >
            <span className="text-foreground">CONTACT </span>
            <span className="text-gradient-gold">ME</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto font-montserrat"
          >
            Ready to start your next project? Let's create something extraordinary together.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-playfair text-foreground mb-8">
              Let's <span className="text-gradient-gold">Connect</span>
            </h3>

            <p className="text-muted-foreground leading-relaxed font-montserrat mb-8">
              Whether you have a project in mind, want to collaborate, or just want to say hello—I'd love to hear from you. Fill out the form or reach out directly.
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full border border-muted flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
                    <info.icon
                      size={20}
                      className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground font-montserrat uppercase tracking-wider">
                      {info.label}
                    </span>
                    <p className="text-foreground font-montserrat group-hover:text-primary transition-colors duration-300">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <label className="block text-sm text-muted-foreground font-montserrat uppercase tracking-wider mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-card border border-muted rounded-lg text-foreground font-montserrat focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300 outline-none"
                  placeholder="Your Name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <label className="block text-sm text-muted-foreground font-montserrat uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-card border border-muted rounded-lg text-foreground font-montserrat focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300 outline-none"
                  placeholder="your@email.com"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label className="block text-sm text-muted-foreground font-montserrat uppercase tracking-wider mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-card border border-muted rounded-lg text-foreground font-montserrat focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300 outline-none"
                placeholder="Project Inquiry"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label className="block text-sm text-muted-foreground font-montserrat uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-card border border-muted rounded-lg text-foreground font-montserrat focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300 outline-none resize-none"
                placeholder="Tell me about your project..."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <LuxuryButton variant="primary" size="lg" type="submit">
                <span className="flex items-center gap-2">
                  Send Message
                  <Send size={18} />
                </span>
              </LuxuryButton>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = "ContactSection";

export default ContactSection;
