import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ShieldCheck,
  TrendingUp,
  Users,
  Check,
  X,
  Building,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const institutionRequests = [
    {
      name: 'Ranchi University',
      type: 'University',
      date: '2023-10-26',
    },
    {
      name: 'TechCorp Inc.',
      type: 'Company',
      date: '2023-10-25',
    },
    {
      name: 'BIT Mesra',
      type: 'University',
      date: '2023-10-24',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-headline font-bold text-primary">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          System-wide monitoring and management.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Verifications
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234,567</div>
            <p className="text-xs text-muted-foreground">
              +10.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Fraud Detection Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.1%</div>
            <p className="text-xs text-muted-foreground">
              -0.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Registered Institutions
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+2 since last week</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Institution Verification Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Institution Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {institutionRequests.map((req) => (
                  <TableRow key={req.name}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      {req.name}
                    </TableCell>
                    <TableCell>{req.type}</TableCell>
                    <TableCell>{req.date}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-green-500 hover:text-green-600">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
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