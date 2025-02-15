import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Facebook, Instagram, Twitter } from 'lucide-react';
import teamImg from "@/assets/home-page-image/man_image.jpeg"
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface ITeamMemberProps {
    name: string;
    role: string;
    image: string;
    description: string;
}
const TeamMemberCard: FC<ITeamMemberProps> = ({ name, role, description }) => {
    return (
        <Card className="border border-gray-200/40  gradient-to-b rounded-lg">
            <CardContent className="p-4">
                <div className="flex justify-between gap-0">
                    {/* Left Content */}
                    <div className="space-y-4">
                        <div className='flex justify-between gap-4'>
                            <div className='space-y-2'>
                                <h2 className="text-2xl font-semibold text-primary">{name}</h2>
                                <p className="text-sm font-bold text-gray-600">{role}</p>
                                <p className="text-sm text-accent">
                                    {description}
                                </p>
                            </div>
                            {/* Profile Image */}
                            <div className="h-28 w-28 flex-shrink-0">
                                <Image
                                    src={teamImg}
                                    alt="Profile picture"
                                    className="h-full w-full object-cover rounded-md"
                                />
                            </div>
                        </div>
                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <Link href="#" className="border p-2 rounded-sm text-primary">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="border p-2 rounded-sm text-primary" >
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="border p-2 rounded-sm text-primary" >
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Button variant="link" className="font-semibold text-primary">
                                VIEW PROFILE <ChevronRight />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default TeamMemberCard;