import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserCog } from 'lucide-react';

export default function AdminLoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <UserCog className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">
            Admin & Government Portal
          </CardTitle>
          <CardDescription>
            Secure access for authorized personnel only.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Official Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="official.user@gov.in"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full font-bold">
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              Having trouble signing in?{' '}
              <Link href="/help" className="text-primary hover:underline">
                Get Support
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
