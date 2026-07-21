'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { SkeuoCard } from '@/components/ui/skeuo-card';
import { SkeuoButton } from '@/components/ui/skeuo-button';
import { SkeuoInput } from '@/components/ui/skeuo-input';
import { Building2, KeyRound, Mail, AlertTriangle, Key, ArrowRight, UserCheck } from 'lucide-react';

export default function UniversityLoginPage() {
  const router = useRouter();
  const { signIn, loading, error } = useAuth();
  
  const [email, setEmail] = useState('user@university.edu');
  const [password, setPassword] = useState('password123');
  const [loginError, setLoginError] = useState<string | null>(null);

  const fillDemoCredentials = () => {
    setEmail('registrar@iitb.ac.in');
    setPassword('University#2025');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    try {
      await signIn(email, password);
      router.push('/university/dashboard');
    } catch (err: any) {
      setLoginError(err.message || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-[#EAEFF5] flex items-center justify-center p-4">
      <SkeuoCard variant="raised" className="w-full max-w-md p-8 space-y-6">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl skeuo-inset mx-auto flex items-center justify-center text-indigo-600">
            <Building2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">University Portal Login</h2>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Access institutional credential vault
          </p>
        </div>

        {/* Public Prototype Demo Credentials Card */}
        <div className="skeuo-inset p-3.5 rounded-2xl border border-indigo-200/60 bg-indigo-50/50 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-wider text-indigo-800 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-indigo-600" /> Public Demo Credentials
            </span>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-[10px] font-bold text-indigo-700 hover:text-indigo-900 bg-white px-2 py-0.5 rounded-md border border-indigo-200 shadow-sm"
            >
              Auto-Fill Demo
            </button>
          </div>
          <div className="text-[11px] font-mono text-slate-700 space-y-0.5">
            <p><span className="text-slate-400">Email:</span> registrar@iitb.ac.in</p>
            <p><span className="text-slate-400">Pass:</span> University#2025</p>
          </div>
        </div>

        {/* Error Notification */}
        {(loginError || error) && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{loginError || error}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <SkeuoInput
            label="Institutional Email"
            type="email"
            placeholder="you@youruniversity.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-4 h-4 text-slate-400" />}
            required
          />

          <SkeuoInput
            label="Security Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<KeyRound className="w-4 h-4 text-slate-400" />}
            required
          />

          {/* Action Button */}
          <SkeuoButton
            type="submit"
            variant="primary"
            className="w-full shadow-md"
            disabled={loading}
          >
            {loading ? 'Authenticating Session...' : 'Sign In to Vault'}
          </SkeuoButton>
        </form>

        {/* Help & Registration Footer */}
        <div className="text-center border-t border-slate-200/60 pt-4 space-y-2 text-xs font-medium text-slate-500">
          <p>
            Need onboarding for your university?{' '}
            <Link href="/university/register" className="text-indigo-600 font-bold hover:underline inline-flex items-center gap-1">
              Submit Request <ArrowRight className="w-3 h-3" />
            </Link>
          </p>
        </div>

      </SkeuoCard>
    </div>
  );
}
