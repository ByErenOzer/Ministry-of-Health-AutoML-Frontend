"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send } from "lucide-react";
import { useState } from "react";

export default function LLM() {
  const [input, setInput] = useState("");

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Büyük Dil Modelleri (LLM)</h1>
        <p className="text-muted-foreground">
          Tıbbi metinleri analiz etmek ve üretmek için gelişmiş dil modellerini kullanın
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Metin Girişi</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Analiz edilecek metni buraya girin..."
                className="min-h-[200px]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>İşlem Seçimi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Bot className="mr-2 h-4 w-4" />
                Metin Sınıflandırma
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bot className="mr-2 h-4 w-4" />
                Özetleme
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bot className="mr-2 h-4 w-4" />
                Soru Cevaplama
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bot className="mr-2 h-4 w-4" />
                Metin Üretimi
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sonuçlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-[400px] flex items-center justify-center text-muted-foreground">
              <div className="text-center space-y-2">
                <Bot className="h-8 w-8 mx-auto" />
                <p>Model çıktısı burada görüntülenecek</p>
              </div>
            </div>
            <Button className="w-full mt-4" disabled={!input}>
              <Send className="mr-2 h-4 w-4" /> Analizi Başlat
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}