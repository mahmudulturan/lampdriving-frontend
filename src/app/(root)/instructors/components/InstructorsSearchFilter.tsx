"use client";
import { Input } from '@/components/ui/input';
import { Check, Search } from 'lucide-react';
import { FC, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command"
import { sydneySuburbs } from '@/constant/sydneySuburbs';
interface IInstructorSearchFilterProps {
    searchParams?: {
        'vehicle.type'?: string;
        searchKey?: string;
        page?: string;
    }
}

const InstructorsSearchFilter: FC<IInstructorSearchFilterProps> = ({ searchParams }) => {
    const [searchPopOverOpen, setSearchPopOverOpen] = useState(false);
    const [carType, setCarType] = useState<'auto' | 'manual' | 'all'>(
        searchParams?.['vehicle.type'] === "auto" || searchParams?.['vehicle.type'] === "manual" ? searchParams?.['vehicle.type'] : 'all');
    const [selectedSuburb, setSelectedSuburb] = useState<string>(searchParams?.searchKey || '');
    const urlSearchParams = useSearchParams();
    const { replace } = useRouter();

    // Function to handle search
    const handleSearch = (searchKey: string) => {
        const searchParams = new URLSearchParams(urlSearchParams);

        if (searchKey) {
            searchParams.set('searchKey', searchKey.toString());
            searchParams.delete('page');
            setSelectedSuburb(searchKey);
        } else {
            searchParams.delete('searchKey');
        }
        replace(`?${searchParams.toString()}`);
    }

    const handleFilter = (field: string, value: string) => {
        if (value) {
            const searchParams = new URLSearchParams(urlSearchParams);
            searchParams.set(field, value);
            replace(`?${searchParams.toString()}`);
        } else {
            const searchParams = new URLSearchParams(urlSearchParams);
            searchParams.delete(field);
            replace(`?${searchParams.toString()}`);
        }
    }

    const handleChangeCarType = (type: 'auto' | 'manual' | 'all') => {
        setCarType(type);
        if (type == "auto" || type == "manual") {
            handleFilter('vehicle.type', type);
        } else {
            handleFilter('vehicle.type', '');
        }
    }


    return (
        <div className='flex gap-5 justify-end max-w-7xl'>


            <Popover
                open={searchPopOverOpen}
                onOpenChange={(open) => setSearchPopOverOpen(open)} // Update popover state
            >
                <PopoverTrigger asChild>
                    <div className='relative md:w-[350px] lg:w-[434px]' >
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                            value={selectedSuburb}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Enter your suburb" className='h-12 pl-12' />
                    </div>
                </PopoverTrigger>
                <PopoverContent className="md:w-[350px] lg:w-[434px] p-2">
                    <Command>
                        <CommandInput placeholder="Enter your suburb" />
                        <CommandList>
                            {sydneySuburbs.map((suburb, index) => (
                                <CommandItem
                                    className='py-3'
                                    key={index}
                                    onSelect={() => {
                                        handleSearch(suburb.value);
                                        setSearchPopOverOpen(false);
                                    }}
                                >
                                    {suburb.label}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            <div className="font-semibold text-textCol text-center flex gap-3">
                <button
                    onClick={() => handleChangeCarType('auto')}
                    className={`w-32 flex justify-center items-center px-0 py-3 rounded-md ${carType === 'auto'
                        ? 'gradient-color text-textCol'
                        : 'bg-gray-200 text-secondary'}`}
                >
                    {carType == "auto" && <span><Check className='w-5' /></span>}
                    <span>Auto</span>
                </button>
                <button
                    onClick={() => handleChangeCarType('manual')}
                    className={`w-32 flex justify-center items-center py-2 rounded-md ${carType === 'manual'
                        ? 'gradient-color text-textCol'
                        : 'bg-gray-200 text-secondary'}`}
                >
                    {carType == "manual" && <span><Check className='w-5' /></span>}
                    <span>Manual</span>
                </button>
                <button
                    onClick={() => handleChangeCarType('all')}
                    className={`w-32 flex justify-center items-center py-2 rounded-md ${carType === 'all'
                        ? 'gradient-color text-textCol'
                        : 'bg-gray-200 text-secondary'}`}
                >
                    {carType == "all" && <span><Check className='w-5' /></span>}
                    <span>All</span>
                </button>
            </div>
        </div>
    );
};

export default InstructorsSearchFilter;