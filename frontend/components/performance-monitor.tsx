"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const dummyData = [
  { epoch: 1, loss: 0.5, accuracy: 0.7, val_loss: 0.6, val_accuracy: 0.65 },
  { epoch: 2, loss: 0.4, accuracy: 0.8, val_loss: 0.5, val_accuracy: 0.75 },
  { epoch: 3, loss: 0.3, accuracy: 0.85, val_loss: 0.45, val_accuracy: 0.8 },
  { epoch: 4, loss: 0.25, accuracy: 0.88, val_loss: 0.4, val_accuracy: 0.82 },
  { epoch: 5, loss: 0.2, accuracy: 0.9, val_loss: 0.35, val_accuracy: 0.85 },
];

const CustomXAxis = (props: any) => <XAxis {...props} allowDecimals={false} />;
const CustomYAxis = (props: any) => <YAxis {...props} domain={[0, 'auto']} />;

export function PerformanceMonitor() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Model Performansı</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="loss" className="space-y-4">
            <TabsList>
              <TabsTrigger value="loss">Loss Değerleri</TabsTrigger>
              <TabsTrigger value="accuracy">Doğruluk Oranları</TabsTrigger>
            </TabsList>

            <TabsContent value="loss" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dummyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <CustomXAxis dataKey="epoch" />
                  <CustomYAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="loss" stroke="hsl(var(--primary))" name="Eğitim Loss" />
                  <Line type="monotone" dataKey="val_loss" stroke="hsl(var(--secondary))" name="Doğrulama Loss" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="accuracy" className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dummyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <CustomXAxis dataKey="epoch" />
                  <CustomYAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="accuracy" stroke="hsl(var(--primary))" name="Eğitim Doğruluğu" />
                  <Line type="monotone" dataKey="val_accuracy" stroke="hsl(var(--secondary))" name="Doğrulama Doğruluğu" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Eğitim Metrikleri</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Loss:</dt>
                <dd className="text-sm font-medium">0.2</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Accuracy:</dt>
                <dd className="text-sm font-medium">90%</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Doğrulama Metrikleri</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Loss:</dt>
                <dd className="text-sm font-medium">0.35</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Accuracy:</dt>
                <dd className="text-sm font-medium">85%</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Eğitim Durumu</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Epoch:</dt>
                <dd className="text-sm font-medium">5/50</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Kalan Süre:</dt>
                <dd className="text-sm font-medium">~45 dakika</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}