import type { Channel, Customer, Deal, MonthPoint, TeamMember } from './types';

/// Realistic seed data for a B2B SaaS (project-management tool, $19–$499/mo).
/// Names are fictional; the shape is what a real API returns, so swapping
/// this file for fetch calls is a one-file change per page.
/// Totals (recomputed live in the pages, never hard-coded in the UI):
///   MRR ≈ $5,181 (non-churned customers) · 24 customers in the table
///   · open pipeline ≈ $184,700 · won $69,100 · lost $4,700.
///   Monthly revenue tracks MRR, so the Overview and Analytics pages
///   always agree with the Customers table.

export const customers: Customer[] = [
  { id: 'C-1001', name: 'Ayesha Khan', company: 'Northwind Logistics', email: 'ayesha@northwindlogistics.com', country: 'Pakistan', plan: 'Growth', status: 'Active', mrr: 249, joined: '2025-03-14', lastActive: '2026-11-05', health: 92 },
  { id: 'C-1002', name: 'Bilal Ahmed', company: 'Atlas Fintech', email: 'bilal@atlasfintech.io', country: 'Pakistan', plan: 'Enterprise', status: 'Active', mrr: 499, joined: '2024-11-02', lastActive: '2026-11-06', health: 95 },
  { id: 'C-1003', name: 'Sarah Mitchell', company: 'Brightline Media', email: 'sarah@brightlinemedia.com', country: 'United States', plan: 'Growth', status: 'Active', mrr: 249, joined: '2025-01-20', lastActive: '2026-11-05', health: 88 },
  { id: 'C-1004', name: 'Omar Farouk', company: 'Desert Rose Retail', email: 'omar@desertrose.ae', country: 'UAE', plan: 'Starter', status: 'Trial', mrr: 49, joined: '2026-10-22', lastActive: '2026-11-04', health: 61 },
  { id: 'C-1005', name: 'Emma Johansson', company: 'Nordic Health', email: 'emma@nordichealth.se', country: 'Sweden', plan: 'Enterprise', status: 'Active', mrr: 499, joined: '2024-08-11', lastActive: '2026-11-06', health: 97 },
  { id: 'C-1006', name: 'Usman Ali', company: 'SwiftCart', email: 'usman@swiftcart.pk', country: 'Pakistan', plan: 'Growth', status: 'Past due', mrr: 249, joined: '2025-06-30', lastActive: '2026-10-28', health: 42 },
  { id: 'C-1007', name: 'Daniel Kim', company: 'Hanbit Games', email: 'daniel@hanbitgames.kr', country: 'South Korea', plan: 'Starter', status: 'Active', mrr: 49, joined: '2026-02-09', lastActive: '2026-11-05', health: 76 },
  { id: 'C-1008', name: 'Fatima Noor', company: 'EduSpark', email: 'fatima@eduspark.pk', country: 'Pakistan', plan: 'Free', status: 'Trial', mrr: 0, joined: '2026-10-30', lastActive: '2026-11-06', health: 58 },
  { id: 'C-1009', name: 'Liam O’Connor', company: 'Celtic Cloud', email: 'liam@celticcloud.ie', country: 'Ireland', plan: 'Growth', status: 'Active', mrr: 249, joined: '2025-05-17', lastActive: '2026-11-03', health: 84 },
  { id: 'C-1010', name: 'Hina Raza', company: 'MediCare Plus', email: 'hina@medicareplus.pk', country: 'Pakistan', plan: 'Enterprise', status: 'Active', mrr: 499, joined: '2024-12-05', lastActive: '2026-11-06', health: 93 },
  { id: 'C-1011', name: 'Jonas Weber', company: 'Bavaria Labs', email: 'jonas@bavarialabs.de', country: 'Germany', plan: 'Starter', status: 'Churned', mrr: 0, joined: '2025-02-14', lastActive: '2026-09-12', health: 18 },
  { id: 'C-1012', name: 'Priya Sharma', company: 'SpiceRoute Foods', email: 'priya@spiceroute.in', country: 'India', plan: 'Growth', status: 'Active', mrr: 249, joined: '2025-08-08', lastActive: '2026-11-05', health: 90 },
  { id: 'C-1013', name: 'Tom Baker', company: 'Harbour & Co', email: 'tom@harbourco.co.uk', country: 'United Kingdom', plan: 'Starter', status: 'Active', mrr: 49, joined: '2026-04-01', lastActive: '2026-11-02', health: 71 },
  { id: 'C-1014', name: 'Zainab Hussain', company: 'Creativa Studio', email: 'zainab@creativa.pk', country: 'Pakistan', plan: 'Growth', status: 'Trial', mrr: 249, joined: '2026-10-15', lastActive: '2026-11-06', health: 66 },
  { id: 'C-1015', name: 'Lucas Meyer', company: 'AlpenPay', email: 'lucas@alpenpay.ch', country: 'Switzerland', plan: 'Enterprise', status: 'Active', mrr: 499, joined: '2024-09-19', lastActive: '2026-11-04', health: 91 },
  { id: 'C-1016', name: 'Maryam Siddiqui', company: 'LearnLoop', email: 'maryam@learnloop.pk', country: 'Pakistan', plan: 'Starter', status: 'Active', mrr: 49, joined: '2026-01-25', lastActive: '2026-11-05', health: 79 },
  { id: 'C-1017', name: 'Alex Chen', company: 'PixelForge', email: 'alex@pixelforge.sg', country: 'Singapore', plan: 'Growth', status: 'Active', mrr: 249, joined: '2025-09-03', lastActive: '2026-11-06', health: 86 },
  { id: 'C-1018', name: 'Sofia Rossi', company: 'Dolce Vita Travel', email: 'sofia@dolcevita.it', country: 'Italy', plan: 'Free', status: 'Trial', mrr: 0, joined: '2026-10-28', lastActive: '2026-11-01', health: 54 },
  { id: 'C-1019', name: 'Hassan Tariq', company: 'BuildRight', email: 'hassan@buildright.pk', country: 'Pakistan', plan: 'Growth', status: 'Past due', mrr: 249, joined: '2025-04-12', lastActive: '2026-10-30', health: 38 },
  { id: 'C-1020', name: 'Nina Petrova', company: 'Volga Analytics', email: 'nina@volgaanalytics.ru', country: 'Poland', plan: 'Starter', status: 'Active', mrr: 49, joined: '2026-03-18', lastActive: '2026-11-03', health: 73 },
  { id: 'C-1021', name: 'David Ng', company: 'KoalaPay', email: 'david@koalapay.au', country: 'Australia', plan: 'Growth', status: 'Active', mrr: 249, joined: '2025-07-21', lastActive: '2026-11-05', health: 89 },
  { id: 'C-1022', name: 'Amna Iqbal', company: 'StyleHub', email: 'amna@stylehub.pk', country: 'Pakistan', plan: 'Starter', status: 'Churned', mrr: 0, joined: '2025-10-06', lastActive: '2026-08-20', health: 22 },
  { id: 'C-1023', name: 'Marcus Lee', company: 'Toronto Legal', email: 'marcus@torontolegal.ca', country: 'Canada', plan: 'Enterprise', status: 'Active', mrr: 499, joined: '2024-10-27', lastActive: '2026-11-06', health: 94 },
  { id: 'C-1024', name: 'Rania Khalid', company: 'Orbit Media', email: 'rania@orbitmedia.pk', country: 'Pakistan', plan: 'Growth', status: 'Active', mrr: 249, joined: '2026-05-09', lastActive: '2026-11-04', health: 82 },
];

