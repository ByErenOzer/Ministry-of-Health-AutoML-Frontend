"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Settings, ArrowRight } from "lucide-react";
import type { MLProblemType } from "@/app/machine-learning/page";

interface DataPreprocessingProps {
  problemType: MLProblemType | null;
  onNext: () => void;
}

export function DataPreprocessing({ problemType, onNext }: DataPreprocessingProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Veri Temizleme</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Eksik Veri İşleme</label>
              <p className="text-sm text-muted-foreground">Eksik değerleri doldur</p>
            </div>
            <Select defaultValue="mean">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mean">Ortalama ile Doldur</SelectItem>
                <SelectItem value="median">Medyan ile Doldur</SelectItem>
                <SelectItem value="mode">Mod ile Doldur</SelectItem>
                <SelectItem value="remove">Satırı Sil</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Aykırı Değer Tespiti</label>
              <p className="text-sm text-muted-foreground">Anormal değerleri belirle</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Veri Doğrulama</label>
              <p className="text-sm text-muted-foreground">Değer aralıklarını kontrol et</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Veri Dönüşümleri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Normalizasyon</label>
              <p className="text-sm text-muted-foreground">Değerleri 0-1 aralığına getir</p>
            </div>
            <Select defaultValue="minmax">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minmax">Min-Max</SelectItem>
                <SelectItem value="zscore">Z-Score</SelectItem>
                <SelectItem value="robust">Robust</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Kategorik Kodlama</label>
              <p className="text-sm text-muted-foreground">Metin değerleri sayısallaştır</p>
            </div>
            <Select defaultValue="onehot">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="onehot">One-Hot Encoding</SelectItem>
                <SelectItem value="label">Label Encoding</SelectItem>
                <SelectItem value="target">Target Encoding</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Ölçeklendirme</label>
              <p className="text-sm text-muted-foreground">Değer aralıklarını düzenle</p>
            </div>
            <Select defaultValue="standard">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standart</SelectItem>
                <SelectItem value="log">Logaritmik</SelectItem>
                <SelectItem value="power">Üstel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="md:col-span-2">
        <Button className="w-full" onClick={onNext}>
          İleri <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}