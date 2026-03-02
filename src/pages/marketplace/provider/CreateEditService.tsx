import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { MARKETPLACE_CATEGORIES } from '@/data/marketplaceData';
import { ChevronLeft, Save, Upload } from 'lucide-react';

export default function CreateEditService() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = !!id;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: isEdit ? "Service Updated" : "Service Created",
        description: "Your service listing has been saved successfully.",
      });
      navigate('/marketplace/provider/services');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/marketplace/provider/services')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{isEdit ? 'Edit Service Listing' : 'Create New Service Listing'}</h1>
            <p className="text-slate-500">Fill in the details to list your service on the marketplace.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
              <CardDescription>Provide comprehensive information about your service.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Service Title *</Label>
                <Input id="title" placeholder="e.g., Advanced Geophysical Surveying" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {MARKETPLACE_CATEGORIES.map(cat => (
                      <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Short Summary *</Label>
                <Textarea id="summary" placeholder="Brief description (1-2 sentences) for search results..." className="min-h-[80px]" required />
                <p className="text-xs text-slate-500">This will appear on the service card in search results.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea id="description" placeholder="Full description of your service, capabilities, and value proposition..." className="min-h-[200px]" required />
              </div>

              <div className="space-y-3">
                <Label>Regions Served *</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Australia', 'Africa', 'North America', 'South America', 'Asia', 'Europe'].map(region => (
                    <div key={region} className="flex items-center space-x-2">
                      <Checkbox id={`reg-${region}`} />
                      <Label htmlFor={`reg-${region}`} className="font-normal cursor-pointer">{region}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Commodities Served *</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Gold', 'Copper', 'Lithium', 'Iron Ore', 'Coal', 'Nickel', 'Zinc', 'Rare Earths'].map(comm => (
                    <div key={comm} className="flex items-center space-x-2">
                      <Checkbox id={`comm-${comm}`} />
                      <Label htmlFor={`comm-${comm}`} className="font-normal cursor-pointer">{comm}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Service Image</Label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-slate-100 pt-6">
              <Button type="button" variant="outline" onClick={() => navigate('/marketplace/provider/services')}>Cancel</Button>
              <div className="flex gap-2">
                <Button type="button" variant="secondary">Save Draft</Button>
                <Button type="submit" className="bg-brand-orange hover:bg-brand-orange/90 text-white" disabled={isLoading}>
                  {isLoading ? "Saving..." : (isEdit ? "Update Service" : "Publish Service")}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
