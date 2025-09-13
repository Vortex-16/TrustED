import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileUp, History, BarChart2, CheckCircle, XCircle, Clock } from 'lucide-react';
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

  const studentVerifications = [
    {
      id: 'VER-001',
      studentName: 'Amit Kumar',
      date: '2023-11-01',
      status: 'Verified',
      score: 95,
    },
    {
      id: 'VER-002',
      studentName: 'Priya Sharma',
      date: '2023-11-01',
      status: 'Failed',
      score: 32,
    },
    {
      id: 'VER-003',
      studentName: 'Rahul Singh',
      date: '2023-10-31',
      status: 'Verified',
      score: 88,
    },
    {
      id: 'VER-004',
      studentName: 'Anjali Gupta',
      date: '2023-10-30',
      status: 'In Review',
      score: 65,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Verified':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            {status}
          </Badge>
        );
      case 'Failed':
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />
            {status}
          </Badge>
        );
      case 'In Review':
        return (
          <Badge variant="secondary">
            <Clock className="mr-1 h-3 w-3" />
            {status}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

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
            <CardTitle>Student Verification Status</CardTitle>
            <CardDescription>
              Recent verification history for your students' certificates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Verification ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Auth. Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentVerifications.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell className="font-mono text-xs">{v.id}</TableCell>
                    <TableCell className="font-medium">{v.studentName}</TableCell>
                    <TableCell>{v.date}</TableCell>
                    <TableCell>{getStatusBadge(v.status)}</TableCell>
                    <TableCell className="text-right font-medium">{v.score}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}