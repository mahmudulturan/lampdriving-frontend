import { ArrowUpRight } from 'lucide-react';
import { DollarSign } from 'lucide-react';
import React from 'react';

const TotalRevenue = () => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
                <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="text-green-600" size={24} />
                </div>
                <span className="text-green-600 flex items-center gap-1">
                    +12.5% <ArrowUpRight size={16} />
                </span>
            </div>
            <h3 className="text-2xl font-bold mt-4">$45,850</h3>
            <p className="text-gray-600">Total Revenue</p>
        </div>
    );
};

export default TotalRevenue; 