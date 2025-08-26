import React from 'react';
import { Edit, Trash2, User, Phone, Mail, Calendar, DollarSign } from 'lucide-react';
import { Member } from '../services/api';
import { StatusBadge } from './StatusBadge';

interface MemberTableProps {
  members: Member[];
  onEdit: (member: Member) => void;
  onDelete: (member: Member) => void;
  isLoading?: boolean;
}

export const MemberTable: React.FC<MemberTableProps> = ({
  members,
  onEdit,
  onDelete,
  isLoading = false
}) => {
  const getStatusBadgeType = (status: string): 'active' | 'expiring' | 'expired' => {
    switch (status) {
      case 'Active': return 'active';
      case 'Expiring': return 'expiring';
      case 'Expired': return 'expired';
      default: return 'expired';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (members.length === 0) {
    return (
      <div className="card">
        <div className="flex flex-col items-center justify-center py-16">
          <User className="text-gray-400 mb-4" size={64} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Members Found</h3>
          <p className="text-gray-600 text-center max-w-md">
            Get started by adding your first gym member. Click the "Add Member" button to begin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      {/* Mobile View */}
      <div className="block lg:hidden">
        <div className="divide-y divide-gray-200">
          {members.map((member) => (
            <div key={member.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">Age: {member.age}</p>
                </div>
                <StatusBadge status={getStatusBadgeType(member.membership_status || 'Expired')} />
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail size={14} className="text-gray-400" />
                  <span className="text-gray-600 truncate">{member.email || 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={14} className="text-gray-400" />
                  <span className="text-gray-600">{member.phone || 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={14} className="text-gray-400" />
                  <span className="text-gray-600">{formatDate(member.joining_date)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign size={14} className="text-gray-400" />
                  <span className={`font-medium ${
                    (member.balance_amount || 0) > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    ${(member.balance_amount || 0).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {member.membership_plan}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(member)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    disabled={isLoading}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(member)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    disabled={isLoading}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Member
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Membership
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                    <div className="text-sm text-gray-500">Age: {member.age}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{member.email || 'N/A'}</div>
                  <div className="text-sm text-gray-500">{member.phone || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 capitalize">
                    {member.membership_plan}
                  </div>
                  <div className="text-sm text-gray-500">
                    Joined: {formatDate(member.joining_date)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={getStatusBadgeType(member.membership_status || 'Expired')} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium ${
                    (member.balance_amount || 0) > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    ${(member.balance_amount || 0).toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(member)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                      disabled={isLoading}
                      title="Edit Member"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(member)}
                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                      disabled={isLoading}
                      title="Delete Member"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};