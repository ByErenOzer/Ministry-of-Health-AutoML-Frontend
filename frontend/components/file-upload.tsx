"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileType } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  buttonText?: string;
  description?: string;
}

export function FileUpload({
  onFileSelect,
  accept = ".csv",
  buttonText = "Dosya Seç",
  description = "veya dosyayı bu alana sürükleyin"
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    onFileSelect(file);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
        <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
        <div>
          <Button variant="secondary" className="mx-auto" onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = accept;
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) handleFileSelect(file);
            };
            input.click();
          }}>
            {buttonText}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      {selectedFile && (
        <div className="flex items-center gap-2 text-sm">
          <FileType className="h-4 w-4" />
          <span>{selectedFile.name}</span>
        </div>
      )}
    </div>
  );
}