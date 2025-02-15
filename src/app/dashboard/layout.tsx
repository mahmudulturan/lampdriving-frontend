import DashboardNav from '@/components/layouts/dashboard-nav/DashboardNav';
import Sidebar from '@/components/layouts/sidebar/Sidebar';
import { ReactNode } from 'react';
import { FC } from 'react';

const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className='flex flex-col lg:flex-row bg-white'>
            <div className='lg:min-h-screen lg:w-80 relative '>
                <Sidebar />
            </div>
            <div className='flex-1 min-h-screen'>
                <DashboardNav />
                <div className='pt-[85px] pb-3 lg:py-6 px-3 lg:px-6 bg-gray-100 rounded-tl-md'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;