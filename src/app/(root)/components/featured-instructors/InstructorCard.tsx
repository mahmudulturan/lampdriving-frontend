import Image from 'next/image';
import { FC } from 'react';
import myImg from "@/assets/home-page-image/test-image.webp";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Car, Clock, Star } from 'lucide-react';

const InstructorCard: FC = () => {
    return (
        // <div className=" rounded-md text-secondary flex flex-col gap-4 px-4 py-6 bg-light">
        //     {/* Instructor Image */}
        //     <div className=' rounded-full mx-auto'>
        //         <Image
        //             src={myImg}
        //             width={120}
        //             height={120}
        //             alt="Instructor image"
        //             className="rounded-full"
        //         />
        //     </div>

        //     {/* Instructor Details */}
        //     <div className="flex justify-between">
        //         <div className='space-y-1'>
        //             <p><strong>Name:</strong> John Doe</p>
        //             <p><strong>Rating:</strong> 4.8/5</p>
        //             <p><strong>Experience:</strong> 5 years</p>
        //             <p><strong>Type:</strong> Auto/Manual</p>
        //         </div>
        //         <div>
        //             <h4 className="font-bold text-xl bg-gradient-to-r from-primary to-indigo bg-clip-text text-transparent">
        //                 $50/<span className="text-sm">hr</span>
        //             </h4>
        //         </div>
        //     </div>

        //     {/* Action Buttons */}
        //     <div className="flex gap-3">
        //         <Button className="w-1/2 bg-light border hover:bg-gray-100 text-secondary h-11">
        //             View Profile
        //         </Button>
        //         <Button className="w-1/2 h-11 text-light bg-gradient-to-r gradient-color">
        //             Book Online Now
        //         </Button>
        //     </div>
        // </div>

        <Card className="w-full">
            <CardContent className="p-6 overflow-hidden">
                <div className="flex items-start gap-4 md:gap-6">
                    {/* Profile Image with Gradient Border */}
                    <div className="relative group flex flex-col">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo/50 to-primary/50 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300" />
                        <Image
                            src={myImg}
                            height={130}
                            width={130}
                            alt=""
                            className="relative rounded-full object-cover border-2 shadow-sm"
                        />
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 lg:space-y-4 space-y-1">
                        <div className="lg:flex justify-between items-start space-y-1">
                            <div className='space-y-1'>
                                <h3 className="text-xl font-semibold text-secondary">
                                    Hridoy Ahmed
                                </h3>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <Star className="h-4 w-4 fill-primary text-primary" />
                                    <span className="text-sm font-medium text-secondary">4.5/5</span>
                                </div>
                            </div>
                            <div className="lg:text-right text-gradient">
                                <span className="text-2xl font-bold">$50</span>
                                <span className="text-sm">/hr</span>
                            </div>
                        </div>

                        <div className="lg:flex gap-4 text-sm text-accent space-y-1">
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>3 years experience</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Car className="h-4 w-4 text-primary" />
                                <span>Manual</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex md:gap-3 gap-2 py-2 lg:pt-0 justify-end overflow-hidden">
                    <Button
                        variant="outline"
                        size="lg"
                        className="bg-white hover:bg-slate-50 text-xs lg:text-base"
                    >
                        VIEW PROFILE
                    </Button>
                    <Button
                        size="lg"
                        className=" bg-primary hover:bg-primary/90 text-xs lg:text-base"
                    >
                        BOOK ONLINE NOW
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default InstructorCard;
