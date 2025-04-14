import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AlertCircle, ChevronDown, ChevronUp, ImagePlus, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export function DataAugmentation() {
  const [showAugmentation, setShowAugmentation] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"smote" | "ros" | "geometric" | "">("");
  const [balanceOption, setBalanceOption] = useState<"equal" | "double">("equal");
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [rotationAngle, setRotationAngle] = useState(45);
  const [perspectiveAmount, setPerspectiveAmount] = useState(20);
  const [scaleAmount, setScaleAmount] = useState(30);
  const [shearAmount, setShearAmount] = useState(15);
  const [cropAmount, setCropAmount] = useState(25);
  const [elasticAmount, setElasticAmount] = useState(10);

  const handleNext = () => {
    const event = new CustomEvent('tabChange', {
      detail: { tab: 'train' }
    });
    window.dispatchEvent(event);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-2xl">Veri Artırma İşlemi</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Veri setinizi genişleterek model performansını artırın
                </p>
              </div>
              <Button
                variant="outline"
                size="lg"
                className="min-w-[140px]"
                onClick={() => setShowAugmentation(!showAugmentation)}
              >
                {showAugmentation ? "Devre Dışı Bırak" : "Etkinleştir"}
              </Button>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Alert variant="info" className="bg-primary/5 border-primary/20">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Bilgilendirme</AlertTitle>
          <AlertDescription>
            Projeyi ilk defa çalıştırıyorsanız, genel yapıyı bozmamak için veri artırma işlemini geçebilirsiniz.
            Veri artırma, model performansını artırabilir ancak eğitim süresini uzatır.
          </AlertDescription>
        </Alert>
      </motion.div>

      {!showAugmentation && (
        <motion.div 
          variants={item}
          className="flex justify-end mt-6"
        >
          <Button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Veri Artırma Olmadan İlerle
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      )}

      <AnimatePresence>
        {showAugmentation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Veri Artırma Yöntemi Seçin</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedMethod} onValueChange={(value: "smote" | "ros" | "geometric") => setSelectedMethod(value)}>
                  <div className="grid gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="smote" id="smote" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="smote" className="font-medium">SMOTE (Synthetic Minority Over-sampling Technique)</Label>
                        <p className="text-sm text-muted-foreground">
                          Az olan sınıflar için sentetik örnekler oluşturarak veri dengesizliğini giderir
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ros" id="ros" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="ros" className="font-medium">ROS (Random Over Sampling)</Label>
                        <p className="text-sm text-muted-foreground">
                          Az olan sınıflardan rastgele örnekler çoğaltarak veri dengesizliğini giderir
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="geometric" id="geometric" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="geometric" className="font-medium">Geometrik Dönüşümler</Label>
                        <p className="text-sm text-muted-foreground">
                          Görüntü üzerinde çeşitli geometrik dönüşümler uygulayarak veri setini zenginleştirir
                        </p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {(selectedMethod === "smote" || selectedMethod === "ros") && (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedMethod === "smote" ? "SMOTE" : "ROS"} Ayarları</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={balanceOption} onValueChange={(value: "equal" | "double") => setBalanceOption(value)}>
                    <div className="grid gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="equal" id="equal" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="equal">Sınıfları Eşitle</Label>
                          <p className="text-sm text-muted-foreground">
                            Tüm sınıfları en büyük sınıf boyutuna eşitler
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="double" id="double" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="double">İki Katına Çıkar</Label>
                          <p className="text-sm text-muted-foreground">
                            Az olan sınıfları mevcut boyutlarının iki katına çıkarır
                          </p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            )}

            {selectedMethod === "geometric" && (
              <Card>
                <CardHeader>
                  <CardTitle>Geometrik Dönüşüm Ayarları</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="basic">Temel Dönüşümler</TabsTrigger>
                      <TabsTrigger value="advanced">Gelişmiş Dönüşümler</TabsTrigger>
                    </TabsList>
                    <TabsContent value="basic" className="space-y-6">
                      <div className="grid gap-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Yatay Çevirme</Label>
                            <p className="text-sm text-muted-foreground">
                              Görüntüyü yatay eksende aynalar
                            </p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Dikey Çevirme</Label>
                            <p className="text-sm text-muted-foreground">
                              Görüntüyü dikey eksende aynalar
                            </p>
                          </div>
                          <Switch />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Rastgele Döndürme</Label>
                            <span className="text-sm text-muted-foreground w-12 text-right">
                              {rotationAngle}°
                            </span>
                          </div>
                          <Slider
                            value={[rotationAngle]}
                            onValueChange={(value) => setRotationAngle(value[0])}
                            max={180}
                            step={5}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="advanced" className="space-y-6">
                      <div className="grid gap-6">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Perspektif Dönüşümü</Label>
                            <span className="text-sm text-muted-foreground w-12 text-right">
                              {perspectiveAmount}%
                            </span>
                          </div>
                          <Slider
                            value={[perspectiveAmount]}
                            onValueChange={(value) => setPerspectiveAmount(value[0])}
                            max={100}
                            step={5}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Ölçeklendirme</Label>
                            <span className="text-sm text-muted-foreground w-12 text-right">
                              {scaleAmount}%
                            </span>
                          </div>
                          <Slider
                            value={[scaleAmount]}
                            onValueChange={(value) => setScaleAmount(value[0])}
                            max={100}
                            step={5}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Kesme Dönüşümü</Label>
                            <span className="text-sm text-muted-foreground w-12 text-right">
                              {shearAmount}%
                            </span>
                          </div>
                          <Slider
                            value={[shearAmount]}
                            onValueChange={(value) => setShearAmount(value[0])}
                            max={45}
                            step={5}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Rastgele Kırpma</Label>
                            <span className="text-sm text-muted-foreground w-12 text-right">
                              {cropAmount}%
                            </span>
                          </div>
                          <Slider
                            value={[cropAmount]}
                            onValueChange={(value) => setCropAmount(value[0])}
                            max={50}
                            step={5}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Elastik Deformasyon</Label>
                            <span className="text-sm text-muted-foreground w-12 text-right">
                              {elasticAmount}%
                            </span>
                          </div>
                          <Slider
                            value={[elasticAmount]}
                            onValueChange={(value) => setElasticAmount(value[0])}
                            max={30}
                            step={5}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {selectedMethod && (
              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  İlerle
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}