'use client';

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/user-nav";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Brain, Stethoscope, Bot } from "lucide-react";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);

    if (!authStatus && pathname !== "/giris") {
      router.push("/giris");
    }
  }, [pathname]);

  const isLoginPage = pathname === "/giris";

  return (
    <nav className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto py-3">
        <div className="flex items-center justify-between px-2">
          {isLoginPage ? (
            <div className="flex justify-end w-full pr-2">
              <ModeToggle />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-8 pl-2">
                <Link
                  href="/"
                  className="flex items-center gap-2 relative group"
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  <Stethoscope className="h-6 w-6 text-primary relative" />
                  <span className="font-semibold text-lg relative">
                    Sağlık AutoML
                  </span>
                </Link>
                <div className="hidden md:flex items-center gap-6">
                  <Link
                    href="/machine-learning"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Brain className="h-5 w-5" />
                    <span>Machine Learning</span>
                  </Link>
                  <Link
                    href="/deep-learning"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Brain className="h-5 w-5" />
                    <span>Deep Learning</span>
                  </Link>
                  <Link
                    href="/llm"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Bot className="h-5 w-5" />
                    <span>LLM</span>
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-4 pr-2">
                <ModeToggle />
                {isAuthenticated && <UserNav />}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}