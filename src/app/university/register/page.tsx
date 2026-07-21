'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SkeuoCard } from '@/components/ui/skeuo-card';
import { SkeuoButton } from '@/components/ui/skeuo-button';
import { SkeuoInput } from '@/components/ui/skeuo-input';
import {
  Building2,
  Mail,
  FileText,
  MapPin,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function UniversityRegisterPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [reqId, setReqId] = useState('');

  // Form State
  const [institutionName, setInstitutionName] = useState('Indian Institute of Technology Bombay');
  const [institutionCode, setInstitutionCode] = useState('IITB-IND-01');
  const [domain, setDomain] = useState('iitb.ac.in');
  const [stateRegion, setStateRegion] = useState('Maharashtra');
  const [email, setEmail] = useState('registrar@iitb.ac.in');
  const [taxId, setTaxId] = useState('GOV-REG-88392');
  const [walletAddress, setWalletAddress] = useState('0x1A2b3C4d5E6F7a8B9c0D1e2F3a4B5c6D7e8F9a0B');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedReqId = `REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setReqId(generatedReqId);
    setSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-[#EAEFF5] flex items-center justify-center p-4 md:p-8">
      <SkeuoCard variant="raised" className="w-full max-w-2xl p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl skeuo-inset mx-auto flex items-center justify-center text-indigo-600">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            University Accreditation Request
          </h1>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Submit institutional credentials for Ministry of Education Polygon Onboarding
          </p>
        </div>

        {submitted ? (
          <div className="skeuo-inset p-8 rounded-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                REQUEST SUBMITTED
              </span>
              <h2 className="text-xl font-bold text-slate-800 mt-2">
                Accreditation Request {reqId} Recorded
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
                Your institutional onboarding application for <b>{institutionName}</b> has been queued for Government Admin review.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-left text-xs space-y-1">
              <p><span className="text-slate-400">Institutional Code:</span> <span className="font-bold">{institutionCode}</span></p>
              <p><span className="text-slate-400">Registrar Email:</span> <span className="font-bold">{email}</span></p>
              <p><span className="text-slate-400">Issuer Wallet:</span> <span className="font-mono text-slate-700">{walletAddress}</span></p>
            </div>

            <div className="pt-2 flex justify-center gap-4">
              <Link href="/university/login">
                <SkeuoButton variant="primary" className="flex items-center gap-2">
                  Proceed to Login <ArrowRight className="w-4 h-4" />
                </SkeuoButton>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SkeuoInput
                label="Institution Name"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                icon={<Building2 className="w-4 h-4 text-slate-400" />}
                required
              />

              <SkeuoInput
                label="Institutional Code"
                value={institutionCode}
                onChange={(e) => setInstitutionCode(e.target.value)}
                icon={<FileText className="w-4 h-4 text-slate-400" />}
                required
              />

              <SkeuoInput
                label="Official Web Domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                icon={<Sparkles className="w-4 h-4 text-slate-400" />}
                required
              />

              <SkeuoInput
                label="State / Region"
                value={stateRegion}
                onChange={(e) => setStateRegion(e.target.value)}
                icon={<MapPin className="w-4 h-4 text-slate-400" />}
                required
              />

              <SkeuoInput
                label="Registrar Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4 text-slate-400" />}
                required
              />

              <SkeuoInput
                label="Govt Registration / Tax ID"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                icon={<ShieldCheck className="w-4 h-4 text-slate-400" />}
                required
              />
            </div>

            <SkeuoInput
              label="Polygon Issuer Wallet Public Address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              icon={<Wallet className="w-4 h-4 text-slate-400" />}
              required
            />

            <SkeuoButton
              type="submit"
              variant="primary"
              className="w-full shadow-md py-4 text-base mt-2"
            >
              Submit Onboarding Application
            </SkeuoButton>

            <div className="text-center pt-2 text-xs font-medium text-slate-500">
              Already registered?{' '}
              <Link href="/university/login" className="text-indigo-600 font-bold hover:underline">
                Sign In Here
              </Link>
            </div>
          </form>
        )}

      </SkeuoCard>
    </div>
  );
}
