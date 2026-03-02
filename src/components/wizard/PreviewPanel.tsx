import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Listing } from '@/data/mockData';

interface PreviewPanelProps {
  listing: Partial<Listing>;
  step: number;
  onPreview: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  isPublishEnabled: boolean;
  missingItems: string[];
}

export function PreviewPanel({ listing, step, onPreview, onSaveDraft, onPublish, isPublishEnabled, missingItems }: PreviewPanelProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simple mock progress calculation
    let score = 0;
    if (listing.title) score += 10;
    if (listing.location?.region) score += 10;
    if (listing.commodity?.length) score += 10;
    if (listing.stage) score += 10;
    if (listing.price?.amount) score += 10;
    if (listing.summary) score += 10;
    if (listing.image) score += 10;
    if (listing.highlights?.length) score += 10;
    if (step > 1) score += 20;

    setProgress(Math.min(score, 100));
  }, [listing, step]);

  return (
    <div className="space-y-6 sticky top-24 h-fit">
      {/* Video Tile */}
      <Card className="bg-slate-50 border-slate-200 overflow-hidden">
        <div className="aspect-video bg-slate-200 flex items-center justify-center text-slate-400 relative group cursor-pointer">
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
          <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg z-10 group-hover:scale-110 transition-transform">
            <div className="border-l-[12px] border-l-slate-800 border-y-[8px] border-y-transparent ml-1" />
          </div>
          <span className="absolute bottom-3 left-3 text-xs font-medium text-white bg-black/60 px-2 py-1 rounded">
            Watch Demo
          </span>
        </div>
      </Card>

      {/* Listing Summary */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-100 p-4">
          <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Listing Preview</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="flex gap-3">
            <div className="h-16 w-16 bg-slate-100 rounded-lg shrink-0 overflow-hidden border border-slate-200">
              {listing.image ? (
                <img src={listing.image} alt="Thumbnail" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">No Img</div>
              )}
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-slate-900 text-sm truncate">{listing.title || 'Untitled Listing'}</h4>
              <p className="text-xs text-slate-500 mt-1 truncate">{listing.location?.region || 'Location pending'}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded border border-slate-200">
                  {listing.type || 'Type'}
                </span>
                <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded border border-slate-200">
                  {listing.stage || 'Stage'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Score */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-slate-900">Listing Strength</h3>
            <span className={cn("font-bold", progress === 100 ? "text-emerald-500" : "text-brand-orange")}>{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden">
            <div 
              className={cn("h-full transition-all duration-500 ease-out rounded-full", progress === 100 ? "bg-emerald-500" : "bg-brand-orange")} 
              style={{ width: `${progress}%` }} 
            />
          </div>
          
          {missingItems.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">What's Missing</p>
              <ul className="text-sm space-y-2 text-slate-500">
                {missingItems.slice(0, 3).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600 text-xs">
                    <Circle className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
                {missingItems.length > 3 && (
                  <li className="text-xs text-slate-400 pl-5">
                    + {missingItems.length - 3} more items
                  </li>
                )}
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium bg-emerald-50 p-3 rounded-lg border border-emerald-100">
              <CheckCircle className="h-4 w-4" />
              Ready to publish!
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="space-y-3">
        <Button variant="outline" className="w-full" onClick={onPreview}>
          Preview Listing
        </Button>
        <Button variant="ghost" className="w-full text-slate-500 hover:text-slate-700" onClick={onSaveDraft}>
          Save as Draft
        </Button>
        {step === 3 && (
          <Button 
            className="w-full bg-brand-orange hover:bg-brand-orange/90" 
            disabled={!isPublishEnabled}
            onClick={onPublish}
          >
            Publish Listing
          </Button>
        )}
      </div>
    </div>
  );
}
