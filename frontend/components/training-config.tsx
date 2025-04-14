"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TrainingConfigProps {
  onNext?: () => void;
}

const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

export function TrainingConfig({ onNext }: TrainingConfigProps) {
  const [regularization, setRegularization] = useState({
    dropout: false,
    l2: false,
    earlyStopping: false,
    lrReduction: false
  });

  const handleRegularizationChange = (type: string, checked: boolean) => {
    setRegularization(prev => ({
      ...prev,
      [type]: checked
    }));
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <motion.div variants={formVariants} initial="hidden" animate="visible">
        <Card>
          <CardHeader>
            <CardTitle>Eğitim Parametreleri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.div variants={itemVariants}>
              <div className="space-y-2">
                <label className="text-sm font-medium">Optimizasyon Algoritması</label>
                <Select defaultValue="adam">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adam">Adam (Önerilen)</SelectItem>
                    <SelectItem value="rmsprop">RMSprop</SelectItem>
                    <SelectItem value="sgd">SGD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="space-y-2">
                <label className="text-sm font-medium">Batch Size</label>
                <Select defaultValue="32">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16">16</SelectItem>
                    <SelectItem value="32">32 (Önerilen)</SelectItem>
                    <SelectItem value="64">64</SelectItem>
                    <SelectItem value="128">128</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="space-y-2">
                <label className="text-sm font-medium">Epoch Sayısı</label>
                <Select defaultValue="50">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50 (Önerilen)</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="200">200</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="space-y-2">
                <label className="text-sm font-medium">Learning Rate</label>
                <Select defaultValue="0.001">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.01">0.01</SelectItem>
                    <SelectItem value="0.001">0.001 (Önerilen)</SelectItem>
                    <SelectItem value="0.0001">0.0001</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={formVariants} initial="hidden" animate="visible">
        <Card>
          <CardHeader>
            <CardTitle>Regularizasyon Teknikleri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.div variants={itemVariants}>
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label htmlFor="dropout" className="text-sm font-medium">Dropout</label>
                      <p className="text-sm text-muted-foreground">
                        Nöronların rastgele devre dışı bırakılması ile aşırı öğrenmeyi önler
                      </p>
                    </div>
                    <Switch id="dropout" checked={regularization.dropout} onCheckedChange={(checked) => handleRegularizationChange('dropout', checked)} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label htmlFor="weightDecay" className="text-sm font-medium">Weight Decay (L2)</label>
                      <p className="text-sm text-muted-foreground">
                        Ağırlıkları küçük tutarak model karmaşıklığını azaltır
                      </p>
                    </div>
                    <Switch id="weightDecay" checked={regularization.l2} onCheckedChange={(checked) => handleRegularizationChange('l2', checked)} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label htmlFor="earlyStopping" className="text-sm font-medium">Early Stopping</label>
                      <p className="text-sm text-muted-foreground">
                        Validasyon kaybı artmaya başladığında eğitimi otomatik durdurur
                      </p>
                    </div>
                    <Switch id="earlyStopping" checked={regularization.earlyStopping} onCheckedChange={(checked) => handleRegularizationChange('earlyStopping', checked)} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label htmlFor="lrReduction" className="text-sm font-medium">Learning Rate Reduction</label>
                      <p className="text-sm text-muted-foreground">
                        Öğrenme performansı düştüğünde öğrenme oranını otomatik azaltır
                      </p>
                    </div>
                    <Switch id="lrReduction" checked={regularization.lrReduction} onCheckedChange={(checked) => handleRegularizationChange('lrReduction', checked)} />
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <Button 
                    size="lg"
                    onClick={() => {
                      const event = new CustomEvent('tabChange', {
                        detail: { tab: 'monitor' }
                      });
                      window.dispatchEvent(event);
                    }}
                    className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl w-full"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Eğitimi Başlat
                  </Button>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}