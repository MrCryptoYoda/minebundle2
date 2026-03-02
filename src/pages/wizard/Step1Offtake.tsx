import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronRight, FileText, Lock, PenTool, Sparkles, ArrowLeft, Loader2 } from 'lucide-react';
import { SectionCard } from '@/components/wizard/SectionCard';
import { UploadDropzone } from '@/components/wizard/UploadDropzone';
import { Listing } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';

interface WizardContext {
  listingData: Partial<Listing>;
  setListingData: React.Dispatch<React.SetStateAction<Partial<Listing>>>;
}

export default function Step1Offtake() {
  const navigate = useNavigate();
  const { listingData, setListingData } = useOutletContext<WizardContext>();
  const { toast } = useToast();

  // Mode state: 'select' | 'manual' | 'autofill'
  const [mode, setMode] = useState<'select' | 'manual' | 'autofill'>('select');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const updateField = (field: keyof Listing, value: any) => {
    setListingData(prev => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (parent: string, field: string, value: any) => {
    setListingData(prev => ({
      ...prev,
      [parent]: {
        ...(prev as any)[parent],
        [field]: value
      }
    }));
  };

  const handleAutofill = () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setListingData(prev => ({
        ...prev,
        title: "AI Extracted: High-Grade Lithium Offtake",
        summary: "AI-generated summary: This opportunity offers 50,000 tpa of high-grade lithium spodumene concentrate. The project is fully permitted and construction is underway.",
        location: {
          country: "Australia",
          region: "Western Australia",
          coordinates: undefined
        },
        commodity: ["Lithium"],
        offtakeDetails: {
           intention: 'Product Sale',
           grade: '6.0% Li2O',
           quantity: '50,000 tpa',
           contractType: 'Long Term'
        }
      }));
      
      setIsAnalyzing(false);
      setMode('manual');
      toast({
        title: "AI Autofill Complete",
        description: "We've populated the offtake details from your documents.",
      });
    }, 2000);
  };

  if (mode === 'select') {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">How would you like to start?</h2>
          <p className="text-slate-500">Choose how you want to input your offtake details.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Manual Option */}
          <button 
            onClick={() => setMode('manual')}
            className="flex flex-col items-center justify-center p-8 bg-white border-2 border-slate-200 rounded-2xl hover:border-brand-orange hover:shadow-lg transition-all group text-center space-y-4 h-64"
          >
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-brand-orange/10 transition-colors">
              <PenTool className="h-8 w-8 text-slate-600 group-hover:text-brand-orange" />
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
            className="flex flex-col items-center justify-center p-8 bg-white border-2 border-slate-200 rounded-2xl hover:border-brand-orange hover:shadow-lg transition-all group text-center space-y-4 h-64 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
              NEW
            </div>
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-brand-orange/10 transition-colors">
              <Sparkles className="h-8 w-8 text-slate-600 group-hover:text-brand-orange" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">AI Autofill</h3>
              <p className="text-slate-500 text-sm mt-2 max-w-[200px]">
                Upload spec sheets or contracts and let AI extract the details.
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
            <h2 className="text-2xl font-bold text-slate-900">Upload Product Documents</h2>
            <p className="text-slate-500">Upload product specifications, term sheets, or technical reports.</p>
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
            
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
              <Sparkles className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 text-sm">AI Processing</h4>
                <p className="text-blue-700 text-xs mt-1">
                  Our AI will analyze your documents to extract key information like grade, quantity, and contract terms. You can review and edit everything in the next step.
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
          <h2 className="text-2xl font-bold text-slate-900">Product Details</h2>
          <p className="text-slate-500">Tell us about the product you are listing.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setMode('select')} className="text-xs">
          Change Mode
        </Button>
      </div>

      <SectionCard title="Basic Information">
        <div className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Product Listing Title*</Label>
            <Input 
              id="title" 
              placeholder="e.g. High-Grade Lithium Spodumene Offtake" 
              value={listingData.title || ''}
              onChange={(e) => updateField('title', e.target.value)}
            />
            <p className="text-xs text-slate-500">Give your listing a punchy title.</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location">Origin / Mine Location*</Label>
            <Input 
              id="location" 
              placeholder="Search location or enter coordinates" 
              value={listingData.location?.region || ''}
              onChange={(e) => updateNestedField('location', 'region', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="sector">Product Sector*</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="battery">Battery Metals</SelectItem>
                  <SelectItem value="base">Base Metals</SelectItem>
                  <SelectItem value="precious">Precious Metals</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="commodity">Product Type*</Label>
              <Select 
                value={listingData.commodity?.[0] || ''}
                onValueChange={(val) => updateField('commodity', [val])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select commodity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lithium">Lithium</SelectItem>
                  <SelectItem value="Cobalt">Cobalt</SelectItem>
                  <SelectItem value="Nickel">Nickel</SelectItem>
                  <SelectItem value="Copper">Copper</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="form">Product Form</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select form" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="concentrate">Concentrate</SelectItem>
                <SelectItem value="dore">Doré</SelectItem>
                <SelectItem value="cathode">Cathode</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Grade & Quality Parameters">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="grade">Average Grade*</Label>
            <Input 
              id="grade" 
              placeholder="e.g. 6.0% Li2O" 
              value={listingData.offtakeDetails?.grade || ''}
              onChange={(e) => updateNestedField('offtakeDetails', 'grade', e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity (Mt)*</Label>
            <Input 
              id="quantity" 
              placeholder="e.g. 50,000 tpa" 
              value={listingData.offtakeDetails?.quantity || ''}
              onChange={(e) => updateNestedField('offtakeDetails', 'quantity', e.target.value)}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Intention">
        <div className="grid gap-2">
          <Label>Intention*</Label>
          <div className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed w-fit">
            <Lock className="h-4 w-4" />
            <span className="font-medium text-sm">Product Sale Only</span>
          </div>
          <p className="text-xs text-slate-500">Offtake listings are locked to Product Sale intention.</p>
        </div>
      </SectionCard>

      <SectionCard title="Product Description">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="summary">Product Description*</Label>
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={() => updateField('summary', "This high-grade project offers significant potential...")}>
              <FileText className="h-3 w-3" /> Insert Template
            </Button>
          </div>
          <textarea 
            className="min-h-[150px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-sans"
            placeholder="Describe the opportunity, key highlights, and strategic value..."
            value={listingData.summary || ''}
            onChange={(e) => updateField('summary', e.target.value)}
          />
        </div>
      </SectionCard>

      <SectionCard title="Product Visuals & Specs">
        <div className="space-y-6">
          <UploadDropzone 
            label="Product Image*" 
            helperText="Upload a high-quality hero image (JPG, PNG)"
            accept="image/*"
            onUpload={(files) => {
              // Mock image upload
              updateField('image', URL.createObjectURL(files[0]));
            }}
          />
          <UploadDropzone 
            label="Mine Location Maps / Logistics Maps" 
            helperText="Upload location maps (PDF, JPG, PNG)"
            multiple
          />
        </div>
      </SectionCard>

      <SectionCard title="Contract Supporting Documents">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UploadDropzone label="Metallurgical Testwork" className="min-h-[120px]" />
          <UploadDropzone label="Transport Agreements" className="min-h-[120px]" />
          <UploadDropzone label="Environmental Approvals" className="min-h-[120px]" />
          <UploadDropzone label="Site Photos" className="min-h-[120px]" />
          <UploadDropzone label="Product Specsheets" className="min-h-[120px]" />
          <UploadDropzone label="Additional Imagery" className="min-h-[120px]" />
        </div>
      </SectionCard>

      <SectionCard title="Payment & Financial Terms">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Payment & Financial Terms Summary</Label>
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
              <FileText className="h-3 w-3" /> Insert Template
            </Button>
          </div>
          <textarea 
            className="min-h-[120px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Outline proposed payment terms, incoterms, and financial structures..."
          />
        </div>
      </SectionCard>

      <SectionCard title="Producer / Seller Information">
        <div className="space-y-6">
          <div className="space-y-3">
            <Label>Company Status*</Label>
            <RadioGroup defaultValue="private" className="flex gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public" className="font-normal cursor-pointer">Public Company</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="private" />
                <Label htmlFor="private" className="font-normal cursor-pointer">Private Company</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="operator">Producer Name*</Label>
            <Input id="operator" placeholder="e.g. Acme Mining Corp" />
          </div>

          <div className="flex items-center justify-between border p-4 rounded-lg bg-slate-50">
            <div className="space-y-0.5">
              <Label className="text-base">Hide Producer Info?</Label>
              <p className="text-xs text-slate-500">Keep seller identity confidential until NDA is signed.</p>
            </div>
            <Switch />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="ownership">Ownership Structure*</Label>
            <Input id="ownership" placeholder="e.g. 90% Acme Corp / 10% Local Partner" />
          </div>
        </div>
      </SectionCard>

      <div className="flex justify-end pt-4">
        <Button onClick={() => navigate('/list/offtake/step/2')} className="gap-2 bg-brand-orange hover:bg-brand-orange/90 h-12 px-8 text-lg">
          Next Step <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
