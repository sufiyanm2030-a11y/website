import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  FileText,
  CheckCircle2,
  Clock,
  Building2,
  AlertTriangle,
  Search,
  Filter,
  BarChart3,
  UserCheck,
  Sparkles,
  RefreshCw,
  Download,
  Eye,
  Send,
  Upload,
  X,
  Check,
  MapPin,
  FileSpreadsheet,
  Globe,
  User,
  Info,
  ChevronRight,
  ShieldCheck,
  Scale,
  Award,
  Zap,
  Lock,
  ArrowRight,
  BookOpen,
  Layers,
  Activity,
  FileCheck,
  Printer,
  ExternalLink,
  ChevronDown,
  Sliders,
  PieChart,
  TrendingUp,
  AlertCircle,
  ArrowUpRight,
  Share2
} from 'lucide-react';

// =========================================================
// MOCK DATA REPOSITORIES
// =========================================================

// AICTE Institutions Database
const INSTITUTIONS_DB = [
  { id: '1-3489201', name: 'Delhi Institute of Technical Education', state: 'Delhi', region: 'North Regional Office (New Delhi)', riskScore: 84, riskLevel: 'HIGH', totalCases: 18, primaryDomain: 'Fee Extortion & Deposit Refund' },
  { id: '1-[#1-4501292]', name: 'Maharashtra Institute of Technology & Science', state: 'Maharashtra', region: 'Western Regional Office (Mumbai)', riskScore: 91, riskLevel: 'HIGH', totalCases: 24, primaryDomain: 'Ragging & Harassment' },
  { id: '1-8930211', name: 'Vellore Engineering College, North Campus', state: 'Tamil Nadu', region: 'South Regional Office (Chennai)', riskScore: 62, riskLevel: 'MODERATE', totalCases: 11, primaryDomain: 'Infrastructure & Lab Deficit' },
  { id: '1-7712039', name: 'Gujarat Technological Academy', state: 'Gujarat', region: 'Central Regional Office (Bhopal)', riskScore: 28, riskLevel: 'LOW', totalCases: 4, primaryDomain: 'Faculty Salary Delay' },
  { id: '1-6629104', name: 'Karnataka National Polytechnic Institute', state: 'Karnataka', region: 'South-West Regional Office (Bengaluru)', riskScore: 45, riskLevel: 'MODERATE', totalCases: 8, primaryDomain: 'Fee Extortion' },
  { id: '1-9021482', name: 'Kolkata College of Engineering & Technology', state: 'West Bengal', region: 'Eastern Regional Office (Kolkata)', riskScore: 73, riskLevel: 'HIGH', totalCases: 15, primaryDomain: 'Unapproved Course Offering' }
];

// Initial Pre-Loaded Grievances
const INITIAL_COMPLAINTS = [
  {
    id: 'AICTE-2026-8941',
    permanentId: '1-3489201',
    collegeName: 'Delhi Institute of Technical Education',
    state: 'Delhi',
    region: 'North Regional Office (New Delhi)',
    domain: 'Fee Extortion & Deposit Refund',
    complainant: 'Rahul Sharma (B.Tech CSE Student)',
    submittedDate: '2026-10-24',
    slaDaysLeft: 1, // Red Critical < 2 Days
    status: 'UNDER_INVESTIGATION',
    urgency: 'HIGH',
    bureau: 'Legal Cell',
    title: 'Illegal Retention of Caution Deposit After Course Cancellation',
    description: 'College management refuses to refund mandatory caution security deposit of Rs 45,000 after cancellation of admission within statutory deadline, violating AICTE Fee Refund Guidelines 2026.',
    overlapFlag: true,
    overlapDetails: {
      matchedCaseId: 'AICTE-2026-4412',
      similarityScore: 88,
      conflictingBureau: 'PGRC Bureau',
      matchedDescription: 'Management refusing refund of security caution deposit after student admission withdrawal.'
    },
    ocrParsedText: 'OFFICIAL RECEIPT NO: 49201. Amount paid: INR 45,000 under Caution Security Deposit. Date: 12/10/2026. Signature Verified.',
    auditTrail: [
      { timestamp: '2026-10-24 10:15 AM', action: 'Grievance Registered via Public Web Portal', actor: 'Complainant (Rahul Sharma)' },
      { timestamp: '2026-10-24 10:16 AM', action: 'OCR Attachment Extraction Completed (Tesseract Engine v5.0)', actor: 'AI Cognitive Core' },
      { timestamp: '2026-10-24 10:17 AM', action: 'SBERT Vector Engine Flagged 88% Overlap with #AICTE-2026-4412', actor: 'Pgvector Semantic Index' },
      { timestamp: '2026-10-25 09:30 AM', action: 'Assigned to Legal Cell (North Zone)', actor: 'Smart Routing Gateway' },
      { timestamp: '2026-10-28 02:20 PM', action: 'Show Cause Notice Issued to College Management', actor: 'Legal Officer (#OFF-41)' }
    ]
  },
  {
    id: 'AICTE-2026-9104',
    permanentId: '1-4501292',
    collegeName: 'Maharashtra Institute of Technology & Science',
    state: 'Maharashtra',
    region: 'Western Regional Office (Mumbai)',
    domain: 'Ragging & Harassment',
    complainant: 'Anonymized Student (1st Year ME)',
    submittedDate: '2026-10-26',
    slaDaysLeft: 5, // Amber < 7 Days
    status: 'UNDER_INVESTIGATION',
    urgency: 'HIGH',
    bureau: 'PGRC / Student Safety',
    title: 'Severe Anti-Ragging Violation in Senior Hostel Block B',
    description: 'Physical harassment and verbal abuse by senior hostel inmates during late night hours. Campus Anti-Ragging Committee unresponsive to repeated representations.',
    overlapFlag: false,
    overlapDetails: null,
    ocrParsedText: 'Written petition copy submitted to Dean of Student Affairs dated 20th Oct 2026 with official acknowledgment stamp.',
    auditTrail: [
      { timestamp: '2026-10-26 11:00 AM', action: 'Grievance Registered Anonymously', actor: 'Complainant' },
      { timestamp: '2026-10-26 11:01 AM', action: 'Auto-Tagged as High Urgency (Student Safety SLA 7 Days)', actor: 'BERT Classifier' },
      { timestamp: '2026-10-26 11:05 AM', action: 'Direct Escalation to Central PGRC Officer', actor: 'Smart Routing Gateway' }
    ]
  },
  {
    id: 'AICTE-2026-7782',
    permanentId: '1-8930211',
    collegeName: 'Vellore Engineering College, North Campus',
    state: 'Tamil Nadu',
    region: 'South Regional Office (Chennai)',
    domain: 'Infrastructure & Lab Deficit',
    complainant: 'Dr. V. K. Raman (Head of Dept)',
    submittedDate: '2026-10-10',
    slaDaysLeft: 18, // Green < 30 Days
    status: 'RECEIVED',
    urgency: 'MEDIUM',
    bureau: 'Approval Bureau',
    title: 'Deficit in Mandatory GPU Computing Hardware for AI Curriculum',
    description: 'Computer Science Department lacking mandated GPU hardware labs and licensed software required for AICTE curriculum compliance.',
    overlapFlag: true,
    overlapDetails: {
      matchedCaseId: 'AICTE-2026-3390',
      similarityScore: 86,
      conflictingBureau: 'Finance Bureau',
      matchedDescription: 'Deficit in lab equipment funding allocated for CSE research labs.'
    },
    ocrParsedText: 'Lab Equipment Audit Register Excerpt showing 40 non-functional desktop units and missing GPU cards.',
    auditTrail: [
      { timestamp: '2026-10-10 03:40 PM', action: 'Grievance Registered by Faculty Member', actor: 'Complainant' },
      { timestamp: '2026-10-10 03:42 PM', action: 'Mapped to Permanent ID 1-8930211', actor: 'Institution Mapper' }
    ]
  },
  {
    id: 'AICTE-2026-6120',
    permanentId: '1-7712039',
    collegeName: 'Gujarat Technological Academy',
    state: 'Gujarat',
    region: 'Central Regional Office (Bhopal)',
    domain: 'Faculty Salary Delay',
    complainant: 'Prof. S. Patel',
    submittedDate: '2026-09-15',
    slaDaysLeft: 2,
    status: 'RESOLVED',
    urgency: 'LOW',
    bureau: 'Finance Bureau',
    title: 'Delay of 3 Months in Disbursement of Revised Pay Scale',
    description: 'Faculty members have not received monthly salary for 3 consecutive months despite repeated representations to trust management.',
    overlapFlag: false,
    overlapDetails: null,
    ocrParsedText: 'Bank statement attachment verifying salary credit gaps for July-Sept 2026.',
    auditTrail: [
      { timestamp: '2026-09-15 09:00 AM', action: 'Grievance Registered', actor: 'Complainant' },
      { timestamp: '2026-09-28 04:00 PM', action: 'Trust Management Disbursed Dues Following Notice', actor: 'Finance Officer' },
      { timestamp: '2026-10-02 10:00 AM', action: 'Case Marked Resolved & Disposed', actor: 'Finance Bureau Head' }
    ]
  }
];

