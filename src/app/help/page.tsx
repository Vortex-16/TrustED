import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    {
      question: 'How do I verify a certificate?',
      answer:
        'Navigate to the "Verify Certificate" page, click the upload area to select a file or drag and drop it. Supported formats are PDF, PNG, and JPG. Click the "Verify Certificate" button to start the AI analysis. The results will be displayed on the same page.',
    },
    {
      question: 'What file formats are supported for upload?',
      answer:
        'We currently support PDF documents, PNG images, and JPG/JPEG images. Please ensure your file size is under 5MB for optimal performance.',
    },
    {
      question: 'How does the authenticity check work?',
      answer:
        'Our system uses advanced AI and Optical Character Recognition (OCR) to extract text and visual elements from the uploaded document. It then analyzes these elements for inconsistencies, signs of tampering, and deviation from standard formatting conventions to generate a confidence score.',
    },
    {
      question: 'I represent a university. How can we register our institution?',
      answer:
        'To get your institution onboarded, please contact our support team through the official channels listed on this page. We will guide you through the registration and bulk data upload process.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Yes. We prioritize data privacy and security. Uploaded documents are processed in a secure environment and are not stored permanently after verification. All connections are encrypted to protect your data in transit.',
    },
    {
      question:
        'What does the "Authenticity Confidence Score" mean?',
      answer:
        'The confidence score is a percentage (0-100%) that represents the AI\'s assessment of the document\'s likelihood of being authentic. A higher score indicates fewer anomalies found. This score is a tool for preliminary screening and not a final verdict.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-headline font-bold text-primary">
            Help & Support
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Find answers to your questions and learn how to use TrustED
            effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-headline font-semibold mb-4">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="font-semibold text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  If you can't find the answer you're looking for, please reach
                  out to our support team.
                </p>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <a
                    href="mailto:support@trusted.gov.in"
                    className="text-sm hover:underline"
                  >
                    support@trusted.gov.in
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-sm">+91-XXX-XXX-XXXX</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
