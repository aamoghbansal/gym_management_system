import React from 'react';
import { 
  UserPlus, 
  Users, 
  Search, 
  Scale, 
  CreditCard, 
  RefreshCw, 
  AlertTriangle, 
  UserX, 
  Calendar, 
  Mail,
  BarChart3,
  Menu,
  X
} from 'lucide-react';
import { ViewType } from '../types';
import clsx from 'clsx';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const menuItems = [
  { id: 'dashboard' as ViewType, label: 'Dashboard', icon: BarChart3 },
  { id: 'add-member' as ViewType, label: 'Add New Member', icon: UserPlus },
  { id: 'view-members' as ViewType, label: 'View All Members', icon: Users },
  { id: 'search-member' as ViewType, label: 'Search Member', icon: Search },
  { id: 'update-weight' as ViewType, label: 'Update Weight', icon: Scale },
  { id: 'update-balance' as ViewType, label: 'Update Balance', icon: CreditCard },
  { id: 'renew-membership' as ViewType, label: 'Renew Membership', icon: RefreshCw },
  { id: 'expiring-members' as ViewType, label: 'Expiring Members', icon: AlertTriangle },
  { id: 'expired-members' as ViewType, label: 'Expired Members', icon: UserX },
  { id: 'active-members' as ViewType, label: 'Active Members', icon: Calendar },
  { id: 'send-reminders' as ViewType, label: 'Send Reminders', icon: Mail },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  isCollapsed,
  onToggleCollapse,
}) => {
  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggleCollapse}
        />
      )}
      
      {/* Sidebar */}
      <div className={clsx(
        'fixed left-0 top-0 h-full bg-white shadow-lg z-50 transition-all duration-300 ease-in-out',
        'lg:relative lg:translate-x-0',
        isCollapsed ? '-translate-x-full lg:w-16' : 'translate-x-0 w-64'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-gray-800">Gym Manager</h1>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={clsx(
                  'w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors duration-200',
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100',
                  isCollapsed && 'justify-center'
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon size={20} className="flex-shrink-0" />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};