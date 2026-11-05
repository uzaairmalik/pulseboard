export type Plan = 'Free' | 'Starter' | 'Growth' | 'Enterprise';
export type CustomerStatus = 'Active' | 'Trial' | 'Past due' | 'Churned';
export type DealStage =
  | 'Lead'
  | 'Demo'
  | 'Proposal'
  | 'Negotiation'
  | 'Won'
  | 'Lost';
export type Role = 'Admin' | 'Manager' | 'Agent';

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  country: string;
  plan: Plan;
  status: CustomerStatus;
  mrr: number; // USD / month
  joined: string; // ISO date
  lastActive: string;
  health: number; // 0-100
}

export interface Deal {
  id: string;
  title: string;
  company: string;
  value: number; // USD
  stage: DealStage;
  owner: string;
  closeDate: string;
  probability: number; // 0-100
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: 'Active' | 'Invited';
  lastLogin: string;
}

export interface MonthPoint {
  month: string;
  revenue: number;
  expenses: number;
  customers: number;
}

export interface Channel {
  name: string;
  share: number; // percent
  color: string;
}

export type Page = 'overview' | 'customers' | 'deals' | 'analytics' | 'team';
