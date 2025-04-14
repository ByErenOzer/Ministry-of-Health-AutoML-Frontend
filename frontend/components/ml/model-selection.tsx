"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Bot, ArrowRight } from "lucide-react";
import type { MLProblemType } from "@/app/machine-learning/page";

interface ModelSelectionProps {
  problemType: MLProblemType | null;
  onNext: () => void;
}

const MODEL_OPTIONS = {
  classification: [
    { id: "rf", name: "Random Forest", description: "Çoklu karar ağaçları ile sınıflandırma" },
    { id: "svm", name: "Support Vector Machine", description: "Yüksek boyutlu verilerde etkili" },
    { id: "xgb", name: "XGBoost", description: "Gradyan artırma ile yüksek performans" },
    { id: "lgbm", name: "LightGBM", description: "Hızlı ve hafif gradyan artırma" }
  ],
  regression: [
    { id: "linear", name: "Linear Regression", description: "Basit ve yorumlanabilir model" },
    { id: "rf_reg", name: "Random Forest", description: "Karmaşık ilişkiler için uygun" },
    { id: "xgb_reg", name: "XGBoost", description: "Yüksek tahmin performansı" },
    { id: "elastic", name: "Elastic Net", description: "Regularizasyon ile dengeli model" }
  ],
  clustering: [
    { id: "kmeans", name: "K-Means", description: "Hızlı ve basit kümeleme" },
    { id: "hierarchical", name: "Hierarchical", description: "Hiyerarşik grup yapısı" },
    { id: "dbscan", name: "DBSCAN", description: "Yoğunluk bazlı kümeleme" },
    { id: "gmm", name: "Gaussian Mixture", description: "Olasılıksal kümeleme" }
  ],
  anomaly: [
    { id: "isolation", name: "Isolation Forest", description: "Hızlı anomali tespiti" },
    { id: "lof", name: "Local Outlier Factor", description: "Yerel yoğunluk bazlı" },
    { id: "ocsvm", name: "One-Class SVM", description: "Tek sınıf anomali tespiti" },
    { id: "autoencoder", name: "Autoencoder", description: "Derin öğrenme bazlı tespit" }
  ]
};

export function ModelSelection({ problemType, onNext }: ModelSelectionProps) {
  const models = problemType ? MODEL_OPTIONS[problemType] : [];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {models.map((model) => (
          <Card key={model.id} className="relative group hover:shadow-lg transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                {model.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{model.description}</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hiperparametre Optimizasyonu</label>
                  <Select defaultValue="grid">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Grid Search</SelectItem>
                      <SelectItem value="random">Random Search</SelectItem>
                      <SelectItem value="bayesian">Bayesian Optimization</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Cross Validation</label>
                  <Select defaultValue="5">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3-Fold</SelectItem>
                      <SelectItem value="5">5-Fold</SelectItem>
                      <SelectItem value="10">10-Fold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">Modeli Seç</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button className="w-full" onClick={onNext}>
        İleri <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}