export const deals: Deal[] = [
  { id: 'D-201', title: 'Enterprise rollout — 120 seats', company: 'Atlas Fintech', value: 42000, stage: 'Negotiation', owner: 'Ayesha Khan', closeDate: '2026-11-20', probability: 75 },
  { id: 'D-202', title: 'Annual Growth plan', company: 'Brightline Media', value: 18000, stage: 'Proposal', owner: 'Bilal Ahmed', closeDate: '2026-11-15', probability: 60 },
  { id: 'D-203', title: 'Team plan + onboarding', company: 'Desert Rose Retail', value: 6500, stage: 'Demo', owner: 'Sarah Mitchell', closeDate: '2026-11-28', probability: 40 },
  { id: 'D-204', title: 'Enterprise — Nordics region', company: 'Nordic Health', value: 36000, stage: 'Won', owner: 'Ayesha Khan', closeDate: '2026-10-30', probability: 100 },
  { id: 'D-205', title: 'Starter to Growth upgrade', company: 'Hanbit Games', value: 3200, stage: 'Proposal', owner: 'Omar Farouk', closeDate: '2026-11-12', probability: 55 },
  { id: 'D-206', title: 'Multi-team licence', company: 'SwiftCart', value: 24000, stage: 'Negotiation', owner: 'Bilal Ahmed', closeDate: '2026-12-02', probability: 70 },
  { id: 'D-207', title: 'Pilot — 3 months', company: 'Celtic Cloud', value: 4800, stage: 'Lead', owner: 'Sarah Mitchell', closeDate: '2026-12-10', probability: 25 },
  { id: 'D-208', title: 'Annual Enterprise', company: 'MediCare Plus', value: 31000, stage: 'Won', owner: 'Ayesha Khan', closeDate: '2026-10-18', probability: 100 },
  { id: 'D-209', title: 'Growth plan — APAC', company: 'PixelForge', value: 14500, stage: 'Demo', owner: 'Alex Chen', closeDate: '2026-11-25', probability: 45 },
  { id: 'D-210', title: 'Team onboarding package', company: 'SpiceRoute Foods', value: 7200, stage: 'Lead', owner: 'Priya Sharma', closeDate: '2026-12-05', probability: 30 },
  { id: 'D-211', title: 'Enterprise security add-on', company: 'AlpenPay', value: 9800, stage: 'Proposal', owner: 'Lucas Meyer', closeDate: '2026-11-18', probability: 50 },
  { id: 'D-212', title: 'Growth — 40 seats', company: 'KoalaPay', value: 12900, stage: 'Negotiation', owner: 'David Ng', closeDate: '2026-11-22', probability: 65 },
  { id: 'D-213', title: 'Starter annual', company: 'Harbour & Co', value: 2100, stage: 'Won', owner: 'Tom Baker', closeDate: '2026-10-25', probability: 100 },
  { id: 'D-214', title: 'Enterprise — legal', company: 'Toronto Legal', value: 27000, stage: 'Demo', owner: 'Marcus Lee', closeDate: '2026-12-15', probability: 35 },
  { id: 'D-215', title: 'Growth upgrade', company: 'LearnLoop', value: 3600, stage: 'Lead', owner: 'Maryam Siddiqui', closeDate: '2026-12-08', probability: 20 },
  { id: 'D-216', title: 'Annual Growth', company: 'Orbit Media', value: 11200, stage: 'Proposal', owner: 'Rania Khalid', closeDate: '2026-11-30', probability: 58 },
  { id: 'D-217', title: 'Team plan', company: 'Bavaria Labs', value: 2900, stage: 'Lost', owner: 'Jonas Weber', closeDate: '2026-10-10', probability: 0 },
  { id: 'D-218', title: 'Starter — travel', company: 'Dolce Vita Travel', value: 1800, stage: 'Lost', owner: 'Sofia Rossi', closeDate: '2026-10-05', probability: 0 },
];

