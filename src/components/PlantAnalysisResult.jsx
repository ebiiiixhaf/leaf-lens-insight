
import React from 'react';
import { Leaf, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

// Mock data - in a real app, this would come from the AI analysis
const mockAnalysisData = {
  disease: "Powdery Mildew",
  confidence: 89,
  description: "Powdery mildew is a fungal disease that affects a wide range of plants. It appears as a white powdery substance on leaf surfaces, stems, and sometimes fruit.",
  treatments: [
    {
      name: "Neem Oil Spray",
      description: "Apply neem oil solution to affected areas once a week. Mix 1 tsp neem oil with 1 quart of water and a drop of dish soap."
    },
    {
      name: "Improve Air Circulation",
      description: "Prune the plant to improve air flow between branches and leaves. Proper spacing between plants prevents disease spread."
    },
    {
      name: "Baking Soda Solution",
      description: "Mix 1 tbsp baking soda with 1 gallon of water and 1 tsp dish soap. Spray on affected plants weekly as a preventative."
    }
  ],
  preventionTips: [
    "Avoid overhead watering; water at the base of plants",
    "Space plants properly for adequate air circulation",
    "Remove and dispose of infected plant debris",
    "Use resistant plant varieties when available"
  ]
};

const PlantAnalysisResult = ({ imageUrl, onReset }) => {
  return (
    <motion.div 
      className="w-full bg-white rounded-xl overflow-hidden shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5 relative">
          <img 
            src={imageUrl} 
            alt="Analyzed plant" 
            className="w-full h-full object-cover"
            style={{ maxHeight: '600px' }}
          />
          <Button 
            variant="outline"
            size="icon"
            className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={onReset}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
            <div className="flex items-center">
              <div className="mr-3">
                <Leaf className="h-7 w-7 text-leaf-300" />
              </div>
              <div>
                <h3 className="font-medium text-xl">{mockAnalysisData.disease}</h3>
                <div className="flex items-center mt-1">
                  <div className="w-full max-w-36">
                    <Progress value={mockAnalysisData.confidence} className="h-2 bg-white/30" />
                  </div>
                  <span className="ml-2 text-sm">{mockAnalysisData.confidence}% confidence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-3/5 p-6 md:p-8 max-h-[600px] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
          <p className="text-muted-foreground mb-6">{mockAnalysisData.description}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Recommended Treatments</h3>
            <div className="space-y-4">
              {mockAnalysisData.treatments.map((treatment, index) => (
                <Card key={index} className="bg-secondary/50 border-leaf-100">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-leaf-700 mb-1">{treatment.name}</h4>
                    <p className="text-sm text-muted-foreground">{treatment.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Prevention Tips</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {mockAnalysisData.preventionTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-8 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              For advanced features and farm-wide reports,{" "}
              <a href="#" className="text-leaf-600 hover:text-leaf-700 font-medium">
                create a free account
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlantAnalysisResult;
