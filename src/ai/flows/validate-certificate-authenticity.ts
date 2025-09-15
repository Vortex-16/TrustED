'use server';
/**
 * @fileOverview Certificate authenticity validation flow.
 *
 * - validateCertificateAuthenticity - A function that validates the authenticity of a certificate.
 * - ValidateCertificateAuthenticityInput - The input type for the validateCertificateAuthenticity function.
 * - ValidateCertificateAuthenticityOutput - The return type for the validateCertificateAuthenticity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateCertificateAuthenticityInputSchema = z.object({
  certificateDataUri: z
    .string()
    .describe(
      "A certificate document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ValidateCertificateAuthenticityInput = z.infer<typeof ValidateCertificateAuthenticityInputSchema>;

const ValidateCertificateAuthenticityOutputSchema = z.object({
  confidenceScore: z
    .number()
    .describe(
      'A confidence score (0-1) indicating the likelihood of the certificate being genuine, based on formatting conventions and data validation.'
    ),
  validationDetails: z
    .string()
    .describe('Details about the validation process and any anomalies found.'),
});
export type ValidateCertificateAuthenticityOutput = z.infer<typeof ValidateCertificateAuthenticityOutputSchema>;

export async function validateCertificateAuthenticity(
  input: ValidateCertificateAuthenticityInput
): Promise<ValidateCertificateAuthenticityOutput> {
  return validateCertificateAuthenticityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateCertificateAuthenticityPrompt',
  input: {schema: ValidateCertificateAuthenticityInputSchema},
  output: {schema: ValidateCertificateAuthenticityOutputSchema},
  prompt: `You are an expert in document authentication, specializing in identifying fraudulent certificates.
  Analyze the provided certificate document and determine its likelihood of being genuine.

  Evaluate the document based on formatting conventions, data consistency, and overall visual integrity.
  Pay close attention to:
  - Font styles and sizes
  - Alignment and spacing of text elements
  - Presence of official seals, signatures, and watermarks
  - Consistency of dates, names, and identification numbers

  When analyzing dates, be mindful that a future date (e.g., for a course completion in 2025) might indicate a provisional certificate or a future event, and is not necessarily a sign of fraud. Note this in your validation details if applicable.

  Provide a confidence score between 0 and 1, where 1 indicates a high likelihood of authenticity and 0 indicates a high likelihood of fraud.

  Also, provide detailed validation details explaining the reasoning behind the confidence score, highlighting any anomalies or inconsistencies found.

  Certificate Document: {{media url=certificateDataUri}}
  `,
});

const validateCertificateAuthenticityFlow = ai.defineFlow(
  {
    name: 'validateCertificateAuthenticityFlow',
    inputSchema: ValidateCertificateAuthenticityInputSchema,
    outputSchema: ValidateCertificateAuthenticityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
