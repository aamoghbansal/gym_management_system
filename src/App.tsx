import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './components/views/Dashboard';
import { AddMember } from './components/views/AddMember';
import { ViewMembers } from './components/views/ViewMembers';
import { SearchMember } from './components/views/SearchMember';
import { UpdateWeight } from './components/views/UpdateWeight';
import { ViewType } from './types';

// Placeholder components for remaining views
const PlaceholderView: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="flex items-center justify-center h-96">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <p className="text-sm text-gray-500 mt-4">This feature will be implemented with backend integration.</p>
    </div>
  </div>
);

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'add-member':
        return <AddMember />;
      case 'view-members':
        return <ViewMembers />;
      case 'search-member':
        return <SearchMember />;
      case 'update-weight':
        return <UpdateWeight />;
      case 'update-balance':
        return <PlaceholderView title="Update Balance" description="Update member account balances and payment history" />;
      case 'renew-membership':
        return <PlaceholderView title="Renew Membership" description="Renew member subscriptions and extend expiry dates" />;
      case 'expiring-members':
        return <PlaceholderView title="Expiring Members" description="View members whose subscriptions are expiring soon" />;
      case 'expired-members':
        return <PlaceholderView title="Expired Members" description="View members with expired subscriptions" />;
      case 'active-members':
        return <PlaceholderView title="Active Members" description="View all active members by month" />;
      case 'send-reminders':
        return <PlaceholderView title="Send Reminders" description="Send renewal reminders to members" />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          {/* Top Bar */}
          <TopBar onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />

          {/* Page Content */}
          <main className="p-6">
            {renderCurrentView()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;