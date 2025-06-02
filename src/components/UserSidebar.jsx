
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Brain, 
  User 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/user-dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Predictions',
    href: '/user-predictions',
    icon: Brain
  },
  {
    title: 'Profile',
    href: '/user-profile',
    icon: User
  }
];

export const UserSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-primary">PlantCare</h1>
        <p className="text-sm text-muted-foreground">User Dashboard</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
