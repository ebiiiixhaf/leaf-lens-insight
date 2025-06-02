
import React from 'react';
import { UserSidebar } from './UserSidebar';

export const UserDashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <UserSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};
