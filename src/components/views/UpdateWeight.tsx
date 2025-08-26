import React, { useState } from 'react';
import { Scale, Search, Save, TrendingUp, TrendingDown } from 'lucide-react';
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
  }
];

export const UpdateWeight: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [newWeight, setNewWeight] = useState('');
  const [notes, setNotes] = useState('');

  const filteredMembers = mockMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMemberSelect = (member: Member) => {
    setSelectedMember(member);
    setNewWeight('');
    setNotes('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember || !newWeight) return;

    // Backend integration point - replace with actual API call
    console.log('Updating weight for member:', {
      memberId: selectedMember.id,
      previousWeight: selectedMember.weight,
      newWeight: parseFloat(newWeight),
      notes
    });

    alert(`Weight updated successfully for ${selectedMember.name}!`);
    
    // Reset form
    setSelectedMember(null);
    setNewWeight('');
    setNotes('');
    setSearchTerm('');
  };

  const weightDifference = selectedMember && newWeight 
    ? parseFloat(newWeight) - (selectedMember.weight || 0)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Scale className="text-primary" size={24} />
        <h1 className="text-2xl font-bold text-gray-900">Update Weight</h1>
      </div>

      {/* Member Search */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Member</h3>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
            placeholder="Search by name or email..."
          />
        </div>

        {searchTerm && (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {filteredMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => handleMemberSelect(member)}
                className="w-full text-left p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">{member.name}</div>
                    <div className="text-sm text-gray-600">{member.email}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Current Weight</div>
                    <div className="font-medium">{member.weight ? `${member.weight} kg` : 'Not recorded'}</div>
                  </div>
                </div>
              </button>
            ))}
            
            {filteredMembers.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No members found matching your search.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Weight Update Form */}
      {selectedMember && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Weight</h3>
          
          {/* Selected Member Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{selectedMember.name}</h4>
                <p className="text-sm text-gray-600">{selectedMember.email}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Current Weight</div>
                <div className="text-lg font-semibold text-gray-900">
                  {selectedMember.weight ? `${selectedMember.weight} kg` : 'Not recorded'}
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Weight (kg) *
                </label>
                <input
                  type="number"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  required
                  step="0.1"
                  min="0"
                  className="input-field"
                  placeholder="Enter new weight"
                />
              </div>
              
              {newWeight && selectedMember.weight && (
                <div className="flex items-end">
                  <div className="card p-3 w-full">
                    <div className="flex items-center space-x-2">
                      {weightDifference > 0 ? (
                        <TrendingUp className="text-danger" size={16} />
                      ) : weightDifference < 0 ? (
                        <TrendingDown className="text-secondary" size={16} />
                      ) : (
                        <div className="w-4 h-4 bg-gray-400 rounded-full" />
                      )}
                      <span className="text-sm font-medium">
                        {weightDifference > 0 ? '+' : ''}{weightDifference.toFixed(1)} kg
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="input-field resize-none"
                placeholder="Add any notes about the weight measurement..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center space-x-2"
              >
                <Save size={16} />
                <span>Update Weight</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};