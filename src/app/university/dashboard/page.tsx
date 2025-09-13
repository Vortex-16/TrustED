import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileUp, History, BarChart2 } from 'lucide-react';
import Link from 'next/link';

export default function UniversityDashboardPage() {
  const stats = [
    {
      title: 'Certificates Issued',
      value: '15,203',
      icon: <FileUp className="h-4 w-4 text-muted-foreground" />,
      change: '+1,200 this year',
    },
    {
      title: 'Verifications Processed',
      value: '8,450',
      icon: <History className="h-4 w-4 text-muted-foreground" />,
      change: '+510 this month',
    },
    {
      title: 'Verification Success Rate',
      value: '99.8%',
      icon: <BarChart2 className="h-4 w-4 text-muted-foreground" />,
      change: 'Maintained consistently',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-4xl font-headline font-bold text-primary">
            University Dashboard
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Manage your institution's academic records.
          </p>
        </div>
        <Button asChild className="mt-4 md:mt-0 font-bold">
          <Link href="/university/upload">
            <FileUp className="mr-2 h-4 w-4" /> Bulk Upload Certificates
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Verification Requests</CardTitle>
            <CardDescription>
              A log of recent verification attempts on your institution's
              certificates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Verification request log will be displayed here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
