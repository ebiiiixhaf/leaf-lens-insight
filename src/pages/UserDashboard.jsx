
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import UploadDropzone from '@/components/UploadDropzone';

const statsData = [
  { title: 'Total Predictions', value: '8', icon: FileText },
  { title: 'Most Common Disease', value: 'Tomato__Late_Blight', icon: null },
  { title: 'Last Analysis', value: 'May 22, 2025', icon: null }
];

const diseaseData = [
  { name: 'Tomato Late Blight', value: 35, color: '#ef4444' },
  { name: 'Potato Early Blight', value: 25, color: '#f97316' },
  { name: 'Corn Rust', value: 20, color: '#eab308' },
  { name: 'Bean Leaf Spot', value: 20, color: '#22c55e' }
];

export const UserDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome to PlantCare!</h1>
        <p className="text-primary-foreground/90">
          Analyze your plant images and get instant disease predictions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Plant Disease Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UploadDropzone />
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Your Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {statsData.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {stat.icon && <stat.icon className="w-4 h-4 text-primary" />}
                  <span className="text-sm text-gray-600">{stat.title}</span>
                </div>
                <span className="font-medium">{stat.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Disease Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Disease Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={diseaseData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {diseaseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
