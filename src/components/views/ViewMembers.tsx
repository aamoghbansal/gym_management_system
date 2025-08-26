import React from 'react';
import { Users, Download, Filter } from 'lucide-react';
import { Table } from '../Table';
import { StatusBadge } from '../StatusBadge';
import { Member } from '../../types';

// Mock data - replace with actual data from backend
const mockMembers: Member[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    membershipType: 'premium',
    joinDate: '2024-01-15',
    expiryDate: '2024-12-15',
    status: 'active',
    weight: 75.5,
    balance: 0
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1234567891',
    membershipType: 'basic',
    joinDate: '2024-02-01',
    expiryDate: '2024-03-01',
    status: 'expiring',
    weight: 62.3,
    balance: 29
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1234567892',
    membershipType: 'vip',
    joinDate: '2023-12-01',
    expiryDate: '2024-01-01',
    status: 'expired',
    weight: 82.1,
    balance: 79
  }
];

export const ViewMembers: React.FC = () => {
  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true
    },
    {
      key: 'phone',
      label: 'Phone',
      sortable: false
    },
    {
      key: 'membershipType',
      label: 'Membership',
      sortable: true,
      render: (value: string) => (
        <span className="capitalize font-medium">{value}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: Member['status']) => (
        <StatusBadge status={value} />
      )
    },
    {
      key: 'expiryDate',
      label: 'Expires',
      sortable: true,
      render: (value: string) => (
        <span>{new Date(value).toLocaleDateString()}</span>
      )
    },
    {
      key: 'balance',
      label: 'Balance',
      sortable: true,
      render: (value: number) => (
        <span className={value > 0 ? 'text-danger font-medium' : 'text-secondary'}>
          ${value.toFixed(2)}
        </span>
      )
    }
  ];

  const handleExport = () => {
    // Backend integration point - replace with actual export functionality
    console.log('Exporting member data...');
    alert('Export functionality would be implemented here');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="text-primary" size={24} />
          <h1 className="text-2xl font-bold text-gray-900">All Members</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          
          <button 
            onClick={handleExport}
            className="btn-primary flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="text-2xl font-bold text-gray-900">{mockMembers.length}</div>
          <div className="text-sm text-gray-600">Total Members</div>
        </div>
        
        <div className="card p-4">
          <div className="text-2xl font-bold text-secondary">
            {mockMembers.filter(m => m.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        
        <div className="card p-4">
          <div className="text-2xl font-bold text-warning">
            {mockMembers.filter(m => m.status === 'expiring').length}
          </div>
          <div className="text-sm text-gray-600">Expiring Soon</div>
        </div>
        
        <div className="card p-4">
          <div className="text-2xl font-bold text-danger">
            {mockMembers.filter(m => m.status === 'expired').length}
          </div>
          <div className="text-sm text-gray-600">Expired</div>
        </div>
      </div>

      {/* Members Table */}
      <Table
        columns={columns}
        data={mockMembers}
        searchPlaceholder="Search members by name, email, or phone..."
      />
    </div>
  );
};