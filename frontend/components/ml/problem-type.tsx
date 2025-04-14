"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Boxes, AlertTriangle } from "lucide-react";
import type { MLProblemType } from "@/app/machine-learning/page";

const PROBLEM_TYPES = [
  {
    id: "classification",
    name: "Sınıflandırma",
    description: "Veriyi önceden belirlenmiş kategorilere ayırma",
    icon: Brain,
    examples: ["Hastalık teşhisi", "Risk sınıflandırma", "Hasta kategorilendirme"]
  },
  {
    id: "regression",
    name: "Regresyon",
    description: "Sürekli değer tahminleme",
    icon: TrendingUp,
    examples: ["İlaç dozaj tahmini", "Tedavi süresi tahmini", "Maliyet tahmini"]
  },
  {
    id: "clustering",
    name: "Kümeleme",
    description: "Benzer özellikteki verileri gruplama",
    icon: Boxes,
    examples: ["Hasta gruplandırma", "Semptom analizi", "Tedavi grupları"]
  },
  {
    id: "anomaly",
    name: "Anomali Tespiti",
    description: "Normal dışı durumları belirleme",
    icon: AlertTriangle,
    examples: ["Anormal test sonuçları", "Beklenmeyen yan etkiler", "Risk tespiti"]
  }
];

interface ProblemTypeProps {
  onSelect: (type: MLProblemType) => void;
  selected: MLProblemType | null;
  onNext: () => void;
}

export function ProblemType({ onSelect, selected, onNext }: ProblemTypeProps) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROBLEM_TYPES.map((type) => {
          const Icon = type.icon;
          return (
            <Card 
              key={type.id}
              className={`cursor-pointer transition-all ${
                selected === type.id ? 'ring-2 ring-primary' : 'hover:shadow-lg'
              }`}
              onClick={() => onSelect(type.id as MLProblemType)}
            >
              <CardHeader>
                <Icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">{type.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                <ul className="text-sm space-y-1">
                  {type.examples.map((example, i) => (
                    <li key={i} className="text-muted-foreground">• {example}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Button 
        className="w-full" 
        disabled={!selected}
        onClick={onNext}
      >
        İleri
      </Button>
    </div>
  );
}