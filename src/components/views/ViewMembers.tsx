import React, { useState, useEffect } from 'react';
import { Users, Download, Filter, Plus, RefreshCw } from 'lucide-react';
import { memberApi, Member } from '../../services/api';
import { MemberTable } from '../MemberTable';
import { MemberForm } from '../MemberForm';
import { ConfirmDialog } from '../ConfirmDialog';
import { LoadingOverlay } from '../LoadingSpinner';

export const ViewMembers: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load members on component mount
  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await memberApi.getAll();
      setMembers(data);
    } catch (err) {
      console.error('Failed to load members:', err);
      setError(err instanceof Error ? err.message : 'Failed to load members');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMember = () => {
    setEditingMember(null);
    setShowForm(true);
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setShowForm(true);
  };

  const handleDeleteMember = (member: Member) => {
    setMemberToDelete(member);
    setShowDeleteDialog(true);
  };

  const handleFormSubmit = async (memberData: Omit<Member, 'id'>) => {
    try {
      setIsSubmitting(true);
      
      if (editingMember) {
        // Update existing member
        await memberApi.update(editingMember.id!, memberData);
      } else {
        // Create new member
        await memberApi.create(memberData);
      }
      
      // Reload members and close form
      await loadMembers();
      setShowForm(false);
      setEditingMember(null);
    } catch (err) {
      console.error('Failed to save member:', err);
      throw err; // Let the form handle the error display
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!memberToDelete) return;
    
    try {
      setIsSubmitting(true);
      await memberApi.delete(memberToDelete.id!);
      await loadMembers();
      setShowDeleteDialog(false);
      setMemberToDelete(null);
    } catch (err) {
      console.error('Failed to delete member:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete member');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setMemberToDelete(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingMember(null);
  };

  const getStats = () => {
    const total = members.length;
    const active = members.filter(m => m.membership_status === 'Active').length;
    const expiring = members.filter(m => m.membership_status === 'Expiring').length;
    const expired = members.filter(m => m.membership_status === 'Expired').length;
    
    return { total, active, expiring, expired };
  };

  const stats = getStats();

  if (isLoading) {
    return <LoadingOverlay message="Loading members..." />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="text-primary" size={24} />
            <h1 className="text-2xl font-bold text-gray-900">All Members</h1>
          </div>
        </div>
        
        <div className="card p-8 text-center">
          <div className="text-red-600 mb-4">
            <Users size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to Load Members</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadMembers}
            className="btn-primary flex items-center space-x-2 mx-auto"
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    }
  }


  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Users className="text-primary" size={24} />
            <h1 className="text-2xl font-bold text-gray-900">All Members</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={loadMembers}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
            
            <button 
              onClick={handleAddMember}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Member</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card p-4">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Members</div>
          </div>
          
          <div className="card p-4">
            <div className="text-2xl font-bold text-secondary">{stats.active}</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          
          <div className="card p-4">
            <div className="text-2xl font-bold text-warning">{stats.expiring}</div>
            <div className="text-sm text-gray-600">Expiring Soon</div>
          </div>
          
          <div className="card p-4">
            <div className="text-2xl font-bold text-danger">{stats.expired}</div>
            <div className="text-sm text-gray-600">Expired</div>
          </div>
        </div>

        {/* Members Table */}
        <MemberTable
          members={members}
          onEdit={handleEditMember}
          onDelete={handleDeleteMember}
          isLoading={isSubmitting}
        />
      </div>

      {/* Member Form Modal */}
      {showForm && (
        <MemberForm
          member={editingMember}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isLoading={isSubmitting}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Member"
        message={`Are you sure you want to delete ${memberToDelete?.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isLoading={isSubmitting}
        type="danger"
      />
    </>
  );
};