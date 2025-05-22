
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeaturesSection />
        
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16 md:py-24 container max-w-6xl mx-auto px-4"
        >
          <div className="bg-leaf-600 rounded-2xl overflow-hidden shadow-lg">
            <div className="p-8 md:p-12 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to protect your plants?</h2>
              <p className="text-leaf-100 mb-8 max-w-2xl">
                Create a free account to unlock advanced features, save your plant history, and get personalized care recommendations.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-leaf-800 hover:bg-leaf-50 font-medium py-3 px-8 rounded-lg transition-colors">
                  Get Started — It's Free
                </button>
                <button className="bg-leaf-700 hover:bg-leaf-800 text-white border border-leaf-500 font-medium py-3 px-8 rounded-lg transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
