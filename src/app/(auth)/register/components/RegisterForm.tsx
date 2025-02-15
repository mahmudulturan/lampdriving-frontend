"use client"

import PhotoUpload from '@/components/shared/PhotoUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { genderOptions } from '@/constant/gender';
import { toast } from '@/hooks/use-toast';
import { IProfilePhoto } from '@/hooks/useImage';
import { useRegisterUserMutation } from '@/redux/api/authApi/authApi';
import { IRegisterInputs } from '@/types/auth';
import { Eye, EyeClosed } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const RegisterForm: FC = () => {
    const { register, handleSubmit, formState: { errors }, control, watch, setError, setValue } = useForm<IRegisterInputs>();
    const [registerUser, { isLoading: isRegistering }] = useRegisterUserMutation();
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState<IProfilePhoto>({
        file: null,
        url: undefined
    });

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    const router = useRouter();


    const handleRegister = (data: IRegisterInputs) => {
        const formData: IRegisterInputs = {
            name: {
                firstName: data.name.firstName,
                lastName: data.name.lastName
            },
            email: data.email,
            phone: data.phone,
            gender: data.gender,
            profileImg: profilePhoto.url,
            localLicense: {
                licenseNumber: data.localLicense.licenseNumber,
                issueDate: data.localLicense.issueDate,
                expiryDate: data.localLicense.expiryDate
            },
            password: data.password,
        }

        console.log('Form Data: ', formData);
        console.log('Data: ', data);

        registerUser(data).unwrap().then((res) => {
            toast({
                message: res.message,
            })
            router.push("/login");
        }).catch((err) => {
            toast({
                success: false,
                message: err.data.message || "Something went wrong",
            })
        })
    }

    const handlePasswordToggle = (field: string) => {
        if (field === 'password') {
            setPasswordVisible((prev) => !prev);
        } else if (field === 'confirm-password') {
            setConfirmPasswordVisible((prev) => !prev);
        }
    }

    useEffect(() => {
        if (confirmPassword && confirmPassword?.length >= 6) {
            if (confirmPassword && password !== confirmPassword) {
                setConfirmPasswordError("Passwords do not match");
            } else {
                setConfirmPasswordError("");
            }
        }
    }, [password, confirmPassword]);

    return (
        <form
            onSubmit={handleSubmit(handleRegister)}
            className='w-full md:w-[500px] lg:w-[750px] mx-auto p-5 md:p-10 flex flex-col items-center md:shadow-lg md:rounded-lg md:border'
        >
            <h1 className='text-2xl md:text-3xl font-bold text-primary'>Learner Registration</h1>

            <div className='w-full mt-10'>
                <div className='flex flex-col gap-3'>
                    <div>
                        <h1 className='text-2xl font-semibold text-primary mb-3'>Personal Information</h1>

                        <div className='flex flex-col items-center'>
                            <PhotoUpload
                                profilePhoto={profilePhoto}
                                setProfilePhoto={setProfilePhoto}
                                register={register}
                                setValue={setValue}
                                setError={setError}
                                isRemoveUrl={true}
                            />
                            {errors.profileImg && <p className='text-red-500 text-sm mb-3'>{errors.profileImg.message}</p>}
                        </div>

                        <div className='flex flex-col gap-y-5'>
                            {/* Name Section */}
                            <div className='flex flex-col md:flex-row gap-5'>
                                <div className='w-full'>
                                    <label htmlFor="first-name" className='font-semibold text-primary'>First Name</label>
                                    <Input
                                        {...register('name.firstName', {
                                            required: "First name is required"
                                        })}
                                        type="text" id='first-name' placeholder="Enter your first name" className='xl:h-12 mt-1'
                                    />
                                    {errors?.name?.firstName && <p className='text-red-500 text-sm mt-1'>{errors?.name?.firstName?.message}</p>}
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="last-name" className='font-semibold text-primary'>Last Name</label>
                                    <Input
                                        {...register('name.lastName', {
                                            required: "Last name is required"
                                        })}
                                        type="text" id="last-name" placeholder="Enter your last name" className='xl:h-12 mt-1'
                                    />
                                    {errors?.name?.lastName && <p className='text-red-500 text-sm mt-1'>{errors?.name?.lastName?.message}</p>}
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className='flex flex-col md:flex-row gap-5'>
                                <div className='w-full'>
                                    <label htmlFor="email" className='font-semibold text-primary'>Email</label>
                                    <Input
                                        {...register('email', {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        type="email" id='email' placeholder="Enter your email" className='xl:h-12 mt-1'
                                    />
                                    {errors?.email && <p className='text-red-500 text-sm mt-1'>{errors?.email?.message}</p>}
                                </div>

                                {/* Phone */}
                                <div className='w-full'>
                                    <label htmlFor="phone" className='font-semibold text-primary'>Phone</label>
                                    <Input
                                        {...register('phone', {
                                            required: "Phone number is required",
                                            maxLength: {
                                                value: 10,
                                                message: "Phone number must be 10 digits"
                                            },
                                            minLength: {
                                                value: 10,
                                                message: "Phone number must be 10 digits"
                                            }
                                        })
                                        }
                                        type="number" id='phone' placeholder="Enter your phone number" className='xl:h-12 mt-1'
                                    />
                                    {errors?.phone && <p className='text-red-500 text-sm mt-1'>{errors?.phone?.message}</p>}
                                </div>
                            </div>

                            {/* Gender */}
                            <div className='w-full'>
                                <label className="font-semibold text-primary">Gender</label>
                                <Controller
                                    name="gender"
                                    control={control}
                                    rules={{ required: "Gender is required" }}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value || ''}>
                                            <SelectTrigger id='gender' className="xl:h-12 mt-1">
                                                <SelectValue className="placeholder:text-[#00000012]" placeholder="Select Gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    genderOptions.map((gender, i) => (
                                                        <SelectItem key={i} value={gender.toLowerCase()}>
                                                            {gender}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                                {errors?.gender && <p className='text-red-500 text-sm mt-1'>{errors?.gender?.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* License Information */}
                    <div className="mt-5">
                        <h1 className='text-2xl font-semibold text-primary mb-3'>Local License</h1>

                        <div className='flex flex-col md:flex-row gap-5'>
                            <div className='w-full'>
                                <label htmlFor="local-license" className='font-semibold text-primary'>Local License No.</label>
                                <Input
                                    {...register('localLicense.licenseNumber', {
                                        required: "Local license number is required"
                                    })}
                                    type="text" id='local-license' className='xl:h-12 mt-1'
                                    placeholder='Enter License No.'
                                />
                                {errors?.localLicense?.licenseNumber && <p className='text-red-500 text-sm mt-1'>{errors?.localLicense?.licenseNumber?.message}</p>}
                            </div>
                            <div className='w-full'>
                                <label htmlFor="issue-date" className='font-semibold text-primary'>Issue Date</label>
                                <Input
                                    {...register('localLicense.issueDate', {
                                        required: "Issue date is required"
                                    })}
                                    type="date" id='issue-date' className='xl:h-12 mt-1'
                                />
                                {errors?.localLicense?.issueDate && <p className='text-red-500 text-sm mt-1'>{errors?.localLicense?.issueDate?.message}</p>}
                            </div>
                            <div className='w-full'>
                                <label htmlFor="expire-date" className='font-semibold text-primary'>Expire Date</label>
                                <Input
                                    {...register('localLicense.expiryDate', {
                                        required: "Expiry date is required"
                                    })}
                                    type="date" id='expire-date' className='xl:h-12 mt-1'
                                />
                                {errors?.localLicense?.expiryDate && <p className='text-red-500 text-sm mt-1'>{errors?.localLicense?.expiryDate?.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Overseas Experience */}
                    {/* <div className="mt-5">
                        <h1 className='text-2xl font-semibold text-primary mb-3'>Overseas Experience (If Applicable)</h1>
                        <div className='flex flex-col md:flex-row gap-5'>
                            <div className='w-full'>
                                <label htmlFor="overseas-country" className='font-semibold text-primary'>Country Name</label>
                                <Input
                                    {...register('overseasExperience.countryName')}
                                    type="text" id='overseas-country' placeholder="Enter overseas country name" className='xl:h-12 mt-1'
                                />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="overseas-license" className='font-semibold text-primary'>Overseas License No.</label>
                                <Input
                                    {...register('overseasExperience.licenseNumber')}
                                    type="text" id='overseas-license' placeholder="Enter overseas license No." className='xl:h-12 mt-1'
                                />
                            </div>
                        </div>
                    </div> */}

                    {/* <div className='flex flex-col md:flex-row gap-5'>
                        <div className='w-full'>
                            <label htmlFor="issue-date" className='font-semibold text-primary'>Issue Date</label>
                            <Input
                                {...register('overseasExperience.issueDate')}
                                type="date" id='issue-date' className='xl:h-12 mt-1'
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="expire-date" className='font-semibold text-primary'>Expiry Date</label>
                            <Input
                                {...register('overseasExperience.expiryDate')}
                                type="date" id='expire-date' className='xl:h-12 mt-1'
                            />
                        </div>
                    </div> */}

                    {/* Previous Learning Experience */}
                    {/* <div className="mt-5">
                        <h1 className='text-2xl font-semibold text-primary mb-3'>Previous Learning Experience (If Applicable)</h1>
                        <div className='flex flex-col md:flex-row gap-5'>
                            <div className='w-full'>
                                <label htmlFor="driving-school" className='font-semibold text-primary'>Previous Driving School</label>
                                <Input
                                    {...register('previousLearningExperience.schoolName')}
                                    type="text" id='driving-school' placeholder="Enter previous driving school name" className='xl:h-12 mt-1'
                                />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="total-hours" className='font-semibold text-primary'>Total Driving Hours</label>
                                <Input
                                    {...register('previousLearningExperience.totalLessons')}
                                    type="number" id='total-hours' placeholder="Enter total driving hours" className='xl:h-12 mt-1'
                                />
                            </div>
                        </div>
                    </div> */}

                    {/* Password Section */}
                    <div className="mt-5">
                        <h1 className='text-2xl font-semibold text-primary mb-3'>Security</h1>
                        <div className='flex flex-col md:flex-row gap-5 mb-5'>
                            <div className='w-full'>
                                <label htmlFor="password" className='font-semibold text-primary'>Password</label>
                                <div className='w-full relative flex'>
                                    <Input
                                        {...register('password', {
                                            minLength: {
                                                message: "Password must be at least 6 characters", value: 6
                                            },
                                            required: "Password is required"
                                        })}
                                        type={passwordVisible ? "text" : "password"}
                                        id='password'
                                        placeholder="Enter your password"
                                        className='w-full xl:h-12 mt-1 pr-10'
                                    />
                                    <span
                                        className='cursor-pointer absolute right-2 top-1/2 -translate-y-1/2'
                                        onClick={() => handlePasswordToggle('password')}
                                    >
                                        {passwordVisible ? <Eye width={20} height={20} /> : <EyeClosed width={20} height={20} />}
                                    </span>
                                </div>
                                {errors?.password && <p className='text-red-500 text-sm mt-1'>{errors?.password?.message}</p>}
                            </div>

                            <div className='w-full'>
                                <label htmlFor="confirm-password" className='font-semibold text-primary'>Confirm Password</label>
                                <div className='w-full relative flex'>
                                    <Input
                                        {...register('confirmPassword', {
                                            minLength: {
                                                message: "Password must be at least 6 characters", value: 6
                                            },
                                            required: "Confirm Password is required"
                                        })}
                                        type={confirmPasswordVisible ? "text" : "password"}
                                        id='confirm-password'
                                        placeholder="Re-type your password"
                                        className='w-full xl:h-12 mt-1 pr-10'
                                    />
                                    <span
                                        className='cursor-pointer absolute right-2 top-1/2 -translate-y-1/2'
                                        onClick={() => handlePasswordToggle('confirm-password')}
                                    >
                                        {confirmPasswordVisible ? <Eye width={20} height={20} /> : <EyeClosed width={20} height={20} />}
                                    </span>
                                </div>
                                {errors?.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>}
                                {confirmPasswordError && <p className='text-red-500 text-sm mt-1'>{confirmPasswordError}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Button disabled={isRegistering} className='w-full mt-3 gradient-color h-12'>Register</Button>

            <p className='mt-5'>Already have an account? <Link href="/login" className='text-blue-500 hover:underline font-semibold'>Login Here</Link></p>
        </form>
    );
};

export default RegisterForm;