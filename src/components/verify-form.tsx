'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  UploadCloud,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  FileBadge,
} from 'lucide-react';
import {
  validateCertificateAuthenticity,
  type ValidateCertificateAuthenticityOutput,
} from '@/ai/flows/validate-certificate-authenticity';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

const formSchema = z.object({
  certificate: z
    .custom<File>((v) => v instanceof File, 'Please upload a file.')
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `File size must be less than 5MB.`
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      'Only .jpg, .png, and .pdf files are accepted.'
    ),
});

export default function VerifyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] =
    useState<ValidateCertificateAuthenticityOutput | null>(null);
  const [fileName, setFileName] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fileRef = form.register('certificate');

  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error('Failed to read file.'));
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const dataUri = await fileToDataUri(values.certificate);
      const validationResult = await validateCertificateAuthenticity({
        certificateDataUri: dataUri,
      });
      setResult(validationResult);
    } catch (error) {
      console.error('Validation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description:
          'An unexpected error occurred while verifying the certificate. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'bg-green-500';
    if (score >= 0.5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 0.8)
      return <CheckCircle2 className="w-10 h-10 text-green-500" />;
    if (score >= 0.5)
      return <AlertTriangle className="w-10 h-10 text-yellow-500" />;
    return <AlertTriangle className="w-10 h-10 text-red-500" />;
  };

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="certificate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Certificate</FormLabel>
                    <FormControl>
                      <div className="relative flex justify-center w-full h-48 border-2 border-dashed rounded-lg border-border hover:border-primary transition-colors cursor-pointer">
                        <Input
                          type="file"
                          className="absolute w-full h-full opacity-0 cursor-pointer"
                          {...fileRef}
                          onChange={(e) => {
                            field.onChange(e.target.files?.[0]);
                            setFileName(e.target.files?.[0]?.name || '');
                          }}
                        />
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <UploadCloud className="w-12 h-12" />
                          <p className="mt-2 text-sm">
                            <span className="font-semibold text-primary">
                              Click to upload
                            </span>{' '}
                            or drag and drop
                          </p>
                          <p className="text-xs">
                            PDF, PNG, JPG (max. 5MB)
                          </p>
                          {fileName && (
                            <p className="mt-2 text-sm font-medium text-foreground flex items-center gap-2">
                              <FileBadge className="w-4 h-4" />
                              {fileName}
                            </p>
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full font-bold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Verify Certificate'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {result && (
        <Card className="mt-8 animate-in fade-in duration-500">
          <CardHeader>
            <CardTitle className="text-2xl">Validation Result</CardTitle>
            <CardDescription>
              AI-powered analysis of the uploaded certificate.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                {getScoreIcon(result.confidenceScore)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Authenticity Confidence Score
                </p>
                <div className="flex items-center gap-3">
                  <Progress
                    value={result.confidenceScore * 100}
                    className="w-full [&gt;div]:bg-green-500"
                    indicatorClassName={getScoreColor(result.confidenceScore)}
                  />
                  <span className="text-2xl font-bold text-foreground">
                    {(result.confidenceScore * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Validation Details
              </h3>
              <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap font-body">
                {result.validationDetails}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Disclaimer: This is an AI-generated score and should be used as a
              preliminary check. Final verification should be done through official
              university channels.
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
}

// Custom indicator class for Progress
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    indicatorClassName?: string;
  }
}
