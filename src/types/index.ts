export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: 'basic' | 'premium' | 'vip';
  joinDate: string;
  expiryDate: string;
  status: 'active' | 'expiring' | 'expired';
  weight?: number;
  balance: number;
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  expiringMembers: number;
  expiredMembers: number;
  monthlyRevenue: number;
}

export type ViewType = 
  | 'dashboard'
  | 'add-member'
  | 'view-members'
  | 'search-member'
  | 'update-weight'
  | 'update-balance'
  | 'renew-membership'
  | 'expiring-members'
  | 'expired-members'
  | 'active-members'
  | 'send-reminders';