import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { SectionCard } from '@/components/wizard/SectionCard';
import { UploadDropzone } from '@/components/wizard/UploadDropzone';
import { Listing } from '@/data/mockData';

interface WizardContext {
  listingData: Partial<Listing>;
  setListingData: React.Dispatch<React.SetStateAction<Partial<Listing>>>;
}

export default function Step2Offtake() {
  const navigate = useNavigate();
  const { listingData, setListingData } = useOutletContext<WizardContext>();

  const updateField = (field: keyof Listing, value: any) => {
    setListingData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Product Availability & Specs</h2>
        <p className="text-slate-500">Provide details about product specifications and availability.</p>
      </div>

      <SectionCard title="Source Validation (Resource/Reserve)">
        <div className="space-y-8">
          <div className="space-y-3">
            <Label>JORC or NI43-101 compliant?*</Label>
            <RadioGroup defaultValue="jorc" className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="jorc" id="jorc" />
                <Label htmlFor="jorc" className="font-normal cursor-pointer">JORC Compliant Resource</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="43-101" id="43-101" />
                <Label htmlFor="43-101" className="font-normal cursor-pointer">43-101 (PEA)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="na" id="na" />
                <Label htmlFor="na" className="font-normal cursor-pointer">N/A</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Additional Source Info*</Label>
            <RadioGroup defaultValue="pfs" className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pfs" id="pfs" />
                <Label htmlFor="pfs" className="font-normal cursor-pointer">PFS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="scoping" id="scoping" />
                <Label htmlFor="scoping" className="font-normal cursor-pointer">Scoping Study</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bfs" id="bfs" />
                <Label htmlFor="bfs" className="font-normal cursor-pointer">Bank Feasibility Study</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pea" id="pea" />
                <Label htmlFor="pea" className="font-normal cursor-pointer">PEA</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dfs" id="dfs" />
                <Label htmlFor="dfs" className="font-normal cursor-pointer">DFS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="na-res" id="na-res" />
                <Label htmlFor="na-res" className="font-normal cursor-pointer">N/A</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Availability">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="tonnage">Available Tonnage and Volume</Label>
            <Input id="tonnage" placeholder="e.g. 100,000 tonnes per annum" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="grade-avail">Available Grade</Label>
            <Input id="grade-avail" placeholder="e.g. 5.5% - 6.0%" />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Product / Corporate Presentation">
        <UploadDropzone 
          label="Upload Presentation or Information Memorandum" 
          helperText="Upload PDF or PPTX files"
          accept=".pdf,.ppt,.pptx"
        />
      </SectionCard>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => navigate('/list/offtake/step/1')} className="gap-2 h-12 px-6">
          <ChevronLeft className="h-4 w-4" /> Previous Step
        </Button>
        <Button onClick={() => navigate('/list/offtake/step/3')} className="gap-2 bg-brand-orange hover:bg-brand-orange/90 h-12 px-8 text-lg">
          Next Step <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
