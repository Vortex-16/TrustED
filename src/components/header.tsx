'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldCheck,
  Building2,
  GraduationCap,
  Briefcase,
  Landmark,
  Lock,
  HelpCircle,
  Menu,
  X,
  CheckCircle2,
  Search,
} from 'lucide-react';
import { SkeuoButton } from './ui/skeuo-button';

/**
 * Ashok Chakra Icon Component (24-Spoke Wheel)
 */
const AshokChakra = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor">
    <circle cx="50" cy="50" r="44" strokeWidth="6" stroke="#000080" />
    <circle cx="50" cy="50" r="10" strokeWidth="5" fill="#000080" stroke="#000080" />
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 360) / 24;
      const rad = (angle * Math.PI) / 180;
      const x2 = 50 + 44 * Math.cos(rad);
      const y2 = 50 + 44 * Math.sin(rad);
      return (
        <line
          key={i}
          x1="50"
          y1="50"
          x2={x2}
          y2={y2}
          stroke="#000080"
          strokeWidth="2.5"
        />
      );
    })}
  </svg>
);

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Verify Engine', icon: Search },
    { href: '/verify', label: 'Verify Cert', icon: CheckCircle2 },
    { href: '/university/login', label: 'University', icon: Building2 },
    { href: '/admin/login', label: 'Admin & Govt', icon: Lock },
    { href: '/help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#EAEFF5]/90 backdrop-blur-md shadow-md border-b border-white/60">
      {/* Indian Flag Tri-Color Top Strip */}
      <div className="w-full h-1.5 flex">
        <div className="w-1/3 bg-[#FF9933] h-full" title="Saffron - Courage & Sacrifice"></div>
        <div className="w-1/3 bg-[#FFFFFF] h-full flex items-center justify-center relative">
          <div className="absolute -top-1 w-3 h-3 rounded-full border border-[#000080] bg-white flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#000080]"></div>
          </div>
        </div>
        <div className="w-1/3 bg-[#138808] h-full" title="India Green - Faith & Chivalry"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand with Indian Tricolor Accent */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl skeuo-card flex items-center justify-center text-indigo-700 group-hover:scale-105 transition-transform border border-white/80">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-800 tracking-tight">
                  Verify<span className="text-[#FF9933]">Ed</span>
                </span>
                <AshokChakra className="w-4 h-4 text-[#000080] animate-spin-slow" />
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#138808]/15 text-[#138808] border border-[#138808]/30">
                  SIH 2025
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                National Credential Vault
              </span>
            </div>
          </Link>

          {/* Desktop Skeuomorphic Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 skeuo-inset p-1.5 rounded-full">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'skeuo-btn-primary text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/verify">
              <SkeuoButton variant="accent" size="sm" className="shadow-md">
                Instant Scan
              </SkeuoButton>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-2xl skeuo-card flex items-center justify-center text-slate-700 focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/60 bg-[#EAEFF5] px-4 pt-3 pb-6 space-y-3 skeuo-glass">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${
                    isActive
                      ? 'skeuo-btn-primary text-white'
                      : 'skeuo-inset text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 text-indigo-600" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-300/50 flex flex-col gap-2">
            <Link href="/verify" onClick={() => setMobileMenuOpen(false)}>
              <SkeuoButton variant="primary" className="w-full">
                Scan Certificate
              </SkeuoButton>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
