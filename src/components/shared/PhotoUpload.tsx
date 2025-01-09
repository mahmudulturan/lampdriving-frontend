"use client"

import Image from 'next/image';
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';
import placeHolderImage from "@/assets/person_1.jpg"
import { Button } from '../ui/button';
import { ImagePlus, LoaderIcon, Upload, User, X } from 'lucide-react';
import { generateUniqueIdentifier } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { UseFormRegister, UseFormSetError, UseFormSetValue } from 'react-hook-form';
import { IRegisterInputs } from '@/types/auth';

export interface IProfilePhoto {
    file: File | null;
    url: string | undefined;
}

interface PhotoUploadProps {
    profilePhoto: IProfilePhoto;
    setProfilePhoto: Dispatch<SetStateAction<IProfilePhoto>>;
    register?: UseFormRegister<IRegisterInputs>;
    setValue?: UseFormSetValue<IRegisterInputs>;
    setError?: UseFormSetError<IRegisterInputs>;
    isRemoveUrl?: boolean;
}

const PhotoUpload: FC<PhotoUploadProps> = ({ profilePhoto, setProfilePhoto, register, setValue, setError, isRemoveUrl }) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [imageUploadLoading, setImageUploadLoading] = useState(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsSuccess(false);
        const file = e.target.files?.[0];

        if (setValue && isRemoveUrl) {
            setValue('profileImg', "");
        }

        setProfilePhoto((prev) => (
            {
                ...prev,
                file: file || null,
                url: isRemoveUrl ? "" : prev.url
            }
        ));
    }

    const handleRemoveImage = () => {
        if (setValue && isRemoveUrl) {
            setValue('profileImg', "");
        }
        setProfilePhoto((prev) => (
            {
                ...prev,
                file: null,
                url: isRemoveUrl ? "" : prev.url
            }
        ));
    }

    const handleUploadFile = async () => {
        try {
            if (!profilePhoto.file) {
                throw new Error('No file selected.');
            }
            const uniqueIdentifier = generateUniqueIdentifier(profilePhoto.file);
            setImageUploadLoading(true);
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
            const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
            if (!cloudName || !uploadPreset) {
                throw new Error('Cloudinary credentials are missing.');
            }
            // Create a FormData object
            const formData = new FormData();
            formData.append('file', profilePhoto.file!);
            formData.append('upload_preset', uploadPreset);
            formData.append('cloud_name', cloudName);
            formData.append('public_id', uniqueIdentifier);

            // Make a POST request to Cloudinary's upload API
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            toast({
                message: "Image uploaded successfully",
            })

            if (setValue) {
                setValue('profileImg', data.secure_url);
            }
            if (setError) {
                setError('profileImg', {
                    type: 'manual',
                    message: ''
                });
            }

            setProfilePhoto((prev) => ({
                ...prev,
                url: data.secure_url
            }));

            setIsSuccess(true);
            setIsError(false);
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
        }
        finally {
            setImageUploadLoading(false);
        }
    };

    return (
        <div className='w-full flex justify-center mt-10'>
            <div className='relative'>
                {/* Image */}
                <div className={`w-[170px] h-[170px] rounded-2xl overflow-hidden ${!profilePhoto?.file || !profilePhoto?.url ? "shadow-lg border flex items-center justify-center text-accent" : ""}`}>
                    {
                        profilePhoto?.file || profilePhoto?.url ?
                            <Image src={profilePhoto?.file ? URL.createObjectURL(profilePhoto.file) : placeHolderImage} alt="Profile Image" className='w-full' width={150} height={100} />
                            :
                            <User size={60} />}
                </div>

                {/* File Input */}
                <input  {...register?.('profileImg', {
                    required: !profilePhoto?.url ? "Please upload a profile photo" : false
                })} onChange={handleFileChange} className='hidden' type="file" name="image" id="image" />

                {
                    profilePhoto?.file && !isSuccess ?
                        <Button onClick={handleUploadFile} type='button' className='text-primary border cursor-pointer shadow-lg mx-auto bg-light hover:bg-light px-0 w-36 text-sm capitalize h-9 rounded-lg flex justify-center items-center gap-2 -translate-y-5'
                        >
                            {
                                imageUploadLoading ?
                                    <>
                                        <LoaderIcon className='animate-spin' width={16} height={16} /><span>Uploading..</span>
                                    </>
                                    :
                                    <>
                                        <Upload width={16} height={16} /><span>Upload</span>
                                    </>
                            }
                        </Button>
                        :
                        <label htmlFor='image' className='text-primary border cursor-pointer font-bold bg-light hover:bg-light shadow-lg mx-auto text-sm capitalize w-36 h-9 rounded-lg flex justify-center items-center gap-2 -translate-y-5'>
                            <ImagePlus width={16} height={16} /><span>Choose</span>
                        </label>
                }

                {
                    (profilePhoto?.file && !isSuccess) &&
                    <Button type='button' onClick={handleRemoveImage} className='absolute top-0 right-0 shadow-lg bg-primary hover:bg-red-500 px-0 h-8 w-8 -translate-y-3 translate-x-3 rounded-lg flex justify-center items-center'>
                        <X />
                    </Button>
                }
            </div>
        </div>
    );
};

export default PhotoUpload;