import React from 'react';
import { 
  Users, 
  UserPlus, 
  AlertTriangle, 
  UserX, 
  DollarSign, 
  TrendingUp,
  Calendar,
  Activity
} from 'lucide-react';
import { StatusBadge } from '../StatusBadge';

// Mock data - replace with actual data from backend
const dashboardStats = {
  totalMembers: 156,
  activeMembers: 142,
  expiringMembers: 8,
  expiredMembers: 6,
  monthlyRevenue: 12450,
  newMembersThisMonth: 23
};

const recentMembers = [
  { id: '1', name: 'John Doe', joinDate: '2024-01-20', status: 'active' as const },
  { id: '2', name: 'Jane Smith', joinDate: '2024-01-19', status: 'active' as const },
  { id: '3', name: 'Mike Johnson', joinDate: '2024-01-18', status: 'expiring' as const },
];

const expiringMembers = [
  { id: '4', name: 'Sarah Wilson', expiryDate: '2024-01-25', membershipType: 'Premium' },
  { id: '5', name: 'Tom Brown', expiryDate: '2024-01-26', membershipType: 'Basic' },
  { id: '6', name: 'Lisa Davis', expiryDate: '2024-01-27', membershipType: 'VIP' },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening at your gym.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalMembers}</p>
            </div>
            <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
              <Users className="text-primary" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="text-secondary mr-1" size={16} />
            <span className="text-secondary font-medium">+{dashboardStats.newMembersThisMonth}</span>
            <span className="text-gray-600 ml-1">this month</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Members</p>
              <p className="text-2xl font-bold text-secondary">{dashboardStats.activeMembers}</p>
            </div>
            <div className="w-12 h-12 bg-secondary bg-opacity-10 rounded-lg flex items-center justify-center">
              <Activity className="text-secondary" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">
              {((dashboardStats.activeMembers / dashboardStats.totalMembers) * 100).toFixed(1)}% of total
            </span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-warning">{dashboardStats.expiringMembers}</p>
            </div>
            <div className="w-12 h-12 bg-warning bg-opacity-10 rounded-lg flex items-center justify-center">
              <AlertTriangle className="text-warning" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">Next 7 days</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${dashboardStats.monthlyRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="text-secondary mr-1" size={16} />
            <span className="text-secondary font-medium">+12.5%</span>
            <span className="text-gray-600 ml-1">from last month</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="btn-primary flex items-center justify-center space-x-2 py-3">
            <UserPlus size={16} />
            <span>Add Member</span>
          </button>
          
          <button className="btn-secondary flex items-center justify-center space-x-2 py-3">
            <Users size={16} />
            <span>View Members</span>
          </button>
          
          <button className="btn-warning flex items-center justify-center space-x-2 py-3">
            <AlertTriangle size={16} />
            <span>Expiring Members</span>
          </button>
          
          <button className="btn-danger flex items-center justify-center space-x-2 py-3">
            <UserX size={16} />
            <span>Expired Members</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Members */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Members</h2>
            <button className="text-primary hover:text-blue-600 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {recentMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">
                      Joined {new Date(member.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <StatusBadge status={member.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Expiring Memberships */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Expiring Memberships</h2>
            <button className="text-primary hover:text-blue-600 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {expiringMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                    <Calendar className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.membershipType}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-warning">
                    {new Date(member.expiryDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-600">Expires</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};