import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SectionCard } from '@/components/wizard/SectionCard';
import { Listing } from '@/data/mockData';

interface WizardContext {
  listingData: Partial<Listing>;
  setListingData: React.Dispatch<React.SetStateAction<Partial<Listing>>>;
}

export default function Step2General() {
  const navigate = useNavigate();
  const { listingData, setListingData } = useOutletContext<WizardContext>();

  const updateField = (field: keyof Listing, value: any) => {
    setListingData(prev => ({ ...prev, [field]: value }));
  };

  // Determine next path based on current URL
  const currentPath = window.location.pathname;
  const typeSlug = currentPath.split('/')[2];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <Button variant="ghost" onClick={() => navigate(`/list/${typeSlug}/step/1`)} className="mb-4 pl-0 hover:bg-transparent hover:text-brand-orange">
          ← Back
        </Button>
        <div className="flex justify-between items-start">
          <div>
            <span className="text-brand-orange font-medium text-sm">Step 2 of 3</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">Tell us more about the Project</h2>
            <p className="text-xs text-slate-500 mt-1">*Indicates required fields</p>
          </div>
        </div>
      </div>

      {/* Resource or Reserve Details */}
      <SectionCard title="Resource or Reserve Details *">
        <div className="space-y-6">
          <div className="space-y-3">
            <Label>Is the project compliant with JORC or NI43-101 code? *</Label>
            <RadioGroup 
              value={listingData.jorcCompliant} 
              onValueChange={(val) => updateField('jorcCompliant', val)}
              className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="JORC Compliant Resource" id="jorc-yes" />
                <Label htmlFor="jorc-yes">JORC Compliant Resource</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="43-101 (PEA)" id="jorc-pea" />
                <Label htmlFor="jorc-pea">43-101 (PEA)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="N/A" id="jorc-na" />
                <Label htmlFor="jorc-na">N\A</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Would you like to upload a documental file? *</Label>
            <RadioGroup 
              value={listingData.uploadDocumentalFile ? 'yes' : 'no'} 
              onValueChange={(val) => updateField('uploadDocumentalFile', val === 'yes')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="upload-doc-yes" />
                <Label htmlFor="upload-doc-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="upload-doc-no" />
                <Label htmlFor="upload-doc-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Additional Resource Information *</Label>
            <RadioGroup 
              value={listingData.additionalResourceInfo} 
              onValueChange={(val) => updateField('additionalResourceInfo', val)}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              {[
                'Preliminary Feasibility Study (PFS)', 
                'Preliminary Economic Assetment (PEA)', 
                'Definitive Feasibility Study (DFS)', 
                'Scoping Study', 
                'Bank Feasibility Study', 
                'N/A'
              ].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <RadioGroupItem value={item} id={`info-${item}`} />
                  <Label htmlFor={`info-${item}`}>{item}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Would you like to upload supporting documentation? *</Label>
            <RadioGroup 
              value={listingData.uploadSupportingDoc ? 'yes' : 'no'} 
              onValueChange={(val) => updateField('uploadSupportingDoc', val === 'yes')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="support-doc-yes" />
                <Label htmlFor="support-doc-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="support-doc-no" />
                <Label htmlFor="support-doc-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Tonnage and Volume *</Label>
            <RadioGroup 
              value={listingData.tonnageVolume ? 'yes' : 'no'} 
              onValueChange={(val) => updateField('tonnageVolume', val === 'yes')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="tonnage-yes" />
                <Label htmlFor="tonnage-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="tonnage-no" />
                <Label htmlFor="tonnage-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Resource and contained grade *</Label>
            <RadioGroup 
              value={listingData.resourceContainedGrade ? 'yes' : 'no'} 
              onValueChange={(val) => updateField('resourceContainedGrade', val === 'yes')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="grade-yes" />
                <Label htmlFor="grade-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="grade-no" />
                <Label htmlFor="grade-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </SectionCard>

      {/* Additional Geological Information */}
      <SectionCard title="Additional Geological Information *">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Size of area</Label>
            <div className="flex gap-4">
              <Input 
                placeholder="Eg. 30km²" 
                value={listingData.sizeOfArea || ''}
                onChange={(e) => updateField('sizeOfArea', e.target.value)}
                className="bg-slate-50 flex-1"
              />
              <Select>
                <SelectTrigger className="w-[200px] bg-slate-50">
                  <SelectValue placeholder="Select unit of measurement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="km2">Square Kilometers (km²)</SelectItem>
                  <SelectItem value="hectares">Hectares (ha)</SelectItem>
                  <SelectItem value="acres">Acres</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Number of Claims / Tenements *</Label>
            <RadioGroup 
              value={listingData.numberOfClaims ? 'yes' : 'no'} 
              onValueChange={(val) => updateField('numberOfClaims', val === 'yes')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="claims-yes" />
                <Label htmlFor="claims-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="claims-no" />
                <Label htmlFor="claims-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Drilling Permits / Drill ready *</Label>
            <RadioGroup 
              value={listingData.drillingPermits ? 'yes' : 'no'} 
              onValueChange={(val) => updateField('drillingPermits', val === 'yes')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="permits-yes" />
                <Label htmlFor="permits-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="permits-no" />
                <Label htmlFor="permits-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </SectionCard>

      {/* Project Presentation */}
      <SectionCard title="Project Presentation *">
        <div className="space-y-6">
          <div className="space-y-3">
            <Label>Upload Presentation or Information Memorandum *</Label>
            <RadioGroup 
              value={listingData.uploadPresentation ? 'yes' : 'no'} 
              onValueChange={(val) => updateField('uploadPresentation', val === 'yes')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="presentation-yes" />
                <Label htmlFor="presentation-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="presentation-no" />
                <Label htmlFor="presentation-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Recent Material Public or Private Announcement Made *</Label>
            <RadioGroup 
              value={listingData.recentAnnouncement ? 'yes' : 'no'} 
              onValueChange={(val) => updateField('recentAnnouncement', val === 'yes')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="announcement-yes" />
                <Label htmlFor="announcement-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="announcement-no" />
                <Label htmlFor="announcement-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </SectionCard>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => navigate(`/list/${typeSlug}/step/1`)} className="gap-2 h-12 px-6">
          Back
        </Button>
        <div className="flex gap-4">
          <Button variant="secondary" className="h-12 px-6">
            Preview
          </Button>
          <Button className="h-12 px-6 bg-brand-orange hover:bg-brand-orange/90">
            Publish
          </Button>
          <Button onClick={() => navigate(`/list/${typeSlug}/step/3`)} className="gap-2 bg-slate-900 hover:bg-slate-800 h-12 px-8 text-lg">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
