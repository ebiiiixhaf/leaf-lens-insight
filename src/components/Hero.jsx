
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Upload, Brain, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="py-16 md:py-24 container max-w-6xl mx-auto px-4">
      <div className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            AI-Powered Plant Disease Detection
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Upload a photo of your plant and get instant disease diagnosis with treatment recommendations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link to="/dashboard">
            <button className="bg-leaf-600 hover:bg-leaf-700 text-white font-medium py-4 px-8 rounded-lg transition-colors text-lg">
              Start Analyzing Plants
            </button>
          </Link>
          <button className="bg-white hover:bg-gray-50 text-leaf-700 border-2 border-leaf-600 font-medium py-4 px-8 rounded-lg transition-colors text-lg">
            Watch Demo
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          <div className="text-center space-y-3">
            <div className="bg-leaf-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-leaf-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Upload Photo</h3>
            <p className="text-gray-600">Simply take or upload a photo of your plant's affected area</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="bg-leaf-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
              <Brain className="w-8 h-8 text-leaf-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">AI Analysis</h3>
            <p className="text-gray-600">Our advanced AI identifies diseases with 95%+ accuracy</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="bg-leaf-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
              <FileText className="w-8 h-8 text-leaf-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Get Treatment</h3>
            <p className="text-gray-600">Receive detailed treatment plans and preventive measures</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
