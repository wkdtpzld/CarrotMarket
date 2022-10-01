import type { NextPage } from 'next'
import Layout from '@components/Common/Layout';
import NormalInput from '@components/Form/NormalInput';
import SubmitBtn from '@components/Form/SubmitBtn';
import { useForm } from 'react-hook-form';
import useUser from '../../libs/client/useUser';
import { useEffect } from 'react';
import useMutation from '../../libs/client/useMutation';

interface EditProfileForm {
    email?: string;
    phone?: string;
    name?: string;
    formErrors?: string;
    
}

interface EditProfileResponse {
    ok: boolean;
    error?: string;
}

const ProfileEdit: NextPage = () => { 

    const [editProfile, { data, loading }] = useMutation<EditProfileResponse>(`/api/users/me`);

    const { register, handleSubmit, setValue, setError, formState: {errors}, clearErrors } = useForm<EditProfileForm>();
    const { user } = useUser();
    const onValid = ({ email, phone, name }: EditProfileForm) => {
        if (email === '' && phone === '' && name === '') {
            return setError("formErrors", {
                message: "아무런 입력이 감지되지 않았습니다."
            })
        };

        editProfile({
            email,
            phone,
            name
        });
    };

    useEffect(() => {
        if (user?.name) setValue("name", user.name)
        if (user?.email) setValue("email", user.email);
        if (user?.phone) setValue("phone", user.phone);
    }, [user, setValue]);

    useEffect(() => {
        if (data && !data.ok && data.error) {
            setError("formErrors", { message: data.error })
        }
    }, [data, setError]);

    return (
        <Layout canGoBack>
            <div className='px-4 py-10'>
                <form className="space-y-4" onSubmit={handleSubmit(onValid)} onClick={() => clearErrors()}>
                    <div className='flex items-center space-x-3'>
                        <div className='w-14 h-14 rounded-full bg-slate-300' />
                        <label htmlFor='picture' className='cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium
                            focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700'>
                            Change Photo
                            <input id='picture' type="file" className='hidden' accept='image/*' />
                        </label>
                    </div>
                    <div className='space-y-2'>
                        <NormalInput
                            type='text'
                            kind="email"
                            Name='name'
                            Label='Nickname'
                            register={register("name", {
                                minLength: {
                                    value: 5,
                                    message: "닉네임은 최소 5글자 입니다."
                                }
                            })}
                            error={errors.name}
                            required={false}
                        />
                    </div>
                    <div className='space-y-2'>
                        <NormalInput
                            type='text'
                            kind="email"
                            Name='email'
                            Label='Email Address'
                            register={register("email", {
                                pattern: {
                                    value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                                    message: "올바른 이메일 주소가 아닙니다. 다시한번 확인해 주세요."
                                }
                            })}
                            error={errors.email}
                            required={false}
                        />
                    </div>
                    <div className='space-y-2'>
                        <NormalInput
                            type='number'
                            kind='phone'
                            register={register("phone", {
                                pattern: {
                                    value: /^\d{10}$/,
                                    message: "휴대폰 번호를 제대로 입력해 주세요"
                                }
                            })}
                            required={false}
                            Label='Phone Number'
                            Name='phone'
                            error={errors.phone}
                        />
                    </div>
                    <div className='text-center'>
                        {errors.formErrors
                            ?
                            <span className='text-sm text-red-600 font-bold'>
                                {errors.formErrors.message}
                            </span>
                            : null
                        }
                    </div>
                    <SubmitBtn
                        Content={loading ? "Loading" : "Update Profile"}
                    />
                </form>
            </div>
        </Layout>
        
    )
}

export default ProfileEdit;