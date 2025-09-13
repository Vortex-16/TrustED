import VerifyForm from '@/components/verify-form';

export default function VerifyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-headline font-bold text-primary">
            Certificate Authenticity Checker
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Upload a certificate file to begin the AI-powered validation
            process.
          </p>
        </div>
        <VerifyForm />
      </div>
    </div>
  );
}
