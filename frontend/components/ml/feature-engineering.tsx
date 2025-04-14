"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { GitBranch, ArrowRight } from "lucide-react";
import type { MLProblemType } from "@/app/machine-learning/page";

interface FeatureEngineeringProps {
  problemType: MLProblemType | null;
  onNext: () => void;
}

export function FeatureEngineering({ problemType, onNext }: FeatureEngineeringProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Özellik Seçimi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Özellik Önem Analizi</label>
              <p className="text-sm text-muted-foreground">En etkili özellikleri belirle</p>
            </div>
            <Select defaultValue="correlation">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="correlation">Korelasyon Analizi</SelectItem>
                <SelectItem value="chi2">Chi-Square Test</SelectItem>
                <SelectItem value="mutual_info">Mutual Information</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Boyut İndirgeme</label>
              <p className="text-sm text-muted-foreground">Özellik sayısını azalt</p>
            </div>
            <Select defaultValue="none">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Kullanma</SelectItem>
                <SelectItem value="pca">PCA</SelectItem>
                <SelectItem value="lda">LDA</SelectItem>
                <SelectItem value="tsne">t-SNE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Özellik Filtreleme</label>
              <p className="text-sm text-muted-foreground">Düşük önemli özellikleri kaldır</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Özellik Türetme</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Polinomial Özellikler</label>
              <p className="text-sm text-muted-foreground">Özellik kombinasyonları oluştur</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">İstatistiksel Özellikler</label>
              <p className="text-sm text-muted-foreground">Ortalama, std vb. hesapla</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Tarih/Zaman Özellikleri</label>
              <p className="text-sm text-muted-foreground">Zaman bazlı özellikler çıkar</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Özel Sağlık Metrikleri</label>
              <p className="text-sm text-muted-foreground">BMI, yaş grupları vb.</p>
            </div>
            <Switch />
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