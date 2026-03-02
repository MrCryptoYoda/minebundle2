import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pickaxe, Zap, Map, DollarSign, Package, ArrowRight } from 'lucide-react';

const LISTING_TYPES = [
  {
    id: 'mining-project',
    title: 'Mining Project',
    description: 'List an exploration, development, or operating mine project.',
    icon: Pickaxe,
    path: '/list/mining-project/step/1',
  },
  {
    id: 'renewable-asset',
    title: 'Renewable Asset',
    description: 'List solar, wind, or other renewable energy infrastructure.',
    icon: Zap,
    path: '/list/renewable-asset/step/1',
  },
  {
    id: 'claim',
    title: 'Claim',
    description: 'List individual mining claims or tenements.',
    icon: Map,
    path: '/list/claim/step/1',
  },
  {
    id: 'royalty-asset',
    title: 'Royalty Asset',
    description: 'List a royalty stream or interest in a project.',
    icon: DollarSign,
    path: '/list/royalty-asset/step/1',
  },
  {
    id: 'offtake',
    title: 'Offtake Listing',
    description: 'List product offtake for sale (Concentrate, Doré, etc.).',
    icon: Package,
    path: '/list/offtake/step/1',
    isNew: true,
  },
];

export default function ListPickerPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">List an Asset</h1>
        <p className="mt-4 text-lg text-slate-600">
          Choose what you want to list. You can save drafts and finish later.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {LISTING_TYPES.map((type) => (
          <Link key={type.id} to={type.path} className="group block h-full">
            <Card className="h-full border-slate-200 hover:border-brand-orange/50 hover:shadow-md transition-all duration-300 relative overflow-hidden">
              {type.isNew && (
                <div className="absolute top-3 right-3 bg-brand-orange text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                  New
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-orange/10 transition-colors">
                  <type.icon className="h-6 w-6 text-slate-600 group-hover:text-brand-orange transition-colors" />
                </div>
                <CardTitle className="text-xl font-semibold text-slate-900 group-hover:text-brand-orange transition-colors">
                  {type.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 mb-6 min-h-[48px]">{type.description}</p>
                <Button variant="outline" className="w-full group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange transition-all">
                  Start Listing <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
