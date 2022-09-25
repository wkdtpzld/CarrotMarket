import type { NextPage } from 'next'
import Layout from '../../components/Layout';

const Create: NextPage = () => { 

    return (
        <Layout canGoBack>
            <div className='px-4 py-16 space-y-4'>
                <div>
                    <label htmlFor='Name' className='text-sm font-medium text-gray-700'>Name</label>
                    <div className='rounded-md shadow-sm relative flex items-center '>
                        <div className='absolute left-0 pl-3 flex items-center justify-center pointer-events-none'>
                            <span className='text-gray-500 text-sm'>$</span>
                        </div>
                        <input id='Name' type="text" placeholder="0.00"
                            className='appearance-none w-full px-3 py-2 pl-7 border
                                border-gray-300 shadow-sm rounded-md placeholder-gray-400 
                                focus:outline-none focus:ring-orange-500 focus:border-orange-500'/>
                        <div className='absolute right-0 pr-3 flex items-center pointer-events-none'>
                            <span>USD</span>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor='price' className='text-sm font-medium text-gray-700'>Price</label>
                    <div className='rounded-md shadow-sm relative flex items-center '>
                        <div className='absolute left-0 pl-3 flex items-center justify-center pointer-events-none'>
                            <span className='text-gray-500 text-sm'>$</span>
                        </div>
                        <input id='price' type="text" placeholder="0.00"
                            className='appearance-none w-full px-3 py-2 pl-7 border
                                border-gray-300 shadow-sm rounded-md placeholder-gray-400 
                                focus:outline-none focus:ring-orange-500 focus:border-orange-500'/>
                        <div className='absolute right-0 pr-3 flex items-center pointer-events-none'>
                            <span>USD</span>
                        </div>
                    </div>
                </div>
                <div>
                    <label className='text-sm font-medium text-gray-700'>Description</label>
                    <div>
                        <textarea rows={4} className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md
                            border-gray-300 focus:border-orange-500" />
                    </div>
                </div>
                <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 
                        text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
                        focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">Go Live</button>
            </div>
        </Layout>
    )
}

export default Create; 