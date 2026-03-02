import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({ title, description, children, className }: SectionCardProps) {
  return (
    <Card className={cn("border-slate-200 shadow-sm overflow-hidden bg-white", className)}>
      <CardHeader className="bg-white border-b border-slate-100 px-5 py-4">
        <CardTitle className="text-lg font-semibold text-slate-900">{title}</CardTitle>
        {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
      </CardHeader>
      <CardContent className="p-5">
        {children}
      </CardContent>
    </Card>
  );
}
