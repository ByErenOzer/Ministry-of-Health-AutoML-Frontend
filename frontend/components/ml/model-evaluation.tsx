"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import type { MLProblemType } from "@/app/machine-learning/page";

interface ModelEvaluationProps {
  problemType: MLProblemType | null;
}

const dummyMetrics = {
  classification: {
    accuracy: 0.85,
    precision: 0.83,
    recall: 0.87,
    f1: 0.85,
    confusion_matrix: [
      [120, 20],
      [15, 145]
    ]
  },
  regression: {
    mse: 0.15,
    rmse: 0.387,
    mae: 0.32,
    r2: 0.78
  }
};

const dummyHistory = [
  { epoch: 1, train: 0.6, validation: 0.55 },
  { epoch: 2, train: 0.7, validation: 0.65 },
  { epoch: 3, train: 0.75, validation: 0.7 },
  { epoch: 4, train: 0.8, validation: 0.75 },
  { epoch: 5, train: 0.85, validation: 0.8 }
];

const CustomLineChart = ({ data }: { data: typeof dummyHistory }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis 
        dataKey="epoch"
        type="number"
        allowDecimals={false}
        domain={['dataMin', 'dataMax']}
      />
      <YAxis 
        type="number"
        domain={[0, 'auto']}
      />
      <Tooltip />
      <Legend />
      <Line 
        type="monotone" 
        dataKey="train" 
        stroke="hsl(var(--primary))" 
        name="Eğitim"
        dot={false}
      />
      <Line 
        type="monotone" 
        dataKey="validation" 
        stroke="hsl(var(--secondary))" 
        name="Doğrulama"
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
);

const CustomBarChart = ({ data, dataKey, name }: { 
  data: typeof dummyHistory; 
  dataKey: string;
  name: string;
}) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis 
        dataKey="epoch"
        type="number"
        allowDecimals={false}
      />
      <YAxis 
        type="number"
        domain={[0, 'auto']}
      />
      <Tooltip />
      <Legend />
      <Bar 
        dataKey={dataKey} 
        name={name} 
        fill="hsl(var(--primary))"
      />
    </BarChart>
  </ResponsiveContainer>
);

export function ModelEvaluation({ problemType }: ModelEvaluationProps) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Model Performansı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <CustomLineChart data={dummyHistory} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metrikler</CardTitle>
          </CardHeader>
          <CardContent>
            {problemType === "classification" && (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Doğruluk:</span>
                  <span className="font-medium">{dummyMetrics.classification.accuracy * 100}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Hassasiyet:</span>
                  <span className="font-medium">{dummyMetrics.classification.precision * 100}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Duyarlılık:</span>
                  <span className="font-medium">{dummyMetrics.classification.recall * 100}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">F1 Skoru:</span>
                  <span className="font-medium">{dummyMetrics.classification.f1 * 100}%</span>
                </div>
              </div>
            )}

            {problemType === "regression" && (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">MSE:</span>
                  <span className="font-medium">{dummyMetrics.regression.mse}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">RMSE:</span>
                  <span className="font-medium">{dummyMetrics.regression.rmse}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">MAE:</span>
                  <span className="font-medium">{dummyMetrics.regression.mae}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">R² Skoru:</span>
                  <span className="font-medium">{dummyMetrics.regression.r2}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detaylı Analiz</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="predictions">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="predictions">Tahminler</TabsTrigger>
              <TabsTrigger value="residuals">Artık Değerler</TabsTrigger>
              <TabsTrigger value="feature-importance">Özellik Önemi</TabsTrigger>
            </TabsList>

            <TabsContent value="predictions" className="h-[300px] mt-4">
              <CustomLineChart data={dummyHistory} />
            </TabsContent>

            <TabsContent value="residuals" className="h-[300px] mt-4">
              <CustomBarChart 
                data={dummyHistory} 
                dataKey="train" 
                name="Artık Değer" 
              />
            </TabsContent>

            <TabsContent value="feature-importance" className="h-[300px] mt-4">
              <CustomBarChart 
                data={dummyHistory} 
                dataKey="validation" 
                name="Önem Skoru" 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}