import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Member } from '../services/api';

interface MemberFormProps {
  member?: Member | null;
  onSubmit: (memberData: Omit<Member, 'id'>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const MemberForm: React.FC<MemberFormProps> = ({
  member,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<Omit<Member, 'id'>>({
    name: '',
    age: 18,
    gender: 'Other',
    phone: '',
    email: '',
    weight: 0,
    membership_plan: 'Basic',
    joining_date: new Date().toISOString().split('T')[0],
    duration_months: 1,
    payment_status: 'Pending',
    total_price: 0,
    amount_paid: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        age: member.age,
        gender: member.gender || 'Other',
        phone: member.phone || '',
        email: member.email || '',
        weight: member.weight || 0,
        membership_plan: member.membership_plan,
        joining_date: member.joining_date,
        duration_months: member.duration_months,
        payment_status: member.payment_status || 'Pending',
        total_price: member.total_price,
        amount_paid: member.amount_paid || 0
      });
    }
  }, [member]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (formData.age < 16 || formData.age > 100) {
      newErrors.age = 'Age must be between 16 and 100';
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.membership_plan) {
      newErrors.membership_plan = 'Membership plan is required';
    }

    if (formData.total_price < 0) {
      newErrors.total_price = 'Total price cannot be negative';
    }

    if (formData.amount_paid < 0) {
      newErrors.amount_paid = 'Amount paid cannot be negative';
    }

    if (formData.amount_paid > formData.total_price) {
      newErrors.amount_paid = 'Amount paid cannot exceed total price';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {member ? 'Edit Member' : 'Add New Member'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Enter full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="16"
                  max="100"
                  className={`input-field ${errors.age ? 'border-red-500' : ''}`}
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  step="0.1"
                  min="0"
                  className="input-field"
                  placeholder="Enter weight"
                />
              </div>
            </div>
          </div>

          {/* Membership Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Membership Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Membership Plan *
                </label>
                <select
                  name="membership_plan"
                  value={formData.membership_plan}
                  onChange={handleChange}
                  className={`input-field ${errors.membership_plan ? 'border-red-500' : ''}`}
                >
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
                  <option value="VIP">VIP</option>
                </select>
                {errors.membership_plan && <p className="text-red-500 text-sm mt-1">{errors.membership_plan}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (months) *
                </label>
                <input
                  type="number"
                  name="duration_months"
                  value={formData.duration_months}
                  onChange={handleChange}
                  min="1"
                  max="24"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Joining Date *
                </label>
                <input
                  type="date"
                  name="joining_date"
                  value={formData.joining_date}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Status
                </label>
                <select
                  name="payment_status"
                  value={formData.payment_status}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Price ($) *
                </label>
                <input
                  type="number"
                  name="total_price"
                  value={formData.total_price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className={`input-field ${errors.total_price ? 'border-red-500' : ''}`}
                  placeholder="0.00"
                />
                {errors.total_price && <p className="text-red-500 text-sm mt-1">{errors.total_price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount Paid ($)
                </label>
                <input
                  type="number"
                  name="amount_paid"
                  value={formData.amount_paid}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className={`input-field ${errors.amount_paid ? 'border-red-500' : ''}`}
                  placeholder="0.00"
                />
                {errors.amount_paid && <p className="text-red-500 text-sm mt-1">{errors.amount_paid}</p>}
              </div>
            </div>
          </div>

          {/* Balance Display */}
          {formData.total_price > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Balance Amount:</span>
                <span className={`text-lg font-semibold ${
                  (formData.total_price - formData.amount_paid) > 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  ${(formData.total_price - formData.amount_paid).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              <span>{isLoading ? 'Saving...' : (member ? 'Update Member' : 'Add Member')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};