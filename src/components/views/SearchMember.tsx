import React, { useState } from 'react';
import { Search, User, Mail, Phone, Calendar, Scale, CreditCard } from 'lucide-react';
import { StatusBadge } from '../StatusBadge';
import { Member } from '../../types';

// Mock data - replace with actual search from backend
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

export const SearchMember: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Member[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    
    // Backend integration point - replace with actual API call
    console.log('Searching for member:', searchTerm);
    
    // Simulate API delay
    setTimeout(() => {
      const results = mockMembers.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.phone.includes(searchTerm)
      );
      
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Search className="text-primary" size={24} />
        <h1 className="text-2xl font-bold text-gray-900">Search Member</h1>
      </div>

      {/* Search Form */}
      <div className="card p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search by Name, Email, or Phone
            </label>
            <div className="flex space-x-3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field flex-1"
                placeholder="Enter name, email, or phone number..."
              />
              <button
                type="submit"
                disabled={isSearching || !searchTerm.trim()}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Search size={16} />
                <span>{isSearching ? 'Searching...' : 'Search'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Search Results ({searchResults.length})
          </h2>
          
          {searchResults.map((member) => (
            <div key={member.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <User className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                    <StatusBadge status={member.status} />
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-600">Member ID</div>
                  <div className="font-mono text-sm">{member.id}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-gray-400" size={16} />
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="font-medium">{member.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="text-gray-400" size={16} />
                  <div>
                    <div className="text-sm text-gray-600">Phone</div>
                    <div className="font-medium">{member.phone}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="text-gray-400" size={16} />
                  <div>
                    <div className="text-sm text-gray-600">Expires</div>
                    <div className="font-medium">
                      {new Date(member.expiryDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                {member.weight && (
                  <div className="flex items-center space-x-3">
                    <Scale className="text-gray-400" size={16} />
                    <div>
                      <div className="text-sm text-gray-600">Weight</div>
                      <div className="font-medium">{member.weight} kg</div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-3">
                  <CreditCard className="text-gray-400" size={16} />
                  <div>
                    <div className="text-sm text-gray-600">Balance</div>
                    <div className={`font-medium ${member.balance > 0 ? 'text-danger' : 'text-secondary'}`}>
                      ${member.balance.toFixed(2)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <User className="text-gray-400" size={16} />
                  <div>
                    <div className="text-sm text-gray-600">Membership</div>
                    <div className="font-medium capitalize">{member.membershipType}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-3">
                <button className="btn-primary text-sm">Edit Member</button>
                <button className="btn-secondary text-sm">Update Weight</button>
                <button className="btn-warning text-sm">Renew Membership</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {searchResults.length === 0 && searchTerm && !isSearching && (
        <div className="card p-8 text-center">
          <Search className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
          <p className="text-gray-600">
            No members match your search criteria. Try searching with a different term.
          </p>
        </div>
      )}
    </div>
  );
};