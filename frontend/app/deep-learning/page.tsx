"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Settings, ArrowRight, BarChart, FileText, Layers, Play, Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { PreprocessingOptions } from "@/components/preprocessing-options";
import { TrainingConfig } from "@/components/training-config";
import { DataAugmentation } from "@/components/data-augmentation";
import { PerformanceMonitor } from "@/components/performance-monitor";

export default function DeepLearningPage() {
  const [activeTab, setActiveTab] = useState<string>("select");
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedNormalization, setSelectedNormalization] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const datasets = [
    {
      id: "brain-tumor",
      title: "Beyin Tümörü Veriseti",
      description: "Beyin tümörü tespiti için MR görüntüleri",
      imageCount: "20",
      resolution: "224x224",
      format: "JPG/PNG",
      size: "< 10 MB"
    },
    {
      id: "mammography",
      title: "Mamografi Veriseti",
      description: "Meme kanseri tespiti için 10.000+ mamografi görüntüsü",
      imageCount: "10,237",
      resolution: "2048x1024",
      format: "DICOM",
      size: "2.3 GB"
    },
    {
      id: "dental",
      title: "Diş Röntgeni Veriseti",
      description: "Diş hastalıkları tespiti için panoramik röntgen görüntüleri",
      imageCount: "5,892",
      resolution: "1024x1024",
      format: "JPEG",
      size: "1.5 GB"
    }
  ];

  const models = [
    {
      id: "resnet50",
      name: "ResNet-50",
      parameters: "23.5M"
    },
    {
      id: "efficientnetb0",
      name: "EfficientNet-B0",
      parameters: "5.3M"
    },
    {
      id: "densenet121",
      name: "DenseNet-121",
      parameters: "7.9M"
    },
    {
      id: "vgg16",
      name: "VGG-16",
      parameters: "138M"
    },
    {
      id: "inceptionv3",
      name: "Inception-v3",
      parameters: "23.8M"
    },
    {
      id: "resnetxt50",
      name: "ResNeXt-50",
      parameters: "25.0M"
    },
    {
      id: "convnext",
      name: "ConvNeXt",
      parameters: "28.6M"
    },
    {
      id: "regnet",
      name: "RegNet",
      parameters: "10.9M"
    }
  ];

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

  const handleNext = () => {
    if (activeTab === "select" && selectedDataset) {
      setActiveTab("preprocess");
    } else if (activeTab === "preprocess" && selectedSize && selectedNormalization) {
      setActiveTab("model");
    } else if (activeTab === "model" && selectedModel) {
      setActiveTab("augment");
    }
  };

  useEffect(() => {
    const handleTabChange = (event: CustomEvent) => {
      setActiveTab(event.detail.tab);
    };

    window.addEventListener('tabChange', handleTabChange as EventListener);
    return () => {
      window.removeEventListener('tabChange', handleTabChange as EventListener);
    };
  }, []);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto py-6 space-y-8"
    >
      <motion.div variants={item} className="space-y-2">
        <h1 className="text-3xl font-bold">Deep Learning Modelleri</h1>
        <p className="text-muted-foreground">
          Tıbbi görüntüler üzerinde derin öğrenme modellerini eğitin
        </p>
      </motion.div>

      <motion.div variants={item}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-6 gap-4 bg-muted p-1">
            <TabsTrigger value="select" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="h-5 w-5 mr-2" />
              Veri Seçme
            </TabsTrigger>
            <TabsTrigger value="preprocess" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Settings className="h-5 w-5 mr-2" />
              Ön İşleme
            </TabsTrigger>
            <TabsTrigger value="model" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Brain className="h-5 w-5 mr-2" />
              Model Seçimi
            </TabsTrigger>
            <TabsTrigger value="augment" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Layers className="h-5 w-5 mr-2" />
              Veri Artırma
            </TabsTrigger>
            <TabsTrigger value="train" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Play className="h-5 w-5 mr-2" />
              Model Eğitimi
            </TabsTrigger>
            <TabsTrigger value="monitor" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart className="h-5 w-5 mr-2" />
              Performans
            </TabsTrigger>
          </TabsList>

          <TabsContent value="select" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <RadioGroup
                value={selectedDataset}
                onValueChange={setSelectedDataset}
                className="contents [&_[data-state=checked]]:text-secondary"
              >
                {datasets.map((dataset) => (
                  <motion.div
                    key={dataset.id}
                    variants={item}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="h-full"
                  >
                    <Label
                      htmlFor={dataset.id}
                      className="flex flex-col space-y-4 cursor-pointer h-full"
                    >
                      <RadioGroupItem
                        value={dataset.id}
                        id={dataset.id}
                        className="peer sr-only"
                      />
                      <Card className={`relative border-2 h-full transition-all duration-300 hover:shadow-md hover:bg-secondary/10 hover:border-secondary ${selectedDataset === dataset.id ? 'border-secondary bg-gradient-to-br from-secondary/20 via-secondary/10 to-secondary/20' : ''}`}>
                        <div className={`absolute top-4 right-4 transition-opacity ${selectedDataset === dataset.id ? 'opacity-100' : 'opacity-0'}`}>
                          <Check className="h-6 w-6 text-secondary" />
                        </div>
                        <CardContent className="p-6 h-full flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <h3 className={`font-semibold text-xl transition-colors hover:text-secondary ${selectedDataset === dataset.id ? 'text-secondary' : ''}`}>{dataset.title}</h3>
                              <p className={`text-sm text-muted-foreground transition-colors hover:text-secondary/80 ${selectedDataset === dataset.id ? 'text-secondary/80' : ''}`}>{dataset.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm mt-auto">
                              <div className="space-y-2">
                                <p className="text-muted-foreground">Görüntü Sayısı</p>
                                <p className={`font-medium transition-colors hover:text-secondary ${selectedDataset === dataset.id ? 'text-secondary' : ''}`}>{dataset.imageCount}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-muted-foreground">Çözünürlük</p>
                                <p className={`font-medium transition-colors hover:text-secondary ${selectedDataset === dataset.id ? 'text-secondary' : ''}`}>{dataset.resolution}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-muted-foreground">Format</p>
                                <p className={`font-medium transition-colors hover:text-secondary ${selectedDataset === dataset.id ? 'text-secondary' : ''}`}>{dataset.format}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-muted-foreground">Boyut</p>
                                <p className={`font-medium transition-colors hover:text-secondary ${selectedDataset === dataset.id ? 'text-secondary' : ''}`}>{dataset.size}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Label>
                  </motion.div>
                ))}
              </RadioGroup>
            </div>
            {selectedDataset && (
              <Button 
                onClick={handleNext} 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                İlerle <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </TabsContent>

          <TabsContent value="preprocess" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ön İşleme Seçenekleri</CardTitle>
              </CardHeader>
              <CardContent>
                <PreprocessingOptions
                  selectedSize={selectedSize}
                  selectedNormalization={selectedNormalization}
                  onSizeSelect={setSelectedSize}
                  onNormalizationSelect={setSelectedNormalization}
                />
              </CardContent>
            </Card>
            {selectedSize && selectedNormalization && (
              <Button 
                onClick={handleNext} 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                İlerle <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </TabsContent>

          <TabsContent value="model" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-4 gap-6"
            >
              {models.map((model, index) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.05,
                    duration: 0.2,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                >
                  <Card
                    className={`relative cursor-pointer transition-all duration-200 hover:shadow-xl ${
                      selectedModel === model.id
                        ? "ring-2 ring-primary shadow-xl bg-primary/5"
                        : "hover:ring-2 hover:ring-primary/50"
                    }`}
                    onClick={() => setSelectedModel(model.id)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {model.name}
                        {selectedModel === model.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ 
                              type: "spring", 
                              stiffness: 400, 
                              damping: 15,
                              duration: 0.2
                            }}
                          >
                            <Check className="w-5 h-5 text-primary" />
                          </motion.div>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2 text-sm">
                        <motion.div
                          initial={{ rotate: -180 }}
                          animate={{ rotate: 0 }}
                          transition={{ 
                            delay: index * 0.05, 
                            duration: 0.3,
                            type: "spring",
                            stiffness: 200
                          }}
                        >
                          <Brain className="w-4 h-4 text-primary" />
                        </motion.div>
                        <span>{model.parameters} parametre</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-end"
            >
              <Button
                onClick={handleNext}
                disabled={!selectedModel}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Model Seçimini Tamamla <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </TabsContent>

          <TabsContent value="train" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Model Eğitimi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <TrainingConfig onNext={() => setActiveTab("monitor")} />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="augment">
            <Card>
              <CardHeader>
                <CardTitle>Veri Artırma</CardTitle>
              </CardHeader>
              <CardContent>
                <DataAugmentation />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitor">
            <Card>
              <CardHeader>
                <CardTitle>Performans İzleme</CardTitle>
              </CardHeader>
              <CardContent>
                <PerformanceMonitor />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}