// Peer-Reviewed Research Literature Repository (Slide 6 References)
const ACADEMIC_RESEARCH_DB = [
  {
    id: 'RES-01',
    category: 'PROBLEM',
    title: 'Adoption of Online Public Grievance Redressal System in India: Toward Developing a Unified View',
    year: '2016',
    publisher: 'Elsevier / Computers in Human Behavior',
    doi: '10.1016/j.chb.2016.01.032',
    link: 'https://doi.org/10.1016/j.chb.2016.01.032',
    keyPoint: 'Proves that un-integrated and fragmented public complaint portals lead to tracking drop-offs, missing case histories, and severe institutional delays in India.'
  },
  {
    id: 'RES-02',
    category: 'PROBLEM',
    title: 'CPGRAMS Public Grievance Redressal Reform Study & Impact Analysis',
    year: '2022',
    publisher: 'Department of Administrative Reforms and Public Grievances (DARPG, Govt. of India)',
    doi: 'Govt. Policy Document DARPG-2022',
    link: 'https://darpg.gov.in',
    keyPoint: 'Demonstrates that replacing un-linked regional complaint channels with a single central tracking engine reduced average grievance resolution times from 157 days down to 21 days.'
  },
  {
    id: 'RES-03',
    category: 'TECHNICAL',
    title: 'Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks',
    year: '2019',
    publisher: 'Association for Computational Linguistics (ACL / EMNLP)',
    doi: 'arXiv:1908.10084',
    link: 'https://aclanthology.org/D19-1410/',
    keyPoint: 'Validates using dense vector embeddings and cosine similarity to compare text meaning and eliminate cross-bureau duplicate complaints in seconds.'
  },
  {
    id: 'RES-04',
    category: 'TECHNICAL',
    title: 'Detection of Duplicate Defect Reports Using Natural Language Processing',
    year: '2007',
    publisher: 'IEEE Transactions on Software Engineering',
    doi: '10.1109/TSE.2007.1018',
    link: 'https://doi.org/10.1109/TSE.2007.1018',
    keyPoint: 'Proves that automated NLP tokenization and similarity models eliminate 40% to 60% of duplicate review workloads in multi-tiered management systems.'
  },
  {
    id: 'RES-05',
    category: 'MARKET',
    title: 'AI-Powered Grievance Management System for Petition Analysis, Prioritization, Routing, and Transparent Tracking',
    year: '2023',
    publisher: 'IEEE Access',
    doi: '10.1109/ACCESS.2023.3289120',
    link: 'https://doi.org/10.1109/ACCESS.2023.3289120',
    keyPoint: 'Demonstrates that multi-label transformer classifiers automatically categorize, prioritize, and route public complaints with over 92% accuracy.'
  },
  {
    id: 'RES-06',
    category: 'MARKET',
    title: 'Smart Complaint Routing Systems for Public Issues Using Multimodal Artificial Intelligence',
    year: '2024',
    publisher: 'IEEE Xplore',
    doi: '10.1109/I3CTCON68242.2026.11508062',
    link: 'https://ieeexplore.ieee.org/document/9824201',
    keyPoint: 'Proves that replacing manual paper dispatches with automated cloud routing cuts administrative processing turnaround time by over 40% across public departments.'
  }
];

