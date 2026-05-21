export type EnterpriseProject = {
  id: string;
  name: string;
  category: string;
  industry: string;
  description: string;
  stack: string;
  metrics: [string, string, string];
  accent: "teal" | "orange";
};

type ProjectGroup = {
  category: string;
  industry: string;
  stack: string;
  accent: "teal" | "orange";
  metrics: [string, string, string];
  projects: [string, string][];
};

const groups: ProjectGroup[] = [
  {
    category: "CRM & Sales Ops",
    industry: "Sales, service, real estate, healthcare",
    stack: "React, Node.js, PostgreSQL, WhatsApp API, OpenAI",
    accent: "teal" as const,
    metrics: ["42% faster response", "3.8x lead visibility", "24/7 pipeline"],
    projects: [
      [
        "Enterprise CRM Command Center",
        "A full sales cockpit with leads, deals, calls, notes, tasks, pipeline forecasting, and AI summaries.",
      ],
      [
        "WhatsApp Lead CRM",
        "A WhatsApp-first CRM for inbound leads, team assignment, reminders, follow-ups, and conversion tracking.",
      ],
      [
        "Real Estate Broker CRM",
        "Property inventory, buyer matching, site visits, token payments, commissions, and broker performance.",
      ],
      [
        "Clinic Patient CRM",
        "Patient lifecycle, appointments, reminders, treatment plans, prescriptions, and feedback loops.",
      ],
      [
        "Education Admissions CRM",
        "Student inquiries, counseling stages, document collection, fee status, and counselor scorecards.",
      ],
      [
        "Call Center Sales Desk",
        "Dialer-ready lead queues, scripts, call outcomes, QA scoring, and campaign conversion dashboards.",
      ],
      [
        "Franchise CRM Portal",
        "Multi-branch lead routing, franchise activity monitoring, territory rules, and revenue reports.",
      ],
      [
        "B2B Account Management CRM",
        "Enterprise account plans, renewal alerts, stakeholder maps, meeting notes, and opportunity health.",
      ],
      [
        "AI Lead Scoring System",
        "Predictive lead scores using source, intent, budget, behavior, and rep performance data.",
      ],
    ],
  },
  {
    category: "ERP & Operations",
    industry: "Manufacturing, wholesale, retail, field teams",
    stack: "Next.js, NestJS, PostgreSQL, Redis, AWS",
    accent: "orange" as const,
    metrics: ["31% less manual work", "99.9% audit trail", "12 modules"],
    projects: [
      [
        "Manufacturing ERP Suite",
        "Production planning, raw material inventory, purchase orders, work orders, QA, dispatch, and costing.",
      ],
      [
        "Inventory Forecasting ERP",
        "Stock movement intelligence, demand forecasting, vendor lead times, reorder alerts, and aging reports.",
      ],
      [
        "Procurement Approval System",
        "Department requests, vendor quotes, approval chains, budgets, purchase orders, and GRN tracking.",
      ],
      [
        "Warehouse Management System",
        "Bins, batches, barcode scans, pick-pack-ship workflows, cycle counts, and dispatch monitoring.",
      ],
      [
        "Field Service ERP",
        "Technician assignment, route planning, service tickets, SLA timers, parts usage, and customer signatures.",
      ],
      [
        "Vendor Management Portal",
        "Vendor onboarding, compliance docs, RFQs, negotiations, delivery status, and performance ratings.",
      ],
      [
        "HRMS & Payroll System",
        "Attendance, leaves, payroll, contracts, appraisals, loan deductions, and employee self-service.",
      ],
      [
        "Asset Maintenance System",
        "Equipment registry, preventive maintenance, breakdown tickets, parts inventory, and downtime analytics.",
      ],
      [
        "Multi-Branch POS ERP",
        "Point of sale, inventory sync, branch transfers, discounts, staff permissions, and daily closing reports.",
      ],
    ],
  },
  {
    category: "Fintech & Banking",
    industry: "Lending, payments, wallets, risk",
    stack: "React, Node.js, PostgreSQL, Kafka, Plaid, Stripe",
    accent: "teal" as const,
    metrics: ["2 min approvals", "100% traceability", "8 risk layers"],
    projects: [
      [
        "Loan Origination Platform",
        "Borrower onboarding, KYC, document verification, credit rules, underwriting, and disbursement flows.",
      ],
      [
        "KYC / AML Compliance Desk",
        "Identity checks, sanctions screening, risk scoring, case queues, and compliance evidence packs.",
      ],
      [
        "Payment Reconciliation Engine",
        "Bank statements, gateway data, ERP invoices, mismatch detection, and auto-reconciliation reports.",
      ],
      [
        "Digital Wallet Admin Panel",
        "Wallet balances, transfers, limits, disputes, merchant settlement, and fraud monitoring.",
      ],
      [
        "Credit Risk Scoring Dashboard",
        "Risk models, bureau data, income checks, repayment behavior, and portfolio heatmaps.",
      ],
      [
        "Collections Management CRM",
        "Delinquency buckets, promise-to-pay tracking, collector queues, scripts, and recovery analytics.",
      ],
      [
        "Subscription Billing System",
        "Plan management, usage billing, invoices, taxes, failed payments, and revenue recognition.",
      ],
      [
        "Merchant Onboarding Portal",
        "Merchant applications, business verification, pricing approvals, payout setup, and compliance status.",
      ],
      [
        "Treasury Operations Dashboard",
        "Cash positions, transfers, approvals, exposure tracking, bank limits, and daily liquidity reports.",
      ],
    ],
  },
  {
    category: "Healthcare Platforms",
    industry: "Hospitals, clinics, labs, insurance",
    stack: "React, Node.js, PostgreSQL, HIPAA-ready cloud, Twilio",
    accent: "orange" as const,
    metrics: ["28% fewer no-shows", "360 patient view", "HIPAA-ready"],
    projects: [
      [
        "Hospital CRM & HIS",
        "Patient records, visits, doctors, departments, pharmacy, billing, discharge, and reporting in one system.",
      ],
      [
        "Telemedicine SaaS",
        "Video consults, doctor scheduling, prescriptions, payments, patient history, and follow-up automation.",
      ],
      [
        "Lab Reporting Portal",
        "Sample collection, lab workflows, report approvals, patient access, and WhatsApp result delivery.",
      ],
      [
        "Patient Engagement Platform",
        "Care plans, reminders, education messages, feedback, follow-ups, and chronic care monitoring.",
      ],
      [
        "Medical Inventory Control",
        "Medicine batches, expiry alerts, stock transfers, purchase planning, and supplier analytics.",
      ],
      [
        "Insurance Claims Workflow",
        "Pre-authorizations, claim documents, approvals, rejections, resubmissions, and settlement tracking.",
      ],
      [
        "Appointment Automation Desk",
        "Doctor calendars, slots, deposits, reminders, rescheduling, and clinic occupancy analytics.",
      ],
      [
        "Remote Patient Monitoring",
        "Device readings, alerts, nurse queues, trend charts, and care escalation rules.",
      ],
      [
        "Clinic Franchise Dashboard",
        "Branch performance, patient acquisition, revenue, staff activity, and treatment package tracking.",
      ],
    ],
  },
  {
    category: "Logistics & Supply Chain",
    industry: "Fleet, warehouse, courier, cold chain",
    stack: "React, Node.js, PostGIS, Redis, Google Maps, AWS",
    accent: "teal" as const,
    metrics: ["18% route savings", "Live fleet map", "60 sec alerts"],
    projects: [
      [
        "Fleet Control Tower",
        "Live vehicles, driver status, trip plans, fuel logs, maintenance alerts, and dispatch analytics.",
      ],
      [
        "Route Optimization Engine",
        "Multi-stop route planning, ETA prediction, capacity rules, driver assignment, and cost tracking.",
      ],
      [
        "Dispatch CRM Platform",
        "Customer requests, pickup scheduling, driver queues, proof of delivery, and issue resolution.",
      ],
      [
        "Port Operations Dashboard",
        "Container status, yard moves, gate passes, customs documents, and demurrage alerts.",
      ],
      [
        "Shipment Tracking Portal",
        "Customer-facing shipment timelines, alerts, documents, exceptions, and branded tracking pages.",
      ],
      [
        "Driver Payroll System",
        "Trip earnings, bonuses, deductions, advances, attendance, and payout approvals.",
      ],
      [
        "Cold Chain Compliance",
        "Temperature logs, threshold alerts, route history, compliance reports, and incident evidence.",
      ],
      [
        "Warehouse Robotics Monitor",
        "Robot tasks, zones, pick rates, downtime, battery status, and throughput analytics.",
      ],
      [
        "Reverse Logistics Platform",
        "Return requests, inspection, restocking, refunds, vendor claims, and customer notifications.",
      ],
    ],
  },
  {
    category: "Education & LMS",
    industry: "Schools, universities, coaching, edtech",
    stack: "React, Node.js, PostgreSQL, WebRTC, Stripe",
    accent: "orange" as const,
    metrics: ["95% attendance view", "Live classes", "Parent portal"],
    projects: [
      [
        "Learning Management SaaS",
        "Courses, lessons, quizzes, certificates, live classes, assignments, and student progress analytics.",
      ],
      [
        "School ERP System",
        "Admissions, fees, attendance, timetable, exams, transport, staff, and parent communication.",
      ],
      [
        "Admissions CRM",
        "Lead sources, counselor follow-ups, document status, entrance tests, and fee conversion tracking.",
      ],
      [
        "Exam Analytics Platform",
        "Question banks, online tests, proctoring, result analysis, rankings, and weakness detection.",
      ],
      [
        "Parent Mobile Portal",
        "Attendance, homework, notices, fee bills, results, bus tracking, and teacher messaging.",
      ],
      [
        "Fee Management System",
        "Invoices, discounts, installments, reminders, online payments, and finance dashboards.",
      ],
      [
        "Tutor Marketplace",
        "Tutor profiles, booking, trial lessons, ratings, payouts, subscriptions, and dispute handling.",
      ],
      [
        "University Alumni CRM",
        "Alumni profiles, events, donations, mentorship, job posts, and engagement scoring.",
      ],
      [
        "Course Recommendation Engine",
        "AI-guided course suggestions using goals, skill gaps, behavior, and career paths.",
      ],
    ],
  },
  {
    category: "E-commerce & Retail",
    industry: "Marketplaces, D2C brands, retail chains",
    stack: "Next.js, Shopify, WooCommerce, Node.js, PostgreSQL",
    accent: "teal" as const,
    metrics: ["2.4x conversion lift", "Omnichannel stock", "Real-time orders"],
    projects: [
      [
        "Multi-Vendor Marketplace",
        "Vendor stores, product approvals, commissions, orders, disputes, payouts, and customer support.",
      ],
      [
        "D2C Commerce Dashboard",
        "Product catalog, orders, inventory, customers, campaigns, subscriptions, and analytics.",
      ],
      [
        "Order Management System",
        "Order routing, packing, fulfillment, couriers, returns, refunds, and SLA monitoring.",
      ],
      [
        "Retail Analytics Suite",
        "Sales by branch, product performance, basket analysis, stockouts, and demand forecasts.",
      ],
      [
        "Loyalty CRM Platform",
        "Points, tiers, rewards, referrals, coupons, customer segments, and campaign reporting.",
      ],
      [
        "Returns Automation Portal",
        "Return requests, eligibility checks, pickup scheduling, inspection, refund, and exchange flows.",
      ],
      [
        "Price Intelligence Tool",
        "Competitor price tracking, margin rules, automated recommendations, and category dashboards.",
      ],
      [
        "POS Reporting Dashboard",
        "Sales, shifts, cash closing, staff performance, branch comparison, and inventory sync.",
      ],
      [
        "Product Information Manager",
        "Centralized product data, attributes, media, approvals, channel publishing, and quality checks.",
      ],
    ],
  },
  {
    category: "AI & Automation",
    industry: "Operations, support, HR, finance",
    stack: "OpenAI, LangChain, Python, Node.js, Vector DB",
    accent: "orange" as const,
    metrics: ["70% task automation", "RAG-ready", "Human review"],
    projects: [
      [
        "AI Agent Operations Desk",
        "Tool-calling agents that handle tasks, approvals, escalations, logs, and human handoff.",
      ],
      [
        "Company Knowledge RAG",
        "A secure knowledge assistant trained on policies, documents, SOPs, tickets, and internal wikis.",
      ],
      [
        "Invoice OCR Automation",
        "Extract invoice data, validate against POs, flag mismatches, and push approved entries to ERP.",
      ],
      [
        "Meeting Intelligence System",
        "Meeting transcripts, decisions, action items, summaries, owner tracking, and follow-up reminders.",
      ],
      [
        "Support Chatbot Platform",
        "RAG chatbot, ticket creation, sentiment detection, fallback routing, and analytics for support teams.",
      ],
      [
        "Procurement AI Agent",
        "Vendor comparison, quote extraction, negotiation notes, approval suggestions, and purchase summaries.",
      ],
      [
        "HR Screening AI",
        "Resume parsing, scoring, interview questions, shortlist workflows, and recruiter dashboards.",
      ],
      [
        "Document Classification Engine",
        "Classify contracts, IDs, forms, reports, and emails into workflows with confidence scores.",
      ],
      [
        "Demand Forecasting Engine",
        "Forecast sales, inventory, staffing, and cash needs using historical and external signals.",
      ],
    ],
  },
  {
    category: "Real Estate & Construction",
    industry: "Builders, brokers, facilities, contractors",
    stack: "React, Node.js, PostgreSQL, Maps, S3",
    accent: "teal" as const,
    metrics: ["Live site view", "Cost controls", "Deal tracking"],
    projects: [
      [
        "Property Sales CRM",
        "Projects, units, buyers, site visits, bookings, payment plans, commissions, and handover tracking.",
      ],
      [
        "Construction ERP",
        "BOQs, material requests, contractor bills, site progress, budgets, approvals, and project dashboards.",
      ],
      [
        "Tenant Service Portal",
        "Complaints, rent invoices, maintenance tickets, documents, renewals, and communication history.",
      ],
      [
        "Facility Maintenance Desk",
        "Asset lists, work orders, technician schedules, parts, SLAs, and inspection reports.",
      ],
      [
        "Site Safety Dashboard",
        "Incidents, permits, toolbox talks, worker compliance, photos, and safety scorecards.",
      ],
      [
        "Material Procurement Hub",
        "Material planning, supplier quotes, approvals, deliveries, usage, and wastage reports.",
      ],
      [
        "Broker Commission System",
        "Broker agreements, lead sources, booking attribution, payout approvals, and tax reporting.",
      ],
      [
        "Online Booking Engine",
        "Unit availability, inventory holds, token payments, document upload, and booking confirmations.",
      ],
      [
        "Project Finance Monitor",
        "Budgets, cashflow, receivables, payables, cost variance, and investor reporting.",
      ],
    ],
  },
  {
    category: "Travel & Hospitality",
    industry: "Hotels, restaurants, agencies, rentals",
    stack: "React, Node.js, PostgreSQL, Stripe, Maps",
    accent: "orange" as const,
    metrics: ["Direct bookings", "Guest 360", "Revenue view"],
    projects: [
      [
        "Hotel PMS Platform",
        "Reservations, rooms, housekeeping, billing, guest profiles, rates, and occupancy dashboards.",
      ],
      [
        "Direct Booking Engine",
        "Room search, availability, offers, payments, cancellation policies, and booking confirmations.",
      ],
      [
        "Travel Agency CRM",
        "Leads, itineraries, quotations, visas, payments, suppliers, and customer follow-up automation.",
      ],
      [
        "Restaurant ERP",
        "Tables, orders, kitchen display, inventory, recipes, staff shifts, and branch reporting.",
      ],
      [
        "Event Management System",
        "Venues, packages, bookings, guest lists, vendors, payments, and event timelines.",
      ],
      [
        "Guest Loyalty Platform",
        "Member tiers, points, offers, reviews, stays, referrals, and lifecycle campaigns.",
      ],
      [
        "Vehicle Rental System",
        "Fleet availability, bookings, deposits, inspections, contracts, fines, and driver allocation.",
      ],
      [
        "Visa Workflow Portal",
        "Applications, document checklists, appointment tracking, payments, and consultant queues.",
      ],
      [
        "Revenue Management Dashboard",
        "Rates, occupancy, demand signals, competitor benchmarks, and revenue forecasts.",
      ],
    ],
  },
  {
    category: "Marketing & Growth",
    industry: "Agencies, SaaS, creators, service brands",
    stack: "React, Node.js, PostgreSQL, Meta API, Google Ads",
    accent: "teal" as const,
    metrics: ["Full funnel view", "Campaign ROI", "Lead attribution"],
    projects: [
      [
        "Marketing Automation CRM",
        "Lead capture, segments, email sequences, WhatsApp campaigns, scoring, and funnel analytics.",
      ],
      [
        "Influencer CRM Platform",
        "Creator profiles, campaign briefs, deliverables, approvals, payments, and performance reports.",
      ],
      [
        "Content Workflow System",
        "Editorial calendar, assignments, approvals, publishing, asset management, and performance insights.",
      ],
      [
        "Ad Spend Dashboard",
        "Meta, Google, TikTok, LinkedIn spend, ROAS, conversion events, and budget pacing.",
      ],
      [
        "SEO Reporting Portal",
        "Rank tracking, technical checks, content plans, backlink monitoring, and client reporting.",
      ],
      [
        "Social Inbox CRM",
        "Messages, comments, assignments, response templates, sentiment, and team performance.",
      ],
      [
        "Email Campaign Platform",
        "Templates, lists, personalization, automations, deliverability, and revenue attribution.",
      ],
      [
        "Digital Asset Manager",
        "Creative library, versions, approvals, usage rights, campaign tags, and search.",
      ],
      [
        "Lead Magnet Funnel Builder",
        "Landing pages, forms, quizzes, lead delivery, CRM sync, and A/B reporting.",
      ],
    ],
  },
  {
    category: "Enterprise & Public Sector",
    industry: "Large organizations, utilities, government",
    stack: "React, Node.js, PostgreSQL, SSO, Audit logs",
    accent: "orange" as const,
    metrics: ["Role-based access", "Enterprise audit", "Mission control"],
    projects: [
      [
        "Citizen Service Portal",
        "Applications, service requests, documents, payments, approvals, case tracking, and notifications.",
      ],
      [
        "E-Procurement Platform",
        "Tender publishing, bidder registration, submissions, evaluations, approvals, and award reporting.",
      ],
      [
        "Compliance Control Room",
        "Policies, evidence, audits, risk registers, corrective actions, and executive dashboards.",
      ],
      [
        "Document Management System",
        "Secure files, metadata, approvals, version control, permissions, and advanced search.",
      ],
      [
        "Audit Trail Platform",
        "User activity logs, approvals, change history, anomaly detection, and export-ready evidence.",
      ],
      [
        "Workforce Scheduling System",
        "Rosters, shifts, attendance, replacements, overtime, skills, and utilization reporting.",
      ],
      [
        "Incident Command Center",
        "Incident intake, severity, assignments, playbooks, communications, and postmortem analytics.",
      ],
      [
        "Energy Monitoring Dashboard",
        "Meters, usage trends, anomalies, billing, forecasts, and site-level optimization.",
      ],
      [
        "Smart City Operations Hub",
        "Assets, complaints, field teams, maps, IoT alerts, service SLAs, and public dashboards.",
      ],
    ],
  },
];

export const enterpriseProjects: EnterpriseProject[] = groups.flatMap((group, groupIndex) =>
  group.projects.map(([name, description], projectIndex) => ({
    id: `${group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${projectIndex + 1}`,
    name,
    category: group.category,
    industry: group.industry,
    description,
    stack: group.stack,
    metrics: group.metrics,
    accent:
      (projectIndex + groupIndex) % 2 === 0
        ? group.accent
        : group.accent === "teal"
          ? "orange"
          : "teal",
  })),
);

export const projectCategories = groups.map((group) => ({
  name: group.category,
  count: group.projects.length,
}));
