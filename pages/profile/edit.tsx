import type { NextPage } from 'next'
import Layout from '@components/Common/Layout';
import NormalInput from '@components/Form/NormalInput';
import SubmitBtn from '@components/Form/SubmitBtn';

const ProfileEdit: NextPage = () => { 

    return (
        <Layout canGoBack>
            <div className='px-4 py-10'>
                <form className="space-y-4">
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
                            type='email'
                            Name='Email Address'
                            Label='email'
                        />
                    </div>
                    <div className='space-y-2'>
                        <NormalInput
                            type='phone'
                            Label='phone'
                            Name='Phone Number'
                        />
                    </div>
                    <SubmitBtn
                        Content='Update Profile'
                    />
                </form>
            </div>
        </Layout>
        
    )
}

export default ProfileEdit;