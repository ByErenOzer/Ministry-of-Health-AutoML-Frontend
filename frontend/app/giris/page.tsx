"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";
import { toast } from "sonner";

const NeuralBackground = () => {
  return (
    <div className="neural-background">
      <div className="neural-grid" />
      <div className="synapses">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="synapse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await loginUser(username, password);
      if (response.status === "success") {
        document.cookie = "auth_token=true; path=/; SameSite=Strict";
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", response.username);
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message || "Giriş başarısız oldu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      <NeuralBackground />
      
      <div className="w-full max-w-md p-8 rounded-2xl glass-card z-10 mx-4">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Hoş Geldiniz
            </h1>
            <p className="text-muted-foreground">
              Hesabınıza giriş yapın
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-foreground">
                  Kullanıcı Adı
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Kullanıcı adınızı girin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="glass-input"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Şifre
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Şifrenizi girin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  disabled={isLoading}
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-muted-foreground"
                >
                  Beni hatırla
                </label>
              </div>
              <Link
                href="/sifremi-unuttum"
                className="text-sm text-primary hover:text-primary/90 transition-colors"
              >
                Şifremi unuttum
              </Link>
            </div>

            <div>
              <div className="animated-border-button">
                <Button
                  type="submit"
                  className="w-full bg-primary/60 hover:bg-primary/90 transition-all duration-700 
                  hover:scale-105 active:scale-95 transform shadow-lg hover:shadow-xl 
                  animate-[glow_6s_ease-in-out_infinite] hover:animate-none
                  group-hover:bg-primary/80 text-foreground dark:text-white"
                  disabled={isLoading}
                >
                  <span className="relative z-10">
                    {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
                  </span>
                </Button>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Hesabınız yok mu?{" "}
              <Link
                href="/kayit-ol"
                className="font-semibold text-primary hover:text-primary/90 transition-colors"
              >
                Kayıt ol
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
