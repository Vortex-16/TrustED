'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SkeuoCard } from '@/components/ui/skeuo-card';
import { SkeuoButton } from '@/components/ui/skeuo-button';
import { SkeuoInput } from '@/components/ui/skeuo-input';
import { OcrEngine, ExtractedCertificateData } from '@/lib/ocr-engine';
import { AiFraudEngine, FraudAnalysisResult } from '@/lib/ai-fraud-engine';
import { BlockchainVerifier, LedgerVerificationResult } from '@/lib/blockchain-verifier';
import {
  ShieldCheck,
  Building2,
  GraduationCap,
  Briefcase,
  Landmark,
  ShieldAlert,
  FileSearch,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Database,
  ExternalLink,
  Lock,
  QrCode,
  Search,
} from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'verify' | 'student' | 'university' | 'employer' | 'government' | 'admin'>('verify');
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrData, setOcrData] = useState<ExtractedCertificateData | null>(null);
  const [fraudData, setFraudData] = useState<FraudAnalysisResult | null>(null);
  const [ledgerData, setLedgerData] = useState<LedgerVerificationResult | null>(null);
  const [searchCertId, setSearchCertId] = useState('');

  const handleSimulatedUpload = async () => {
    setIsProcessing(true);
    setTimeout(async () => {
      const dummyBuffer = Buffer.from('VerifyEd Academic Certificate Sample Document');
      const ocr = await OcrEngine.processCertificateDocument(dummyBuffer, 'sample_certificate.pdf');
      const ledger = await BlockchainVerifier.verifyOnLedger(ocr.computedHash);
      const fraud = AiFraudEngine.analyzeDocument(ocr, ocr.computedHash);

      setOcrData(ocr);
      setLedgerData(ledger);
      setFraudData(fraud);
      setIsProcessing(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#EAEFF5] text-slate-800 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Skeuomorphic Header */}
        <header className="skeuo-card p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl skeuo-inset flex items-center justify-center text-indigo-600">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-800 flex items-center gap-2">
                VerifyEd <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-bold border border-indigo-200">v2.0 Enterprise</span>
              </h1>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Blockchain-Powered Academic Credential Verification Platform
              </p>
            </div>
          </div>

          {/* Skeuomorphic Pill Portal Selector */}
          <div className="skeuo-inset p-1.5 flex flex-wrap justify-center gap-1 rounded-full">
            {[
              { id: 'verify', label: 'Verify Engine', icon: Search },
              { id: 'student', label: 'Student', icon: GraduationCap },
              { id: 'university', label: 'University', icon: Building2 },
              { id: 'employer', label: 'Employer', icon: Briefcase },
              { id: 'government', label: 'Government', icon: Landmark },
              { id: 'admin', label: 'Admin', icon: Lock },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'skeuo-btn-primary text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </header>

        {/* Dynamic Portal View */}
        {activeTab === 'verify' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Upload & Query Box */}
            <div className="lg:col-span-5 space-y-6">
              <SkeuoCard className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
                  <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <FileSearch className="w-5 h-5 text-indigo-600" />
                    Instant Credential Verification
                  </h2>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    Sub-second RPC
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Upload a student diploma PDF or image to execute automated Tesseract OCR, AI computer vision fraud inspection, and Polygon blockchain ledger hash validation.
                </p>

                {/* Drag and Drop Zone */}
                <div
                  onClick={handleSimulatedUpload}
                  className="skeuo-inset p-8 flex flex-col items-center justify-center text-center gap-3 cursor-pointer group hover:bg-slate-200/50 transition-all border-2 border-dashed border-slate-300"
                >
                  <div className="w-14 h-14 rounded-2xl skeuo-card flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {isProcessing ? 'Processing OCR & AI Inspection...' : 'Click to Upload Certificate PDF / Scan QR'}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">Supports PDF, PNG, JPEG up to 25MB</p>
                  </div>
                  {isProcessing && (
                    <div className="w-full max-w-xs bg-slate-300 h-1.5 rounded-full overflow-hidden mt-2">
                      <div className="bg-indigo-600 h-full w-2/3 animate-pulse rounded-full"></div>
                    </div>
                  )}
                </div>

                {/* Cert ID Direct Lookup */}
                <div className="flex gap-2">
                  <SkeuoInput
                    placeholder="Enter Certificate ID (e.g. IITB-2025-CS-0941)"
                    value={searchCertId}
                    onChange={(e) => setSearchCertId(e.target.value)}
                    icon={<Search className="w-4 h-4 text-slate-400" />}
                  />
                  <SkeuoButton variant="primary" onClick={handleSimulatedUpload}>
                    Query
                  </SkeuoButton>
                </div>
              </SkeuoCard>

              {/* Enterprise Telemetry Stats */}
              <div className="grid grid-cols-2 gap-4">
                <SkeuoCard variant="raised" className="text-center p-4">
                  <p className="text-2xl font-black text-indigo-600">100%</p>
                  <p className="text-xs font-semibold text-slate-500 uppercase mt-1">Tamper Proof Ledger</p>
                </SkeuoCard>
                <SkeuoCard variant="raised" className="text-center p-4">
                  <p className="text-2xl font-black text-emerald-600">&lt; 500ms</p>
                  <p className="text-xs font-semibold text-slate-500 uppercase mt-1">Verification Latency</p>
                </SkeuoCard>
              </div>
            </div>

            {/* Results Visualizer Panel */}
            <div className="lg:col-span-7 space-y-6">
              {ocrData && fraudData && ledgerData ? (
                <SkeuoCard className="space-y-6">
                  {/* Status Banner */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl skeuo-inset gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full skeuo-badge-verified flex items-center justify-center">
                        <CheckCircle2 className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          AUTHENTIC CREDENTIAL
                        </span>
                        <h3 className="text-lg font-black text-slate-800 mt-1">
                          {ocrData.degree} in {ocrData.course}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">{ocrData.university}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-semibold text-slate-400 uppercase">AI Fraud Score</p>
                      <p className="text-3xl font-black text-emerald-600">{fraudData.confidenceScore}%</p>
                      <p className="text-xs font-bold text-slate-500">Confidence Match</p>
                    </div>
                  </div>

                  {/* Extracted Certificate Fields Grid */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                      OCR Extracted Credentials
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { label: 'Student Name', val: ocrData.studentName },
                        { label: 'Roll Number', val: ocrData.rollNumber },
                        { label: 'Reg Number', val: ocrData.registrationNumber },
                        { label: 'Certificate ID', val: ocrData.certificateId },
                        { label: 'Issue Date', val: ocrData.issueDate },
                        { label: 'CGPA', val: `${ocrData.cgpa} / 10.0` },
                      ].map((field) => (
                        <div key={field.label} className="skeuo-inset p-3 rounded-xl">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">{field.label}</p>
                          <p className="text-xs font-black text-slate-800 mt-0.5 truncate">{field.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 9-Criteria AI Fraud Inspector Grid */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-indigo-600" />
                      Multi-Vector AI Fraud Detection Breakdown
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {Object.entries(fraudData.scores).map(([key, val]) => (
                        <div key={key} className="skeuo-inset p-3 rounded-xl">
                          <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase">
                            <span>{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="text-emerald-600 font-black">{val}%</span>
                          </div>
                          <div className="w-full bg-slate-300 h-1.5 rounded-full overflow-hidden mt-1.5">
                            <div
                              className="bg-emerald-500 h-full rounded-full"
                              style={{ width: `${val}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Blockchain Ledger Proof */}
                  <div className="skeuo-inset p-4 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                        <Database className="w-4 h-4 text-indigo-600" />
                        Polygon Blockchain Immutable Anchor Proof
                      </h4>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                        {ledgerData.network}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 font-medium">Tx Hash: </span>
                        <span className="font-mono text-slate-700 truncate inline-block max-w-[200px] align-bottom">
                          {ledgerData.transactionHash}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium">Block Height: </span>
                        <span className="font-semibold text-slate-800">#{ledgerData.blockNumber}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium">IPFS CID: </span>
                        <span className="font-mono text-slate-700 truncate inline-block max-w-[200px] align-bottom">
                          {ledgerData.ipfsCid}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium">Issuer Key: </span>
                        <span className="font-mono text-slate-700 truncate inline-block max-w-[180px] align-bottom">
                          {ledgerData.issuingUniversityAddress}
                        </span>
                      </div>
                    </div>
                  </div>
                </SkeuoCard>
              ) : (
                <SkeuoCard className="flex flex-col items-center justify-center p-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full skeuo-inset flex items-center justify-center text-slate-400">
                    <ShieldAlert className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-700">No Document Uploaded</h3>
                    <p className="text-xs text-slate-500 max-w-sm mt-1">
                      Click the upload box on the left to simulate a live certificate OCR analysis and blockchain ledger query.
                    </p>
                  </div>
                  <SkeuoButton variant="secondary" onClick={handleSimulatedUpload}>
                    Simulate Sample Certificate Verification
                  </SkeuoButton>
                </SkeuoCard>
              )}
            </div>
          </div>
        )}

        {/* Other Portals Overview Grid */}
        {activeTab !== 'verify' && (
          <SkeuoCard className="p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full skeuo-inset mx-auto flex items-center justify-center text-indigo-600">
              {activeTab === 'student' && <GraduationCap className="w-8 h-8" />}
              {activeTab === 'university' && <Building2 className="w-8 h-8" />}
              {activeTab === 'employer' && <Briefcase className="w-8 h-8" />}
              {activeTab === 'government' && <Landmark className="w-8 h-8" />}
              {activeTab === 'admin' && <Lock className="w-8 h-8" />}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 capitalize">{activeTab} Portal Suite</h2>
              <p className="text-sm text-slate-500 max-w-xl mx-auto mt-2">
                Enterprise dashboard for {activeTab} operations including role-based access control, automated certificate issuance, revocation management, and audit telemetry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left pt-4">
              <SkeuoCard variant="inset" className="p-5 space-y-2">
                <h4 className="text-sm font-bold text-slate-800">Decentralized Web3 Auth</h4>
                <p className="text-xs text-slate-500">Firebase Authentication paired with MetaMask / WalletConnect EIP-712 typed signing.</p>
              </SkeuoCard>
              <SkeuoCard variant="inset" className="p-5 space-y-2">
                <h4 className="text-sm font-bold text-slate-800">Batch Processing</h4>
                <p className="text-xs text-slate-500">Merkle tree root rollups for 100,000+ certificates per block submission.</p>
              </SkeuoCard>
              <SkeuoCard variant="inset" className="p-5 space-y-2">
                <h4 className="text-sm font-bold text-slate-800">Rest API & Webhooks</h4>
                <p className="text-xs text-slate-500">Enterprise REST endpoints with OpenAPI 3.0 specs for ATS integration.</p>
              </SkeuoCard>
            </div>
          </SkeuoCard>
        )}

      </div>
    </div>
  );
}
