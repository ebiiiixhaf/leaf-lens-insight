
import { useState } from 'react';
import { Image, Upload, ArrowUp, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import PlantAnalysisResult from './PlantAnalysisResult';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

interface UploadedFile {
  file: File;
  preview: string;
  id: string;
}

interface AnalysisResult {
  disease: string;
  confidence: number;
  description: string;
  pesticides: string;
  imageUrl: string;
}

const UploadDropzone = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
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
    
    const newFiles: UploadedFile[] = [];
    
    Array.from(files).forEach((file) => {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Unsupported File",
          description: `${file.name} is not an image file`,
          variant: "destructive"
        });
        return;
      }

      // Size check (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: `${file.name} is larger than 10MB`,
          variant: "destructive"
        });
        return;
      }

      // Check batch limit (max 10 files)
      if (uploadedFiles.length + newFiles.length >= 10) {
        toast({
          title: "Too Many Files",
          description: "Maximum 10 files allowed per batch",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          const uploadedFile: UploadedFile = {
            file,
            preview: event.target.result,
            id: Math.random().toString(36).substr(2, 9)
          };
          newFiles.push(uploadedFile);
          
          if (newFiles.length === Array.from(files).filter(f => f.type.startsWith('image/') && f.size <= 10 * 1024 * 1024).length) {
            setUploadedFiles(prev => [...prev, ...newFiles]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    
    // Simulate batch analysis with a timeout
    setTimeout(() => {
      const mockResults: AnalysisResult[] = uploadedFiles.map((file, index) => ({
        disease: ["Powdery Mildew", "Late Blight", "Early Blight", "Leaf Spot"][index % 4],
        confidence: Math.floor(Math.random() * (95 - 75) + 75),
        description: "Detailed description of the plant disease detected in this image.",
        pesticides: "Recommended treatment options for this specific disease.",
        imageUrl: file.preview
      }));
      
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const resetAnalysis = () => {
    setUploadedFiles([]);
    setIsAnalyzing(false);
    setAnalysisComplete(false);
    setAnalysisResults([]);
  };

  if (analysisComplete && analysisResults.length > 0) {
    return (
      <div className="w-full space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Batch Analysis Results</h2>
          <Button onClick={resetAnalysis} variant="outline">
            Upload New Images
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analysisResults.map((result, index) => (
            <PlantAnalysisResult 
              key={index}
              imageUrl={result.imageUrl}
              analysisData={{
                disease: result.disease,
                confidence: result.confidence,
                description: result.description,
                treatments: [
                  {
                    name: "Primary Treatment",
                    description: result.pesticides
                  }
                ],
                preventionTips: [
                  "Improve air circulation around plants",
                  "Avoid overhead watering",
                  "Remove infected plant material"
                ]
              }}
              onReset={() => {}}
              hideResetButton={true}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="w-full rounded-xl overflow-hidden space-y-6"
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
            <h3 className="text-xl font-medium mb-2">Analyzing your plants...</h3>
            <p className="text-muted-foreground">Processing {uploadedFiles.length} images for disease detection</p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-leaf-100 rounded-full flex items-center justify-center mb-4">
              <Image className="w-8 h-8 text-leaf-600" />
            </div>
            <h3 className="text-xl font-medium mb-2">Drop your plant photos here</h3>
            <p className="text-muted-foreground mb-6">
              Drag and drop multiple images or click to upload (Max 10 files)
            </p>
            <label className="bg-leaf-600 hover:bg-leaf-700 text-white font-medium py-2 px-5 rounded-lg cursor-pointer transition-all transform hover:scale-105 flex items-center">
              <ArrowUp className="w-4 h-4 mr-2" />
              Upload Images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
            <p className="mt-6 text-xs text-muted-foreground">
              Supported formats: JPG, PNG, GIF • Max size: 10MB per file
            </p>
          </>
        )}
      </div>

      {uploadedFiles.length > 0 && !isAnalyzing && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Selected Images ({uploadedFiles.length})</h3>
            <Button onClick={simulateAnalysis} className="bg-leaf-600 hover:bg-leaf-700">
              Analyze All Images
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="relative group">
                <img
                  src={file.preview}
                  alt="Plant preview"
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <button
                  onClick={() => removeFile(file.id)}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="mt-1 text-xs text-muted-foreground truncate">
                  {file.file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default UploadDropzone;
