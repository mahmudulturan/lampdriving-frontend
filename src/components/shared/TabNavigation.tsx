import React from 'react';
import { User, Car, Clock, MapPin, FileText } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const tabs: Tab[] = [
  { id: 'personal', label: 'Personal Info', icon: <User className="w-5 h-5" /> },
  { id: 'experience', label: 'Experience', icon: <Car className="w-5 h-5" /> },
  { id: 'services', label: 'Services', icon: <Clock className="w-5 h-5" /> },
  { id: 'car', label: 'Car Info', icon: <MapPin className="w-5 h-5" /> },
  { id: 'security', label: 'Security', icon: <FileText className="w-5 h-5" /> },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 xl:space-x-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm xl:text-base transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {/* {tab.icon} */}
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}