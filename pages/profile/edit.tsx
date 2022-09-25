import type { NextPage } from 'next'
import Layout from '../../components/Layout';

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
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <div className="mt-1">
                            <input id="email" type="email"
                                className="appearance-none w-full px-3 py-2 border
                                border-gray-300 shadow-sm rounded-md placeholder-gray-400 
                                focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                required />
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <div className="flex rounded-sm shadow-sm">
                            <span className="flex items-center justify-center px-3 rounded-l-md 
                                border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none">+82</span>
                            <input id="input" className="appearance-none w-full px-3 py-2 border
                            border-gray-300 shadow-sm rounded-md rounded-l-none placeholder-gray-400 
                            focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                                type="number"
                                required />
                        </div>
                    </div>
                    <button className="mt-6 bg-orange-500 hover:bg-orange-600 
                        text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
                        focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none w-full" >
                        Update Profile
                    </button>
                </form>
            </div>
        </Layout>
        
    )
}

export default ProfileEdit;