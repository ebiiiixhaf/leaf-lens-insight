
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, Trash2, Calendar, FileText } from 'lucide-react';

const mockReports = [
  {
    id: 1,
    name: "Tomato Field Report #1",
    diseases: ["Late Blight", "Early Blight"],
    imagesCount: 6,
    date: "2025-05-20",
    status: "completed"
  },
  {
    id: 2,
    name: "Potato Crop Analysis",
    diseases: ["Potato Scab", "Black Scurf"],
    imagesCount: 4,
    date: "2025-05-18",
    status: "completed"
  },
  {
    id: 3,
    name: "Corn Disease Assessment",
    diseases: ["Corn Rust", "Northern Leaf Blight"],
    imagesCount: 8,
    date: "2025-05-15",
    status: "completed"
  }
];

export const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reports] = useState(mockReports);

  const filteredReports = reports.filter(report =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.diseases.some(disease => 
      disease.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports</h1>
      </div>

      {/* Search & Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search reports or diseases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                {report.name}
              </CardTitle>
              <p className="text-sm text-gray-500">{report.date}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Detected Diseases:</p>
                <div className="flex flex-wrap gap-1">
                  {report.diseases.map((disease, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {disease}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <span className="font-medium">Images Uploaded:</span> {report.imagesCount}
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View PDF
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center pt-6">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
};
