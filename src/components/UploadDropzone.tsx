
import { useState } from 'react';
import { Image, Upload, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import PlantAnalysisResult from './PlantAnalysisResult';
import { useToast } from '@/components/ui/use-toast';

const UploadDropzone = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const { toast } = useToast();

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    processFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (files: FileList) => {
    if (files.length === 0) return;
    
    const file = files[0];
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Unsupported File",
        description: "Please upload an image file (PNG, JPG, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Size check (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        setSelectedImage(event.target.result);
        simulateAnalysis();
      }
    };
    reader.readAsDataURL(file);
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    // Simulating AI analysis with a timeout
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2500);
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setIsAnalyzing(false);
    setAnalysisComplete(false);
  };

  if (analysisComplete && selectedImage) {
    return <PlantAnalysisResult imageUrl={selectedImage} onReset={resetAnalysis} />;
  }

  return (
    <motion.div 
      className="w-full rounded-xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-200 bg-white/80 backdrop-blur-sm",
          isDragging ? "border-leaf-500 bg-leaf-50" : "border-leaf-200",
          isAnalyzing ? "opacity-75" : "hover:bg-leaf-50/50"
        )}
      >
        {isAnalyzing ? (
          <div className="flex flex-col items-center py-8">
            <div className="w-16 h-16 border-4 border-t-leaf-500 border-leaf-200 rounded-full animate-spin mb-4"></div>
            <h3 className="text-xl font-medium mb-2">Analyzing your plant...</h3>
            <p className="text-muted-foreground">Our AI is examining the image for signs of disease</p>
          </div>
        ) : selectedImage ? (
          <div className="w-full">
            <img
              src={selectedImage}
              alt="Selected plant"
              className="max-h-80 mx-auto rounded-lg object-contain"
            />
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-leaf-100 rounded-full flex items-center justify-center mb-4">
              <Image className="w-8 h-8 text-leaf-600" />
            </div>
            <h3 className="text-xl font-medium mb-2">Drop your plant photo here</h3>
            <p className="text-muted-foreground mb-6">
              Drag and drop or click to upload
            </p>
            <label className="bg-leaf-600 hover:bg-leaf-700 text-white font-medium py-2 px-5 rounded-lg cursor-pointer transition-all transform hover:scale-105 flex items-center">
              <ArrowUp className="w-4 h-4 mr-2" />
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
            <p className="mt-6 text-xs text-muted-foreground">
              Supported formats: JPG, PNG, GIF • Max size: 10MB
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default UploadDropzone;
