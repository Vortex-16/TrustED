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
  ArrowRight,
} from 'lucide-react';

const VerifyCertificateIcon = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12">
    <path
      d="M83.33,16.67H16.67A8.33,8.33,0,0,0,8.33,25V75a8.33,8.33,0,0,0,8.34,8.33H83.33A8.33,8.33,0,0,0,91.67,75V25A8.33,8.33,0,0,0,83.33,16.67Z"
      style={{
        fill: 'none',
        stroke: 'hsl(var(--secondary))',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '4px',
      }}
    />
    <polyline
      points="33.33 50 45.83 62.5 66.67 41.67"
      style={{
        fill: 'none',
        stroke: 'hsl(var(--primary))',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '6px',
      }}
    />
  </svg>
);

const UniversityPortalIcon = () => (
    <svg viewBox="0 0 100 100" className="w-12 h-12">
        <path d="M16.67,83.33V33.33L50,16.67l33.33,16.66V83.33" style={{fill:'none', stroke:'hsl(var(--secondary))', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:'4px'}}/>
        <rect x="25" y="58.33" width="50" height="25" style={{fill:'none', stroke:'hsl(var(--secondary))', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:'4px'}}/>
        <line x1="16.67" y1="83.33" x2="83.33" y2="83.33" style={{fill:'none', stroke:'hsl(var(--secondary))', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:'4px'}}/>
        <circle cx="50" cy="41.67" r="8.33" style={{fill:'none', stroke:'hsl(var(--primary))', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:'6px'}}/>
  </svg>
);


const AdminIcon = () => (
    <svg viewBox="0 0 100 100" className="w-12 h-12">
        <path d="M50,62.5a16.67,16.67,0,1,0-16.67-16.67A16.67,16.67,0,0,0,50,62.5Z" style={{fill:'none', stroke:'hsl(var(--primary))', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:'6px'}}/>
        <path d="M75.67,83.33A25,25,0,0,0,50,66.67h0a25,25,0,0,0-25.67,16.66" style={{fill:'none', stroke:'hsl(var(--secondary))', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:'4px'}}/>
        <path d="M84.7,45.83a8.33,8.33,0,1,1-8.33-8.33,8.33,8.33,0,0,1,8.33,8.33Z" style={{fill:'none', stroke:'hsl(var(--secondary))', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:'4px'}}/>
        <path d="M23.63,45.83a8.33,8.33,0,1,0-8.33-8.33A8.33,8.33,0,0,0,23.63,45.83Z" style={{fill:'none', stroke:'hsl(var(--secondary))', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:'4px'}}/>
    </svg>
);

const HelpIcon = () => (
    <svg viewBox="0 0 100 100" className="w-12 h-12">
        <circle cx="50" cy="50" r="33.33" style={{fill:'none', stroke:'hsl(var(--secondary))', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:'4px'}}/>
        <path d="M37.5,41.67a12.5,12.5,0,1,1,25,0c0,8.33-12.5,12.5-12.5,12.5" style={{fill:'none', stroke:'hsl(var(--primary))', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:'6px'}}/>
        <line x1="50" y1="66.67" x2="50" y2="66.67" style={{fill:'none', stroke:'hsl(var(--primary))', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:'6px'}}/>
    </svg>
);


export default function Home() {
  const features = [
    {
      icon: <VerifyCertificateIcon />,
      title: 'Verify Certificate',
      description:
        'Upload a certificate to instantly check its authenticity using our advanced AI-powered validation tool.',
      href: '/verify',
      cta: 'Verify Now',
    },
    {
      icon: <UniversityPortalIcon />,
      title: 'University Portal',
      description:
        'Institutions can log in to manage certificate records, view verification statistics, and maintain academic integrity.',
      href: '/university/login',
      cta: 'Access Portal',
    },
    {
      icon: <AdminIcon />,
      title: 'Admin / Government',
      description:
        'Authorized bodies can access the admin dashboard to monitor activity, detect trends, and manage the ecosystem.',
      href: '/admin/login',
      cta: 'Admin Login',
    },
    {
      icon: <HelpIcon />,
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
                  <CardTitle className="text-xl font-headline">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="mt-2">{feature.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full font-bold group border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
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
