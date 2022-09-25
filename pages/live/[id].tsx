import type { NextPage } from 'next'
import Layout from '../../components/Layout';

const LiveDetail: NextPage = () => { 

    return (
        <Layout canGoBack>
            <div className='py-10 space-y-4'>
                <div className="pt-4 px-4">
                    <div className='bg-slate-300 aspect-video rounded-md ' />
                    <h3 className='text-gray-800 font-semibold text-center text-2xl mt-2'>
                        Let`s try potatos
                    </h3>
                </div>
                <div className='py-10 space-y-4 h-[50vh] pb-16 overflow-y-scroll'>
                    <div className='flex items-start space-x-2'>
                        <div className='w-8 h-8 rounded-full bg-slate-300' />
                        <div className='w-1/2 text-sm text-gray-700 p-2 border rounded-md
                            border-gray-400'>
                            <p>Hi how much are you selling that fucking answer my question</p>
                        </div>
                    </div>
                    <div className='flex flex-row-reverse items-start space-x-2 space-x-reverse px-4'>
                        <div className='w-8 h-8 rounded-full bg-slate-300' />
                        <div className='w-1/2 text-sm text-gray-700 p-2 border rounded-md
                            border-gray-400'>
                            <p>what? are you crazy? i`m reporting you </p>
                        </div>
                    </div>
                    <div className='flex items-start space-x-2'>
                        <div className='w-8 h-8 rounded-full bg-slate-300' />
                        <div className='w-1/2 text-sm text-gray-700 p-2 border rounded-md
                            border-gray-400'>
                            <p>Hi how much are you selling that fucking answer my question</p>
                        </div>
                    </div>
                    <div className='flex flex-row-reverse items-start space-x-2 space-x-reverse px-4'>
                        <div className='w-8 h-8 rounded-full bg-slate-300' />
                        <div className='w-1/2 text-sm text-gray-700 p-2 border rounded-md
                            border-gray-400'>
                            <p>what? are you crazy? i`m reporting you </p>
                        </div>
                    </div>
                    <div className='flex items-start space-x-2'>
                        <div className='w-8 h-8 rounded-full bg-slate-300' />
                        <div className='w-1/2 text-sm text-gray-700 p-2 border rounded-md
                            border-gray-400'>
                            <p>Hi how much are you selling that fucking answer my question</p>
                        </div>
                    </div>
                    <div className='flex flex-row-reverse items-start space-x-2 space-x-reverse px-4'>
                        <div className='w-8 h-8 rounded-full bg-slate-300' />
                        <div className='w-1/2 text-sm text-gray-700 p-2 border rounded-md
                            border-gray-400'>
                            <p>what? are you crazy? i`m reporting you </p>
                        </div>
                    </div>
                    <div className='flex items-start space-x-2'>
                        <div className='w-8 h-8 rounded-full bg-slate-300' />
                        <div className='w-1/2 text-sm text-gray-700 p-2 border rounded-md
                            border-gray-400'>
                            <p>Hi how much are you selling that fucking answer my question</p>
                        </div>
                    </div>
                    <div className='flex flex-row-reverse items-start space-x-2 space-x-reverse px-4'>
                        <div className='w-8 h-8 rounded-full bg-slate-300' />
                        <div className='w-1/2 text-sm text-gray-700 p-2 border rounded-md
                            border-gray-400'>
                            <p>what? are you crazy? i`m reporting you </p>
                        </div>
                    </div>
                </div>
                <div className='fixed w-full mx-auto max-w-md bottom-3 inset-x-0'>
                    <div className='flex items-center relative'>
                        <input type="text" className='shadow-sm rounded-full w-full border-gray-300
                            focus:ring-orange-500 focus:outline-none focus:border-orange-500 pr-12'/>
                        <div className='absolute inset-y-0 flex py-1.5 pr-1.5 right-0'>
                            <button className='flex items-center bg-orange-500 rounded-full px-3 text-sm text-white
                                hover:bg-orange-600 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'>
                                &rarr;</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default LiveDetail;