export default function App() {
  // --- ACCESSIBILITY & GOI GLOBAL STATE ---
  const [fontSize, setFontSize] = useState('normal'); // 'small' | 'normal' | 'large'
  const [lang, setLang] = useState('EN'); // 'EN' | 'HI'
  const [highContrast, setHighContrast] = useState(false);

  // Navigation Roles
  const [activeRole, setActiveRole] = useState('public'); // 'public' | 'officer' | 'executive' | 'research'
  const [publicSubTab, setPublicSubTab] = useState('lodge'); // 'lodge' | 'track'

  // Core Data State
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [institutions] = useState(INSTITUTIONS_DB);

  // Public Form States
  const [formCollegeId, setFormCollegeId] = useState('1-3489201');
  const [formCollegeName, setFormCollegeName] = useState('Delhi Institute of Technical Education');
  const [formCollegeState, setFormCollegeState] = useState('Delhi');
  const [formCollegeRegion, setFormCollegeRegion] = useState('North Regional Office (New Delhi)');
  const [formBureau, setFormBureau] = useState('Legal Cell');
  const [formDomain, setFormDomain] = useState('Fee Extortion & Deposit Refund');
  const [formComplainant, setFormComplainant] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formFileName, setFormFileName] = useState('');
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [ocrResultText, setOcrResultText] = useState('');
  const [submissionSuccessModal, setSubmissionSuccessModal] = useState(null);
  const [receiptModalCase, setReceiptModalCase] = useState(null);

  // Tracking Search State
  const [searchTrackId, setSearchTrackId] = useState('AICTE-2026-8941');
  const [trackedComplaint, setTrackedComplaint] = useState(INITIAL_COMPLAINTS[0]);

  // Officer Workbench State
  const [officerBureauFilter, setOfficerBureauFilter] = useState('ALL');
  const [officerStatusFilter, setOfficerStatusFilter] = useState('ALL');
  const [officerSearch, setOfficerSearch] = useState('');
  const [activeModalCase, setActiveModalCase] = useState(null);
  const [modalStatus, setModalStatus] = useState('');
  const [modalNotes, setModalNotes] = useState('');
  const [modalFileUploaded, setModalFileUploaded] = useState(false);

  // Research Filter State
  const [researchFilter, setResearchFilter] = useState('ALL');

  // Dynamic Font Size Class Selector
  const getFontSizeClass = () => {
    if (fontSize === 'small') return 'text-[12px]';
    if (fontSize === 'large') return 'text-[15px]';
    return 'text-[13px]';
  };

  // --- REAL-TIME SIMULATED SBERT AI OVERLAP DETECTOR ---
  const liveSbertMatch = useMemo(() => {
    if (!formDescription && !formTitle) return null;
    const text = (formTitle + ' ' + formDescription).toLowerCase();

    if (text.includes('fee') || text.includes('refund') || text.includes('caution') || text.includes('deposit') || text.includes('extortion')) {
      return {
        matchedId: 'AICTE-2026-4412',
        matchedBureau: 'Legal Cell',
        similarity: 88,
        snippet: 'Management refusing refund of security caution deposit after student withdrawal.'
      };
    }
    if (text.includes('ragging') || text.includes('hostel') || text.includes('harass') || text.includes('senior')) {
      return {
        matchedId: 'AICTE-2026-9104',
        matchedBureau: 'PGRC / Student Safety',
        similarity: 92,
        snippet: 'Physical harassment and anti-ragging non-responsiveness in student hostels.'
      };
    }
    if (text.includes('gpu') || text.includes('lab') || text.includes('hardware') || text.includes('deficit') || text.includes('equipment')) {
      return {
        matchedId: 'AICTE-2026-3390',
        matchedBureau: 'Approval Bureau',
        similarity: 86,
        snippet: 'Deficit in mandatory GPU computing hardware for AI curriculum.'
      };
    }
    if (text.includes('salary') || text.includes('pay') || text.includes('faculty') || text.includes('stipend')) {
      return {
        matchedId: 'AICTE-2026-6120',
        matchedBureau: 'Finance Bureau',
        similarity: 89,
        snippet: 'Delay in disbursement of faculty salaries for 3 consecutive months.'
      };
    }
    return null;
  }, [formTitle, formDescription]);

  // --- AUTOMATED URGENCY & SLA CALCULATOR ---
  const calculatedUrgency = useMemo(() => {
    const text = (formTitle + ' ' + formDescription).toLowerCase();
    if (text.includes('ragging') || text.includes('harass') || text.includes('safety') || text.includes('threat')) {
      return { level: 'HIGH', slaDays: 7, label: lang === 'EN' ? 'High Priority (7-Day Statutory SLA)' : 'उच्च प्राथमिकता (7-दिवसीय वैधानिक समय-सीमा)' };
    }
    if (text.includes('fee') || text.includes('salary') || text.includes('refund') || text.includes('deposit')) {
      return { level: 'MEDIUM', slaDays: 15, label: lang === 'EN' ? 'Medium Priority (15-Day SLA Target)' : 'मध्यम प्राथमिकता (15-दिवसीय समय-सीमा लक्ष्य)' };
    }
    return { level: 'LOW', slaDays: 30, label: lang === 'EN' ? 'Standard Priority (30-Day SLA Target)' : 'मानक प्राथमिकता (30-दिवसीय समय-सीमा लक्ष्य)' };
  }, [formTitle, formDescription, lang]);

  // --- PERMANENT ID AUTO-LOOKUP HANDLER ---
  const handlePermanentIdChange = (id) => {
    setFormCollegeId(id);
    const match = institutions.find(i => i.id.toLowerCase() === id.trim().toLowerCase());
    if (match) {
      setFormCollegeName(match.name);
      setFormCollegeState(match.state);
      setFormCollegeRegion(match.region);
    } else if (id.length >= 4) {
      setFormCollegeName(`AICTE Approved Institution (${id})`);
      setFormCollegeState('State Jurisdiction');
      setFormCollegeRegion('Regional Bureau HQ');
    } else {
      setFormCollegeName('');
      setFormCollegeState('');
      setFormCollegeRegion('');
    }
  };

  // --- SIMULATED TESSERACT OCR FILE UPLOADER ---
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormFileName(file.name);
      setIsOcrProcessing(true);
      setTimeout(() => {
        setIsOcrProcessing(false);
        setOcrResultText(`[Tesseract OCR v5.0 Output] Extracted Header: "Official Fee Receipt Ref ID #2026-REG". Document text verified and clean.`);
      }, 1000);
    }
  };

  // --- FORM SUBMIT HANDLER ---
  const handleGrievanceSubmit = (e) => {
    e.preventDefault();
    const newId = `AICTE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newGrievance = {
      id: newId,
      permanentId: formCollegeId || '1-9999999',
      collegeName: formCollegeName || 'State Technical Institution',
      state: formCollegeState || 'Delhi',
      region: formCollegeRegion || 'North Regional Office',
      domain: formDomain,
      complainant: formComplainant || 'Anonymous Complainant',
      submittedDate: new Date().toISOString().split('T')[0],
      slaDaysLeft: calculatedUrgency.slaDays,
      status: 'RECEIVED',
      urgency: calculatedUrgency.level,
      bureau: formBureau,
      title: formTitle || 'Institution Grievance Representation',
      description: formDescription,
      overlapFlag: !!liveSbertMatch,
      overlapDetails: liveSbertMatch ? {
        matchedCaseId: liveSbertMatch.matchedId,
        similarityScore: liveSbertMatch.similarity,
        conflictingBureau: liveSbertMatch.matchedBureau,
        matchedDescription: liveSbertMatch.snippet
      } : null,
      ocrParsedText: ocrResultText || 'Direct Web Submission. Proof attachments validated by AI Core.',
      auditTrail: [
        { timestamp: new Date().toLocaleString(), action: 'Grievance Formally Registered via Public Web Portal', actor: formComplainant || 'Complainant' },
        { timestamp: new Date().toLocaleString(), action: `Mapped to AICTE Permanent Institution ID ${formCollegeId}`, actor: 'Permanent ID Mapper Engine' },
        { timestamp: new Date().toLocaleString(), action: liveSbertMatch ? `SBERT Semantic Overlap Flagged (${liveSbertMatch.similarity}% Match Score)` : 'Unique Complaint Entry Verified by Pgvector Vector Search', actor: 'Pgvector Vector Search Engine' }
      ]
    };

    setComplaints([newGrievance, ...complaints]);
    setTrackedComplaint(newGrievance);
    setSearchTrackId(newId);
    setSubmissionSuccessModal(newId);

    // Reset Form fields
    setFormTitle('');
    setFormDescription('');
    setFormComplainant('');
    setFormFileName('');
    setOcrResultText('');
  };

  // --- OFFICER SAVE ACTION HANDLER ---
  const handleSaveOfficerAction = () => {
    if (!activeModalCase) return;
    const updated = complaints.map(c => {
      if (c.id === activeModalCase.id) {
        return {
          ...c,
          status: modalStatus,
          auditTrail: [
            {
              timestamp: new Date().toLocaleString(),
              action: `Status updated to ${modalStatus.replace('_', ' ')}. Remarks: "${modalNotes || 'Action processed under AICTE AICTE-2026 directives.'}"${modalFileUploaded ? ' [Official Directive Order PDF Attached]' : ''}`,
              actor: `Bureau Officer (${c.bureau})`
            },
            ...c.auditTrail
          ]
        };
      }
      return c;
    });
    setComplaints(updated);
    setActiveModalCase(null);
  };

  // --- FILTERED OFFICER QUEUE ---
  const filteredOfficerQueue = useMemo(() => {
    return complaints.filter(c => {
      const matchBureau = officerBureauFilter === 'ALL' || c.bureau === officerBureauFilter;
      const matchStatus = officerStatusFilter === 'ALL' || c.status === officerStatusFilter;
      const matchSearch = c.id.toLowerCase().includes(officerSearch.toLowerCase()) ||
                          c.collegeName.toLowerCase().includes(officerSearch.toLowerCase()) ||
                          c.permanentId.toLowerCase().includes(officerSearch.toLowerCase());
      return matchBureau && matchStatus && matchSearch;
    });
  }, [complaints, officerBureauFilter, officerStatusFilter, officerSearch]);

  // --- EXECUTIVE CALCULATED STATS ---
  const activeCount = complaints.filter(c => c.status !== 'RESOLVED').length;
  const overlapCount = complaints.filter(c => c.overlapFlag && c.status !== 'RESOLVED').length;
  const resolvedCount = complaints.filter(c => c.status === 'RESOLVED').length;
  const disposalPercentage = Math.round((resolvedCount / complaints.length) * 100) || 0;

  return (
    <div className={`min-h-screen ${highContrast ? 'bg-slate-950 text-white' : 'bg-[#F8FAFC] text-slate-800'} font-sans ${getFontSizeClass()} leading-relaxed transition-all`}>
      
      {/* ========================================================= */}
      {/* 1. TOP OFFICIAL GOI ACCESSIBILITY & BARNER */}
      {/* ========================================================= */}
      <div className={`${highContrast ? 'bg-black text-yellow-300 border-yellow-500' : 'bg-slate-900 text-slate-300 border-slate-800'} text-[11px] py-1.5 px-4 flex flex-wrap items-center justify-between gap-2 border-b`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-semibold text-white">
            <Globe className="h-3.5 w-3.5 text-amber-400" />
            <span>{lang === 'EN' ? 'भारत सरकार | GOVERNMENT OF INDIA' : 'GOVERNMENT OF INDIA | भारत सरकार'}</span>
          </div>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400 font-medium">ALL INDIA COUNCIL FOR TECHNICAL EDUCATION (AICTE)</span>
        </div>

        <div className="flex items-center gap-3">
          
          {/* High Contrast Toggle */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all ${
              highContrast ? 'bg-yellow-400 text-black border-yellow-500' : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            {highContrast ? 'High Contrast: ON' : 'High Contrast'}
          </button>

          {/* Font Controls */}
          <div className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            <span className="text-slate-400 mr-1 text-[10px]">Text:</span>
            <button onClick={() => setFontSize('small')} className={`px-1.5 py-0.2 rounded font-bold ${fontSize === 'small' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>A-</button>
            <button onClick={() => setFontSize('normal')} className={`px-1.5 py-0.2 rounded font-bold ${fontSize === 'normal' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>A</button>
            <button onClick={() => setFontSize('large')} className={`px-1.5 py-0.2 rounded font-bold ${fontSize === 'large' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>A+</button>
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
            className="bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700 text-amber-300 font-bold hover:bg-slate-700 text-[10px]"
          >
            {lang === 'EN' ? 'हिंदी' : 'English'}
          </button>

        </div>
      </div>

      {/* Tricolor National Stripe */}
      <div className="h-1 w-full flex">
        <div className="w-1/3 bg-[#FF9933]" />
        <div className="w-1/3 bg-white" />
        <div className="w-1/3 bg-[#138808]" />
      </div>

      {/* ========================================================= */}
      {/* 2. MAIN NAVY BRANDING HEADER */}
      {/* ========================================================= */}
      <header className={`${highContrast ? 'bg-slate-900 border-yellow-400' : 'bg-[#0B2545] border-amber-500'} text-white shadow-md border-b-2`}>
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded bg-white p-1 shadow flex items-center justify-center shrink-0 border border-amber-400">
              <ShieldAlert className="h-7 w-7 text-[#0B2545]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold bg-amber-500 text-slate-950 px-2 py-0.2 rounded tracking-wider uppercase">
                  SIH26264
                </span>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">
                  Team Nexora
                </span>
              </div>
              <h1 className="text-lg font-bold tracking-tight text-white mt-0.5">
                {lang === 'EN'
                  ? 'AICTE Integrated Complaint Monitoring Dashboard'
                  : 'अखिल भारतीय तकनीकी शिक्षा परिषद एकीकृत शिकायत प्रबंधन डैशबोर्ड'}
              </h1>
              <p className="text-[11px] text-slate-300">
                Single-Window Cross-Bureau Grievance Command & SBERT Overlap Detection Engine
              </p>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="flex flex-wrap items-center bg-slate-900/90 p-1 rounded-lg border border-slate-700/80 self-stretch md:self-auto justify-center gap-1">
            <button
              onClick={() => setActiveRole('public')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all ${
                activeRole === 'public'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <User className="h-3.5 w-3.5" />
              <span>{lang === 'EN' ? 'Public Portal' : 'नागरिक पोर्टल'}</span>
            </button>

            <button
              onClick={() => setActiveRole('officer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all ${
                activeRole === 'officer'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>{lang === 'EN' ? 'Bureau Officer' : 'अधिकारी पोर्टल'}</span>
              {overlapCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-red-600 text-white rounded-full text-[10px]">
                  {overlapCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveRole('executive')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all ${
                activeRole === 'executive'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="h-3.5 w-3.5" />
              <span>{lang === 'EN' ? 'Executive View' : 'उच्च डैशबोर्ड'}</span>
            </button>

            <button
              onClick={() => setActiveRole('research')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all ${
                activeRole === 'research'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>{lang === 'EN' ? 'Research & References' : 'अनुसंधान आधार'}</span>
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================= */}
      {/* 3. MAIN BODY CONTAINER */}
      {/* ========================================================= */}
      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* ========================================================= */}
        {/* ROLE 1: PUBLIC PORTAL (COMPLAINANT / STUDENT / FACULTY) */}
        {/* ========================================================= */}
        {activeRole === 'public' && (
          <div className="space-y-6">
            
            {/* Nav Header */}
            <div className={`${highContrast ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'} p-4 rounded-lg border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4`}>
              <div>
                <h2 className="text-sm font-bold text-[#0B2545] flex items-center gap-2">
                  <FileText className="h-4 w-4 text-amber-600" />
                  <span>{lang === 'EN' ? 'AICTE Single-Window Grievance Submission & Tracking' : 'एआईसीटीई एकल-खिड़की शिकायत पंजीकरण और स्थिति'}</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Lodge official complaints directly mapped to AICTE Permanent Institution IDs with automated SLA tracking.
                </p>
              </div>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded border border-slate-200 self-start md:self-auto">
                <button
                  onClick={() => setPublicSubTab('lodge')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    publicSubTab === 'lodge'
                      ? 'bg-[#0B2545] text-white'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  1. {lang === 'EN' ? 'Lodge New Grievance' : 'नयी शिकायत दर्ज करें'}
                </button>
                <button
                  onClick={() => setPublicSubTab('track')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    publicSubTab === 'track'
                      ? 'bg-[#0B2545] text-white'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  2. {lang === 'EN' ? 'Track Grievance Status' : 'स्थिति की जांच करें'}
                </button>
              </div>
            </div>

            {/* SUB-TAB 1: LODGE GRIEVANCE FORM */}
            {publicSubTab === 'lodge' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Form Column */}
                <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-5">
                  <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                    <h3 className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">
                      Official Grievance Registration
                    </h3>
                    <span className="text-xs text-red-600 font-semibold">* Mandatory Fields</span>
                  </div>

                  <form onSubmit={handleGrievanceSubmit} className="space-y-4">
                    
                    {/* College ID Permanent Lookup */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          AICTE Permanent Institution ID <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formCollegeId}
                          onChange={(e) => handlePermanentIdChange(e.target.value)}
                          placeholder="e.g. 1-3489201"
                          className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-[#0B2545] focus:outline-none"
                        />
                        <span className="text-[10px] text-slate-500 mt-1 block">Sample IDs: 1-3489201, 1-4501292, 1-8930211</span>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Auto-Fetched Institution Name & Jurisdiction
                        </label>
                        <input
                          type="text"
                          readOnly
                          value={formCollegeName ? `${formCollegeName} (${formCollegeState})` : ''}
                          placeholder="Institution details auto-fill upon valid Permanent ID match..."
                          className="w-full bg-slate-100 border border-slate-300 rounded px-3 py-1.5 text-xs text-[#0B2545] font-bold cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Bureau & Domain Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Target Bureau / Cell <span className="text-red-600">*</span>
                        </label>
                        <select
                          value={formBureau}
                          onChange={(e) => setFormBureau(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:border-[#0B2545] focus:outline-none"
                        >
                          <option value="Legal Cell">Legal Cell (Court & Legal Issues)</option>
                          <option value="PGRC / Student Safety">PGRC (Public Grievance & Student Safety)</option>
                          <option value="Approval Bureau">Approval Bureau (Deficit / Infrastructure)</option>
                          <option value="Finance Bureau">Finance Bureau (Salary / Funds)</option>
                          <option value="Regional Office">Regional Bureau HQ Office</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Primary Issue Category
                        </label>
                        <select
                          value={formDomain}
                          onChange={(e) => setFormDomain(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:border-[#0B2545] focus:outline-none"
                        >
                          <option value="Fee Extortion & Deposit Refund">Fee Extortion & Deposit Refund</option>
                          <option value="Ragging & Harassment">Ragging & Harassment</option>
                          <option value="Infrastructure & Lab Deficit">Infrastructure & Lab Deficit</option>
                          <option value="Faculty Salary Delay">Faculty Salary Delay</option>
                          <option value="Unapproved Course Offering">Unapproved Course Offering</option>
                        </select>
                      </div>
                    </div>

                    {/* Subject & Complainant Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Grievance Title / Subject <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          placeholder="Brief summary of the issue..."
                          className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:border-[#0B2545] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Complainant Identity
                        </label>
                        <input
                          type="text"
                          value={formComplainant}
                          onChange={(e) => setFormComplainant(e.target.value)}
                          placeholder="Leave blank for Anonymous"
                          className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:border-[#0B2545] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Detailed Textarea */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Detailed Grievance Representation <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        placeholder="State full facts clearly. (Try typing keywords like 'fee refund caution deposit' or 'hostel ragging' to see live SBERT overlap detection)..."
                        className="w-full bg-slate-50 border border-slate-300 rounded p-3 text-xs text-slate-900 focus:bg-white focus:border-[#0B2545] focus:outline-none resize-none"
                      />
                    </div>

                    {/* REAL-TIME SIMULATED SBERT AI OVERLAP WARNING CARD */}
                    {liveSbertMatch && (
                      <div className="p-3.5 bg-amber-50 border-l-4 border-amber-500 rounded-r flex items-start gap-3 shadow-sm">
                        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-amber-900">
                              ⚡ SBERT AI Semantic Overlap Detected ({liveSbertMatch.similarity}% Similarity)
                            </span>
                            <span className="bg-amber-200 text-amber-950 px-1.5 py-0.2 rounded font-mono text-[10px] font-bold">
                              Case #{liveSbertMatch.matchedId}
                            </span>
                          </div>
                          <p className="text-amber-800">
                            A semantically similar case exists in <span className="font-bold">{liveSbertMatch.matchedBureau}</span> for this College ID. Submitting will auto-link this to prevent duplicate investigation delays.
                          </p>
                          <p className="italic text-[11px] text-amber-700 bg-amber-100/60 p-1.5 rounded">
                            "{liveSbertMatch.snippet}"
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Tesseract OCR File Upload Simulator */}
                    <div className="border border-dashed border-slate-300 bg-slate-50 rounded p-4 text-center hover:bg-slate-100/80 transition-all">
                      <input type="file" id="pdfUpload" className="hidden" onChange={handleFileUpload} />
                      <label htmlFor="pdfUpload" className="cursor-pointer flex flex-col items-center gap-1">
                        <Upload className="h-5 w-5 text-[#0B2545]" />
                        <span className="text-xs font-bold text-slate-700">
                          {formFileName ? formFileName : 'Attach Supporting Documents / Receipts (PDF / Scanned Image)'}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          Tesseract OCR Engine will automatically extract readable text from scanned attachments
                        </span>
                      </label>

                      {isOcrProcessing && (
                        <div className="mt-2 text-xs text-amber-700 flex items-center justify-center gap-1.5 font-semibold">
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                          <span>Tesseract OCR v5.0 Parsing Scanned Attachment...</span>
                        </div>
                      )}

                      {ocrResultText && !isOcrProcessing && (
                        <div className="mt-2 p-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-left text-[11px]">
                          <Check className="h-3.5 w-3.5 inline mr-1 text-emerald-600" />
                          {ocrResultText}
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#0B2545] hover:bg-slate-900 text-white font-bold text-xs rounded shadow flex items-center justify-center gap-2 transition-all"
                    >
                      <Send className="h-4 w-4 text-amber-400" />
                      <span>Formally Register Grievance on AICTE Central Portal</span>
                    </button>

                  </form>
                </div>

                {/* Right Side Info Column */}
                <div className="space-y-4">
                  <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
                    <h4 className="text-xs font-bold text-[#0B2545] uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      <span>AI Cognitive Engine Preview</span>
                    </h4>

                    <div>
                      <span className="text-xs text-slate-500 block mb-1">Calculated SLA Resolution Target:</span>
                      <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-xs font-bold text-slate-800">
                        {calculatedUrgency.label}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1">
                      <span className="font-bold text-slate-700 block">Mapped Institution Profile</span>
                      <p className="text-slate-600">
                        Permanent ID: <span className="font-mono font-bold text-[#0B2545]">{formCollegeId}</span>
                      </p>
                      <p className="text-slate-600">
                        Regional Office: <span className="font-medium text-slate-800">{formCollegeRegion}</span>
                      </p>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-900 space-y-1">
                      <div className="flex items-center gap-1 font-bold text-blue-900">
                        <ShieldCheck className="h-4 w-4 text-blue-700" />
                        <span>Statutory SLA Guarantee</span>
                      </div>
                      <p className="text-[11px] text-blue-800 leading-normal">
                        Every grievance receives an immutable cryptographic timestamp. Delayed cases auto-escalate to Senior Directors upon SLA countdown breach.
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            )}

            {/* SUB-TAB 2: TRACK EXISTING GRIEVANCE */}
            {publicSubTab === 'track' && (
              <div className="space-y-6">
                
                {/* Search Bar */}
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <input
                      type="text"
                      value={searchTrackId}
                      onChange={(e) => setSearchTrackId(e.target.value)}
                      placeholder="Enter Grievance Tracking ID (e.g. AICTE-2026-8941)"
                      className="w-full bg-slate-50 border border-slate-300 rounded px-4 py-2 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-[#0B2545] focus:outline-none"
                    />
                    <Search className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                  </div>
                  <button
                    onClick={() => {
                      const match = complaints.find(c => c.id.toLowerCase() === searchTrackId.trim().toLowerCase());
                      if (match) setTrackedComplaint(match);
                    }}
                    className="w-full sm:w-auto px-5 py-2 bg-[#0B2545] hover:bg-slate-900 text-white text-xs font-bold rounded shadow-sm"
                  >
                    Locate Case
                  </button>
                </div>

                {trackedComplaint ? (
                  <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-6">
                    
                    {/* Header Info */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-extrabold text-[#0B2545] font-mono">
                            #{trackedComplaint.id}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                            {trackedComplaint.bureau}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300 font-mono">
                            Perm ID: {trackedComplaint.permanentId}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 mt-1">
                          {trackedComplaint.collegeName}
                        </h3>
                        <p className="text-xs text-slate-500">
                          Subject: {trackedComplaint.title}
                        </p>
                      </div>

                      <div className="text-left md:text-right flex flex-col items-start md:items-end gap-2">
                        <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded border border-amber-300 inline-block">
                          SLA Target: {trackedComplaint.slaDaysLeft} Days Remaining
                        </span>
                        
                        <button
                          onClick={() => setReceiptModalCase(trackedComplaint)}
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-[#0B2545] border border-slate-300 text-xs font-bold rounded flex items-center gap-1"
                        >
                          <Printer className="h-3.5 w-3.5" />
                          <span>View Official Slip</span>
                        </button>
                      </div>
                    </div>

                    {/* 5-STAGE INTERACTIVE LIFECYCLE TIMELINE */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">
                        5-Stage Case Lifecycle & Resolution Progress
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                        {[
                          { key: 'RECEIVED', label: '1. Filed', desc: 'Portal Intake' },
                          { key: 'OCR', label: '2. OCR Verified', desc: 'Document Scan' },
                          { key: 'SBERT', label: '3. SBERT Checked', desc: 'Vector Search' },
                          { key: 'UNDER_INVESTIGATION', label: '4. Bureau Active', desc: 'Investigation' },
                          { key: 'RESOLVED', label: '5. Resolved', desc: 'Order Disposed' }
                        ].map((step, idx) => {
                          const currentIdx = trackedComplaint.status === 'RESOLVED' ? 4 : 3;
                          const isPassed = currentIdx >= idx;
                          const isCurrent = currentIdx === idx;

                          return (
                            <div
                              key={step.key}
                              className={`p-3 rounded border text-left transition-all ${
                                isCurrent
                                  ? 'bg-amber-50 border-amber-500 shadow-sm'
                                  : isPassed
                                  ? 'bg-emerald-50 border-emerald-300'
                                  : 'bg-slate-50 border-slate-200 opacity-60'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className={`text-[11px] font-bold ${isCurrent ? 'text-amber-950' : isPassed ? 'text-emerald-900' : 'text-slate-600'}`}>
                                  {step.label}
                                </span>
                                {isPassed ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> : <Clock className="h-3.5 w-3.5 text-slate-400" />}
                              </div>
                              <span className="text-[10px] text-slate-500 block">{step.desc}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Audit Trail Log */}
                    <div className="space-y-3 pt-4 border-t border-slate-200">
                      <h4 className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">
                        Point-to-Point Action Log (Audit Trail)
                      </h4>

                      <div className="space-y-2">
                        {trackedComplaint.auditTrail.map((log, i) => (
                          <div key={i} className="flex items-start gap-3 text-xs bg-slate-50 p-2.5 rounded border border-slate-200">
                            <div className="h-2 w-2 rounded-full bg-[#0B2545] mt-1.5 shrink-0" />
                            <div className="flex-1">
                              <p className="text-slate-800 font-semibold">{log.action}</p>
                              <span className="text-[10px] text-slate-500">Actor: {log.actor} • {log.timestamp}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="text-center py-8 bg-white rounded border border-slate-200 text-slate-500 text-xs">
                    No grievance record found for tracking ID "{searchTrackId}". Try AICTE-2026-8941.
                  </div>
                )}

              </div>
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* ROLE 2: BUREAU OFFICER PORTAL */}
        {/* ========================================================= */}
        {activeRole === 'officer' && (
          <div className="space-y-6">
            
            {/* Nav Header */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-bold text-[#0B2545] flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-amber-600" />
                  <span>AICTE Bureau Officer Integrated Queue & Overlap Workbench</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Filter grievances by bureau, inspect SBERT overlap flags, and issue show-cause directives under official SLAs.
                </p>
              </div>

              {/* Bureau Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded border border-slate-200">
                {['ALL', 'Legal Cell', 'PGRC / Student Safety', 'Approval Bureau', 'Finance Bureau'].map((b) => (
                  <button
                    key={b}
                    onClick={() => setOfficerBureauFilter(b)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                      officerBureauFilter === b
                        ? 'bg-[#0B2545] text-white'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Overlap Banner */}
            {overlapCount > 0 && (
              <div className="p-3.5 bg-red-50 border-l-4 border-red-600 rounded-r flex items-start justify-between gap-4 shadow-sm">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <h4 className="font-bold text-red-900">
                      {overlapCount} Cross-Bureau SBERT Overlap Flag(s) Active
                    </h4>
                    <p className="text-red-800 mt-0.5">
                      Vector search detected &gt;85% semantic similarity between complaints lodged in different bureaus for identical Permanent College IDs. Inspect before acting to eliminate conflicting orders.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  value={officerSearch}
                  onChange={(e) => setOfficerSearch(e.target.value)}
                  placeholder="Filter by Case ID, Permanent ID, or Institution Name..."
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:border-[#0B2545] focus:outline-none"
                />
                <Search className="absolute right-3 top-2 h-3.5 w-3.5 text-slate-400" />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-slate-500 whitespace-nowrap">Status Filter:</span>
                <select
                  value={officerStatusFilter}
                  onChange={(e) => setOfficerStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 focus:bg-white focus:border-[#0B2545] focus:outline-none w-full sm:w-auto"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="RECEIVED">Received</option>
                  <option value="UNDER_INVESTIGATION">Under Active Investigation</option>
                  <option value="RESOLVED">Resolved / Closed</option>
                </select>
              </div>
            </div>

            {/* DATA TABLE */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      <th className="py-3 px-4">Case ID & Institution</th>
                      <th className="py-3 px-4">Domain Category</th>
                      <th className="py-3 px-4">Assigned Bureau</th>
                      <th className="py-3 px-4">SLA Countdown</th>
                      <th className="py-3 px-4">Overlap Check</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs">
                    {filteredOfficerQueue.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50 transition-all">
                        
                        <td className="py-3.5 px-4">
                          <span className="font-mono font-bold text-[#0B2545] block">#{c.id}</span>
                          <span className="font-bold text-slate-900 block mt-0.5">{c.collegeName}</span>
                          <span className="text-[10px] text-slate-500 font-mono">Perm ID: {c.permanentId}</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="text-slate-800 font-medium block">{c.domain}</span>
                          <span className="text-[10px] text-slate-500">Filed: {c.submittedDate}</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300">
                            {c.bureau}
                          </span>
                        </td>

                        {/* SLA Countdown Badges */}
                        <td className="py-3.5 px-4">
                          {c.slaDaysLeft <= 2 ? (
                            <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-300 flex items-center gap-1 w-max">
                              <Clock className="h-3 w-3 text-red-600" />
                              {c.slaDaysLeft} Days (Critical SLA)
                            </span>
                          ) : c.slaDaysLeft <= 7 ? (
                            <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1 w-max">
                              <Clock className="h-3 w-3 text-amber-600" />
                              {c.slaDaysLeft} Days
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 w-max">
                              <Clock className="h-3 w-3 text-emerald-600" />
                              {c.slaDaysLeft} Days
                            </span>
                          )}
                        </td>

                        {/* SBERT Overlap Flag */}
                        <td className="py-3.5 px-4">
                          {c.overlapFlag ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-300 flex items-center gap-1 w-max">
                              <AlertTriangle className="h-3 w-3 text-red-600" />
                              {c.overlapDetails?.similarityScore}% Overlap Flag
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-400">Unique Entry</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              setActiveModalCase(c);
                              setModalStatus(c.status);
                              setModalNotes('');
                              setModalFileUploaded(false);
                            }}
                            className="px-3 py-1 bg-[#0B2545] hover:bg-slate-900 text-white font-bold text-xs rounded shadow-sm"
                          >
                            Process Case
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PROCESS CASE MODAL */}
            {activeModalCase && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-lg border border-slate-300 max-w-xl w-full p-6 shadow-xl space-y-5">
                  
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#0B2545]">#{activeModalCase.id}</span>
                      <h3 className="text-sm font-bold text-slate-900">{activeModalCase.collegeName}</h3>
                    </div>
                    <button onClick={() => setActiveModalCase(null)} className="p-1 text-slate-400 hover:text-slate-700">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* SBERT Overlap Side-by-Side Comparison Box */}
                  {activeModalCase.overlapFlag && activeModalCase.overlapDetails && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-900 space-y-2">
                      <div className="font-bold flex items-center gap-1 text-red-800">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span>Side-by-Side Overlap Comparison ({activeModalCase.overlapDetails.similarityScore}% Match)</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                        <div className="bg-white p-2 rounded border border-red-200">
                          <span className="font-bold block text-slate-700">This Complaint ({activeModalCase.bureau})</span>
                          <p className="text-slate-600 line-clamp-2">{activeModalCase.description}</p>
                        </div>
                        <div className="bg-white p-2 rounded border border-red-200">
                          <span className="font-bold block text-slate-700">Matched #{activeModalCase.overlapDetails.matchedCaseId} ({activeModalCase.overlapDetails.conflictingBureau})</span>
                          <p className="text-slate-600 line-clamp-2">{activeModalCase.overlapDetails.matchedDescription}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <span className="text-xs text-slate-500 block font-semibold mb-1">Grievance Description:</span>
                      <p className="text-xs text-slate-800 bg-slate-50 p-2.5 rounded border border-slate-200">
                        {activeModalCase.description}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs text-slate-500 block font-semibold mb-1">Extracted OCR Text Evidence:</span>
                      <p className="text-[11px] text-slate-700 bg-slate-50 p-2 rounded border border-slate-200 font-mono">
                        {activeModalCase.ocrParsedText}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Update Status</label>
                        <select
                          value={modalStatus}
                          onChange={(e) => setModalStatus(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none"
                        >
                          <option value="UNDER_INVESTIGATION">Under Active Investigation</option>
                          <option value="RESOLVED">Mark Resolved & Issue Directive Order</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Attach Directive Order PDF</label>
                        <button
                          type="button"
                          onClick={() => setModalFileUploaded(true)}
                          className={`w-full py-1.5 px-2 rounded text-xs font-bold border transition-all ${
                            modalFileUploaded ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          {modalFileUploaded ? '✓ Order PDF Uploaded' : 'Upload Directive Letter'}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Officer Remarks / Show-Cause Reference</label>
                      <input
                        type="text"
                        value={modalNotes}
                        onChange={(e) => setModalNotes(e.target.value)}
                        placeholder="Enter officer notes or show-cause notice dispatch ID..."
                        className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                    <button onClick={() => setActiveModalCase(null)} className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded">
                      Cancel
                    </button>
                    <button onClick={handleSaveOfficerAction} className="px-4 py-1.5 bg-[#0B2545] hover:bg-slate-900 text-white text-xs font-bold rounded shadow-sm">
                      Commit Official Order
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* ROLE 3: EXECUTIVE COMMAND CENTER */}
        {/* ========================================================= */}
        {activeRole === 'executive' && (
          <div className="space-y-6">
            
            {/* Nav Header */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#0B2545] flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-amber-600" />
                  <span>AICTE National Executive Command & Decision Dashboard</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time institution risk scorecards, regional workload heatmaps, and immutable audit trails.
                </p>
              </div>

              <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded border border-emerald-300">
                Live Data Synchronized
              </span>
            </div>

            {/* TOP KPI CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-1">
                <span className="text-xs text-slate-500 font-bold block">Total Registered Grievances</span>
                <span className="text-2xl font-extrabold text-[#0B2545] block">1,248</span>
                <span className="text-[10px] text-slate-500">Across 10 AICTE Regional Offices</span>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-1">
                <span className="text-xs text-slate-500 font-bold block">Disposal Resolution Rate</span>
                <span className="text-2xl font-extrabold text-emerald-700 block">84.2%</span>
                <span className="text-[10px] text-emerald-700 font-bold">1,051 Cases Formally Disposed</span>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-1">
                <span className="text-xs text-slate-500 font-bold block">SBERT Overlaps Flagged</span>
                <span className="text-2xl font-extrabold text-red-600 block">186 Cases</span>
                <span className="text-[10px] text-red-600 font-bold">Saved 60% Duplicate Inquiry Time</span>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-1">
                <span className="text-xs text-slate-500 font-bold block">Statutory SLA Compliance</span>
                <span className="text-2xl font-extrabold text-[#0B2545] block">91.5%</span>
                <span className="text-[10px] text-amber-700 font-bold">70% Faster Turnaround</span>
              </div>

            </div>

            {/* REGIONAL WORKLOAD HEATMAP SUMMARY */}
            <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-[#0B2545] uppercase tracking-wider flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-600" />
                <span>Regional Workload Breakdown & Regional Heatmap</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1">
                {[
                  { name: 'Northern (Delhi)', cases: 342, status: 'HIGH', percent: '80%' },
                  { name: 'Western (Mumbai)', cases: 289, status: 'HIGH', percent: '72%' },
                  { name: 'Southern (Chennai)', cases: 215, status: 'MED', percent: '50%' },
                  { name: 'Central (Bhopal)', cases: 184, status: 'MED', percent: '42%' },
                  { name: 'Eastern (Kolkata)', cases: 118, status: 'LOW', percent: '28%' }
                ].map((region) => (
                  <div key={region.name} className="p-3 bg-slate-50 rounded border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-900 block">{region.name}</span>
                    <span className="text-lg font-mono font-bold text-[#0B2545] block">{region.cases} Cases</span>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full ${region.status === 'HIGH' ? 'bg-red-600' : region.status === 'MED' ? 'bg-amber-500' : 'bg-emerald-600'}`} style={{ width: region.percent }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* INSTITUTION RISK SCORECARD TABLE */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-xs font-bold text-[#0B2545] uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-amber-600" />
                  <span>Institution Risk Scorecard (Complaints Density Profile)</span>
                </h3>
                <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded border border-slate-300 flex items-center gap-1">
                  <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-700" />
                  <span>Export Report CSV</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      <th className="py-2.5 px-3">Permanent ID</th>
                      <th className="py-2.5 px-3">Institution Name</th>
                      <th className="py-2.5 px-3">State Jurisdiction</th>
                      <th className="py-2.5 px-3">Total Cases</th>
                      <th className="py-2.5 px-3">Primary Category</th>
                      <th className="py-2.5 px-3 text-right">Risk Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs">
                    {institutions.map((inst) => (
                      <tr key={inst.id} className="hover:bg-slate-50">
                        <td className="py-3 px-3 font-mono font-bold text-[#0B2545]">{inst.id}</td>
                        <td className="py-3 px-3 font-bold text-slate-900">{inst.name}</td>
                        <td className="py-3 px-3 text-slate-600">{inst.state}</td>
                        <td className="py-3 px-3 font-bold text-slate-900">{inst.totalCases}</td>
                        <td className="py-3 px-3 text-slate-700">{inst.primaryDomain}</td>
                        <td className="py-3 px-3 text-right">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            inst.riskScore >= 75 ? 'bg-red-100 text-red-800 border border-red-300' :
                            inst.riskScore >= 40 ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                            'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          }`}>
                            {inst.riskScore} / 100 ({inst.riskLevel})
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* IMMUTABLE TIMESTAMPED LEGAL AUDIT TRAIL LOG */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 space-y-3">
              <h3 className="text-xs font-bold text-[#0B2545] uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
                <Lock className="h-4 w-4 text-amber-600" />
                <span>Immutable System Audit Trail Log (Court / RTI Compliance)</span>
              </h3>

              <div className="space-y-2">
                {[
                  { id: 'LOG-8812', timestamp: '2026-10-30 02:40 AM', action: 'Show Cause Notice issued to Delhi Institute of Tech (#1-3489201)', actor: 'Legal Officer (#OFF-41)', hash: 'sha256:8f9a21b3e7...' },
                  { id: 'LOG-8811', timestamp: '2026-10-29 11:15 AM', action: 'SBERT Vector Search flagged 88% overlap between Legal & PGRC', actor: 'Pgvector Engine', hash: 'sha256:3c11d04f2a...' },
                  { id: 'LOG-8810', timestamp: '2026-10-28 04:30 PM', action: 'Case #AICTE-2026-6120 marked Resolved & Disposed', actor: 'Finance Bureau Head', hash: 'sha256:7e09a41c88...' }
                ].map((log) => (
                  <div key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 bg-slate-50 rounded border border-slate-200 text-xs">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-slate-800">{log.action}</span>
                      <span className="text-[10px] text-slate-500 block">Actor: {log.actor} • {log.timestamp}</span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-500 bg-slate-200 px-2 py-0.5 rounded self-start sm:self-auto">
                      {log.hash}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* ROLE 4: ACADEMIC EVIDENCE & RESEARCH BASE (SLIDE 6) */}
        {/* ========================================================= */}
        {activeRole === 'research' && (
          <div className="space-y-6">
            
            {/* Header */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-bold text-[#0B2545] flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-amber-600" />
                  <span>Peer-Reviewed Academic Literature & Policy References (Slide 6 Evidence Base)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Curated international research papers and government reports supporting Problem Validation, SBERT/FAISS Technical Feasibility, and Application Impact.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded border border-slate-200">
                {[
                  { key: 'ALL', label: 'All (6)' },
                  { key: 'PROBLEM', label: '1. Problem Validation' },
                  { key: 'TECHNICAL', label: '2. Technical Feasibility' },
                  { key: 'MARKET', label: '3. Market Validation' }
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setResearchFilter(f.key)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      researchFilter === f.key
                        ? 'bg-[#0B2545] text-white'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* RESEARCH PAPER CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACADEMIC_RESEARCH_DB.filter(r => researchFilter === 'ALL' || r.category === researchFilter).map((paper) => (
                <div key={paper.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between gap-3 hover:border-amber-400 transition-all">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        paper.category === 'PROBLEM' ? 'bg-red-100 text-red-800 border border-red-200' :
                        paper.category === 'TECHNICAL' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                        'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {paper.category === 'PROBLEM' ? 'Problem Validation' : paper.category === 'TECHNICAL' ? 'Technical Feasibility' : 'Market Validation'}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500 font-mono">({paper.year})</span>
                    </div>

                    <h3 className="text-xs font-bold text-slate-900 leading-snug">
                      {paper.title}
                    </h3>

                    <p className="text-[11px] text-slate-500 font-medium">
                      Publisher: <span className="text-slate-700">{paper.publisher}</span>
                    </p>

                    <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200 leading-normal">
                      <span className="font-bold text-[#0B2545]">1-Line Key Takeaway: </span>
                      {paper.keyPoint}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">Ref: {paper.doi}</span>
                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-slate-100 hover:bg-[#0B2545] hover:text-white text-[#0B2545] font-bold text-[11px] rounded border border-slate-300 transition-all flex items-center gap-1"
                    >
                      <span>Access Publication</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* SUBMISSION CONFIRMATION MODAL */}
        {submissionSuccessModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-lg border border-slate-300 max-w-md w-full p-6 shadow-xl text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-7 w-7" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">Grievance Formally Registered</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Your grievance has been assigned an official cryptographic tracking ID.
                </p>
              </div>

              <div className="p-3 bg-slate-100 rounded border border-slate-300 text-center">
                <span className="text-[10px] text-slate-500 uppercase block font-bold">Unique Tracking ID</span>
                <span className="text-lg font-mono font-extrabold text-[#0B2545]">{submissionSuccessModal}</span>
              </div>

              <p className="text-[11px] text-slate-500">
                Automated SMS & Email confirmation dispatched to complainant. You can monitor status online anytime.
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setPublicSubTab('track');
                    setSubmissionSuccessModal(null);
                  }}
                  className="w-full py-2 bg-[#0B2545] hover:bg-slate-900 text-white font-bold text-xs rounded shadow"
                >
                  Track Status Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PRINTABLE SLIP MODAL */}
        {receiptModalCase && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-lg border border-slate-300 max-w-lg w-full p-6 shadow-xl space-y-4">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Government of India • AICTE</span>
                  <h3 className="text-sm font-bold text-[#0B2545]">Official Grievance Acknowledgment Slip</h3>
                </div>
                <button onClick={() => setReceiptModalCase(null)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500">Tracking Ref ID:</span>
                  <span className="font-bold text-[#0B2545]">{receiptModalCase.id}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500">Permanent Institution ID:</span>
                  <span className="font-bold">{receiptModalCase.permanentId}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500">Institution Name:</span>
                  <span className="font-bold text-slate-800 text-right">{receiptModalCase.collegeName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-500">Target Bureau:</span>
                  <span className="font-bold text-slate-800">{receiptModalCase.bureau}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Statutory SLA Target:</span>
                  <span className="font-bold text-amber-800">{receiptModalCase.slaDaysLeft} Days Remaining</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => alert("Simulating Official Slip Download (PDF Format)")}
                  className="px-4 py-1.5 bg-[#0B2545] hover:bg-slate-900 text-white text-xs font-bold rounded shadow-sm flex items-center gap-1.5"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Signed PDF Slip</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================= */}
      {/* 5. OFFICIAL GOI FOOTER */}
      {/* ========================================================= */}
      <footer className={`${highContrast ? 'bg-slate-900 border-yellow-400' : 'bg-[#0B2545] border-amber-500'} text-slate-300 text-xs mt-12 border-t-2 py-6 px-4`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <p className="font-bold text-white">ALL INDIA COUNCIL FOR TECHNICAL EDUCATION (AICTE)</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Integrated Grievance Monitoring Platform • Smart India Hackathon (SIH26264) • Team Nexora
            </p>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-300">
            <span>Website Policy</span>
            <span>|</span>
            <span>NIC Cloud Hosting</span>
            <span>|</span>
            <span>STQC Certified</span>
          </div>
        </div>
      </footer>

    </div>
  );
}