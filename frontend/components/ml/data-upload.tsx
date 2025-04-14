"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database } from "lucide-react";

const SAMPLE_DATASETS = [
  {
    id: "house_price",
    name: "Ev Fiyatları",
    description: "Boston ev fiyatları veri seti",
    type: "regression",
    rows: 506,
    features: 13
  },
  {
    id: "diabetes",
    name: "Diyabet Tahmini",
    description: "Diyabet tahmin veri seti",
    type: "classification",
    rows: 768,
    features: 8
  },
  {
    id: "heart_disease",
    name: "Kalp Hastalığı",
    description: "Kalp hastalığı tahmin veri seti",
    type: "classification",
    rows: 303,
    features: 14
  }
];

interface DataUploadProps {
  onFileSelect: (file: File | null) => void;
  onDatasetSelect: (datasetId: string | null) => void;
  selectedFile: File | null;
  selectedDataset: string | null;
  onNext: () => void;
}

export function DataUpload({
  onFileSelect,
  onDatasetSelect,
  selectedFile,
  selectedDataset,
  onNext
}: DataUploadProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Veri Yükleme</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUpload 
            onFileSelect={onFileSelect}
            accept=".csv,.xlsx"
            buttonText="CSV veya Excel Dosyası Seç"
            description="veya dosyayı bu alana sürükleyin"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Örnek Veri Setleri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Veri Seti</TableHead>
                <TableHead>Tip</TableHead>
                <TableHead>Özellikler</TableHead>
                <TableHead>İşlem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SAMPLE_DATASETS.map((dataset) => (
                <TableRow key={dataset.id}>
                  <TableCell>
                    <div className="font-medium">{dataset.name}</div>
                    <div className="text-sm text-muted-foreground">{dataset.description}</div>
                  </TableCell>
                  <TableCell>{dataset.type}</TableCell>
                  <TableCell>{dataset.features}</TableCell>
                  <TableCell>
                    <Button
                      variant={selectedDataset === dataset.id ? "default" : "outline"}
                      onClick={() => {
                        onDatasetSelect(dataset.id);
                        onFileSelect(null);
                      }}
                    >
                      Seç
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="md:col-span-2">
        <Button 
          className="w-full" 
          disabled={!selectedFile && !selectedDataset}
          onClick={onNext}
        >
          İleri
        </Button>
      </div>
    </div>
  );
}