import { Clock } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import React from 'react';

const PendingBalance = () => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
                <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="text-yellow-600" size={24} />
                </div>
                <span className="text-yellow-600 flex items-center gap-1">
                    8 instructors <ArrowRight size={16} />
                </span>
            </div>
            <h3 className="text-2xl font-bold mt-4">$12,420</h3>
            <p className="text-gray-600">Pending Balance</p>
        </div>
    );
};

export default PendingBalance;