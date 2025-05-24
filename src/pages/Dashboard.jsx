
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Download } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const statsData = [
  { title: 'Total Reports', value: '12', icon: FileText },
  { title: 'Most Common Disease', value: 'Tomato__Late_Blight', icon: null },
  { title: 'Last Upload', value: 'May 22, 2025', icon: null }
];

const diseaseData = [
  { name: 'Tomato Late Blight', value: 35, color: '#ef4444' },
  { name: 'Potato Early Blight', value: 25, color: '#f97316' },
  { name: 'Corn Rust', value: 20, color: '#eab308' },
  { name: 'Bean Leaf Spot', value: 20, color: '#22c55e' }
];

export const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Farmer!</h1>
        <p className="text-primary-foreground/90">
          Monitor your crops and manage plant disease predictions with confidence
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Plant Images
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">
                Drag and drop your plant images here, or click to browse
              </p>
              <Button>
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Summary Statistics</CardTitle>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" size="lg">
              <FileText className="w-4 h-4 mr-2" />
              Create Report
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Download className="w-4 h-4 mr-2" />
              Download Last PDF
            </Button>
          </CardContent>
        </Card>

        {/* Disease Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Disease Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={diseaseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
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
    </div>
  );
};
