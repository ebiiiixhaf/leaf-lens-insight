
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

const unconfirmedPredictions = [
  {
    id: 1,
    crop: "Tomato",
    disease: "Late Blight",
    confidence: 87,
    timeLeft: "2h 15m",
    image: "tomato-sample.jpg"
  },
  {
    id: 2,
    crop: "Potato",
    disease: "Early Blight",
    confidence: 92,
    timeLeft: "1h 45m",
    image: "potato-sample.jpg"
  }
];

const confirmedPredictions = [
  {
    id: 4,
    crop: "Tomato",
    disease: "Bacterial Wilt",
    confidence: 94,
    date: "2025-05-20",
    selected: false
  },
  {
    id: 5,
    crop: "Bean",
    disease: "Rust Disease",
    confidence: 89,
    date: "2025-05-19",
    selected: false
  }
];

export const UserPredictions = () => {
  const [confirmed, setConfirmed] = useState(confirmedPredictions);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Predictions</h1>
      </div>

      <Tabs defaultValue="unconfirmed" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="unconfirmed" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Unconfirmed Predictions
          </TabsTrigger>
          <TabsTrigger value="confirmed" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Confirmed Predictions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="unconfirmed" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unconfirmedPredictions.map((prediction) => (
              <Card key={prediction.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{prediction.crop}</CardTitle>
                    <Badge variant="outline" className="text-orange-600">
                      <Clock className="w-3 h-3 mr-1" />
                      {prediction.timeLeft}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-red-600 mb-2">{prediction.disease}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Confidence</span>
                        <span>{prediction.confidence}%</span>
                      </div>
                      <Progress value={prediction.confidence} className="h-2" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Confirm
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <XCircle className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="confirmed" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {confirmed.map((prediction) => (
              <Card key={prediction.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{prediction.crop}</CardTitle>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Confirmed
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{prediction.date}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium text-red-600 mb-2">{prediction.disease}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Confidence</span>
                        <span>{prediction.confidence}%</span>
                      </div>
                      <Progress value={prediction.confidence} className="h-2" />
                    </div>
                  </div>

                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full text-red-600 hover:text-red-700"
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
