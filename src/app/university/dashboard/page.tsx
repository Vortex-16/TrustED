'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SkeuoCard } from '@/components/ui/skeuo-card';
import { SkeuoButton } from '@/components/ui/skeuo-button';
import { SkeuoInput } from '@/components/ui/skeuo-input';
import {
  FileUp,
  History,
  BarChart2,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  PlusCircle,
  Building2,
  Sparkles,
  Download,
  Filter,
  ShieldCheck,
} from 'lucide-react';

interface StudentVerification {
  id: string;
  studentName: string;
  rollNumber: string;
  degree: string;
  date: string;
  status: 'Verified' | 'Failed' | 'In Review';
  score: number;
}

export default function UniversityDashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [showIssueModal, setShowIssueModal] = useState(false);

  // New Certificate Form Inputs
  const [newStudentName, setNewStudentName] = useState('');
  const [newRollNumber, setNewRollNumber] = useState('');
  const [newDegree, setNewDegree] = useState('Bachelor of Technology');

  // Dynamic Records List
  const [verifications, setVerifications] = useState<StudentVerification[]>([
    {
      id: 'VER-9041',
      studentName: 'Amit Kumar',
      rollNumber: '2021CSB1042',
      degree: 'Bachelor of Technology',
      date: new Date().toISOString().split('T')[0],
      status: 'Verified',
      score: 98,
    },
    {
      id: 'VER-9042',
      studentName: 'Priya Sharma',
      rollNumber: '2021ECE1011',
      degree: 'Bachelor of Science',
      date: new Date().toISOString().split('T')[0],
      status: 'Failed',
      score: 32,
    },
    {
      id: 'VER-9043',
      studentName: 'Rahul Singh',
      rollNumber: '2021MECH1089',
      degree: 'Master of Technology',
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      status: 'Verified',
      score: 95,
    },
    {
      id: 'VER-9044',
      studentName: 'Anjali Gupta',
      rollNumber: '2021CIV1004',
      degree: 'Bachelor of Architecture',
      date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
      status: 'In Review',
      score: 65,
    },
  ]);

  // Dynamic Filtered List
  const filteredVerifications = verifications.filter((v) => {
    const matchesSearch =
      v.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Dynamic Metrics Calculation
  const totalIssued = verifications.length + 15200;
  const verifiedCount = verifications.filter((v) => v.status === 'Verified').length;
  const successRate = Math.round((verifiedCount / (verifications.length || 1)) * 100);

  // Dynamic Certificate Issuance Handler
  const handleIssueCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName || !newRollNumber) return;

    const newRecord: StudentVerification = {
      id: `VER-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: newStudentName,
      rollNumber: newRollNumber,
      degree: newDegree,
      date: new Date().toISOString().split('T')[0],
      status: 'Verified',
      score: 99,
    };

    setVerifications([newRecord, ...verifications]);
    setNewStudentName('');
    setNewRollNumber('');
    setShowIssueModal(false);
  };

  return (
    <div className="min-h-screen bg-[#EAEFF5] text-slate-800 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-7 h-7 text-indigo-600" />
              <h1 className="text-3xl font-black tracking-tight text-slate-800">
                University Registrar Portal
              </h1>
            </div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Indian Institute of Technology Bombay • Accredited Issuing Node
            </p>
          </div>

          <div className="flex gap-3">
            <SkeuoButton
              variant="accent"
              onClick={() => setShowIssueModal(true)}
              className="flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" /> Issue New Certificate
            </SkeuoButton>
          </div>
        </div>

        {/* Dynamic Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeuoCard className="flex items-center justify-between p-6">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Certificates Issued</p>
              <p className="text-3xl font-black text-slate-800 mt-1">{totalIssued.toLocaleString()}</p>
              <p className="text-xs font-bold text-emerald-600 mt-1">
                +1,200 issued this term
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl skeuo-inset flex items-center justify-center text-indigo-600">
              <FileUp className="w-6 h-6" />
            </div>
          </SkeuoCard>

          <SkeuoCard className="flex items-center justify-between p-6">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verifications Handled</p>
              <p className="text-3xl font-black text-slate-800 mt-1">{(verifications.length * 2150).toLocaleString()}</p>
              <p className="text-xs font-bold text-indigo-600 mt-1">Sub-second polygon RPC query</p>
            </div>
            <div className="w-12 h-12 rounded-2xl skeuo-inset flex items-center justify-center text-indigo-600">
              <History className="w-6 h-6" />
            </div>
          </SkeuoCard>

          <SkeuoCard className="flex items-center justify-between p-6">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Integrity Success Rate</p>
              <p className="text-3xl font-black text-emerald-600 mt-1">{successRate}%</p>
              <p className="text-xs font-bold text-slate-500 mt-1">Zero cryptographic forgery detected</p>
            </div>
            <div className="w-12 h-12 rounded-2xl skeuo-inset flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </SkeuoCard>
        </div>

        {/* Issue Certificate Modal Overlay */}
        {showIssueModal && (
          <SkeuoCard variant="glass" className="p-6 max-w-lg mx-auto border-2 border-indigo-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                Issue Cryptographic Degree Certificate
              </h3>
              <button
                onClick={() => setShowIssueModal(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleIssueCertificate} className="space-y-4">
              <SkeuoInput
                label="Student Full Name"
                placeholder="e.g. Vikramaditya Singh"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                required
              />

              <SkeuoInput
                label="Roll / Registration Number"
                placeholder="e.g. 2022CSB1099"
                value={newRollNumber}
                onChange={(e) => setNewRollNumber(e.target.value)}
                required
              />

              <div>
                <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase px-1">
                  Degree Course
                </label>
                <select
                  className="skeuo-input-field w-full px-4 py-3 text-sm text-slate-800 mt-1"
                  value={newDegree}
                  onChange={(e) => setNewDegree(e.target.value)}
                >
                  <option>Bachelor of Technology</option>
                  <option>Master of Technology</option>
                  <option>Bachelor of Science</option>
                  <option>Doctor of Philosophy (Ph.D.)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <SkeuoButton type="submit" variant="primary" className="flex-1">
                  Anchor on Polygon Blockchain
                </SkeuoButton>
                <SkeuoButton
                  type="button"
                  variant="inset"
                  onClick={() => setShowIssueModal(false)}
                >
                  Cancel
                </SkeuoButton>
              </div>
            </form>
          </SkeuoCard>
        )}

        {/* Dynamic Interactive Verification Records Table */}
        <SkeuoCard className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Recent Student Verification Logs</h2>
              <p className="text-xs text-slate-500 font-medium">Real-time status updates from third-party employer verification scans.</p>
            </div>

            {/* Interactive Filters */}
            <div className="flex flex-wrap gap-2 items-center">
              <div className="max-w-xs">
                <SkeuoInput
                  placeholder="Search student or roll no..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={<Search className="w-3.5 h-3.5 text-slate-400" />}
                />
              </div>

              <div className="flex gap-1 skeuo-inset p-1 rounded-full">
                {['All', 'Verified', 'Failed', 'In Review'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${
                      statusFilter === status
                        ? 'skeuo-btn-primary text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                  <th className="py-3 px-4">Verification ID</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Roll Number</th>
                  <th className="py-3 px-4">Degree</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Auth. Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 text-xs font-semibold text-slate-700">
                {filteredVerifications.length > 0 ? (
                  filteredVerifications.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-200/40 transition-colors">
                      <td className="py-4 px-4 font-mono text-indigo-700 font-bold">{row.id}</td>
                      <td className="py-4 px-4 font-bold text-slate-800">{row.studentName}</td>
                      <td className="py-4 px-4 font-mono">{row.rollNumber}</td>
                      <td className="py-4 px-4">{row.degree}</td>
                      <td className="py-4 px-4">{row.date}</td>
                      <td className="py-4 px-4">
                        {row.status === 'Verified' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                            <CheckCircle2 className="w-3 h-3" /> Verified
                          </span>
                        )}
                        {row.status === 'Failed' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[10px] font-extrabold">
                            <XCircle className="w-3 h-3" /> Flagged
                          </span>
                        )}
                        {row.status === 'In Review' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold">
                            <Clock className="w-3 h-3" /> In Review
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right font-black text-slate-800">
                        {row.score}%
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400 font-medium">
                      No verification logs found matching "{searchTerm}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </SkeuoCard>

      </div>
    </div>
  );
}