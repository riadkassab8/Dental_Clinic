import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Activity, Users, CalendarCheck, Clock, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const stats = {
  totalAppointments: 150,
  todayAppointments: 12,
  pendingAppointments: 5,
  completedAppointments: 133
};

const appointments = [
  {
    id: 1,
    patientName: "أحمد محمد",
    patientPhone: "0501234567",
    date: "2024-12-15",
    time: "10:00",
    status: "confirmed"
  },
  {
    id: 2,
    patientName: "سارة علي",
    patientPhone: "0509876543",
    date: "2024-12-16",
    time: "14:00",
    status: "pending"
  },
  {
    id: 3,
    patientName: "محمود حسن",
    patientPhone: "0505555555",
    date: "2024-12-17",
    time: "09:00",
    status: "completed"
  }
];

export default function AdminDashboard() {
  const { toast } = useToast();

  const handleStatusUpdate = (id: number, status: "confirmed" | "completed" | "cancelled") => {
    toast({ title: "تم تحديث حالة الموعد بنجاح" });
  };

  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا الموعد؟")) {
      toast({ title: "تم حذف الموعد بنجاح" });
    }
  };

  return (
    <div className="pt-20 pb-24 min-h-screen bg-muted/20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-black mb-8">لوحة تحكم العيادة</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المواعيد</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalAppointments || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">مواعيد اليوم</CardTitle>
              <CalendarCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.todayAppointments || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">قيد الانتظار</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.pendingAppointments || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">مكتملة</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.completedAppointments || 0}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>إدارة المواعيد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right">
                <thead className="text-xs text-muted-foreground bg-muted/50 border-b">
                  <tr>
                    <th className="px-6 py-3">المريض</th>
                    <th className="px-6 py-3">التاريخ والوقت</th>
                    <th className="px-6 py-3">الحالة</th>
                    <th className="px-6 py-3">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments?.map(app => (
                    <tr key={app.id} className="border-b hover:bg-muted/20">
                      <td className="px-6 py-4">
                        <p className="font-medium">{app.patientName}</p>
                        <p className="text-xs text-muted-foreground" dir="ltr">{app.patientPhone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p>{format(new Date(app.date), "dd/MM/yyyy")}</p>
                        <p className="text-xs text-muted-foreground" dir="ltr">{app.time}</p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={
                          app.status === 'pending' ? 'border-yellow-500 text-yellow-600' :
                          app.status === 'confirmed' ? 'border-primary text-primary' :
                          app.status === 'completed' ? 'border-green-500 text-green-600' :
                          'border-red-500 text-red-600'
                        }>
                          {app.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        {app.status === 'pending' && (
                          <Button size="sm" variant="outline" className="h-8 text-primary border-primary" onClick={() => handleStatusUpdate(app.id, 'confirmed')}>
                            <CheckCircle2 className="w-4 h-4 ml-1" /> تأكيد
                          </Button>
                        )}
                        {app.status === 'confirmed' && (
                          <Button size="sm" variant="outline" className="h-8 text-green-600 border-green-600" onClick={() => handleStatusUpdate(app.id, 'completed')}>
                            <CheckCircle2 className="w-4 h-4 ml-1" /> إكمال
                          </Button>
                        )}
                        {(app.status === 'pending' || app.status === 'confirmed') && (
                          <Button size="sm" variant="outline" className="h-8 text-red-600 border-red-600" onClick={() => handleStatusUpdate(app.id, 'cancelled')}>
                            <XCircle className="w-4 h-4 ml-1" /> إلغاء
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="h-8 text-destructive" onClick={() => handleDelete(app.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {appointments?.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">لا توجد مواعيد مسجلة</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
