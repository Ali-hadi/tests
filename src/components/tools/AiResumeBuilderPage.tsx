// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { createServerFn, useServerFn } from '@tanstack/react-start';
import { 
  Sparkles, FileText, LayoutDashboard, Briefcase, CheckCircle, 
  Trash2, Plus, Download, Edit2, RotateCcw, AlertCircle, 
  Search, Shield, Layers, Award, Terminal, Compass, 
  TrendingUp, Users, Settings, User, Mail, Phone, MapPin, 
  Globe, Link2, BookOpen, MessageSquare, ChevronRight, Zap, 
  Sliders, Copy, RefreshCw, ZoomIn, ZoomOut, Check,
  Lock, Eye, BarChart2, Star, Calendar, Folder, FileCheck, CheckCircle2, X, Upload, Printer
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
  { id: 'job-2', company: 'Anthropic', role: 'Senior AI Researcher', status: 'applied', salary: '$270,000', notes: 'Submitted resume optimized with the open ATS matcher.' },
  { id: 'job-3', company: 'OpenAI', role: 'Solutions Architect', status: 'offer', salary: '$310,000', notes: 'Verbal offer received. Waiting for equity breakdown document.' },
  { id: 'job-4', company: 'Stripe', role: 'Senior Frontend Engineer', status: 'saved', salary: '$190,000', notes: 'Referral requested through LinkedIn contact.' }
];

const generateWithOpenRouterServer = createServerFn({ method: 'POST' })
  .inputValidator((input) => input)
  .handler(async ({ data }) => {
    const apiKey = data?.apiKeyOverride?.trim() || process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      throw new Error('Missing OPENROUTER_API_KEY');
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://aitouchsolutions.com',
        'X-OpenRouter-Title': 'AI Touch Solutions Resume Builder',
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || 'openai/gpt-5.2',
        temperature: 0.55,
        max_tokens: 900,
        messages: [
          {
            role: 'system',
            content:
              data?.systemInstruction ||
              'You are a world-class executive CV & resume ATS optimization agent.',
          },
          {
            role: 'user',
            content: data?.prompt || '',
          },
        ],
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`OpenRouter returned ${response.status}: ${details.slice(0, 220)}`);
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content;

    if (typeof content === 'string') {
      return content;
    }

    if (Array.isArray(content)) {
      const text = content
        .map((part) => (typeof part === 'string' ? part : part?.text || ''))
        .join('')
        .trim();

      if (text) return text;
    }

    throw new Error('OpenRouter returned an empty completion.');
  });

const cleanImportedText = (value = '') => (value == null ? '' : String(value))
  .replace(/\u0000/g, '')
  .replace(/\r/g, '\n')
  .trim();

const splitResumeItems = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  return cleanImportedText(value)
    .replace(/\u2022/g, '\n')
    .split(/[\n,;]+/)
    .map((item) => item.replace(/^[-*]\s*/, '').trim())
    .filter(Boolean);
};

