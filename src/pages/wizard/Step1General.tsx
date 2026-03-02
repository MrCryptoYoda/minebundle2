import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronRight, PenTool, Sparkles, FileText, ArrowLeft, Loader2 } from 'lucide-react';
import { SectionCard } from '@/components/wizard/SectionCard';
import { UploadDropzone } from '@/components/wizard/UploadDropzone';
import { Listing } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface WizardContext {
  listingData: Partial<Listing>;
  setListingData: React.Dispatch<React.SetStateAction<Partial<Listing>>>;
}

export default function Step1General() {
  const navigate = useNavigate();
  const { listingData, setListingData } = useOutletContext<WizardContext>();
  const { toast } = useToast();
  
  // Mode state: 'select' | 'manual' | 'autofill'
  const [mode, setMode] = useState<'select' | 'manual' | 'autofill'>('select');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const updateField = (field: keyof Listing, value: any) => {
    setListingData(prev => ({ ...prev, [field]: value }));
  };

  const updateLocation = (field: string, value: string) => {
    setListingData(prev => ({
      ...prev,
      location: { ...prev.location, [field]: value } as any
    }));
  };

  // Determine next path based on current URL
  const currentPath = window.location.pathname;
  const typeSlug = currentPath.split('/')[2];

  const handleAutofill = () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setListingData(prev => ({
        ...prev,
        title: "AI Extracted: Copper Mountain Project",
        summary: "This is an AI-generated summary based on the uploaded documents. The project features significant copper mineralization and is located in a prime mining jurisdiction.",
        location: {
          country: "Chile",
          region: "Antofagasta",
          coordinates: undefined
        },
        commodity: ["Copper", "Gold"]
      }));
      
      setIsAnalyzing(false);
      setMode('manual');
      toast({
        title: "AI Autofill Complete",
        description: "We've populated the form details from your documents. Please review.",
      });
    }, 2000);
  };

  if (mode === 'select') {
    return (
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">How would you like to start?</h2>
          <p className="text-slate-500 mt-1">Choose how you want to input your project details.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Manual Option */}
          <button 
            onClick={() => setMode('manual')}
            className="flex flex-col items-center justify-center p-6 bg-white border-2 border-slate-200 rounded-xl hover:border-brand-orange hover:shadow-lg transition-all group text-center space-y-4 h-52"
          >
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-brand-orange/10 transition-colors">
              <PenTool className="h-7 w-7 text-slate-600 group-hover:text-brand-orange" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Manual Entry</h3>
              <p className="text-slate-500 text-sm mt-2 max-w-[200px]">
                Fill in the details yourself step-by-step.
              </p>
            </div>
          </button>

          {/* AI Autofill Option */}
          <button 
            onClick={() => setMode('autofill')}
            className="flex flex-col items-center justify-center p-6 bg-white border-2 border-slate-200 rounded-xl hover:border-brand-orange hover:shadow-lg transition-all group text-center space-y-4 h-52 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              NEW
            </div>
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-brand-orange/10 transition-colors">
              <Sparkles className="h-7 w-7 text-slate-600 group-hover:text-brand-orange" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">AI Autofill</h3>
              <p className="text-slate-500 text-sm mt-2 max-w-[200px]">
                Upload documents and let AI extract the details for you.
              </p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'autofill') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setMode('select')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Upload Project Documents</h2>
            <p className="text-slate-500">Upload teasers, technical reports, or presentations.</p>
          </div>
        </div>

        <SectionCard title="Document Upload">
          <div className="space-y-6">
            <UploadDropzone 
              label="Drag & drop files here" 
              helperText="PDF, DOCX, PPTX. Max 20MB."
              accept=".pdf,.doc,.docx,.ppt,.pptx"
              multiple
            />
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
              <Sparkles className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 text-sm">AI Processing</h4>
                <p className="text-blue-700 text-xs mt-1">
                  Our AI will analyze your documents to extract key information like location, commodities, and project summary. You can review and edit everything in the next step.
                </p>
              </div>
            </div>

            <Button 
              onClick={handleAutofill} 
              disabled={isAnalyzing}
              className="w-full h-12 bg-brand-orange hover:bg-brand-orange/90 text-lg gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Analyzing Documents...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Auto-fill Details
                </>
              )}
            </Button>
          </div>
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Project Overview</h2>
          <p className="text-slate-500">Start with the basics of your asset.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setMode('select')} className="text-xs">
          Change Mode
        </Button>
      </div>

      <SectionCard title="Basic Information">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Project Title*</Label>
            <Input 
              id="title" 
              placeholder="e.g. Copper Mountain Project" 
              value={listingData.title || ''}
              onChange={(e) => updateField('title', e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="summary">Executive Summary*</Label>
            <Textarea 
              id="summary" 
              placeholder="Briefly describe the investment opportunity..." 
              className="min-h-[120px]"
              value={listingData.summary || ''}
              onChange={(e) => updateField('summary', e.target.value)}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Location">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="country">Country*</Label>
            <Input 
              id="country" 
              placeholder="Select Country" 
              value={listingData.location?.country || ''}
              onChange={(e) => updateLocation('country', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="region">Region / State / Province*</Label>
            <Input 
              id="region" 
              placeholder="e.g. British Columbia" 
              value={listingData.location?.region || ''}
              onChange={(e) => updateLocation('region', e.target.value)}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Project Image">
        <UploadDropzone 
          label="Upload Main Project Image" 
          helperText="JPG, PNG or WEBP. Max 5MB."
          accept="image/*"
        />
      </SectionCard>

      <div className="flex justify-end pt-4">
        <Button 
          onClick={() => navigate(`/list/${typeSlug}/step/2`)} 
          className="gap-2 bg-brand-orange hover:bg-brand-orange/90 h-12 px-8 text-lg"
        >
          Next Step <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
