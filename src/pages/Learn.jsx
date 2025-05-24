
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Play, Download, ExternalLink } from 'lucide-react';

const learningResources = [
  {
    title: "Common Plant Diseases Identification",
    type: "Article",
    duration: "10 min read",
    description: "Learn to identify the most common plant diseases affecting crops in your region."
  },
  {
    title: "Preventive Measures for Healthy Crops",
    type: "Video",
    duration: "15 minutes",
    description: "Practical tips and techniques to prevent disease outbreaks in your fields."
  },
  {
    title: "Organic Treatment Methods",
    type: "Guide",
    duration: "20 min read",
    description: "Comprehensive guide to organic and sustainable disease treatment options."
  }
];

export const Learn = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Learning Center</h1>
      </div>

      <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2">Expand Your Knowledge</h2>
        <p className="text-primary-foreground/90">
          Access expert resources and guides to improve your crop management skills
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningResources.map((resource, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">{resource.type}</span>
              </div>
              <CardTitle className="text-lg">{resource.title}</CardTitle>
              <p className="text-sm text-gray-500">{resource.duration}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{resource.description}</p>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  {resource.type === 'Video' ? (
                    <Play className="w-4 h-4 mr-1" />
                  ) : (
                    <BookOpen className="w-4 h-4 mr-1" />
                  )}
                  {resource.type === 'Video' ? 'Watch' : 'Read'}
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>External Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" size="lg">
              <ExternalLink className="w-4 h-4 mr-2" />
              Agricultural Extension Services
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <ExternalLink className="w-4 h-4 mr-2" />
              Plant Disease Database
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <ExternalLink className="w-4 h-4 mr-2" />
              Crop Protection Guidelines
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
