
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, Play, Download, ExternalLink, AlertTriangle, Leaf, Camera, Calendar, Shield } from 'lucide-react';

const diseaseProfiles = [
  {
    name: "Corn Blight",
    symptoms: "Brown lesions on leaves, yellowing, reduced yield",
    causes: "Fungal infection, humid conditions, poor air circulation",
    treatment: "Fungicide application, resistant varieties, crop rotation",
    impact: "Can reduce yield by 20-50% if untreated"
  },
  {
    name: "Grape Powdery Mildew",
    symptoms: "White powdery coating on leaves and fruit",
    causes: "Fungal spores, warm dry conditions followed by humidity",
    treatment: "Sulfur-based fungicides, proper pruning for air circulation",
    impact: "Affects fruit quality and can cause complete crop loss"
  },
  {
    name: "Potato Late Blight",
    symptoms: "Dark spots on leaves, white fuzzy growth on undersides",
    causes: "Phytophthora infestans, cool wet weather",
    treatment: "Copper-based fungicides, resistant varieties, proper spacing",
    impact: "Can destroy entire crops within weeks"
  },
  {
    name: "Tomato Bacterial Spot",
    symptoms: "Small dark spots on leaves and fruit",
    causes: "Bacterial infection, warm humid conditions, overhead watering",
    treatment: "Copper sprays, resistant varieties, drip irrigation",
    impact: "Reduces marketable fruit quality and yield"
  }
];

const seasonalTips = [
  {
    season: "Spring",
    tips: ["Monitor for early fungal infections", "Apply preventative treatments", "Check soil drainage"],
    diseases: ["Early blight", "Downy mildew"]
  },
  {
    season: "Summer",
    tips: ["Watch for heat stress symptoms", "Maintain proper irrigation", "Monitor for bacterial diseases"],
    diseases: ["Bacterial spot", "Powdery mildew"]
  },
  {
    season: "Fall",
    tips: ["Prepare for harvest diseases", "Clean up plant debris", "Plan crop rotation"],
    diseases: ["Late blight", "Storage diseases"]
  },
  {
    season: "Winter",
    tips: ["Plan next season", "Study disease patterns", "Prepare equipment"],
    diseases: ["Soil-borne pathogens"]
  }
];

