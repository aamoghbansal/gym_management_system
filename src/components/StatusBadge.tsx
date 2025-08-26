import React from 'react';
import clsx from 'clsx';

interface StatusBadgeProps {
  status: 'active' | 'expiring' | 'expired';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const statusConfig = {
    active: {
      label: 'Active',
      className: 'bg-green-100 text-green-800 border-green-200'
    },
    expiring: {
      label: 'Expiring Soon',
      className: 'bg-orange-100 text-orange-800 border-orange-200'
    },
    expired: {
      label: 'Expired',
      className: 'bg-red-100 text-red-800 border-red-200'
    }
  };

  const config = statusConfig[status];

  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
};