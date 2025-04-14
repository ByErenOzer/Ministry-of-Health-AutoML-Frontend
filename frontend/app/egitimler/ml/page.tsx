"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Training {
  id: number;
  dataset_name: string;
  model_name: string;
  training_status: string;
  test_accuracy: number | null;
  created_at: string;
}

export default function MachineLearningHistory() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          router.push("/giris");
          return;
        }

        // TODO: Makine öğrenmesi API'si eklendiğinde güncellenecek
        setTrainings([]);
      } catch (error) {
        console.error("Error fetching trainings:", error);
        toast.error("Eğitim geçmişi yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      // TODO: Makine öğrenmesi API'si eklendiğinde güncellenecek
      toast.success("Eğitim başarıyla silindi");
    } catch (error) {
      console.error("Error deleting training:", error);
      toast.error("Eğitim silinirken bir hata oluştu");
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { variant: "default" | "secondary" | "destructive" | "outline"; label: string } } = {
      pending: { variant: "secondary", label: "Bekliyor" },
      running: { variant: "default", label: "Devam Ediyor" },
      completed: { variant: "outline", label: "Tamamlandı" },
      failed: { variant: "destructive", label: "Başarısız" },
    };

    const { variant, label } = statusMap[status] || { variant: "secondary", label: status };
    return <Badge variant={variant}>{label}</Badge>;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Makine Öğrenmesi Eğitimlerim
          </h3>
          <p className="text-sm text-muted-foreground">
            Tüm makine öğrenmesi model eğitimlerinizin geçmişi
          </p>
        </div>
        <div className="p-6 pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dataset</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Doğruluk</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Henüz hiç eğitim gerçekleştirmediniz
                  </TableCell>
                </TableRow>
              ) : (
                trainings.map((training) => (
                  <TableRow key={training.id}>
                    <TableCell>{training.dataset_name}</TableCell>
                    <TableCell>{training.model_name}</TableCell>
                    <TableCell>
                      {getStatusBadge(training.training_status)}
                    </TableCell>
                    <TableCell>
                      {training.test_accuracy
                        ? `${(training.test_accuracy * 100).toFixed(2)}%`
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {format(new Date(training.created_at), "d MMMM yyyy HH:mm", {
                        locale: tr,
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            router.push(`/egitimler/ml/${training.id}`)
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(training.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
} 