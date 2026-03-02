import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, ChevronRight, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PreviewPanel } from '@/components/wizard/PreviewPanel';
import { Listing } from '@/data/mockData';

const STEPS = [
  { id: 1, label: 'Property Details' },
  { id: 2, label: 'Resource & Availability' },
  { id: 3, label: 'Review & Publish' },
];

export default function ListingWizardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const pathSegments = currentPath.split('/');
  const typeSlug = pathSegments[2] || 'offtake';
  const currentStep = parseInt(pathSegments[4] || '1');

  const getTitleFromSlug = (slug: string) => {
    switch(slug) {
      case 'mining-project': return 'Mining Project';
      case 'renewable-asset': return 'Renewable Asset';
      case 'claim': return 'Claim';
      case 'royalty-asset': return 'Royalty Asset';
      case 'offtake': return 'Offtake Listing';
      default: return 'Listing';
    }
  };

  const listingType = getTitleFromSlug(typeSlug);

  const [listingData, setListingData] = useState<Partial<Listing>>({
    type: listingType,
    stage: 'Production',
  });
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [missingItems, setMissingItems] = useState<string[]>([]);

  // Mock auto-save
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDraftSaved(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [listingData]);

  useEffect(() => {
    const items: string[] = [];
    if (!listingData.title) items.push('Project Title');
    if (!listingData.location?.region) items.push('Location');
    if (!listingData.commodity?.length) items.push('Commodity');
    if (!listingData.summary) items.push('Project Summary');
    if (!listingData.image) items.push('Listing Image');
    
    setMissingItems(items);
  }, [listingData]);

  const handleSaveDraft = () => {
    setIsDraftSaved(true);
    alert("Draft saved successfully!");
  };

  const handlePublish = () => {
    alert("Listing published! Redirecting to listing page...");
    navigate('/listing/lst_003');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Wizard Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/app/dashboard" className="font-bold text-lg text-slate-900">The Minexchange</Link>
            <span className="text-slate-300">|</span>
            <span className="font-medium text-slate-600">List an Asset: {listingType}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-slate-400 font-medium hidden sm:block">
              {isDraftSaved ? "Saved as draft" : "Saving..."}
            </div>
            <Button variant="ghost" onClick={handleSaveDraft} className="hidden sm:flex gap-2">
              <Save className="h-4 w-4" /> Save Draft
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate('/app/dashboard')}>
              <span className="sr-only">Close</span>
              <span className="text-2xl text-slate-400 hover:text-slate-600">×</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-10">
          {/* Stepper */}
          <nav aria-label="Progress">
            <ol role="list" className="flex items-center w-full">
              {STEPS.map((step, stepIdx) => (
                <li key={step.label} className={cn(stepIdx !== STEPS.length - 1 ? 'flex-1' : '', 'relative flex items-center')}>
                  <div className="relative flex flex-col items-center group">
                    <div className="flex items-center">
                      {step.id < currentStep ? (
                        <Link
                          to={`/list/${typeSlug}/step/${step.id}`}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange hover:bg-brand-orange/90 transition-colors"
                        >
                          <CheckCircle className="h-5 w-5 text-white" aria-hidden="true" />
                          <span className="sr-only">{step.label}</span>
                        </Link>
                      ) : step.id === currentStep ? (
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-orange bg-white"
                          aria-current="step"
                        >
                          <span className="h-2.5 w-2.5 rounded-full bg-brand-orange" aria-hidden="true" />
                          <span className="sr-only">{step.label}</span>
                        </div>
                      ) : (
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-300 bg-white"
                        >
                          <span className="h-2.5 w-2.5 rounded-full bg-transparent" aria-hidden="true" />
                          <span className="sr-only">{step.label}</span>
                        </div>
                      )}
                    </div>
                    <span className="absolute -bottom-6 text-xs font-medium text-slate-500 whitespace-nowrap">
                      {step.label}
                    </span>
                  </div>
                  
                  {stepIdx !== STEPS.length - 1 && (
                    <div className={cn("flex-1 h-0.5 mx-4", step.id < currentStep ? "bg-brand-orange" : "bg-slate-200")} />
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-12">
            <Outlet context={{ listingData, setListingData }} />
          </div>
        </div>

        {/* Preview Panel */}
        <div className="hidden lg:block">
          <PreviewPanel 
            listing={listingData} 
            step={currentStep}
            onPreview={() => alert("Preview modal would open here")}
            onSaveDraft={handleSaveDraft}
            onPublish={handlePublish}
            isPublishEnabled={currentStep === 3} // Simplified logic
            missingItems={missingItems}
          />
        </div>
      </div>
    </div>
  );
}
