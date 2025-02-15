"use client"

import { TabNavigation } from '@/components/shared/TabNavigation';
import { Settings } from 'lucide-react';
import { FC, useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import ServicesForm from './ServicesForm';
import CarInfoForm from './CarInfoForm';
import SecurityForm from './SecurityForm';

const InstructorProfile: FC = () => {
  const [activeTab, setActiveTab] = useState('personal');

  // Experience
  const [drivingLicenseFile, setDrivingLicenseFile] = useState<File | null>(null);
  const [experienceCertificateFile, setExperienceCertificateFile] = useState<File | null>(null);
  const [carImageFile, setCarImageFile] = useState<File | null>(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoForm />
        );
      case 'experience':
        return (
          <ExperienceForm
            drivingLicenseFile={drivingLicenseFile}
            setDrivingLicenseFile={setDrivingLicenseFile}
            experienceCertificateFile={experienceCertificateFile}
            setExperienceCertificateFile={setExperienceCertificateFile}
          />
        );
      case 'services':
        return (
          <ServicesForm />
        );
      case 'car':
        return (
          <CarInfoForm
            carImageFile={carImageFile}
            setCarImageFile={setCarImageFile}
          />
        );
      case 'security':
        return (
          <SecurityForm />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mt-2 flex items-center">
            <Settings className="w-8 h-8 text-blue-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">Profile Settings</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-8 pt-6">
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          <div className="px-8 pb-8 pt-5">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;