export const monthly: MonthPoint[] = [
  { month: 'Dec', revenue: 2840, expenses: 1920, customers: 14 },
  { month: 'Jan', revenue: 3010, expenses: 1980, customers: 15 },
  { month: 'Feb', revenue: 2975, expenses: 2010, customers: 15 },
  { month: 'Mar', revenue: 3240, expenses: 2050, customers: 16 },
  { month: 'Apr', revenue: 3480, expenses: 2120, customers: 17 },
  { month: 'May', revenue: 3620, expenses: 2180, customers: 18 },
  { month: 'Jun', revenue: 3890, expenses: 2240, customers: 19 },
  { month: 'Jul', revenue: 4120, expenses: 2310, customers: 20 },
  { month: 'Aug', revenue: 4280, expenses: 2380, customers: 21 },
  { month: 'Sep', revenue: 4510, expenses: 2450, customers: 22 },
  { month: 'Oct', revenue: 4730, expenses: 2510, customers: 23 },
  { month: 'Nov', revenue: 5181, expenses: 2560, customers: 24 },
];

export const channels: Channel[] = [
  { name: 'Organic search', share: 38, color: '#6366f1' },
  { name: 'Paid ads', share: 26, color: '#10b981' },
  { name: 'Referrals', share: 21, color: '#f59e0b' },
  { name: 'Social', share: 15, color: '#f43f5e' },
];

export const team: TeamMember[] = [
  { id: 'T-1', name: 'Uzair Malik', email: 'uzair@pulseboard.app', role: 'Admin', status: 'Active', lastLogin: '2026-11-06' },
  { id: 'T-2', name: 'Ayesha Khan', email: 'ayesha@pulseboard.app', role: 'Manager', status: 'Active', lastLogin: '2026-11-06' },
  { id: 'T-3', name: 'Bilal Ahmed', email: 'bilal@pulseboard.app', role: 'Manager', status: 'Active', lastLogin: '2026-11-05' },
  { id: 'T-4', name: 'Sarah Mitchell', email: 'sarah@pulseboard.app', role: 'Agent', status: 'Active', lastLogin: '2026-11-05' },
  { id: 'T-5', name: 'Omar Farouk', email: 'omar@pulseboard.app', role: 'Agent', status: 'Invited', lastLogin: '—' },
];
