"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const models = [
  {
    id: "resnet50",
    name: "ResNet50",
    description: "Derin artık öğrenme ağı, görüntü sınıflandırma için ideal",
    type: "vision"
  },
  {
    id: "efficientnet",
    name: "EfficientNet-B0",
    description: "Verimli ve ölçeklenebilir CNN mimarisi",
    type: "vision"
  },
  {
    id: "inception",
    name: "Inception-v3",
    description: "Çoklu ölçek özellik çıkarımı için optimize edilmiş",
    type: "vision"
  },
  {
    id: "densenet",
    name: "DenseNet121",
    description: "Yoğun bağlantılı evrişimli ağ",
    type: "vision"
  },
  {
    id: "vgg16",
    name: "VGG16",
    description: "Klasik ve güvenilir CNN mimarisi",
    type: "vision"
  }
];

interface ModelSelectionProps {
  onSelect: (modelId: string) => void;
}

export function ModelSelection({ onSelect }: ModelSelectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          Model Seçimi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((model) => (
            <Card key={model.id} className="cursor-pointer hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="text-lg">{model.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{model.description}</p>
                <Button 
                  className="w-full"
                  onClick={() => onSelect(model.id)}
                >
                  Seç
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}