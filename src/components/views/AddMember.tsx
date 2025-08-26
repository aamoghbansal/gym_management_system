import React, { useState } from 'react';
import { UserPlus, Save } from 'lucide-react';

export const AddMember: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    membershipType: 'basic',
    initialWeight: '',
    initialPayment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Backend integration point - replace with actual API call
    console.log('Adding new member:', formData);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      membershipType: 'basic',
      initialWeight: '',
      initialPayment: ''
    });
    
    alert('Member added successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <UserPlus className="text-primary" size={24} />
        <h1 className="text-2xl font-bold text-gray-900">Add New Member</h1>
      </div>

      {/* Form */}
      <div className="card p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Membership Type *
                </label>
                <select
                  name="membershipType"
                  value={formData.membershipType}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="basic">Basic - $29/month</option>
                  <option value="premium">Premium - $49/month</option>
                  <option value="vip">VIP - $79/month</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Weight (kg)
                </label>
                <input
                  type="number"
                  name="initialWeight"
                  value={formData.initialWeight}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter weight in kg"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Payment ($)
                </label>
                <input
                  type="number"
                  name="initialPayment"
                  value={formData.initialPayment}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter payment amount"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setFormData({
                name: '',
                email: '',
                phone: '',
                membershipType: 'basic',
                initialWeight: '',
                initialPayment: ''
              })}
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center space-x-2"
            >
              <Save size={16} />
              <span>Add Member</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};