
import React, { useState, useRef } from 'react';
import { Upload, X, FileImage, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const UploadDropzone = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const MAX_FILES = 10;
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    console.log('Processing files:', files);
    
    // Filter valid image files
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file",
          description: `${file.name} is not an image file`,
          variant: "destructive"
        });
        return false;
      }
      
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 10MB limit`,
          variant: "destructive"
        });
        return false;
      }
      
      return true;
    });

    // Check total file count
    if (selectedFiles.length + validFiles.length > MAX_FILES) {
      toast({
        title: "Too many files",
        description: `Maximum ${MAX_FILES} files allowed`,
        variant: "destructive"
      });
      return;
    }

    // Create file objects with preview URLs
    const newFiles = validFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file),
      name: file.name
    }));

    setSelectedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id) => {
    setSelectedFiles(prev => {
      const updated = prev.filter(f => f.id !== id);
      // Clean up preview URL
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return updated;
    });
  };

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      selectedFiles.forEach(fileObj => {
        formData.append('files', fileObj.file);
      });

      console.log('Uploading files to backend...');
      
      // Replace with your actual API endpoint
      const response = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Analysis results:', data);

      // Map results with file previews
      const resultsWithPreviews = data.results.map((result, index) => ({
        ...result,
        preview: selectedFiles[index]?.preview,
        fileName: selectedFiles[index]?.name
      }));

      setAnalysisResults(resultsWithPreviews);
      
      toast({
        title: "Analysis complete",
        description: `Successfully analyzed ${selectedFiles.length} images`,
      });

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to analyze images",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const resetUpload = () => {
    // Clean up preview URLs
    selectedFiles.forEach(fileObj => {
      URL.revokeObjectURL(fileObj.preview);
    });
    setSelectedFiles([]);
    setAnalysisResults([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Show results if analysis is complete
  if (analysisResults.length > 0) {
    return (
      <div className="w-full space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Analysis Results</h2>
          <Button onClick={resetUpload} variant="outline">
            Analyze New Images
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analysisResults.map((result, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video relative">
                <img 
                  src={result.preview} 
                  alt={result.fileName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white text-sm font-medium">{result.fileName}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg text-red-600">{result.disease}</h3>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span>Confidence:</span>
                      <span className="font-medium">{(result.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={result.confidence * 100} className="h-2 mt-1" />
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-1">Description:</h4>
                    <p className="text-xs text-gray-600 line-clamp-3">{result.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-1">Treatment:</h4>
                    <p className="text-xs text-gray-600 line-clamp-2">{result.pesticides}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'}
          ${isUploading ? 'opacity-50 pointer-events-none' : 'hover:border-primary hover:bg-gray-50'}
        `}
      >
        {isUploading ? (
          <div className="space-y-4">
            <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin" />
            <div>
              <h3 className="text-lg font-medium">Analyzing your plants...</h3>
              <p className="text-gray-600">Processing {selectedFiles.length} images</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="w-12 h-12 mx-auto text-gray-400" />
            <div>
              <h3 className="text-lg font-medium mb-2">Upload Plant Images</h3>
              <p className="text-gray-600 mb-4">
                Drag and drop images here, or click to browse
              </p>
              <Button onClick={() => fileInputRef.current?.click()}>
                Choose Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
            <p className="text-sm text-gray-500">
              Supports JPG, PNG, GIF • Max {MAX_FILES} files • 10MB per file
            </p>
          </div>
        )}
      </div>

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && !isUploading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">
              Selected Files ({selectedFiles.length}/{MAX_FILES})
            </h3>
            <div className="space-x-2">
              <Button variant="outline" onClick={resetUpload}>
                Clear All
              </Button>
              <Button onClick={uploadFiles}>
                Analyze Images
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {selectedFiles.map((fileObj) => (
              <div key={fileObj.id} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={fileObj.preview}
                    alt={fileObj.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removeFile(fileObj.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="mt-1 text-xs text-gray-600 truncate">
                  {fileObj.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDropzone;
