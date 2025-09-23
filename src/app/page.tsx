import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck,
  Building,
  UserCog,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: 'Verify Certificate',
      description:
        'Upload a certificate to instantly check its authenticity using our advanced AI-powered validation tool.',
      href: '/verify',
      cta: 'Verify Now',
    },
    {
      icon: <Building className="w-8 h-8 text-primary" />,
      title: 'University Portal',
      description:
        'Institutions can log in to manage certificate records, view verification statistics, and maintain academic integrity.',
      href: '/university/login',
      cta: 'Access Portal',
    },
    {
      icon: <UserCog className="w-8 h-8 text-primary" />,
      title: 'Admin / Government',
      description:
        'Authorized bodies can access the admin dashboard to monitor activity, detect trends, and manage the ecosystem.',
      href: '/admin/login',
      cta: 'Admin Login',
    },
    {
      icon: <HelpCircle className="w-8 h-8 text-primary" />,
      title: 'Help & Support',
      description:
        'Find answers to common questions, get guidance on using the platform, and learn how to get support.',
      href: '/help',
      cta: 'Get Help',
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-background py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight">
            TrustED
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            Preserving Academic Integrity with Secure, AI-Powered Certificate
            Verification.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="font-bold">
              <Link href="/verify">
                Start Verification <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-bold">
              <Link href="/help">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="flex flex-col bg-card hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  {feature.icon}
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardTitle className="text-xl">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="mt-2">{feature.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="secondary" className="w-full font-bold group">
                    <Link href={feature.href}>
                      {feature.cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
