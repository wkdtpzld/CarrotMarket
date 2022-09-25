import type { NextPage } from 'next'
import Layout from '../../components/Layout'

const Chats: NextPage = () => { 

    return (
        <Layout title='채팅' hasTabBar>
            <div className='py-10 divide-y-2'>
                <div className='flex mb-5 py-3 items-center space-x-3 px-4'>
                    <div className='w-10 h-10 rounded-full bg-slate-300'/>
                    <div>
                        <p className='text-gray-700'>Steve Jebs</p>
                        <p className='text-xs text-gray-500'>See you tomorrow in the conrner at 2pm</p>
                    </div>
                </div>
            </div>
        </Layout>
        
    )
}

export default Chats