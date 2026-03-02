import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import { SectionCard } from '@/components/wizard/SectionCard';
import { Listing } from '@/data/mockData';

interface WizardContext {
  listingData: Partial<Listing>;
  setListingData: React.Dispatch<React.SetStateAction<Partial<Listing>>>;
}

export default function Step3Common() {
  const navigate = useNavigate();
  const { listingData, setListingData } = useOutletContext<WizardContext>();

  // Determine previous path based on current URL
  const currentPath = window.location.pathname;
  const typeSlug = currentPath.split('/')[2];

  const updateField = (field: keyof Listing, value: any) => {
    setListingData(prev => ({ ...prev, [field]: value }));
  };

  const handlePublish = () => {
    // Mock publish action
    alert("Publishing listing...");
    navigate('/listing/lst_003');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Additional Information</h2>
        <p className="text-slate-500">Add final details to complete your listing.</p>
      </div>

      {typeSlug === 'offtake' ? (
        <SectionCard title="Logistics & Delivery">
          <div className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="infrastructure">Logistics Infrastructure (Port, Rail, Road)</Label>
              <textarea 
                className="min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe logistics setup and transport routes..."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="permits">Export Permits / Licenses</Label>
              <Input id="permits" placeholder="e.g. All export permits secured" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="taxes">Royalties / Taxes</Label>
              <Input id="taxes" placeholder="e.g. Standard state royalties apply" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="incoterms">Shipping Terms (Incoterms)</Label>
                <Input id="incoterms" placeholder="e.g. FOB, CIF" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="schedule">Delivery Schedule</Label>
                <Input id="schedule" placeholder="e.g. Monthly shipments starting Q3" />
              </div>
            </div>
          </div>
        </SectionCard>
      ) : (
        <SectionCard title="Infrastructure & Agreements">
          <div className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="infrastructure">Material Infrastructure</Label>
              <textarea 
                className="min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Describe existing infrastructure (power, water, roads)..."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="native-title">Native Title Agreements</Label>
              <Input id="native-title" placeholder="e.g. Agreement in place with..." />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="royalty">Royalty Details</Label>
              <Input id="royalty" placeholder="e.g. 1.5% NSR to previous owner" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="rental-fees">Yearly Rental Fees</Label>
                <Input id="rental-fees" placeholder="e.g. $15,000 AUD" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="paid-status">Paid Status</Label>
                <Input id="paid-status" placeholder="e.g. Paid until Dec 2025" />
              </div>
            </div>
          </div>
        </SectionCard>
      )}

      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 flex items-start gap-4">
        <CheckCircle className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-emerald-900">Ready to Publish?</h4>
          <p className="text-sm text-emerald-700 mt-1">
            Your listing has reached the required quality score. You can publish now or save as a draft to review later.
          </p>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => navigate(`/list/${typeSlug}/step/2`)} className="gap-2 h-12 px-6">
          <ChevronLeft className="h-4 w-4" /> Previous Step
        </Button>
        <Button onClick={handlePublish} className="gap-2 bg-brand-orange hover:bg-brand-orange/90 h-12 px-8 text-lg">
          Publish Listing
        </Button>
      </div>
    </div>
  );
}
