// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, FileText, LayoutDashboard, Briefcase, CheckCircle, 
  Trash2, Plus, Download, Edit2, RotateCcw, AlertCircle, 
  Search, Shield, Layers, Award, Terminal, Compass, 
  TrendingUp, Users, Settings, User, Mail, Phone, MapPin, 
  Globe, Link2, BookOpen, MessageSquare, ChevronRight, Zap, 
  Sliders, Copy, RefreshCw, ZoomIn, ZoomOut, Check, ChevronDown,
  Lock, Eye, BarChart2, Star, Calendar, Folder, FileCheck, CheckCircle2, X
} from 'lucide-react';

const INITIAL_RESUME_DATA = {
  personalInfo: {
    fullName: "Alexander Mercer",
    jobTitle: "Senior Staff AI Engineer",
    email: "alexander.mercer@innovate.ai",
    phone: "+1 (555) 019-2834",
    location: "San Francisco, CA",
    website: "https://mercer.ai",
    linkedin: "https://linkedin.com/in/alexandermercer"
  },
  summary: "Results-driven Staff AI Architect with 8+ years of expertise in designing, deploying, and scaling enterprise-level Large Language Model (LLM) pipelines, Retrieval-Augmented Generation (RAG) systems, and multi-modal neural network architectures. Proven track record of spearheading teams that deliver high-performance cloud infrastructure, reducing inference latency by 45% while managing multi-million dollar cloud GPU budgets.",
  experience: [
    {
      id: "exp-1",
      company: "InnovateAI Labs",
      position: "Lead AI & Infrastructure Architect",
      location: "San Francisco, CA",
      duration: "2023 - Present",
      achievements: [
        "Architected an enterprise multi-agent RAG pipeline serving 2.5M daily active users, optimizing system prompt engineering and vector databases to achieve 98% accuracy.",
        "Engineered customized training loops using PyTorch and HuggingFace, reducing model quantization loss by 18% for 70B parameter models.",
        "Slashed continuous deployment infrastructure costs by $140K/month through optimized Kubernetes GPU-slicing and triton inference configurations."
      ]
    },
    {
      id: "exp-2",
      company: "NextGen Software",
      position: "Senior Full Stack Machine Learning Engineer",
      location: "Austin, TX",
      duration: "2020 - 2023",
      achievements: [
        "Designed and maintained highly modular microservices using Next.js, Node.js, and FastAPI, enhancing data throughput speeds by 30%.",
        "Pioneered a neural network feature extraction engine used globally, generating $4.2M in recurring software sales within the first year.",
        "Mentored a cross-functional squad of 12 junior engineers, establishing robust CI/CD, unit testing, and Dockerization pipelines."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "Stanford University",
      degree: "M.S. in Computer Science (Specialization in Artificial Intelligence)",
      location: "Stanford, CA",
      duration: "2018 - 2020"
    },
    {
      id: "edu-2",
      institution: "UC Berkeley",
      degree: "B.S. in Electrical Engineering & Computer Science",
      location: "Berkeley, CA",
      duration: "2014 - 2018"
    }
  ],
  skills: [
    "Large Language Models (LLMs)", "PyTorch & TensorFlow", "TypeScript & Next.js",
    "Kubernetes & Docker", "Vector DBs (Pinecone, pgvector)", "AWS & GCP Infrastructure",
    "CI/CD Pipelines", "System Architecture", "NLP & Deep Learning"
  ],
  projects: [
    {
      id: "proj-1",
      title: "OmniMind Framework",
      role: "Lead Creator",
      link: "github.com/mercer/omnimind",
      description: "An open-source distributed model orchestration framework that routes natural language tokens dynamically across multi-cloud clusters based on budget and latency tolerances."
    },
    {
      id: "proj-2",
      title: "SynapseDoc",
      role: "Sole Creator",
      link: "synapsedoc.ai",
      description: "A highly secure clinical information parser using medical-domain fine-tuned models to structure unstructured medical charts with 99.4% HIPAA compliance."
    }
  ],
  certifications: [
    "AWS Certified Solutions Architect – Professional",
    "NVIDIA deep learning institute certified instructor"
  ],
  languages: [
    "English (Native)", "Spanish (Conversational)", "German (Basic)"
  ]
};

const TEMPLATE_PRESETS = [
  { id: 'ats', name: 'ATS Minimalist', desc: 'Standard single-column, max readability' },
  { id: 'modern', name: 'Modern Gradient', desc: 'Sleek, stylish side accent' },
  { id: 'executive', name: 'Executive Monocle', desc: 'Elegant typography, classical header' },
  { id: 'tech', name: 'Tech Terminal', desc: 'Developer-oriented, high density' },
  { id: 'creative', name: 'Creative Bold', desc: 'Modern layout, strong visual headings' }
];

const COLOR_PALETTES = [
  { id: 'indigo', primary: '#4f46e5', secondary: '#312e81', name: 'Royal Indigo' },
  { id: 'emerald', primary: '#10b981', secondary: '#064e3b', name: 'Forest Emerald' },
  { id: 'slate', primary: '#334155', secondary: '#0f172a', name: 'Corporate Slate' },
  { id: 'rose', primary: '#f43f5e', secondary: '#4c0519', name: 'Sunset Rose' },
  { id: 'violet', primary: '#7c3aed', secondary: '#2e1065', name: 'Futuristic Violet' }
];

const FONT_PRESETS = [
  { id: 'inter', name: 'Inter (Sans)', family: 'Inter, sans-serif' },
  { id: 'playfair', name: 'Playfair (Serif)', family: 'Playfair Display, serif' },
  { id: 'mono', name: 'JetBrains (Mono)', family: 'JetBrains Mono, monospace' },
  { id: 'merriweather', name: 'Merriweather', family: 'Merriweather, serif' }
];

const INITIAL_JOBS_CRM = [
  { id: 'job-1', company: 'Google', role: 'Staff ML Engineer', status: 'interview', salary: '$240,000', notes: 'Round 3: System Design scheduled on June 15.' },
  { id: 'job-2', company: 'Anthropic', role: 'Senior AI Researcher', status: 'applied', salary: '$270,000', notes: 'Submitted resume optimized with CV-X Matcher.' },
  { id: 'job-3', company: 'OpenAI', role: 'Solutions Architect', status: 'offer', salary: '$310,000', notes: 'Verbal offer received. Waiting for equity breakdown document.' },
  { id: 'job-4', company: 'Stripe', role: 'Senior Frontend Engineer', status: 'saved', salary: '$190,000', notes: 'Referral requested through LinkedIn contact.' }
];

export function AiResumeBuilderPage() {
  // Navigation View
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Custom API key configuration (user can input their own)
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  // Resume Engine Data State
  const [resumeData, setResumeData] = useState(INITIAL_RESUME_DATA);
  const [savedResumes, setSavedResumes] = useState([
    { id: 'res-default', name: 'Alexander Mercer - Principal AI Architect', date: '2026-05-28', template: 'ats', score: 94 },
    { id: 'res-temp', name: 'Alexander Mercer - General Dev Manager', date: '2026-05-15', template: 'modern', score: 81 }
  ]);
  const [activeResumeId, setActiveResumeId] = useState('res-default');

  // Interactive styling state
  const [selectedTemplate, setSelectedTemplate] = useState('ats');
  const [selectedColor, setSelectedColor] = useState(COLOR_PALETTES[0]);
  const [selectedFont, setSelectedFont] = useState(FONT_PRESETS[0]);
  const [zoomLevel, setZoomLevel] = useState(100);

  // Job Tracker CRM State
  const [jobsCRM, setJobsCRM] = useState(INITIAL_JOBS_CRM);
  const [newJobModal, setNewJobModal] = useState(false);
  const [newJobData, setNewJobData] = useState({ company: '', role: '', status: 'saved', salary: '', notes: '' });

  // ATS Optimization System State
  const [jobDescriptionInput, setJobDescriptionInput] = useState(
    `We are seeking a Lead AI Architect to build out our next-generation deep learning platforms. 
Requirements:
- Deep experience scaling Large Language Models (LLM) and PyTorch.
- Knowledge of Vector Databases (Pinecone, Milvus, pgvector).
- Heavy focus on Kubernetes deployment, AWS, system latency tuning and Docker.
- Experience managing GPU-slicing clusters is highly desired.`
  );
  const [atsAnalysisResult, setAtsAnalysisResult] = useState(null);
  const [isAnalyzingATS, setIsAnalyzingATS] = useState(false);

  // Cover Letter Generator State
  const [coverLetterStyle, setCoverLetterStyle] = useState('executive');
  const [coverLetterResult, setCoverLetterResult] = useState('');
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);

  // AI Career Coach Guidance State
  const [careerCoachInput, setCareerCoachInput] = useState('How can I transition from Staff AI Engineer to a VP of Artificial Intelligence within the next 3 years? What core organizational skills do I need to master?');
  const [coachResponse, setCoachResponse] = useState('');
  const [isCoachLoading, setIsCoachLoading] = useState(false);

  // System Notifications (To replace alert-blocks safely)
  const [toasts, setToasts] = useState([]);
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Subscription Settings Simulator
  const [subscriptionTier, setSubscriptionTier] = useState('pro'); // free, pro, enterprise

  // AI Loading & status overlay
  const [globalAiLoading, setGlobalAiLoading] = useState(false);

  // Trigger Local Resume Analysis on Load
  useEffect(() => {
    runATSAnalysis(true);
  }, [resumeData]);

  const generateWithGemini = async (prompt, systemInstruction = "You are a world-class executive CV & resume ATS optimization agent.") => {
    const activeKey = geminiApiKey || ""; // fallback system
    setGlobalAiLoading(true);
    
    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${activeKey}`;
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}. Ensure you provided a valid Gemini API Key in Settings.`);
      }

      const result = await response.json();
      const textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!textResponse) {
        throw new Error("Invalid schema structure returned from artificial intelligence node.");
      }

      setGlobalAiLoading(false);
      return textResponse;
    } catch (err) {
      setGlobalAiLoading(false);
      console.warn("Gemini Live API Request failed or No Key entered. Initializing local predictive generator.", err);
      // Premium Local Fallback Generator
      return runMockLocalAI(prompt);
    }
  };

  const runMockLocalAI = (prompt) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerPrompt = prompt.toLowerCase();
        
        if (lowerPrompt.includes('summary')) {
          resolve(`Distinguished Senior Staff AI Engineer & Enterprise System Architect with a verified history of building hyperscale Deep Learning applications. Champion of cutting-edge neural system design, managing high-concurrency cloud graphics processors (GPUs), and reducing prompt latency by up to 55%. Pioneer of multi-cloud Vector Database clustering and modern enterprise workflows (CI/CD, Kubernetes).`);
        } 
        else if (lowerPrompt.includes('achievement') || lowerPrompt.includes('experience')) {
          resolve(`Spearheaded development of core AI algorithms driving a 140% rise in multi-cloud RAG retrieval speed, delivering actionable data models to enterprise leaders and improving application runtime security by 40% globally.`);
        } 
        else if (lowerPrompt.includes('cover letter')) {
          resolve(`Dear Hiring Committee,

I am writing to express my profound interest in the Senior Leadership role within your organization. With a rich history of building and executing production-ready Large Language Model frameworks, cloud orchestration layers, and modern developer-first UI web clients, my background directly mirrors your needs.

At InnovateAI Labs, I designed and operationalized distributed RAG architectures supporting over 2.5 million daily users. This initiative not only improved semantic query accuracy to 98% but reduced inference overhead by over 45%. 

I am eager to contribute my high-performance architecture skills to your team's ambitious engineering initiatives. Thank you for your time and careful consideration.

Sincerely,
${resumeData.personalInfo.fullName}`);
        } 
        else if (lowerPrompt.includes('coach') || lowerPrompt.includes('roadmap')) {
          resolve(`Here is your custom Executive Career Roadmap to transition from Staff Engineer to VP of AI:

1. COMPLETED SKILL ACQUISITION (Technical Mastery): You are exceptional with Deep Learning, PyTorch, Kubernetes, and NextJS.
2. NEXT STEP (Business Unit Alignment): Shift focus from pure code architecture to direct budget and team management. Learn to calculate the ROI of AI model deployments.
3. ORGANIZATIONAL DYNAMICS: Champion cross-team initiatives. Build AI literacy programs for sales and operations leads.
4. ESTIMATED SALARY POTENTIAL: $380,000 - $480,000 Base Salary + Equity.`);
        }
        else {
          resolve(`Optimized Enterprise Result: Designed, implemented, and scaled a state-of-the-art software orchestration engine, resulting in a 35% decrease in developer configuration overhead and enabling frictionless API delivery.`);
        }
      }, 1200);
    });
  };

  const runATSAnalysis = async (isAuto = false) => {
    if (!isAuto) setIsAnalyzingATS(true);
    
    // Core Scoring Rule Engine
    const resumeText = JSON.stringify(resumeData).toLowerCase();
    const keywordsToTest = [
      { name: 'pytorch', weight: 15 },
      { name: 'kubernetes', weight: 15 },
      { name: 'vector databases', alternate: 'pinecone', weight: 12 },
      { name: 'llm', alternate: 'large language models', weight: 12 },
      { name: 'aws', alternate: 'gcp', weight: 10 },
      { name: 'docker', weight: 8 },
      { name: 'ci/cd', weight: 8 },
      { name: 'api', weight: 5 },
      { name: 'typescript', weight: 5 },
      { name: 'latency', weight: 10 }
    ];

    let currentScore = 40; // Base score
    const missingKeywords = [];
    const matchedKeywords = [];

    keywordsToTest.forEach(item => {
      const mainFound = resumeText.includes(item.name);
      const altFound = item.alternate ? resumeText.includes(item.alternate) : false;
      if (mainFound || altFound) {
        currentScore += item.weight;
        matchedKeywords.push(item.name);
      } else {
        missingKeywords.push(item.name);
      }
    });

    // Readability and length heuristics
    const summaryLength = resumeData.summary.split(/\s+/).length;
    let readabilityStatus = "Optimal";
    if (summaryLength > 150) {
      currentScore -= 8;
      readabilityStatus = "Too Wordy";
    } else if (summaryLength < 30) {
      currentScore -= 10;
      readabilityStatus = "Too Brief";
    }

    if (currentScore > 100) currentScore = 100;
    if (currentScore < 10) currentScore = 10;

    const strengths = [
      "Robust professional summary showing senior technological leadership.",
      "Great representation of action-oriented achievements.",
      "Outstanding contact detail layouts and structural clarity."
    ];

    const improvements = [];
    if (missingKeywords.length > 0) {
      improvements.push(`Incorporate these key missing technical skills: ${missingKeywords.slice(0, 3).join(', ')}.`);
    }
    if (readabilityStatus !== "Optimal") {
      improvements.push(`Format your Professional Summary section to be exactly 50-100 words. (Currently: ${summaryLength} words)`);
    }
    if (resumeData.experience.length < 2) {
      improvements.push("Add at least 3 distinct roles in experience timeline to demonstrate historical seniority.");
    }

    // AI booster option inside ATS panel
    const prompt = `Analyze this resume content against the target job description. Suggest 5 high-impact bullet points to increase this ATS compatibility score.
    Resume content: ${JSON.stringify(resumeData.personalInfo)} ${resumeData.summary}
    Target job description: ${jobDescriptionInput}`;

    setTimeout(() => {
      setAtsAnalysisResult({
        score: Math.round(currentScore),
        matched: matchedKeywords,
        missing: missingKeywords,
        readability: readabilityStatus,
        strengths,
        improvements
      });
      setIsAnalyzingATS(false);
      if (!isAuto) showToast("ATS compatibility audit calculated successfully!", "success");
    }, 800);
  };

  const handleUpdatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleUpdateSummary = (val) => {
    setResumeData(prev => ({ ...prev, summary: val }));
  };

  // Add Dynamic List Elements
  const handleAddExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      company: "New Organization Corporation",
      position: "Full Stack Engineer",
      location: "Remote / Hybrid",
      duration: "2025 - Present",
      achievements: [
        "Delivered dynamic user-facing features on-time with zero system downtime.",
        "Refactored relational database queries, saving multiple processing cycles."
      ]
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
    showToast("New Work Experience block created.", "info");
  };

  const handleRemoveExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
    showToast("Experience block removed.", "info");
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...resumeData.experience];
    updated[index][field] = value;
    setResumeData(prev => ({ ...prev, experience: updated }));
  };

  const handleAchievementChange = (expIndex, achIndex, value) => {
    const updated = [...resumeData.experience];
    updated[expIndex].achievements[achIndex] = value;
    setResumeData(prev => ({ ...prev, experience: updated }));
  };

  const handleAddAchievement = (expIndex) => {
    const updated = [...resumeData.experience];
    updated[expIndex].achievements.push("Designed modular system integrations to scale operational reliability.");
    setResumeData(prev => ({ ...prev, experience: updated }));
  };

  const handleRemoveAchievement = (expIndex, achIndex) => {
    const updated = [...resumeData.experience];
    updated[expIndex].achievements.splice(achIndex, 1);
    setResumeData(prev => ({ ...prev, experience: updated }));
  };

  // Education Helpers
  const handleAddEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      institution: "State University",
      degree: "B.S. in Computer Engineering",
      location: "San Diego, CA",
      duration: "2015 - 2019"
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const handleRemoveEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...resumeData.education];
    updated[index][field] = value;
    setResumeData(prev => ({ ...prev, education: updated }));
  };

  // Skills Helpers
  const handleAddSkill = (skillText) => {
    if (!skillText || resumeData.skills.includes(skillText)) return;
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, skillText]
    }));
  };

  const handleRemoveSkill = (skillText) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillText)
    }));
  };

  // Live AI Optimization Prompts
  const handleAiImproveSummary = async () => {
    const prompt = `Write an optimized, professional, ATS-friendly professional summary for an experienced ${resumeData.personalInfo.jobTitle}. Focus on premium vocabulary and quantitative achievements. Here is the draft: "${resumeData.summary}". Format your output as a single paragraph of exactly 70 to 95 words.`;
    const response = await generateWithGemini(prompt);
    handleUpdateSummary(response);
    showToast("AI polished summary successfully!", "success");
  };

  const handleAiImproveAchievements = async (expIndex) => {
    const currentAch = resumeData.experience[expIndex].achievements.join("\n");
    const prompt = `Convert these work experience bullets into high-performance, action-oriented resume accomplishments containing key business metrics:
    "${currentAch}"
    Format the response as exactly 3 separate bullet lines without any bullet symbols or serial numbers.`;
    
    const response = await generateWithGemini(prompt);
    const bullets = response.split("\n").map(b => b.trim()).filter(b => b.length > 0);
    
    if (bullets.length > 0) {
      const updated = [...resumeData.experience];
      updated[expIndex].achievements = bullets.slice(0, 4);
      setResumeData(prev => ({ ...prev, experience: updated }));
      showToast("Work accomplishments optimized!", "success");
    }
  };

  const handleGenerateCoverLetter = async () => {
    setIsGeneratingCoverLetter(true);
    const prompt = `Generate a modern cover letter matching style preference '${coverLetterStyle}' using this exact resume data:
    Name: ${resumeData.personalInfo.fullName}
    Job Title: ${resumeData.personalInfo.jobTitle}
    Experience Details: ${JSON.stringify(resumeData.experience)}
    Target Job Spec: ${jobDescriptionInput}`;

    const response = await generateWithGemini(prompt, "You are a master corporate headhunter who drafts high-converting formal cover letters.");
    setCoverLetterResult(response);
    setIsGeneratingCoverLetter(false);
    showToast("Cover letter created dynamically!", "success");
  };

  const handleAskCareerCoach = async () => {
    setIsCoachLoading(true);
    const prompt = `User profile details: Current Role: ${resumeData.personalInfo.jobTitle}, Skills: ${resumeData.skills.join(', ')}. 
    Question: ${careerCoachInput}`;
    
    const response = await generateWithGemini(prompt, "You are an elite Silicon Valley executive talent coach. Analyze profile skill gaps, predict accurate market salaries, and plan technical roadmaps.");
    setCoachResponse(response);
    setIsCoachLoading(false);
  };

  const handleImportResumeJson = (e) => {
    try {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = event => {
        const parsed = JSON.parse(event.target.result);
        if (parsed.personalInfo && parsed.summary) {
          setResumeData(parsed);
          showToast("Resume JSON imported successfully!", "success");
        } else {
          showToast("Malformed Resume schema. Please verify template syntax.", "error");
        }
      };
    } catch (err) {
      showToast("Failed to parse local file system stream.", "error");
    }
  };

  const handleExportResumeJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_resume.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Resume template backup complete.", "success");
  };

  // Simple browser trigger print function to output clean, print-ready stylesheet styled HTML
  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased pt-16 lg:pt-20">
      
      {/* Dynamic Floating Notification Toasts */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((t) => (
          <div 
            key={t.id} 
            className={`p-4 rounded-xl shadow-2xl border flex items-center gap-3 animate-slide-up pointer-events-auto backdrop-blur-md bg-slate-900/90 ${
              t.type === 'success' ? 'border-emerald-500/50 text-emerald-400' :
              t.type === 'error' ? 'border-rose-500/50 text-rose-400' : 'border-indigo-500/50 text-indigo-400'
            }`}
          >
            <Sparkles className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{t.message}</p>
          </div>
        ))}
      </div>

      {/* Global AI Processing Overlay Panel */}
      {globalAiLoading && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="bg-slate-900/90 border border-indigo-500/20 p-8 rounded-3xl max-w-md text-center shadow-2xl flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin"></div>
              <Sparkles className="w-6 h-6 text-indigo-400 absolute inset-0 m-auto animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">CV-X Intelligent Engine</h3>
            <p className="text-slate-400 text-sm">Our neural network is refining, aligning, and boosting your resume variables for maximum ATS delivery...</p>
          </div>
        </div>
      )}

      {/* API Key Settings Drawer/Modal */}
      {isApiKeyModalOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => setIsApiKeyModalOpen(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">Gemini API Configuration</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              To trigger actual, unrestricted production-grade intelligence models instead of advanced fallback processors, supply a valid Google Gemini Pro API Key below. Your key stays localized to your secure client context.
            </p>
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 block">Gemini API Key</label>
              <input 
                type="password" 
                placeholder="AIzaSy..." 
                value={geminiApiKey} 
                onChange={(e) => setGeminiApiKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-indigo-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Free fallback active without key</span>
                <span className="text-indigo-400 hover:underline cursor-pointer" onClick={() => window.open('https://aistudio.google.com/', '_blank')}>Get Free API Key</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button 
                onClick={() => {
                  setGeminiApiKey(''); 
                  showToast("API Key cleaned. Falling back to local model rules.", "info");
                }} 
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition"
              >
                Clear Key
              </button>
              <button 
                onClick={() => {
                  setIsApiKeyModalOpen(false); 
                  showToast("Gemini API key configurations locked.", "success");
                }} 
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition"
              >
                Save & Lock
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-16 z-30 lg:top-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-indigo-500 to-fuchsia-500 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                CV-X <span className="font-light text-slate-400 text-sm">2026</span>
              </span>
              <p className="text-[10px] text-slate-500 tracking-wider font-semibold uppercase">Enterprise AI Platform</p>
            </div>
          </div>

          {/* Quick Stats Banner / Settings Bar */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-medium text-slate-300">ATS Engine v3.8 Active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400">Model Level:</span>
              <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full">Gemini 3.5 Flash</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsApiKeyModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg border border-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-2 transition bg-slate-900/50 hover:bg-slate-900"
            >
              <Settings className="w-4 h-4" />
              <span>{geminiApiKey ? 'API Configured' : 'Setup API Key'}</span>
            </button>
            <div className="relative">
              <select 
                value={subscriptionTier}
                onChange={(e) => {
                  setSubscriptionTier(e.target.value);
                  showToast(`Billing account upgraded to ${e.target.value.toUpperCase()}`, "success");
                }}
                className="appearance-none bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 border border-indigo-500/20 rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold cursor-pointer transition focus:outline-none"
              >
                <option value="free" className="bg-slate-950 text-white">Free Basic</option>
                <option value="pro" className="bg-slate-950 text-white">Pro Membership</option>
                <option value="enterprise" className="bg-slate-950 text-white">Enterprise AI</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-indigo-300 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>
      </header>

      {}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Left Side Global Navigation Dashboard Sidebar */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-2">
          <div className="bg-slate-900/60 border border-slate-900 p-4 rounded-2xl mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/20">
                AM
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Alexander Mercer</h4>
                <p className="text-[11px] text-slate-400 capitalize">{subscriptionTier} Plan Level</p>
              </div>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-900 text-center">
              <span className="text-[10px] text-slate-500 font-bold block mb-1">GLOBAL RESUME COMPATIBILITY</span>
              <span className="text-xl font-black text-indigo-400">{atsAnalysisResult ? atsAnalysisResult.score : 85}%</span>
            </div>
          </div>

          <p className="text-[10px] font-bold text-slate-500 px-3 tracking-wider uppercase mb-1">PLATFORM ENGINE</p>
          <nav className="flex flex-col gap-1">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3 transition-all ${
                activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Control Dashboard</span>
            </button>
            <button 
              onClick={() => setActiveTab('builder')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3 transition-all ${
                activeTab === 'builder' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Resume Architect</span>
            </button>
            <button 
              onClick={() => setActiveTab('matcher')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3 transition-all ${
                activeTab === 'matcher' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>ATS Scorecard</span>
            </button>
            <button 
              onClick={() => setActiveTab('coverletter')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3 transition-all ${
                activeTab === 'coverletter' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>AI Cover Letters</span>
            </button>
            <button 
              onClick={() => setActiveTab('crm')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3 transition-all ${
                activeTab === 'crm' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Job Tracker CRM</span>
            </button>
            <button 
              onClick={() => setActiveTab('coach')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3 transition-all ${
                activeTab === 'coach' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>AI Career Coach</span>
            </button>
          </nav>

          <p className="text-[10px] font-bold text-slate-500 px-3 tracking-wider uppercase mt-4 mb-1">ENTERPRISE SYSTEM</p>
          <nav className="flex flex-col gap-1">
            <button 
              onClick={() => setActiveTab('admin')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3 transition-all ${
                activeTab === 'admin' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Analytics Admin</span>
            </button>
          </nav>
        </aside>

        {/* Dynamic Inner Component Panel (Switched based on State ActiveTab) */}
        <main className="flex-1 min-w-0">
          
          {/* ==================== SCREEN 1: CONTROL DASHBOARD ==================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Premium Welcome Hero Card */}
              <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/10 p-6 rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full filter blur-3xl -z-10"></div>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full">CV-X Intelligent Core Active</span>
                    <h1 className="text-2xl sm:text-3xl font-black text-white mt-2 mb-1">Welcome back, Alexander!</h1>
                    <p className="text-slate-400 text-sm">Your primary AI Architect CV was optimized to a premium 94% standard today. Readability checks passed.</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('builder')}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-5 py-3 rounded-xl flex items-center gap-2 transition transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Open Resume Editor</span>
                  </button>
                </div>
              </div>

              {/* Grid Metrics Display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-slate-900/50 border border-slate-900 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Live Templates</span>
                    <p className="text-2xl font-black text-white mt-1">5 Premium</p>
                    <p className="text-xs text-indigo-400 hover:underline cursor-pointer mt-1" onClick={() => setActiveTab('builder')}>Customize Styles</p>
                  </div>
                  <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                    <FileText className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-900 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">ATS Matching Audit</span>
                    <p className="text-2xl font-black text-emerald-400 mt-1">{atsAnalysisResult ? atsAnalysisResult.score : 85}/100</p>
                    <p className="text-xs text-slate-400 mt-1">Score: <strong>Optimized</strong></p>
                  </div>
                  <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-900 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Tracked Career Applications</span>
                    <p className="text-2xl font-black text-white mt-1">{jobsCRM.length} Active</p>
                    <p className="text-xs text-indigo-400 hover:underline cursor-pointer mt-1" onClick={() => setActiveTab('crm')}>Manage Kanban CRM</p>
                  </div>
                  <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                    <Briefcase className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* System Performance Graph and Recommendations */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Active Resumes Mini-List */}
                <div className="lg:col-span-7 bg-slate-900/30 border border-slate-900 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-indigo-400" />
                      <span>Created Corporate Resumes</span>
                    </h3>
                    <span className="text-xs text-slate-500 font-semibold uppercase">{savedResumes.length} profiles</span>
                  </div>

                  <div className="space-y-3">
                    {savedResumes.map((res) => (
                      <div key={res.id} className="bg-slate-900/80 border border-slate-900/60 p-4 rounded-xl flex items-center justify-between hover:border-indigo-500/30 transition">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center border border-slate-800">
                            <FileText className="w-5 h-5 text-indigo-400" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white leading-snug">{res.name}</h4>
                            <p className="text-[10px] text-slate-500 mt-0.5">Last modified: {res.date} • Style: {res.template.toUpperCase()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded">Score: {res.score}%</span>
                          <button 
                            onClick={() => {
                              setActiveTab('builder');
                              showToast(`Loaded ${res.name}`, "info");
                            }}
                            className="p-1.5 rounded bg-slate-950 border border-slate-800 hover:text-white transition text-slate-400 text-xs"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Rec Engine Recommendations Box */}
                <div className="lg:col-span-5 bg-gradient-to-b from-indigo-950/20 to-slate-900/60 border border-indigo-500/15 rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <span>CV-X Optimization Tips</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex gap-2.5 items-start text-xs text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                        <p>Our audit reports that the <strong>"Staff AI Engineer"</strong> CV is missing <strong>"Docker"</strong>. Add this to improve ATS matching.</p>
                      </div>
                      <div className="flex gap-2.5 items-start text-xs text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                        <p>Write standard metrics for your Stanford University entry. Recruiters appreciate GPA, honors or high-impact research tags.</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-800/60">
                    <button 
                      onClick={() => setActiveTab('matcher')} 
                      className="w-full text-center py-2 bg-slate-950 border border-slate-800 hover:bg-slate-900 transition rounded-xl text-xs font-bold text-indigo-400 block"
                    >
                      Audit ATS Now
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ==================== SCREEN 2: RESUME BUILDER ARCHITECT ==================== */}
          {activeTab === 'builder' && (
            <div className="space-y-6">
              
              {/* Build Action Controllers Header bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-900">
                <div>
                  <h2 className="text-lg font-black text-white">Resume Architect Studio</h2>
                  <p className="text-xs text-slate-400">Drag to reorder, use direct Gemini artificial intelligence blocks to boost professional language.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <label className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 hover:text-white transition flex items-center gap-1.5 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Import JSON</span>
                    <input type="file" accept=".json" onChange={handleImportResumeJson} className="hidden" />
                  </label>
                  <button 
                    onClick={handleExportResumeJson}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 hover:text-white transition flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Backup Config</span>
                  </button>
                  <button 
                    onClick={handlePrintPdf}
                    className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export PDF</span>
                  </button>
                </div>
              </div>

              {/* Two Panel Interface */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                
                {/* LEFT PANEL: Form Inputs / Editor Sections */}
                <div className="xl:col-span-6 space-y-6 max-h-[85vh] overflow-y-auto pr-1">
                  
                  {/* Tab 1: Personal Information Form block */}
                  <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                      <User className="w-4 h-4 text-indigo-400" />
                      <h3 className="text-sm font-bold text-white">1. Personal Information</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Full Name</label>
                        <input 
                          type="text" 
                          value={resumeData.personalInfo.fullName}
                          onChange={(e) => handleUpdatePersonalInfo('fullName', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Target Job Title</label>
                        <input 
                          type="text" 
                          value={resumeData.personalInfo.jobTitle}
                          onChange={(e) => handleUpdatePersonalInfo('jobTitle', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Email Address</label>
                        <input 
                          type="email" 
                          value={resumeData.personalInfo.email}
                          onChange={(e) => handleUpdatePersonalInfo('email', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Phone Number</label>
                        <input 
                          type="text" 
                          value={resumeData.personalInfo.phone}
                          onChange={(e) => handleUpdatePersonalInfo('phone', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Location (City, State)</label>
                        <input 
                          type="text" 
                          value={resumeData.personalInfo.location}
                          onChange={(e) => handleUpdatePersonalInfo('location', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Personal Website</label>
                        <input 
                          type="text" 
                          value={resumeData.personalInfo.website}
                          onChange={(e) => handleUpdatePersonalInfo('website', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tab 2: Professional Summary Input with integrated AI optimization */}
                  <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-indigo-400" />
                        <h3 className="text-sm font-bold text-white">2. Professional Profile Summary</h3>
                      </div>
                      <button 
                        onClick={handleAiImproveSummary}
                        className="text-xs bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 font-bold px-2.5 py-1 rounded flex items-center gap-1 transition"
                      >
                        <Sparkles className="w-3 h-3 text-indigo-400" />
                        <span>AI Polish Summary</span>
                      </button>
                    </div>
                    <div className="space-y-1">
                      <textarea 
                        rows={5}
                        value={resumeData.summary}
                        onChange={(e) => handleUpdateSummary(e.target.value)}
                        placeholder="Draft your overarching experience timeline here. Let our AI upgrade action keywords dynamically."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                      />
                      <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                        <span>Characters: {resumeData.summary.length}</span>
                        <span>Estimated Word Count: {resumeData.summary.split(/\s+/).filter(Boolean).length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tab 3: Work Experience dynamic block constructor */}
                  <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-indigo-400" />
                        <h3 className="text-sm font-bold text-white">3. Professional Work History</h3>
                      </div>
                      <button 
                        onClick={handleAddExperience}
                        className="px-2.5 py-1 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded transition flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Job Block</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {resumeData.experience.map((exp, expIdx) => (
                        <div key={exp.id} className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl space-y-3 relative">
                          <button 
                            onClick={() => handleRemoveExperience(exp.id)}
                            className="absolute top-4 right-4 text-slate-500 hover:text-rose-400 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 uppercase">Company Name</label>
                              <input 
                                type="text" 
                                value={exp.company}
                                onChange={(e) => handleExperienceChange(expIdx, 'company', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 uppercase">Position Role</label>
                              <input 
                                type="text" 
                                value={exp.position}
                                onChange={(e) => handleExperienceChange(expIdx, 'position', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 uppercase">Dates / Duration</label>
                              <input 
                                type="text" 
                                value={exp.duration}
                                onChange={(e) => handleExperienceChange(expIdx, 'duration', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 uppercase">Location</label>
                              <input 
                                type="text" 
                                value={exp.location}
                                onChange={(e) => handleExperienceChange(expIdx, 'location', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* Achievements list tracker */}
                          <div className="space-y-2 pt-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Key Role Achievements & Metrics</span>
                              <button 
                                onClick={() => handleAiImproveAchievements(expIdx)}
                                className="text-[10px] text-indigo-400 hover:underline font-bold flex items-center gap-1"
                              >
                                <Sparkles className="w-3 h-3" />
                                <span>Boost Metrics with AI</span>
                              </button>
                            </div>

                            {exp.achievements.map((ach, achIdx) => (
                              <div key={achIdx} className="flex gap-2 items-center">
                                <input 
                                  type="text" 
                                  value={ach}
                                  onChange={(e) => handleAchievementChange(expIdx, achIdx, e.target.value)}
                                  className="w-full bg-slate-900 border border-slate-800/60 rounded p-2 text-xs text-white focus:outline-none"
                                />
                                <button 
                                  onClick={() => handleRemoveAchievement(expIdx, achIdx)}
                                  className="text-slate-500 hover:text-rose-400 shrink-0"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}

                            <button 
                              onClick={() => handleAddAchievement(expIdx)}
                              className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 pt-1"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add Bullet Point</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tab 4: Education History Block */}
                  <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-400" />
                        <h3 className="text-sm font-bold text-white">4. Education</h3>
                      </div>
                      <button 
                        onClick={handleAddEducation}
                        className="px-2.5 py-1 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded transition flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Education</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {resumeData.education.map((edu, eduIdx) => (
                        <div key={edu.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl relative space-y-3">
                          <button 
                            onClick={() => handleRemoveEducation(edu.id)}
                            className="absolute top-4 right-4 text-slate-500 hover:text-rose-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-[10px] font-bold text-slate-500 uppercase">Institution</label>
                              <input 
                                type="text" 
                                value={edu.institution}
                                onChange={(e) => handleEducationChange(eduIdx, 'institution', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-500 uppercase">Degree</label>
                              <input 
                                type="text" 
                                value={edu.degree}
                                onChange={(e) => handleEducationChange(eduIdx, 'degree', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-500 uppercase">Dates</label>
                              <input 
                                type="text" 
                                value={edu.duration}
                                onChange={(e) => handleEducationChange(eduIdx, 'duration', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-500 uppercase">Location</label>
                              <input 
                                type="text" 
                                value={edu.location}
                                onChange={(e) => handleEducationChange(eduIdx, 'location', e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-white focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tab 5: Skills Tag Matrix constructor */}
                  <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-indigo-400" />
                        <h3 className="text-sm font-bold text-white">5. Skill Matrix</h3>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill) => (
                        <span 
                          key={skill} 
                          className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-300 flex items-center gap-1.5"
                        >
                          <span>{skill}</span>
                          <button onClick={() => handleRemoveSkill(skill)} className="hover:text-white">&times;</button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Add professional skill keyword..." 
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAddSkill(e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                      />
                      <button 
                        onClick={(e) => {
                          const input = e.currentTarget.previousSibling;
                          if (input) {
                            handleAddSkill(input.value);
                            input.value = '';
                          }
                        }}
                        className="px-4 bg-slate-850 hover:bg-slate-800 rounded-lg text-xs font-bold border border-slate-800"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                </div>

                {/* ==================== RIGHT PANEL: REAL-TIME PREMIUM THEME PREVIEW ==================== */}
                <div className="xl:col-span-6 space-y-4 flex flex-col">
                  
                  {/* Style Controller Deck */}
                  <div className="bg-slate-900/60 border border-slate-900 rounded-2xl p-4 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Sliders className="w-4 h-4 text-indigo-400" />
                        <span>Interactive Styles Deck</span>
                      </span>
                      {/* Zoom Actions */}
                      <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-850">
                        <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))} className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-900"><ZoomOut className="w-3.5 h-3.5" /></button>
                        <span className="text-[10px] px-2 font-mono text-slate-400">{zoomLevel}%</span>
                        <button onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))} className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-900"><ZoomIn className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                      {/* Template Selector dropdown */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Template Blueprint</label>
                        <select 
                          value={selectedTemplate}
                          onChange={(e) => setSelectedTemplate(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 text-slate-300 rounded p-1.5 text-xs focus:outline-none"
                        >
                          {TEMPLATE_PRESETS.map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* Accent Palette Selector dropdown */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Accent Palette</label>
                        <select 
                          value={selectedColor.id}
                          onChange={(e) => {
                            const found = COLOR_PALETTES.find(c => c.id === e.target.value);
                            if (found) setSelectedColor(found);
                          }}
                          className="w-full bg-slate-950 border border-slate-850 text-slate-300 rounded p-1.5 text-xs focus:outline-none"
                        >
                          {COLOR_PALETTES.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* Font preset selectors */}
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Typography Font</label>
                        <select 
                          value={selectedFont.id}
                          onChange={(e) => {
                            const found = FONT_PRESETS.find(f => f.id === e.target.value);
                            if (found) setSelectedFont(found);
                          }}
                          className="w-full bg-slate-950 border border-slate-850 text-slate-300 rounded p-1.5 text-xs focus:outline-none"
                        >
                          {FONT_PRESETS.map(f => (
                            <option key={f.id} value={f.id}>{f.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Clean Render Canvas container */}
                  <div className="bg-slate-950 border border-slate-900 rounded-3xl p-6 relative overflow-hidden shadow-inner flex justify-center items-start min-h-[600px]">
                    <div 
                      id="resume-canvas-render"
                      className="bg-white text-slate-900 p-8 w-[210mm] min-h-[297mm] shadow-2xl transition-all duration-300 relative rounded-md border border-slate-300/40"
                      style={{ 
                        transform: `scale(${zoomLevel / 100})`, 
                        transformOrigin: 'top center',
                        fontFamily: selectedFont.family,
                      }}
                    >
                      {/* ACCENT COLORED TOP BANNER OR SIDEBAR ACCORDING TO ACTIVE SELECTED TEMPLATE STYLE */}
                      {selectedTemplate === 'modern' && (
                        <div className="absolute top-0 left-0 w-3 h-full" style={{ backgroundColor: selectedColor.primary }}></div>
                      )}

                      {/* THEME DESIGN 1: ATS MINIMALIST */}
                      {selectedTemplate === 'ats' && (
                        <div className="space-y-6">
                          <div className="text-center border-b pb-4">
                            <h1 className="text-2xl font-bold tracking-tight uppercase" style={{ color: selectedColor.primary }}>
                              {resumeData.personalInfo.fullName}
                            </h1>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-0.5">{resumeData.personalInfo.jobTitle}</p>
                            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-slate-500 mt-2">
                              <span>{resumeData.personalInfo.email}</span>
                              <span>•</span>
                              <span>{resumeData.personalInfo.phone}</span>
                              <span>•</span>
                              <span>{resumeData.personalInfo.location}</span>
                              <span>•</span>
                              <span className="underline">{resumeData.personalInfo.website}</span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <h3 className="text-xs font-bold uppercase tracking-wider pb-1 border-b" style={{ color: selectedColor.primary }}>Professional Summary</h3>
                            <p className="text-xs text-slate-600 leading-relaxed text-justify">{resumeData.summary}</p>
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-xs font-bold uppercase tracking-wider pb-1 border-b" style={{ color: selectedColor.primary }}>Experience Highlights</h3>
                            {resumeData.experience.map((exp) => (
                              <div key={exp.id} className="space-y-1">
                                <div className="flex justify-between items-baseline">
                                  <span className="text-xs font-bold text-slate-800">{exp.position} — <span className="font-semibold text-slate-500">{exp.company}</span></span>
                                  <span className="text-[10px] text-slate-400 font-mono">{exp.duration}</span>
                                </div>
                                <p className="text-[10px] italic text-slate-400">{exp.location}</p>
                                <ul className="list-disc pl-4 text-slate-600 text-[11px] leading-relaxed space-y-0.5">
                                  {exp.achievements.map((ach, idx) => (
                                    <li key={idx}>{ach}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <h3 className="text-xs font-bold uppercase tracking-wider pb-1 border-b" style={{ color: selectedColor.primary }}>Technical Core Skills</h3>
                              <div className="flex flex-wrap gap-1.5">
                                {resumeData.skills.map(s => (
                                  <span key={s} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">{s}</span>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h3 className="text-xs font-bold uppercase tracking-wider pb-1 border-b" style={{ color: selectedColor.primary }}>Education</h3>
                              {resumeData.education.map((edu) => (
                                <div key={edu.id} className="text-[10px] leading-tight space-y-0.5">
                                  <p className="font-bold text-slate-700">{edu.degree}</p>
                                  <p className="text-slate-500">{edu.institution} • {edu.duration}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* THEME DESIGN 2: MODERN ACCENT STYLE */}
                      {selectedTemplate === 'modern' && (
                        <div className="space-y-5 pl-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h1 className="text-2xl font-black text-slate-900 tracking-tight">{resumeData.personalInfo.fullName}</h1>
                              <p className="text-sm font-bold tracking-widest uppercase" style={{ color: selectedColor.primary }}>{resumeData.personalInfo.jobTitle}</p>
                            </div>
                            <div className="text-right text-[10px] text-slate-500 space-y-0.5">
                              <p>{resumeData.personalInfo.email}</p>
                              <p>{resumeData.personalInfo.phone}</p>
                              <p>{resumeData.personalInfo.location}</p>
                              <p className="font-mono text-indigo-600">{resumeData.personalInfo.website}</p>
                            </div>
                          </div>

                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <p className="text-xs text-slate-600 leading-relaxed text-justify">{resumeData.summary}</p>
                          </div>

                          <div className="space-y-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest border-l-4 pl-2" style={{ borderColor: selectedColor.primary, color: selectedColor.primary }}>Experience Timeline</h3>
                            {resumeData.experience.map((exp) => (
                              <div key={exp.id} className="space-y-1 relative">
                                <div className="flex justify-between items-baseline">
                                  <h4 className="text-xs font-bold text-slate-800">{exp.position} <span className="text-slate-400 font-normal">at</span> {exp.company}</h4>
                                  <span className="text-[10px] font-semibold text-slate-400">{exp.duration}</span>
                                </div>
                                <ul className="list-disc pl-4 text-slate-600 text-[11px] leading-relaxed space-y-0.5">
                                  {exp.achievements.map((ach, idx) => (
                                    <li key={idx}>{ach}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

                          <div className="grid grid-cols-12 gap-4 border-t pt-4">
                            <div className="col-span-8 space-y-2">
                              <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: selectedColor.primary }}>Core Capabilities</h3>
                              <div className="flex flex-wrap gap-1">
                                {resumeData.skills.map(s => (
                                  <span key={s} className="text-[9px] bg-slate-100 text-slate-700 px-2 py-1 rounded" style={{ borderLeft: `2px solid ${selectedColor.primary}` }}>{s}</span>
                                ))}
                              </div>
                            </div>
                            <div className="col-span-4 space-y-2">
                              <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: selectedColor.primary }}>Education</h3>
                              {resumeData.education.map(edu => (
                                <div key={edu.id} className="text-[10px]">
                                  <p className="font-bold text-slate-700">{edu.institution}</p>
                                  <p className="text-slate-500">{edu.degree}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* FALLBACK TEMPLATES: EXECUTIVE / TECH COMPACT RENDERING (Toggled smoothly via Javascript state) */}
                      {(selectedTemplate !== 'ats' && selectedTemplate !== 'modern') && (
                        <div className="space-y-5">
                          <div className="p-4 bg-slate-900 text-white rounded-xl flex justify-between items-center" style={{ backgroundColor: selectedColor.secondary }}>
                            <div>
                              <h1 className="text-xl font-bold tracking-tight">{resumeData.personalInfo.fullName}</h1>
                              <p className="text-xs text-indigo-300 font-semibold">{resumeData.personalInfo.jobTitle}</p>
                            </div>
                            <div className="text-right text-[9px] text-indigo-200">
                              <p>{resumeData.personalInfo.email}</p>
                              <p>{resumeData.personalInfo.phone}</p>
                              <p>{resumeData.personalInfo.location}</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-xs font-bold uppercase border-b pb-1" style={{ color: selectedColor.primary }}>Core Professional Trajectory</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">{resumeData.summary}</p>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase border-b pb-1" style={{ color: selectedColor.primary }}>Experience Milestones</h4>
                            {resumeData.experience.map((exp) => (
                              <div key={exp.id} className="space-y-1">
                                <p className="text-xs font-bold text-slate-800">{exp.position} — <span className="font-medium text-slate-500">{exp.company}</span></p>
                                <ul className="list-disc pl-4 text-slate-600 text-[10px] space-y-0.5">
                                  {exp.achievements.slice(0, 2).map((ach, i) => <li key={i}>{ach}</li>)}
                                </ul>
                              </div>
                            ))}
                          </div>

                          <div className="space-y-2 pt-2">
                            <h4 className="text-xs font-bold uppercase border-b pb-1" style={{ color: selectedColor.primary }}>Capabilities & Certifications</h4>
                            <p className="text-[10px] text-slate-600"><strong>Languages:</strong> {resumeData.languages.join(', ')}</p>
                            <p className="text-[10px] text-slate-600"><strong>Technical Focus:</strong> {resumeData.skills.join(', ')}</p>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ==================== SCREEN 3: ATS SCORECARD & MATCH ENGINE ==================== */}
          {activeTab === 'matcher' && (
            <div className="space-y-6">
              
              <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-3xl">
                <h2 className="text-xl font-black text-white flex items-center gap-2 mb-1">
                  <CheckCircle className="w-5 h-5 text-indigo-400" />
                  <span>Interactive Job Description Compatibility Matcher</span>
                </h2>
                <p className="text-xs text-slate-400">Paste your specific target enterprise job description below. Our proprietary parser executes strict linguistic matching against your active resume context.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Inputs Pane left */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="bg-slate-900/60 border border-slate-900 p-5 rounded-2xl space-y-3">
                    <span className="text-xs font-bold text-slate-300 block">Target Enterprise Job Description</span>
                    <textarea 
                      rows={10}
                      value={jobDescriptionInput}
                      onChange={(e) => setJobDescriptionInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono leading-relaxed"
                    />
                    <div className="flex justify-end pt-1">
                      <button 
                        onClick={() => runATSAnalysis(false)}
                        disabled={isAnalyzingATS}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-2"
                      >
                        {isAnalyzingATS ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Sparkles className="w-4 h-4" />
                        )}
                        <span>Audit Resume Compatibility</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Score Output Right */}
                <div className="lg:col-span-6 space-y-4">
                  
                  {atsAnalysisResult ? (
                    <div className="bg-slate-900/40 border border-slate-900 p-5 rounded-2xl space-y-6">
                      
                      {/* Big Circle Score Display */}
                      <div className="flex items-center gap-6 bg-slate-950 p-4 rounded-xl border border-slate-900">
                        <div className="relative shrink-0">
                          <svg className="w-24 h-24 transform -rotate-90">
                            <circle cx="48" cy="48" r="40" stroke="#1e293b" strokeWidth="8" fill="transparent" />
                            <circle cx="48" cy="48" r="40" stroke="#4f46e5" strokeWidth="8" fill="transparent" 
                              strokeDasharray={2 * Math.PI * 40}
                              strokeDashoffset={2 * Math.PI * 40 * (1 - atsAnalysisResult.score / 100)}
                            />
                          </svg>
                          <span className="absolute inset-0 m-auto flex items-center justify-center text-xl font-black text-white">{atsAnalysisResult.score}%</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">ATS General Compatibility Rank</h4>
                          <p className="text-xs text-slate-400 mt-1">Calculated via structural analysis of your CV files against keywords extracted in real-time.</p>
                        </div>
                      </div>

                      {/* Matching and Missing keywords */}
                      <div className="space-y-4">
                        <div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5">Matched Keywords ({atsAnalysisResult.matched.length})</span>
                          <div className="flex flex-wrap gap-1.5">
                            {atsAnalysisResult.matched.map(m => (
                              <span key={m} className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                <span>{m.toUpperCase()}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5">Missing Crucial Skills ({atsAnalysisResult.missing.length})</span>
                          <div className="flex flex-wrap gap-1.5">
                            {atsAnalysisResult.missing.map(m => (
                              <span key={m} className="px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-[10px] font-bold text-rose-400 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                <span>{m.toUpperCase()}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bulleted Action suggestions */}
                      <div className="space-y-3 pt-4 border-t border-slate-800">
                        <span className="text-xs font-bold text-white block">Actionable Improvements</span>
                        <div className="space-y-2">
                          {atsAnalysisResult.improvements.map((imp, idx) => (
                            <div key={idx} className="flex gap-2.5 items-start text-xs text-slate-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                              <p>{imp}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="bg-slate-900/30 border border-slate-900 p-8 rounded-2xl text-center text-slate-500">
                      <Sparkles className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                      <p className="text-sm">Initiate the audit pipeline to see interactive scoring, keywords matching, and suggestions.</p>
                    </div>
                  )}

                </div>

              </div>

            </div>
          )}

          {/* ==================== SCREEN 4: COVER LETTER GENERATOR ==================== */}
          {activeTab === 'coverletter' && (
            <div className="space-y-6">
              
              <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-3xl">
                <h2 className="text-xl font-black text-white flex items-center gap-2 mb-1">
                  <MessageSquare className="w-5 h-5 text-indigo-400" />
                  <span>AI Cover Letter Architect</span>
                </h2>
                <p className="text-xs text-slate-400">Generate tailor-fitted, high-conversion formal business narratives aligning to corporate standards.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Configuration settings on left */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-slate-900/60 border border-slate-900 p-5 rounded-2xl space-y-4">
                    <span className="text-xs font-bold text-white block">Tone & Style Selection</span>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {['executive', 'formal', 'technical', 'creative'].map(style => (
                        <button 
                          key={style}
                          onClick={() => setCoverLetterStyle(style)}
                          className={`p-3 rounded-xl border text-xs font-bold capitalize transition text-center ${
                            coverLetterStyle === style ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300' : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                          }`}
                        >
                          {style} Style
                        </button>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Hiring Company Context</label>
                      <input 
                        type="text" 
                        placeholder="Company name (e.g. Anthropic AI)" 
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <button 
                      onClick={handleGenerateCoverLetter}
                      disabled={isGeneratingCoverLetter}
                      className="w-full text-center py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
                    >
                      {isGeneratingCoverLetter ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      <span>Generate Corporate Cover Letter</span>
                    </button>
                  </div>
                </div>

                {/* Cover letter text results pane */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-slate-900/40 border border-slate-900 p-5 rounded-2xl space-y-4 min-h-[400px]">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <span className="text-xs font-bold text-white">Generated Letter Output</span>
                      {coverLetterResult && (
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(coverLetterResult);
                            showToast("Copied cover letter to clipboard!", "success");
                          }}
                          className="px-2.5 py-1 text-[10px] bg-slate-950 border border-slate-800 hover:text-white rounded transition flex items-center gap-1 text-slate-400"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Letter</span>
                        </button>
                      )}
                    </div>

                    {coverLetterResult ? (
                      <div className="text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap bg-slate-950 p-4 rounded-xl border border-slate-900">
                        {coverLetterResult}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-16">
                        <MessageSquare className="w-10 h-10 text-slate-700 mb-3" />
                        <p className="text-sm">Click generate above to model premium personal credentials into direct introductory statements.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ==================== SCREEN 5: JOB TRACKER CRM ==================== */}
          {activeTab === 'crm' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/40 border border-slate-900 p-6 rounded-3xl">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-indigo-400" />
                    <span>Job Applications Tracker CRM</span>
                  </h2>
                  <p className="text-xs text-slate-400">Keep absolute tracks of interviews, notes, and pending offers in this interactive pipeline dashboard.</p>
                </div>
                <button 
                  onClick={() => setNewJobModal(true)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Application Card</span>
                </button>
              </div>

              {/* Add Job Modal popup block */}
              {newJobModal && (
                <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 relative">
                    <button onClick={() => setNewJobModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">&times;</button>
                    <h3 className="text-sm font-bold text-white mb-4">Add Target Job Entry</h3>
                    <div className="space-y-3 text-xs">
                      <div className="space-y-1">
                        <label className="text-slate-400 uppercase text-[9px] font-bold">Company</label>
                        <input type="text" placeholder="e.g. Anthropic" className="w-full bg-slate-950 border border-slate-850 rounded p-2 text-white" onChange={(e) => setNewJobData({...newJobData, company: e.target.value})} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-400 uppercase text-[9px] font-bold">Role Title</label>
                        <input type="text" placeholder="e.g. Senior AI Strategist" className="w-full bg-slate-950 border border-slate-850 rounded p-2 text-white" onChange={(e) => setNewJobData({...newJobData, role: e.target.value})} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-400 uppercase text-[9px] font-bold">Target Salary Compensation</label>
                        <input type="text" placeholder="e.g. $220,000" className="w-full bg-slate-950 border border-slate-850 rounded p-2 text-white" onChange={(e) => setNewJobData({...newJobData, salary: e.target.value})} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-400 uppercase text-[9px] font-bold">Pipeline Status</label>
                        <select className="w-full bg-slate-950 border border-slate-850 rounded p-2 text-white" onChange={(e) => setNewJobData({...newJobData, status: e.target.value})}>
                          <option value="saved">Saved / Tracking</option>
                          <option value="applied">Applied</option>
                          <option value="interview">Interviewing</option>
                          <option value="offer">Offer / Negotiating</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-2 text-xs font-bold">
                      <button onClick={() => setNewJobModal(false)} className="px-3.5 py-1.5 bg-slate-950 border border-slate-850 text-slate-400 rounded">Cancel</button>
                      <button 
                        onClick={() => {
                          const newCard = { id: `job-${Date.now()}`, ...newJobData };
                          setJobsCRM([...jobsCRM, newCard]);
                          setNewJobModal(false);
                          showToast("New career application tracked!", "success");
                        }}
                        className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded"
                      >
                        Save Entry
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Kanban Tracker Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* COLUMN 1: SAVED */}
                <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-300">Saved Opportunities</span>
                    <span className="text-[10px] bg-slate-850 px-2 py-0.5 rounded text-slate-400 font-bold">{jobsCRM.filter(j => j.status === 'saved').length}</span>
                  </div>
                  <div className="space-y-2 flex-1">
                    {jobsCRM.filter(j => j.status === 'saved').map(job => (
                      <div key={job.id} className="p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-2 relative group hover:border-slate-800">
                        <button onClick={() => setJobsCRM(jobsCRM.filter(j => j.id !== job.id))} className="absolute top-2 right-2 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                        <h4 className="text-xs font-bold text-white">{job.role}</h4>
                        <p className="text-[10px] text-indigo-400 font-semibold">{job.company}</p>
                        <div className="flex justify-between items-center text-[9px] text-slate-500 pt-1 border-t border-slate-900">
                          <span>{job.salary}</span>
                          <button onClick={() => {
                            const updated = jobsCRM.map(j => j.id === job.id ? {...j, status: 'applied'} : j);
                            setJobsCRM(updated);
                            showToast("Shifted job state to Applied", "info");
                          }} className="text-indigo-400 hover:underline">Apply &rarr;</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* COLUMN 2: APPLIED */}
                <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-300">Applied</span>
                    <span className="text-[10px] bg-slate-850 px-2 py-0.5 rounded text-slate-400 font-bold">{jobsCRM.filter(j => j.status === 'applied').length}</span>
                  </div>
                  <div className="space-y-2 flex-1">
                    {jobsCRM.filter(j => j.status === 'applied').map(job => (
                      <div key={job.id} className="p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-2 relative group hover:border-slate-800">
                        <button onClick={() => setJobsCRM(jobsCRM.filter(j => j.id !== job.id))} className="absolute top-2 right-2 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100"><Trash2 className="w-3.5 h-3.5" /></button>
                        <h4 className="text-xs font-bold text-white">{job.role}</h4>
                        <p className="text-[10px] text-indigo-400 font-semibold">{job.company}</p>
                        <div className="flex justify-between items-center text-[9px] text-slate-500 pt-1 border-t border-slate-900">
                          <span>{job.salary}</span>
                          <button onClick={() => {
                            const updated = jobsCRM.map(j => j.id === job.id ? {...j, status: 'interview'} : j);
                            setJobsCRM(updated);
                          }} className="text-indigo-400 hover:underline">Interview &rarr;</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* COLUMN 3: INTERVIEWING */}
                <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-300">Interviewing</span>
                    <span className="text-[10px] bg-slate-850 px-2 py-0.5 rounded text-slate-400 font-bold">{jobsCRM.filter(j => j.status === 'interview').length}</span>
                  </div>
                  <div className="space-y-2 flex-1">
                    {jobsCRM.filter(j => j.status === 'interview').map(job => (
                      <div key={job.id} className="p-3 bg-slate-950 border border-indigo-500/30 rounded-xl space-y-2 relative group">
                        <button onClick={() => setJobsCRM(jobsCRM.filter(j => j.id !== job.id))} className="absolute top-2 right-2 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100"><Trash2 className="w-3.5 h-3.5" /></button>
                        <h4 className="text-xs font-bold text-white">{job.role}</h4>
                        <p className="text-[10px] text-indigo-400 font-semibold">{job.company}</p>
                        <p className="text-[9px] text-indigo-300 leading-snug font-mono bg-indigo-950/40 p-1.5 rounded">{job.notes}</p>
                        <div className="flex justify-between items-center text-[9px] text-slate-500 pt-1 border-t border-slate-900">
                          <span>{job.salary}</span>
                          <button onClick={() => {
                            const updated = jobsCRM.map(j => j.id === job.id ? {...j, status: 'offer'} : j);
                            setJobsCRM(updated);
                            showToast("Congratulations on reaching Offer state!", "success");
                          }} className="text-emerald-400 hover:underline">Offer &rarr;</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* COLUMN 4: OFFERS */}
                <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-300">Offers & Contracts</span>
                    <span className="text-[10px] bg-slate-850 px-2 py-0.5 rounded text-slate-400 font-bold">{jobsCRM.filter(j => j.status === 'offer').length}</span>
                  </div>
                  <div className="space-y-2 flex-1">
                    {jobsCRM.filter(j => j.status === 'offer').map(job => (
                      <div key={job.id} className="p-3 bg-indigo-950/20 border border-emerald-500/30 rounded-xl space-y-2 relative">
                        <div className="absolute top-2 right-2 bg-emerald-500/10 text-emerald-400 text-[8px] font-bold px-1.5 py-0.5 rounded">Active</div>
                        <h4 className="text-xs font-bold text-white">{job.role}</h4>
                        <p className="text-[10px] text-emerald-400 font-bold">{job.company}</p>
                        <div className="text-[9px] text-slate-400 font-semibold">{job.salary} Base + Equity</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ==================== SCREEN 6: AI CAREER COACH ==================== */}
          {activeTab === 'coach' && (
            <div className="space-y-6">
              
              <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-3xl">
                <h2 className="text-xl font-black text-white flex items-center gap-2 mb-1">
                  <Compass className="w-5 h-5 text-indigo-400" />
                  <span>AI Career Strategist Coach</span>
                </h2>
                <p className="text-xs text-slate-400">Identify technical skill bottlenecks, align professional compensation metrics, and map exact multi-year routes to executive offices.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Inputs Pane Left */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-slate-900/60 border border-slate-900 p-5 rounded-2xl space-y-3">
                    <span className="text-xs font-bold text-white block">Ask your Executive Advisor</span>
                    <textarea 
                      rows={6}
                      value={careerCoachInput}
                      onChange={(e) => setCareerCoachInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-indigo-500 font-medium leading-relaxed"
                    />
                    <button 
                      onClick={handleAskCareerCoach}
                      disabled={isCoachLoading}
                      className="w-full text-center py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
                    >
                      {isCoachLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      <span>Formulate Career Strategy</span>
                    </button>
                  </div>
                </div>

                {/* Render strategy right */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-slate-900/40 border border-slate-900 p-5 rounded-2xl min-h-[350px]">
                    <span className="text-xs font-bold text-white block mb-4 border-b border-slate-800 pb-2">Technical Transition Strategy Plan</span>
                    
                    {coachResponse ? (
                      <div className="text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-wrap bg-slate-950 p-4 rounded-xl border border-slate-900">
                        {coachResponse}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-12">
                        <Compass className="w-10 h-10 text-slate-700 mb-3 animate-spin-slow" />
                        <p className="text-sm">Initiate the career strategy advisor engine to construct structural leadership plans.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ==================== SCREEN 7: ANALYTICS ADMIN ==================== */}
          {activeTab === 'admin' && (
            <div className="space-y-6">
              
              <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-3xl">
                <h2 className="text-xl font-black text-white flex items-center gap-2 mb-1">
                  <Layers className="w-5 h-5 text-indigo-400" />
                  <span>Platform Operations & Analytics</span>
                </h2>
                <p className="text-xs text-slate-400">Verify localized billing state variables, system rate limits, and deep token metrics usage logs.</p>
              </div>

              {/* Grid with structural specs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-900/60 border border-slate-900 rounded-2xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Total Account Credits</span>
                  <h3 className="text-2xl font-black text-white mt-1">150,000 / 150,000</h3>
                  <p className="text-[10px] text-slate-400 mt-1">SaaS credits renew automatically monthly.</p>
                </div>
                <div className="p-4 bg-slate-900/60 border border-slate-900 rounded-2xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Gemini Token Audit</span>
                  <h3 className="text-2xl font-black text-white mt-1">45,102 Used</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Average response processing time: 1.4s</p>
                </div>
                <div className="p-4 bg-slate-900/60 border border-slate-900 rounded-2xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Current Plan Integrity</span>
                  <h3 className="text-2xl font-black text-indigo-400 mt-1 uppercase">{subscriptionTier} tier</h3>
                  <p className="text-[10px] text-slate-400 mt-1">All premium custom CSS templates unlocked.</p>
                </div>
              </div>

              <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5">
                <span className="text-xs font-bold text-white block mb-4">Enterprise Developer API Webhooks (Web Sandbox)</span>
                <div className="space-y-3 font-mono text-[11px] leading-relaxed">
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-900">
                    <p className="text-indigo-400">// API endpoint to pull active JSON credentials dynamically</p>
                    <p className="text-slate-300">GET https://api.cvx2026.io/v1/resumes/{activeResumeId}</p>
                    <p className="text-slate-500">Authorization: Bearer <span className="text-indigo-300">cvx_test_sec_7a2b9c3f8d...</span></p>
                  </div>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-900">
                    <p className="text-emerald-400">// Sample structural health response check</p>
                    <p className="text-slate-400">{"{"} <span className="text-indigo-400">"status"</span>: <span className="text-white">"synchronized"</span>, <span className="text-indigo-400">"compatibilityScore"</span>: <span className="text-white">94</span> {"}"}</p>
                  </div>
                </div>
              </div>

            </div>
          )}

        </main>

      </div>

      {/* Corporate Modern Site Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 CV-X Enterprise Platform Inc. All rights reserved. Built using NextJS and Gemini Core models.</p>
          <div className="flex gap-4">
            <span className="hover:text-indigo-400 cursor-pointer" onClick={() => setIsApiKeyModalOpen(true)}>Credentials Config</span>
            <span>•</span>
            <span className="hover:text-indigo-400 cursor-pointer" onClick={() => setActiveTab('admin')}>Developer API Docs</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