export const Learn = () => {
  const [activeTab, setActiveTab] = useState("intro");

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Plant Disease Learning Center</h1>
      </div>

      <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2">Master Plant Disease Management</h2>
        <p className="text-primary-foreground/90">
          Learn to identify, prevent, and treat plant diseases for healthier crops and better yields
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="intro" className="text-xs">Introduction</TabsTrigger>
          <TabsTrigger value="profiles" className="text-xs">Disease Profiles</TabsTrigger>
          <TabsTrigger value="treatments" className="text-xs">Treatments</TabsTrigger>
          <TabsTrigger value="seasonal" className="text-xs">Seasonal Guide</TabsTrigger>
          <TabsTrigger value="imaging" className="text-xs">Image Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="intro" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Introduction to Plant Diseases
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Common Crop Diseases</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Corn:</strong> Northern/Southern Blight, Rust, Smut</li>
                    <li>• <strong>Grapes:</strong> Powdery Mildew, Downy Mildew, Black Rot</li>
                    <li>• <strong>Potatoes:</strong> Late Blight, Early Blight, Scab</li>
                    <li>• <strong>Tomatoes:</strong> Bacterial Spot, Fusarium Wilt, Blight</li>
                    <li>• <strong>Wheat:</strong> Rust, Powdery Mildew, Septoria</li>
                    <li>• <strong>Olives:</strong> Olive Knot, Peacock Spot, Verticillium Wilt</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Key Symptoms to Watch</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Unusual leaf spots or discoloration</li>
                    <li>• Wilting despite adequate water</li>
                    <li>• Stunted or abnormal growth</li>
                    <li>• Powdery or fuzzy growth on surfaces</li>
                    <li>• Fruit or seed abnormalities</li>
                    <li>• Premature yellowing or leaf drop</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <h4 className="font-semibold text-amber-800">Importance of Early Detection</h4>
                </div>
                <p className="text-sm text-amber-700">
                  Early detection can prevent 70-90% of crop losses. Most diseases are easier and cheaper to treat 
                  when caught in their initial stages. Regular monitoring and quick action are your best defenses.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profiles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary" />
                Disease Profiles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {diseaseProfiles.map((disease, index) => (
                  <AccordionItem key={index} value={`disease-${index}`}>
                    <AccordionTrigger className="text-left">
                      <span className="font-medium">{disease.name}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid md:grid-cols-2 gap-4 pt-2">
                        <div>
                          <h4 className="font-medium text-sm mb-1">Symptoms</h4>
                          <p className="text-sm text-gray-600 mb-3">{disease.symptoms}</p>
                          
                          <h4 className="font-medium text-sm mb-1">Causes & Transmission</h4>
                          <p className="text-sm text-gray-600">{disease.causes}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">Treatment Options</h4>
                          <p className="text-sm text-gray-600 mb-3">{disease.treatment}</p>
                          
                          <h4 className="font-medium text-sm mb-1">Yield Impact</h4>
                          <p className="text-sm text-red-600 font-medium">{disease.impact}</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="treatments" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Chemical Treatments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Fungicides</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Copper-based (Bordeaux mixture)</li>
                    <li>• Triazole compounds</li>
                    <li>• Strobilurin fungicides</li>
                    <li>• Sulfur-based treatments</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Bactericides</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Copper compounds</li>
                    <li>• Streptomycin (where legal)</li>
                    <li>• Oxytetracycline</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <h5 className="font-medium text-red-800 mb-1">Safety Guidelines</h5>
                  <ul className="text-xs text-red-700 space-y-1">
                    <li>• Always read and follow label instructions</li>
                    <li>• Wear appropriate protective equipment</li>
                    <li>• Respect pre-harvest intervals</li>
                    <li>• Avoid spraying in windy conditions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  Organic & Alternative Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Biological Controls</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Beneficial microorganisms</li>
                    <li>• Predatory insects</li>
                    <li>• Competitive exclusion</li>
                    <li>• Biocontrol agents</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Cultural Practices</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Crop rotation (3-4 year cycles)</li>
                    <li>• Resistant plant varieties</li>
                    <li>• Proper plant spacing</li>
                    <li>• Sanitation practices</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Natural Treatments</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Neem oil applications</li>
                    <li>• Baking soda solutions</li>
                    <li>• Compost tea sprays</li>
                    <li>• Essential oil blends</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="seasonal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Seasonal Disease Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {seasonalTips.map((season, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-3 text-center">{season.season}</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-1">Key Actions</h4>
                        <ul className="text-xs space-y-1">
                          {season.tips.map((tip, tipIndex) => (
                            <li key={tipIndex}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-1">Common Diseases</h4>
                        <ul className="text-xs space-y-1">
                          {season.diseases.map((disease, diseaseIndex) => (
                            <li key={diseaseIndex} className="text-red-600">• {disease}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Environmental Factors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Weather Conditions</h4>
                  <ul className="text-sm space-y-1">
                    <li>• High humidity favors fungal diseases</li>
                    <li>• Temperature fluctuations stress plants</li>
                    <li>• Wind can spread spores rapidly</li>
                    <li>• Excessive moisture promotes bacterial growth</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Critical Growth Stages</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Seedling emergence</li>
                    <li>• Flowering period</li>
                    <li>• Fruit development</li>
                    <li>• Pre-harvest stage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Monitoring Schedule</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Daily during critical periods</li>
                    <li>• Weekly during growing season</li>
                    <li>• After weather events</li>
                    <li>• Before treatment applications</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="imaging" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                Best Practices for Image Capture
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Photo Quality Tips</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Lighting:</strong> Use natural daylight, avoid shadows</li>
                    <li>• <strong>Focus:</strong> Ensure symptoms are clearly visible</li>
                    <li>• <strong>Distance:</strong> Fill frame with affected area</li>
                    <li>• <strong>Angles:</strong> Take photos from multiple perspectives</li>
                    <li>• <strong>Background:</strong> Use plain backgrounds when possible</li>
                    <li>• <strong>Resolution:</strong> Use highest camera setting available</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">What to Include</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Close-ups:</strong> Detailed shots of symptoms</li>
                    <li>• <strong>Context:</strong> Show affected plant in field</li>
                    <li>• <strong>Progression:</strong> Early and advanced stages</li>
                    <li>• <strong>Healthy comparison:</strong> Include unaffected areas</li>
                    <li>• <strong>Multiple organs:</strong> Leaves, stems, fruits if affected</li>
                    <li>• <strong>Environmental context:</strong> Weather conditions</li>
                  </ul>
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-blue-50">
                <h4 className="font-semibold mb-2">Batch Upload Organization</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium mb-1">File Naming Convention</h5>
                    <ul className="space-y-1">
                      <li>• Include date: YYYY-MM-DD</li>
                      <li>• Specify crop type</li>
                      <li>• Add field/section identifier</li>
                      <li>• Note symptoms if known</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">Grouping Strategy</h5>
                    <ul className="space-y-1">
                      <li>• Group by field location</li>
                      <li>• Separate by crop type</li>
                      <li>• Order by severity</li>
                      <li>• Include GPS coordinates if possible</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <h5 className="font-medium text-green-700">Good Example</h5>
                  <p className="text-xs text-green-600">Clear, well-lit, focused on symptoms</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-yellow-600 font-bold">!</span>
                  </div>
                  <h5 className="font-medium text-yellow-700">Acceptable</h5>
                  <p className="text-xs text-yellow-600">Usable but could be improved</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-red-600 font-bold">✗</span>
                  </div>
                  <h5 className="font-medium text-red-700">Poor Quality</h5>
                  <p className="text-xs text-red-600">Blurry, dark, or unclear symptoms</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-start gap-3">
                <ExternalLink className="w-5 h-5 mt-1 text-primary" />
                <div className="text-left">
                  <div className="font-medium">University Extension Services</div>
                  <div className="text-sm text-muted-foreground">Local expert guidance and resources</div>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-start gap-3">
                <Download className="w-5 h-5 mt-1 text-primary" />
                <div className="text-left">
                  <div className="font-medium">Disease Identification Guide</div>
                  <div className="text-sm text-muted-foreground">Downloadable PDF reference</div>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="flex items-start gap-3">
                <Play className="w-5 h-5 mt-1 text-primary" />
                <div className="text-left">
                  <div className="font-medium">Video Tutorials</div>
                  <div className="text-sm text-muted-foreground">Step-by-step treatment guides</div>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