const uniqueResumeItems = (items) => {
  const seen = new Set();
  return splitResumeItems(items).filter((item) => {
    const key = item.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const escapeHtml = (value = '') => cleanImportedText(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const extractResumeJson = (value) => {
  const text = cleanImportedText(value)
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '');

  try {
    return JSON.parse(text);
  } catch {
    const jsonBlock = text.match(/\{[\s\S]*\}/);
    if (!jsonBlock) return null;

    try {
      return JSON.parse(jsonBlock[0]);
    } catch {
      return null;
    }
  }
};

const getResumeSectionLines = (text, headings) => {
  const headingSet = new Set(headings.map((heading) => heading.toLowerCase()));
  const knownHeadings = new Set([
    'summary', 'profile', 'professional summary', 'objective', 'experience',
    'work experience', 'professional experience', 'employment history', 'skills',
    'technical skills', 'core skills', 'education', 'projects', 'certifications',
    'languages',
  ]);
  const lines = cleanImportedText(text).split('\n').map((line) => line.trim()).filter(Boolean);
  const collected = [];
  let isInsideSection = false;

  for (const line of lines) {
    const normalized = line.replace(/[:\-]+$/, '').trim().toLowerCase();

    if (headingSet.has(normalized)) {
      isInsideSection = true;
      continue;
    }

    if (isInsideSection && knownHeadings.has(normalized)) {
      break;
    }

    if (isInsideSection) {
      collected.push(line);
    }
  }

  return collected;
};

const buildLocalResumeFromText = (rawText) => {
  const text = cleanImportedText(rawText);
  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || '';
  const phone = text.match(/(?:\+?\d[\d\s().-]{7,}\d)/)?.[0]?.trim() || '';
  const website = text.match(/https?:\/\/[^\s]+|(?:www\.)[^\s]+/i)?.[0] || '';
  const profileLines = getResumeSectionLines(text, ['summary', 'profile', 'professional summary', 'objective']);
  const skillLines = getResumeSectionLines(text, ['skills', 'technical skills', 'core skills']);
  const experienceLines = getResumeSectionLines(text, ['experience', 'work experience', 'professional experience', 'employment history']);
  const educationLines = getResumeSectionLines(text, ['education']);
  const projectLines = getResumeSectionLines(text, ['projects']);
  const certificationLines = getResumeSectionLines(text, ['certifications']);
  const languageLines = getResumeSectionLines(text, ['languages']);
  const contactPattern = /@|https?:|www\.|\+?\d[\d\s().-]{7,}\d/i;
  const fullName = lines.find((line) => !contactPattern.test(line) && line.length <= 70) || 'Imported Candidate';
  const titleLine = lines.find((line) => line !== fullName && !contactPattern.test(line) && line.length <= 90) || 'Professional Candidate';
  const summary = profileLines.slice(0, 4).join(' ') || lines.filter((line) => !contactPattern.test(line)).slice(2, 5).join(' ');

  return {
    personalInfo: {
      fullName,
      jobTitle: titleLine,
      email,
      phone,
      location: '',
      website,
      linkedin: text.match(/linkedin\.com\/[^\s]+/i)?.[0] || '',
    },
    summary: summary || 'Imported resume profile. Review and refine this summary with the AI polish tool.',
    experience: [
      {
        id: `exp-${Date.now()}`,
        company: experienceLines[0] || 'Imported Experience',
        position: titleLine,
        location: '',
        duration: '',
        achievements: splitResumeItems(experienceLines.slice(1).join('\n')).slice(0, 5),
      },
    ],
    education: educationLines.length
      ? [
          {
            id: `edu-${Date.now()}`,
            institution: educationLines[0],
            degree: educationLines.slice(1, 3).join(' '),
            location: '',
            duration: '',
          },
        ]
      : [],
    skills: uniqueResumeItems(skillLines.join('\n')).slice(0, 18),
    projects: projectLines.length
      ? [
          {
            id: `proj-${Date.now()}`,
            title: projectLines[0],
            role: 'Contributor',
            link: '',
            description: projectLines.slice(1, 4).join(' '),
          },
        ]
      : [],
    certifications: uniqueResumeItems(certificationLines.join('\n')),
    languages: uniqueResumeItems(languageLines.join('\n')),
  };
};

const normalizeImportedResume = (payload, fallbackText = '') => {
  const localFallback = buildLocalResumeFromText(fallbackText);
  const personalInfo = payload?.personalInfo || payload?.personal_info || {};
  const experience = Array.isArray(payload?.experience) ? payload.experience : [];
  const education = Array.isArray(payload?.education) ? payload.education : [];
  const projects = Array.isArray(payload?.projects) ? payload.projects : [];

  return {
    personalInfo: {
      fullName: personalInfo.fullName || personalInfo.full_name || localFallback.personalInfo.fullName,
      jobTitle: personalInfo.jobTitle || personalInfo.job_title || localFallback.personalInfo.jobTitle,
      email: personalInfo.email || localFallback.personalInfo.email,
      phone: personalInfo.phone || localFallback.personalInfo.phone,
      location: personalInfo.location || localFallback.personalInfo.location,
      website: personalInfo.website || personalInfo.portfolio || localFallback.personalInfo.website,
      linkedin: personalInfo.linkedin || localFallback.personalInfo.linkedin,
    },
    summary: payload?.summary || payload?.professionalSummary || payload?.professional_summary || localFallback.summary,
    experience: experience.length
      ? experience.map((item, index) => ({
          id: item.id || `exp-import-${Date.now()}-${index}`,
          company: item.company || item.organization || 'Imported Company',
          position: item.position || item.role || item.title || 'Imported Role',
          location: item.location || '',
          duration: item.duration || item.dates || '',
          achievements: splitResumeItems(item.achievements || item.bullets || item.description).slice(0, 6),
        }))
      : localFallback.experience,
    education: education.length
      ? education.map((item, index) => ({
          id: item.id || `edu-import-${Date.now()}-${index}`,
          institution: item.institution || item.school || 'Imported Institution',
          degree: item.degree || item.qualification || '',
          location: item.location || '',
          duration: item.duration || item.dates || '',
        }))
      : localFallback.education,
    skills: uniqueResumeItems(payload?.skills || localFallback.skills).slice(0, 24),
    projects: projects.length
      ? projects.map((item, index) => ({
          id: item.id || `proj-import-${Date.now()}-${index}`,
          title: item.title || item.name || 'Imported Project',
          role: item.role || '',
          link: item.link || item.url || '',
          description: item.description || '',
        }))
      : localFallback.projects,
    certifications: uniqueResumeItems(payload?.certifications || localFallback.certifications),
    languages: uniqueResumeItems(payload?.languages || localFallback.languages),
  };
};

export function AiResumeBuilderPage() {
  // Navigation View
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Optional user override. The production key stays server-side in OPENROUTER_API_KEY.
  const [openRouterApiKey, setOpenRouterApiKey] = useState('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const generateOpenRouterCompletion = useServerFn(generateWithOpenRouterServer);
  const [isImportResumeModalOpen, setIsImportResumeModalOpen] = useState(false);
  const [importResumeText, setImportResumeText] = useState('');
  const [importResumeFileName, setImportResumeFileName] = useState('');
  const [isImportingResume, setIsImportingResume] = useState(false);

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

  // AI Loading & status overlay
  const [globalAiLoading, setGlobalAiLoading] = useState(false);
  const resumeWordCount = [
    resumeData.summary,
    ...resumeData.experience.flatMap((exp) => [exp.position, exp.company, ...exp.achievements]),
    ...resumeData.skills,
  ].join(' ').split(/\s+/).filter(Boolean).length;
  const resumeCompletionScore = Math.min(
    100,
    35 +
      (resumeData.personalInfo.fullName ? 8 : 0) +
      (resumeData.personalInfo.email ? 8 : 0) +
      (resumeData.personalInfo.phone ? 6 : 0) +
      (resumeData.summary ? 12 : 0) +
      Math.min(resumeData.experience.length * 8, 16) +
      Math.min(resumeData.education.length * 5, 10) +
      Math.min(resumeData.skills.length * 2, 10),
  );
  const activeTemplateName = TEMPLATE_PRESETS.find((template) => template.id === selectedTemplate)?.name || 'ATS Minimalist';
  const activeFontName = FONT_PRESETS.find((font) => font.id === selectedFont.id)?.name || selectedFont.name;

  // Trigger Local Resume Analysis on Load
  useEffect(() => {
    runATSAnalysis(true);
  }, [resumeData]);

  const generateWithOpenRouter = async (prompt, systemInstruction = "You are a world-class executive CV & resume ATS optimization agent.") => {
    const activeKey = openRouterApiKey.trim();
    setGlobalAiLoading(true);
    
    try {
      const textResponse = await generateOpenRouterCompletion({
        data: {
          prompt,
          systemInstruction,
          apiKeyOverride: activeKey || undefined,
        },
      });
      
      if (!textResponse) {
        throw new Error("Invalid schema structure returned from artificial intelligence node.");
      }

      setGlobalAiLoading(false);
      return textResponse;
    } catch (err) {
      setGlobalAiLoading(false);
      console.warn("OpenRouter API request failed or no key entered. Initializing local predictive generator.", err);
      // Local open-source fallback generator
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
          resolve(`Optimized Open Result: Designed, implemented, and scaled a state-of-the-art software orchestration engine, resulting in a 35% decrease in developer configuration overhead and enabling frictionless API delivery.`);
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
    const prompt = `Write an optimized, professional, ATS-friendly professional summary for an experienced ${resumeData.personalInfo.jobTitle}. Focus on clear vocabulary and quantitative achievements. Here is the draft: "${resumeData.summary}". Format your output as a single paragraph of exactly 70 to 95 words.`;
    const response = await generateWithOpenRouter(prompt);
    handleUpdateSummary(response);
    showToast("AI polished summary successfully!", "success");
  };

  const handleAiImproveAchievements = async (expIndex) => {
    const currentAch = resumeData.experience[expIndex].achievements.join("\n");
    const prompt = `Convert these work experience bullets into high-performance, action-oriented resume accomplishments containing key business metrics:
    "${currentAch}"
    Format the response as exactly 3 separate bullet lines without any bullet symbols or serial numbers.`;
    
    const response = await generateWithOpenRouter(prompt);
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

    const response = await generateWithOpenRouter(prompt, "You are a master corporate headhunter who drafts high-converting formal cover letters.");
    setCoverLetterResult(response);
    setIsGeneratingCoverLetter(false);
    showToast("Cover letter created dynamically!", "success");
  };

  const handleAskCareerCoach = async () => {
    setIsCoachLoading(true);
    const prompt = `User profile details: Current Role: ${resumeData.personalInfo.jobTitle}, Skills: ${resumeData.skills.join(', ')}. 
    Question: ${careerCoachInput}`;
    
    const response = await generateWithOpenRouter(prompt, "You are an elite Silicon Valley executive talent coach. Analyze profile skill gaps, predict accurate market salaries, and plan technical roadmaps.");
    setCoachResponse(response);
    setIsCoachLoading(false);
  };

  const applyImportedResume = (importedResume, importMode = 'AI import') => {
    const importedId = `res-import-${Date.now()}`;
    const name = `${importedResume.personalInfo.fullName || 'Imported Candidate'} - Imported Resume`;

    setResumeData(importedResume);
    setActiveResumeId(importedId);
    setSavedResumes((prev) => [
      {
        id: importedId,
        name,
        date: new Date().toISOString().slice(0, 10),
        template: selectedTemplate,
        score: 88,
      },
      ...prev,
    ]);
    setActiveTab('builder');
    setIsImportResumeModalOpen(false);
    setImportResumeText('');
    setImportResumeFileName('');
    showToast(`Resume imported through ${importMode}. Review fields before export.`, "success");
  };

  const handleImportResumeFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileReader = new FileReader();
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = event => {
        setImportResumeText(event.target.result || '');
        setImportResumeFileName(file.name);
        showToast("Resume file loaded. Click Import Resume to map it into the builder.", "info");
      };
      fileReader.onerror = () => showToast("Failed to read selected resume file.", "error");
      e.target.value = '';
    } catch (err) {
      showToast("Failed to parse local file system stream.", "error");
    }
  };

  const handleApplyResumeImport = async () => {
    const sourceText = cleanImportedText(importResumeText);

    if (!sourceText) {
      showToast("Paste resume text or upload a JSON/text resume first.", "error");
      return;
    }

    setIsImportingResume(true);

    try {
      const directJson = extractResumeJson(sourceText);

      if (directJson?.personalInfo || directJson?.personal_info || directJson?.summary) {
        applyImportedResume(normalizeImportedResume(directJson, sourceText), "JSON import");
        return;
      }

      const prompt = `Convert the resume text below into valid JSON only. Do not include markdown, notes, or explanations.

Required schema:
{
  "personalInfo": {
    "fullName": "",
    "jobTitle": "",
    "email": "",
    "phone": "",
    "location": "",
    "website": "",
    "linkedin": ""
  },
  "summary": "",
  "experience": [
    {
      "company": "",
      "position": "",
      "location": "",
      "duration": "",
      "achievements": []
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "location": "",
      "duration": ""
    }
  ],
  "skills": [],
  "projects": [
    {
      "title": "",
      "role": "",
      "link": "",
      "description": ""
    }
  ],
  "certifications": [],
  "languages": []
}

Rules:
- Preserve only facts from the resume.
- Convert responsibilities into concise achievement strings.
- Keep arrays empty when information is missing.

Resume text:
${sourceText.slice(0, 14000)}`;

      const aiResponse = await generateWithOpenRouter(
        prompt,
        "You are a resume import parser. Return only strict JSON matching the requested schema.",
      );
      const parsed = extractResumeJson(aiResponse);

      if (!parsed) {
        throw new Error("AI response could not be parsed as resume JSON.");
      }

      applyImportedResume(normalizeImportedResume(parsed, sourceText), "AI parser");
    } catch (err) {
      console.warn("Resume import parser failed. Using local parser.", err);
      applyImportedResume(buildLocalResumeFromText(sourceText), "local parser");
    } finally {
      setIsImportingResume(false);
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

  const buildPrintableResumeHtml = (mode = 'print') => {
    const candidateName = escapeHtml(resumeData.personalInfo.fullName || 'Resume');
    const accent = selectedColor.primary;
    const darkAccent = selectedColor.secondary;
    const contact = [
      resumeData.personalInfo.email,
      resumeData.personalInfo.phone,
      resumeData.personalInfo.location,
      resumeData.personalInfo.website,
      resumeData.personalInfo.linkedin,
    ].filter(Boolean);
    const sectionTitleStyle = selectedTemplate === 'modern'
      ? `border-left: 4px solid ${accent}; padding-left: 10px; color: ${accent};`
      : `border-bottom: 1px solid #d7dde7; color: ${accent};`;
    const headerMarkup = selectedTemplate === 'ats'
      ? `
        <header class="ats-header">
          <h1 style="color:${accent}">${candidateName}</h1>
          <p class="role">${escapeHtml(resumeData.personalInfo.jobTitle)}</p>
          <div class="contact">${contact.map(escapeHtml).join('<span>|</span>')}</div>
        </header>
      `
      : `
        <header class="modern-header" style="background:${darkAccent}">
          <div>
            <h1>${candidateName}</h1>
            <p>${escapeHtml(resumeData.personalInfo.jobTitle)}</p>
          </div>
          <div class="modern-contact">${contact.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}</div>
        </header>
      `;
    const experienceMarkup = resumeData.experience.map((exp) => `
      <article class="entry">
        <div class="entry-head">
          <strong>${escapeHtml(exp.position)}</strong>
          <span>${escapeHtml(exp.duration)}</span>
        </div>
        <p class="company">${escapeHtml(exp.company)}${exp.location ? ` - ${escapeHtml(exp.location)}` : ''}</p>
        <ul>
          ${splitResumeItems(exp.achievements).map((achievement) => `<li>${escapeHtml(achievement)}</li>`).join('')}
        </ul>
      </article>
    `).join('');
    const educationMarkup = resumeData.education.map((edu) => `
      <article class="mini-entry">
        <strong>${escapeHtml(edu.degree)}</strong>
        <span>${escapeHtml(edu.institution)}${edu.duration ? ` - ${escapeHtml(edu.duration)}` : ''}</span>
      </article>
    `).join('');
    const projectsMarkup = resumeData.projects.map((project) => `
      <article class="mini-entry">
        <strong>${escapeHtml(project.title)}</strong>
        <span>${escapeHtml(project.description)}</span>
      </article>
    `).join('');

    return `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>${mode === 'pdf' ? 'Export PDF' : 'Print Resume'} - ${candidateName}</title>
          <style>
            @page { size: A4; margin: 14mm; }
            * { box-sizing: border-box; }
            body {
              margin: 0;
              background: #eef2f7;
              color: #1f2937;
              font-family: ${selectedFont.family};
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .sheet {
              width: 210mm;
              min-height: 297mm;
              margin: 24px auto;
              background: #fff;
              padding: 28px 34px;
              box-shadow: 0 24px 70px rgba(15, 23, 42, 0.18);
            }
            .ats-header { text-align: center; border-bottom: 1px solid #d7dde7; padding-bottom: 16px; margin-bottom: 18px; }
            .ats-header h1 { margin: 0; font-size: 28px; letter-spacing: 0.04em; text-transform: uppercase; }
            .role { margin: 4px 0 8px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.14em; }
            .contact { display: flex; flex-wrap: wrap; gap: 7px; justify-content: center; font-size: 10px; color: #64748b; }
            .modern-header { color: white; border-radius: 14px; padding: 18px; display: flex; justify-content: space-between; gap: 18px; margin-bottom: 20px; }
            .modern-header h1 { margin: 0; font-size: 26px; }
            .modern-header p { margin: 4px 0 0; color: #c7d2fe; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
            .modern-contact { display: flex; flex-direction: column; gap: 3px; text-align: right; font-size: 10px; color: #dbeafe; }
            section { margin-top: 16px; }
            h2 { ${sectionTitleStyle} margin: 0 0 8px; padding-bottom: 5px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; }
            p { margin: 0; font-size: 11px; line-height: 1.55; color: #475569; }
            .entry { margin-top: 10px; }
            .entry-head { display: flex; justify-content: space-between; gap: 12px; font-size: 12px; color: #1f2937; }
            .entry-head span { font-size: 10px; color: #64748b; white-space: nowrap; }
            .company { color: #64748b; font-style: italic; font-size: 10px; margin-top: 2px; }
            ul { margin: 5px 0 0; padding-left: 18px; }
            li { font-size: 10.5px; line-height: 1.45; margin-bottom: 2px; color: #475569; }
            .chips { display: flex; flex-wrap: wrap; gap: 6px; }
            .chip { border: 1px solid #dbe3ef; background: #f8fafc; border-left: 3px solid ${accent}; border-radius: 7px; padding: 4px 7px; font-size: 9.5px; color: #334155; }
            .grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 22px; }
            .mini-entry { margin-top: 7px; display: flex; flex-direction: column; gap: 2px; }
            .mini-entry strong { font-size: 10.5px; color: #1f2937; }
            .mini-entry span { font-size: 10px; color: #64748b; line-height: 1.35; }
            @media print {
              body { background: #fff; }
              .sheet { margin: 0; width: auto; min-height: auto; box-shadow: none; padding: 0; }
            }
          </style>
        </head>
        <body>
          <main class="sheet">
            ${headerMarkup}
            <section>
              <h2>Professional Summary</h2>
              <p>${escapeHtml(resumeData.summary)}</p>
            </section>
            <section>
              <h2>Experience</h2>
              ${experienceMarkup}
            </section>
            <section>
              <h2>Core Skills</h2>
              <div class="chips">${resumeData.skills.map((skill) => `<span class="chip">${escapeHtml(skill)}</span>`).join('')}</div>
            </section>
            <section class="grid">
              <div>
                <h2>Education</h2>
                ${educationMarkup}
              </div>
              <div>
                <h2>Projects</h2>
                ${projectsMarkup}
              </div>
            </section>
            ${resumeData.certifications.length ? `
              <section>
                <h2>Certifications</h2>
                <p>${resumeData.certifications.map(escapeHtml).join(', ')}</p>
              </section>
            ` : ''}
            ${resumeData.languages.length ? `
              <section>
                <h2>Languages</h2>
                <p>${resumeData.languages.map(escapeHtml).join(', ')}</p>
              </section>
            ` : ''}
          </main>
        </body>
      </html>`;
  };

  const openResumePrintWindow = (mode = 'print') => {
    const printWindow = window.open('', '_blank', 'width=920,height=1100');

    if (!printWindow) {
      showToast("Pop-up blocked. Please allow pop-ups to print or export.", "error");
      return;
    }

    printWindow.document.open();
    printWindow.document.write(buildPrintableResumeHtml(mode));
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 300);
    showToast(mode === 'pdf' ? "PDF export dialog opened. Choose Save as PDF." : "Resume print dialog opened.", "info");
  };

  const handlePrintResume = () => {
    openResumePrintWindow('print');
  };

  const handleExportPdf = () => {
    openResumePrintWindow('pdf');
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
            <h3 className="text-xl font-bold text-white mb-2">Open Resume Engine</h3>
            <p className="text-slate-400 text-sm">The community parser is refining, aligning, and boosting your resume variables for cleaner ATS delivery...</p>
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
              <h3 className="text-lg font-bold text-white">OpenRouter API Configuration</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              The production key is loaded server-side from OPENROUTER_API_KEY. You can optionally supply a temporary OpenRouter override below for local testing.
            </p>
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 block">OpenRouter API Key</label>
              <input 
                type="password" 
                placeholder="sk-or-v1-..."
                value={openRouterApiKey}
                onChange={(e) => setOpenRouterApiKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-indigo-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Local fallback active if OpenRouter is unavailable</span>
                <span className="text-indigo-400 hover:underline cursor-pointer" onClick={() => window.open('https://openrouter.ai/keys', '_blank')}>Manage API Keys</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button 
                onClick={() => {
                  setOpenRouterApiKey('');
                  showToast("OpenRouter override cleared. Server key/local fallback will be used.", "info");
                }} 
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition"
              >
                Clear Key
              </button>
              <button 
                onClick={() => {
                  setIsApiKeyModalOpen(false); 
                  showToast("OpenRouter configuration locked.", "success");
                }} 
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition"
              >
                Save & Lock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resume Import Modal */}
      {isImportResumeModalOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsImportResumeModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Import Existing Resume</h3>
                <p className="text-xs text-slate-400">Upload JSON/text or paste resume content for AI mapping.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4">
              <div className="space-y-3">
                <label className="min-h-36 rounded-2xl border border-dashed border-slate-700 bg-slate-950/70 hover:border-indigo-500/50 transition cursor-pointer flex flex-col items-center justify-center gap-3 p-4 text-center">
                  <FileText className="w-7 h-7 text-indigo-400" />
                  <span className="text-xs font-bold text-white">Choose File</span>
                  <span className="text-[10px] text-slate-500">JSON, TXT, or MD</span>
                  <input
                    type="file"
                    accept=".json,.txt,.md"
                    onChange={handleImportResumeFile}
                    className="hidden"
                  />
                </label>
                {importResumeFileName && (
                  <div className="rounded-xl bg-slate-950 border border-slate-800 p-3">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Loaded File</span>
                    <p className="text-xs text-indigo-300 break-all">{importResumeFileName}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Resume Text / JSON</label>
                <textarea
                  rows={12}
                  value={importResumeText}
                  onChange={(e) => setImportResumeText(e.target.value)}
                  placeholder="Paste your resume text here..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 leading-relaxed resize-y"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>{importResumeText.trim().split(/\s+/).filter(Boolean).length} words detected</span>
                  <button
                    onClick={() => {
                      setImportResumeText('');
                      setImportResumeFileName('');
                    }}
                    className="hover:text-slate-300 transition"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
              <button
                onClick={() => setIsImportResumeModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyResumeImport}
                disabled={isImportingResume || !importResumeText.trim()}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 disabled:bg-indigo-600/40 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                {isImportingResume ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>{isImportingResume ? 'Importing...' : 'Import Resume'}</span>
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
                Open Resume <span className="font-light text-slate-400 text-sm">Builder</span>
              </span>
              <p className="text-[10px] text-slate-500 tracking-wider font-semibold uppercase">Open Source AI Toolkit</p>
            </div>
          </div>

          {/* Quick Stats Banner / Settings Bar */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-medium text-slate-300">Local ATS Engine Active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400">Provider:</span>
              <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full">OpenRouter GPT-5.2</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsApiKeyModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg border border-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-2 transition bg-slate-900/50 hover:bg-slate-900"
            >
              <Settings className="w-4 h-4" />
              <span>{openRouterApiKey ? 'Override Set' : 'OpenRouter Key'}</span>
            </button>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-black text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Open Source
            </span>
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
                <p className="text-[11px] text-slate-400">Open Source Workspace</p>
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

          {/* <p className="text-[10px] font-bold text-slate-500 px-3 tracking-wider uppercase mt-4 mb-1">ENTERPRISE SYSTEM</p>
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
          </nav> */}
        </aside>

        {/* Dynamic Inner Component Panel (Switched based on State ActiveTab) */}
        <main className="flex-1 min-w-0">
          
          {/* ==================== SCREEN 1: CONTROL DASHBOARD ==================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Open Source Welcome Hero Card */}
              <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/10 p-6 rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full filter blur-3xl -z-10"></div>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">Open Source Core Active</span>
                    <h1 className="text-2xl sm:text-3xl font-black text-white mt-2 mb-1">Welcome back, {resumeData.personalInfo.fullName.split(' ')[0]}!</h1>
                    <p className="text-slate-400 text-sm">Your active resume is ready to edit, audit, print, and export with transparent local-first tooling.</p>
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
                    <p className="text-2xl font-black text-white mt-1">5 OSS</p>
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
                      <span>Created Resumes</span>
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
                      <span>Community Optimization Tips</span>
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
              <div className="relative overflow-hidden rounded-3xl border border-indigo-500/15 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/50 p-5 shadow-2xl shadow-indigo-950/20">
                <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="space-y-3">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-indigo-300">
                        <Sparkles className="h-3 w-3" />
                        AI Resume Studio
                      </span>
                      <h2 className="mt-3 text-2xl font-black tracking-tight text-white">Resume Architect Studio</h2>
                      <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-400">
                        Import, refine, preview, print, and export an ATS-ready resume with OpenRouter-powered writing tools.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                      <span className="rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-[11px] text-slate-400">
                        <strong className="block text-sm text-white">{resumeCompletionScore}%</strong>
                        Complete
                      </span>
                      <span className="rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-[11px] text-slate-400">
                        <strong className="block text-sm text-white">{resumeWordCount}</strong>
                        Words
                      </span>
                      <span className="rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-[11px] text-slate-400">
                        <strong className="block text-sm text-white">{activeTemplateName}</strong>
                        Template
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/70 p-2">
                    <button
                      onClick={() => setIsImportResumeModalOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-indigo-500/40 hover:text-white"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Import Resume</span>
                    </button>
                    <button
                      onClick={handleExportResumeJson}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-indigo-500/40 hover:text-white"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Backup Config</span>
                    </button>
                    <button
                      onClick={handlePrintResume}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-indigo-500/40 hover:text-white"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Resume</span>
                    </button>
                    <button
                      onClick={handleExportPdf}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-black text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export PDF</span>
                    </button>
                  </div>
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
                  <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl shadow-slate-950/30">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <span className="flex items-center gap-1.5 text-xs font-black text-white">
                            <Sliders className="w-4 h-4 text-indigo-400" />
                            <span>Design Controls</span>
                          </span>
                          <p className="mt-1 text-[11px] text-slate-500">{activeFontName} / {selectedColor.name} / {zoomLevel}%</p>
                        </div>
                        <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-950 p-1">
                          <button
                            onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
                            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-900 hover:text-white"
                            title="Zoom out"
                          >
                            <ZoomOut className="w-3.5 h-3.5" />
                          </button>
                          <span className="min-w-12 text-center font-mono text-[10px] text-slate-400">{zoomLevel}%</span>
                          <button
                            onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))}
                            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-900 hover:text-white"
                            title="Zoom in"
                          >
                            <ZoomIn className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-wider text-slate-500">Template</label>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {TEMPLATE_PRESETS.map((template) => (
                              <button
                                key={template.id}
                                onClick={() => setSelectedTemplate(template.id)}
                                className={`rounded-xl border p-2 text-left transition ${
                                  selectedTemplate === template.id
                                    ? 'border-indigo-500 bg-indigo-500/10 text-white'
                                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-white'
                                }`}
                              >
                                <span className="block text-[11px] font-bold">{template.name}</span>
                                <span className="mt-0.5 block truncate text-[9px] text-slate-500">{template.desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_180px]">
                          <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-wider text-slate-500">Accent Palette</label>
                            <div className="flex flex-wrap gap-2">
                              {COLOR_PALETTES.map((color) => (
                                <button
                                  key={color.id}
                                  onClick={() => setSelectedColor(color)}
                                  className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${
                                    selectedColor.id === color.id ? 'border-white/70 bg-white/10' : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                                  }`}
                                  title={color.name}
                                >
                                  <span className="h-5 w-5 rounded-full" style={{ backgroundColor: color.primary }} />
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-wider text-slate-500">Typography</label>
                            <select
                              value={selectedFont.id}
                              onChange={(e) => {
                                const found = FONT_PRESETS.find(f => f.id === e.target.value);
                                if (found) setSelectedFont(found);
                              }}
                              className="h-9 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 text-xs font-bold text-slate-300 focus:outline-none focus:border-indigo-500"
                            >
                              {FONT_PRESETS.map(f => (
                                <option key={f.id} value={f.id}>{f.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-3 shadow-xl shadow-slate-950/30">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <span className="flex items-center gap-1.5 text-xs font-black text-white">
                          <Eye className="w-4 h-4 text-indigo-400" />
                          <span>Live Resume Preview</span>
                        </span>
                        <p className="mt-1 text-[11px] text-slate-500">A4 print-ready canvas / {activeTemplateName}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                        <button
                          onClick={handlePrintResume}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-indigo-500/40 hover:text-white"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print Resume</span>
                        </button>
                        <button
                          onClick={handleExportPdf}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-black text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Export PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Clean Render Canvas container */}
                  <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 sm:p-6 relative overflow-auto shadow-inner flex justify-center items-start min-h-[600px]">
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
                <p className="text-xs text-slate-400">Paste your target job description below. The open matcher checks keywords and structure against your active resume context.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Inputs Pane left */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="bg-slate-900/60 border border-slate-900 p-5 rounded-2xl space-y-3">
                    <span className="text-xs font-bold text-slate-300 block">Target Job Description</span>
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
                        <p className="text-sm">Click generate above to turn resume details into a clear introductory statement.</p>
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
                  <span>Open Source Diagnostics</span>
                </h2>
                <p className="text-xs text-slate-400">Verify local parser state, optional provider usage, and export readiness.</p>
              </div>

              {/* Grid with structural specs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-900/60 border border-slate-900 rounded-2xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">License Mode</span>
                  <h3 className="text-2xl font-black text-white mt-1">Open Source</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Core builder, templates, and local parser are free to inspect and extend.</p>
                </div>
                <div className="p-4 bg-slate-900/60 border border-slate-900 rounded-2xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Provider Mode</span>
                  <h3 className="text-2xl font-black text-white mt-1">BYOK</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Use your own OpenRouter key, or keep local fallback generation active.</p>
                </div>
                <div className="p-4 bg-slate-900/60 border border-slate-900 rounded-2xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Template Access</span>
                  <h3 className="text-2xl font-black text-indigo-400 mt-1 uppercase">Unlocked</h3>
                  <p className="text-[10px] text-slate-400 mt-1">All bundled templates are available without accounts or paywalls.</p>
                </div>
              </div>

            </div>
          )}

        </main>

      </div>


    </div>
  );
}
