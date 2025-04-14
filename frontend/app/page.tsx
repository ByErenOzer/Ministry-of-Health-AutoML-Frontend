'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 1,
      staggerChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardPositions = {
  0: { y: 50 },
  1: { y: 50 },
  2: { y: 50 }
};

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = document.cookie.includes('auth_token');
    if (!isAuthenticated) {
      router.push('/giris');
    }
  }, [router]);

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col gap-8 py-8">
      <motion.div 
        initial="hidden"
        animate="visible"
        className="space-y-4 text-center"
      >
        <motion.div 
          variants={textVariants}
          className="relative inline-block"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-lg blur-lg"></div>
          <h1 className="text-4xl font-bold tracking-tight relative">Veri Analitiği ve Modelleme Platformu: Sağlık</h1>
        </motion.div>
        <motion.p 
          variants={textVariants}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Machine Learning, Deep Learning ve LLM teknolojileriyle sağlık verilerinizi analiz edin
        </motion.p>
      </motion.div>

      <motion.div 
        variants={cardContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full mt-8"
      >
        {[
          {
            title: "Machine Learning",
            icon: Bot,
            color: "primary",
            description: "Klasik makine öğrenimi modelleri ile veri analizi ve tahminleme",
            features: ["Sınıflandırma", "Regresyon", "Kümeleme", "Anomali Tespiti"],
            href: "/machine-learning"
          },
          {
            title: "Deep Learning",
            icon: Brain,
            color: "primary",
            iconColor: "secondary",
            description: "Derin öğrenme modelleri ile karmaşık veri analizi",
            features: ["Sınıflandırma", "Nesne Tespiti", "Anlamsal Bölütleme", "Örnek Bölütleme"],
            href: "/deep-learning"
          },
          {
            title: "LLM",
            icon: Bot,
            color: "primary",
            description: "Büyük dil modelleri ile metin analizi ve üretimi",
            features: ["Metin Sınıflandırma", "Özetleme", "Soru Cevaplama", "Metin Üretimi"],
            href: "/llm"
          }
        ].map((card, index) => (
          <motion.div
            key={card.title}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            custom={index}
            style={cardPositions[index as keyof typeof cardPositions]}
            className="h-full"
          >
            <div className="animated-border-card">
              <Card className={`relative group hover:shadow-xl transition-all duration-300 hover:bg-gradient-to-br from-${card.color}/5 to-secondary/5 h-full flex flex-col`}>
                <div className={`absolute inset-0 bg-gradient-to-br from-${card.color}/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg`}></div>
                <CardHeader className="flex-none">
                  <card.icon className={`h-8 w-8 text-${card.iconColor || card.color} mb-2 group-hover:scale-110 transition-transform`} />
                  <CardTitle className={`group-hover:text-${card.color} transition-colors`}>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                    {card.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.5 + (i * 0.1) }}
                      >
                        • {feature}
                      </motion.li>
                    ))}
                  </ul>
                  <Link href={card.href} className="block mt-auto">
                    <div className="animated-border-button">
                      <Button 
                        className={`w-full bg-${card.color}/60 hover:bg-${card.color}/90 transition-all duration-700 
                        hover:scale-105 active:scale-95 transform shadow-lg hover:shadow-xl 
                        animate-[glow_6s_ease-in-out_infinite] hover:animate-none
                        group-hover:bg-${card.color}/80 text-foreground dark:text-white`}
                        style={{
                          animation: `glow 6s ease-in-out infinite`
                        }}
                      >
                        <span className="relative z-10 text-foreground dark:text-white">Başla <ArrowRight className="ml-2 h-4 w-4 inline-block" /></span>
                        <div className={`absolute inset-0 bg-gradient-to-r from-${card.color}/60 via-secondary/60 to-${card.color}/60 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-md blur-[1px]`}></div>
                      </Button>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 2 }}
        className="max-w-6xl mx-auto w-full mt-12 rounded-lg p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
        <div className="relative">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold">Neden Sağlık AutoML?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sağlık sektörüne özel geliştirilmiş yapay zeka çözümlerimiz ile verilerinizi analiz edin, 
              tahminler yapın ve kararlarınızı destekleyin.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
