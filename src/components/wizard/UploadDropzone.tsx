import React, { useState } from 'react';
import { UploadCloud, FileText, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UploadDropzoneProps {
  label: string;
  accept?: string;
  multiple?: boolean;
  onUpload?: (files: File[]) => void;
  className?: string;
  helperText?: string;
}

export function UploadDropzone({ label, accept, multiple, onUpload, className, helperText }: UploadDropzoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files) as File[];
    if (droppedFiles.length > 0) {
      setFiles(prev => multiple ? [...prev, ...droppedFiles] : [droppedFiles[0]]);
      onUpload?.(droppedFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files) as File[];
      setFiles(prev => multiple ? [...prev, ...selectedFiles] : [selectedFiles[0]]);
      onUpload?.(selectedFiles);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-5 transition-colors cursor-pointer flex flex-col items-center justify-center text-center min-h-[140px]",
          isDragging ? "border-brand-orange bg-brand-orange/5" : "border-slate-200 hover:border-brand-orange/50 hover:bg-slate-50",
          files.length > 0 && !multiple ? "border-emerald-500 bg-emerald-50/30" : ""
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById(`file-upload-${label}`)?.click()}
      >
        <input
          id={`file-upload-${label}`}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
        />
        
        <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-white transition-colors">
          <UploadCloud className={cn("h-5 w-5 text-slate-400", isDragging && "text-brand-orange")} />
        </div>
        
        <h4 className="font-medium text-slate-900">{label}</h4>
        <p className="text-sm text-slate-500 mt-1 max-w-xs">
          {helperText || "Drag & drop files here, or click to select"}
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="h-8 w-8 bg-emerald-100 rounded-md flex items-center justify-center shrink-0">
                  <FileText className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                  <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeFile(index)} className="h-8 w-8 text-slate-400 hover:text-red-500">
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
