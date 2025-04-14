"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataUpload } from "@/components/ml/data-upload";
import { ProblemType } from "@/components/ml/problem-type";
import { DataPreprocessing } from "@/components/ml/data-preprocessing";
import { FeatureEngineering } from "@/components/ml/feature-engineering";
import { ModelSelection } from "@/components/ml/model-selection";
import { ModelEvaluation } from "@/components/ml/model-evaluation";
import { Brain, Upload, Settings, GitBranch, Bot, BarChart } from "lucide-react";

export type MLProblemType = "classification" | "regression" | "clustering" | "anomaly";

export default function MachineLearning() {
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [problemType, setProblemType] = useState<MLProblemType | null>(null);
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Machine Learning Modelleri</h1>
        <p className="text-muted-foreground">
          Sağlık verilerinizi analiz etmek için klasik makine öğrenimi modellerini kullanın
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-6 gap-4 bg-muted p-1">
          <TabsTrigger value="upload" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Upload className="h-5 w-5 mr-2" />
            Veri
          </TabsTrigger>
          <TabsTrigger value="problem" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Brain className="h-5 w-5 mr-2" />
            Problem
          </TabsTrigger>
          <TabsTrigger value="preprocess" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Settings className="h-5 w-5 mr-2" />
            Ön İşleme
          </TabsTrigger>
          <TabsTrigger value="features" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <GitBranch className="h-5 w-5 mr-2" />
            Özellikler
          </TabsTrigger>
          <TabsTrigger value="model" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Bot className="h-5 w-5 mr-2" />
            Model
          </TabsTrigger>
          <TabsTrigger value="evaluate" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <BarChart className="h-5 w-5 mr-2" />
            Değerlendirme
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <DataUpload 
            onFileSelect={setSelectedFile}
            onDatasetSelect={setSelectedDataset}
            selectedFile={selectedFile}
            selectedDataset={selectedDataset}
            onNext={() => setActiveTab("problem")}
          />
        </TabsContent>

        <TabsContent value="problem">
          <ProblemType
            onSelect={setProblemType}
            selected={problemType}
            onNext={() => setActiveTab("preprocess")}
          />
        </TabsContent>

        <TabsContent value="preprocess">
          <DataPreprocessing
            problemType={problemType}
            onNext={() => setActiveTab("features")}
          />
        </TabsContent>

        <TabsContent value="features">
          <FeatureEngineering
            problemType={problemType}
            onNext={() => setActiveTab("model")}
          />
        </TabsContent>

        <TabsContent value="model">
          <ModelSelection
            problemType={problemType}
            onNext={() => setActiveTab("evaluate")}
          />
        </TabsContent>

        <TabsContent value="evaluate">
          <ModelEvaluation problemType={problemType} />
        </TabsContent>
      </Tabs>
    </div>
  );
}