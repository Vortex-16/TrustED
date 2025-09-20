import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline text-primary">
              TrustED
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/verify">Verify Certificate</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/university/login">University Portal</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/admin/login">Admin Portal</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/help">Help</Link>
            </Button>
          </nav>
          <div className="flex md:hidden">
            {/* Mobile menu can be added here */}
          </div>
        </div>
      </div>
    </header>
  );
}
