'use client';

import React, { useState } from 'react';
import { SkeuoCard } from '@/components/ui/skeuo-card';
import { SkeuoButton } from '@/components/ui/skeuo-button';
import { SkeuoInput } from '@/components/ui/skeuo-input';
import {
  ShieldCheck,
  TrendingUp,
  Users,
  Check,
  X,
  Building,
  Activity,
  Cpu,
  Search,
  CheckCircle2,
  AlertTriangle,
  Server,
  RefreshCw,
} from 'lucide-react';

interface InstitutionRequest {
  id: string;
  name: string;
  type: 'University' | 'Company' | 'Regulator';
  state: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export default function AdminDashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [notification, setNotification] = useState<string | null>(null);

  // Dynamic Institution Verification Requests State
  const [requests, setRequests] = useState<InstitutionRequest[]>([
    {
      id: 'REQ-101',
      name: 'Ranchi University',
      type: 'University',
      state: 'Jharkhand',
      date: '2025-06-10',
      status: 'Pending',
    },
    {
      id: 'REQ-102',
      name: 'TechCorp India Pvt. Ltd.',
      type: 'Company',
      state: 'Karnataka',
      date: '2025-06-09',
      status: 'Pending',
    },
    {
      id: 'REQ-103',
      name: 'BIT Mesra',
      type: 'University',
      state: 'Jharkhand',
      date: '2025-06-08',
      status: 'Pending',
    },
    {
      id: 'REQ-104',
      name: 'National Accreditation Board',
      type: 'Regulator',
      state: 'Delhi',
      date: '2025-06-07',
      status: 'Approved',
    },
  ]);

  // Dynamic Metrics Calculation
  const approvedCount = 89 + requests.filter((r) => r.status === 'Approved').length;
  const pendingCount = requests.filter((r) => r.status === 'Pending').length;

  // Interactive Approve Handler
  const handleApprove = (id: string, name: string) => {
    setRequests(
      requests.map((req) => (req.id === id ? { ...req, status: 'Approved' } : req))
    );
    triggerNotification(`Approved ${name}! Institution has been onboarded to Polygon Registry.`);
  };

  // Interactive Reject Handler
  const handleReject = (id: string, name: string) => {
    setRequests(
      requests.map((req) => (req.id === id ? { ...req, status: 'Rejected' } : req))
    );
    triggerNotification(`Rejected onboarding request for ${name}.`);
  };

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || req.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#EAEFF5] text-slate-800 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-indigo-600" />
              <h1 className="text-3xl font-black tracking-tight text-slate-800">
                Government Regulatory & Admin Dashboard
              </h1>
            </div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Ministry of Education • National Credential Audit Command Center
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full skeuo-inset text-xs font-bold text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Polygon Amoy RPC Online
          </div>
        </div>

        {/* Dynamic Notification Toast */}
        {notification && (
          <div className="p-4 rounded-2xl bg-indigo-900 text-white text-xs font-bold shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>{notification}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-slate-300 hover:text-white">
              ✕
            </button>
          </div>
        )}

        {/* Dynamic Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeuoCard className="flex items-center justify-between p-6">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">System Verifications</p>
              <p className="text-3xl font-black text-slate-800 mt-1">1,234,567</p>
              <p className="text-xs font-bold text-emerald-600 mt-1">+10.2% monthly growth</p>
            </div>
            <div className="w-12 h-12 rounded-2xl skeuo-inset flex items-center justify-center text-indigo-600">
              <Activity className="w-6 h-6" />
            </div>
          </SkeuoCard>

          <SkeuoCard className="flex items-center justify-between p-6">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fraud Anomaly Detection Rate</p>
              <p className="text-3xl font-black text-slate-800 mt-1">3.1%</p>
              <p className="text-xs font-bold text-indigo-600 mt-1">9-criteria computer vision model</p>
            </div>
            <div className="w-12 h-12 rounded-2xl skeuo-inset flex items-center justify-center text-indigo-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </SkeuoCard>

          <SkeuoCard className="flex items-center justify-between p-6">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Accredited Institutions</p>
              <p className="text-3xl font-black text-emerald-600 mt-1">{approvedCount}</p>
              <p className="text-xs font-bold text-slate-500 mt-1">{pendingCount} pending onboarding requests</p>
            </div>
            <div className="w-12 h-12 rounded-2xl skeuo-inset flex items-center justify-center text-emerald-600">
              <Users className="w-6 h-6" />
            </div>
          </SkeuoCard>
        </div>

        {/* Real-time System Telemetry Panel */}
        <SkeuoCard className="p-6 space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <Server className="w-4 h-4 text-indigo-600" /> Live System Telemetry & RPC Status
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="skeuo-inset p-3 rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase">PostgreSQL DB (Neon)</p>
              <p className="text-xs font-black text-emerald-600 mt-0.5">CONNECTED (3ms)</p>
            </div>
            <div className="skeuo-inset p-3 rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Redis Queue (Upstash)</p>
              <p className="text-xs font-black text-emerald-600 mt-0.5">HEALTHY (10,000 QPS)</p>
            </div>
            <div className="skeuo-inset p-3 rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase">IPFS Gateway (Pinata)</p>
              <p className="text-xs font-black text-emerald-600 mt-0.5">ONLINE (100% Pinned)</p>
            </div>
            <div className="skeuo-inset p-3 rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Polygon Amoy Block</p>
              <p className="text-xs font-black text-indigo-600 mt-0.5">#4,982,142</p>
            </div>
          </div>
        </SkeuoCard>

        {/* Dynamic Interactive Approval Table */}
        <SkeuoCard className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Institution Verification & Onboarding Requests</h2>
              <p className="text-xs text-slate-500 font-medium">Review and approve accreditation requests for universities and companies.</p>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <div className="max-w-xs">
                <SkeuoInput
                  placeholder="Filter institution..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={<Search className="w-3.5 h-3.5 text-slate-400" />}
                />
              </div>

              <div className="flex gap-1 skeuo-inset p-1 rounded-full">
                {['All', 'University', 'Company', 'Regulator'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${
                      typeFilter === type
                        ? 'skeuo-btn-primary text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                  <th className="py-3 px-4">Request ID</th>
                  <th className="py-3 px-4">Institution Name</th>
                  <th className="py-3 px-4">Category Type</th>
                  <th className="py-3 px-4">State / Region</th>
                  <th className="py-3 px-4">Submission Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Approve / Reject Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 text-xs font-semibold text-slate-700">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-200/40 transition-colors">
                    <td className="py-4 px-4 font-mono text-indigo-700 font-bold">{req.id}</td>
                    <td className="py-4 px-4 font-bold text-slate-800 flex items-center gap-2">
                      <Building className="w-4 h-4 text-indigo-600" />
                      {req.name}
                    </td>
                    <td className="py-4 px-4">{req.type}</td>
                    <td className="py-4 px-4">{req.state}</td>
                    <td className="py-4 px-4">{req.date}</td>
                    <td className="py-4 px-4">
                      {req.status === 'Pending' && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold">
                          Pending Audit
                        </span>
                      )}
                      {req.status === 'Approved' && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" /> Approved
                        </span>
                      )}
                      {req.status === 'Rejected' && (
                        <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[10px] font-extrabold">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      {req.status === 'Pending' ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleApprove(req.id, req.name)}
                            className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-sm"
                            title="Approve Institution"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject(req.id, req.name)}
                            className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-all shadow-sm"
                            title="Reject Institution"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">Action Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SkeuoCard>

      </div>
    </div>
  );
}