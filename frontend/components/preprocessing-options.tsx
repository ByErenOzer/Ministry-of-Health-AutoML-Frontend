"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PreprocessingOptionsProps {
  selectedSize: string;
  selectedNormalization: string;
  onSizeSelect: (size: string) => void;
  onNormalizationSelect: (method: string) => void;
}

export function PreprocessingOptions({
  selectedSize,
  selectedNormalization,
  onSizeSelect,
  onNormalizationSelect,
}: PreprocessingOptionsProps) {
  // Veri oranları için state'ler
  const [trainRatio, setTrainRatio] = useState(70);
  const [testRatio, setTestRatio] = useState(20);
  const [valRatio, setValRatio] = useState(10);

  // Eğitim oranı değiştiğinde test oranını azalt
  const handleTrainRatioChange = (newTrainRatio: number) => {
    const oldTrainRatio = trainRatio;
    const difference = newTrainRatio - oldTrainRatio;
    
    // Test oranını azalt
    const newTestRatio = testRatio - difference;
    
    if (newTestRatio >= 0 && newTrainRatio + newTestRatio + valRatio <= 100) {
      setTrainRatio(newTrainRatio);
      setTestRatio(newTestRatio);
    }
  };

  // Test oranı değiştiğinde validation oranını azalt
  const handleTestRatioChange = (newTestRatio: number) => {
    const oldTestRatio = testRatio;
    const difference = newTestRatio - oldTestRatio;
    
    // Validation oranını azalt
    const newValRatio = valRatio - difference;
    
    if (newValRatio >= 0 && trainRatio + newTestRatio + newValRatio <= 100) {
      setTestRatio(newTestRatio);
      setValRatio(newValRatio);
    }
  };

  // Validation oranı değiştiğinde test oranını azalt
  const handleValRatioChange = (newValRatio: number) => {
    const oldValRatio = valRatio;
    const difference = newValRatio - oldValRatio;
    
    // Test oranını azalt
    const newTestRatio = testRatio - difference;
    
    if (newTestRatio >= 0 && trainRatio + newTestRatio + newValRatio <= 100) {
      setValRatio(newValRatio);
      setTestRatio(newTestRatio);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <motion.div variants={item} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Boyut Seçimi</Label>
            <Select value={selectedSize} onValueChange={onSizeSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Boyut seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="32">32x32</SelectItem>
                <SelectItem value="64">64x64</SelectItem>
                <SelectItem value="128">128x128</SelectItem>
                <SelectItem value="224">224x224</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Normalizasyon Yöntemi</Label>
            <Select value={selectedNormalization} onValueChange={onNormalizationSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Yöntem seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minmax">Min-Max Normalizasyon</SelectItem>
                <SelectItem value="zscore">Z-Score Normalizasyon</SelectItem>
                <SelectItem value="mean">Mean Normalizasyon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Eğitim Verisi Oranı</Label>
                  <span className="text-sm text-muted-foreground">{trainRatio}%</span>
                </div>
                <Slider
                  value={[trainRatio]}
                  onValueChange={(value) => handleTrainRatioChange(value[0])}
                  max={90}
                  min={50}
                  step={1}
                  className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label>Test Verisi Oranı</Label>
                  <span className="text-sm text-muted-foreground">{testRatio}%</span>
                </div>
                <Slider
                  value={[testRatio]}
                  onValueChange={(value) => handleTestRatioChange(value[0])}
                  max={30}
                  min={0}
                  step={1}
                  className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label>Doğrulama Verisi Oranı</Label>
                  <span className="text-sm text-muted-foreground">{valRatio}%</span>
                </div>
                <Slider
                  value={[valRatio]}
                  onValueChange={(value) => handleValRatioChange(value[0])}
                  max={30}
                  min={0}
                  step={1}
                  className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                />
              </div>

              <div className="text-sm text-green-500 font-medium text-right">
                Toplam: {trainRatio + valRatio + testRatio}%
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
