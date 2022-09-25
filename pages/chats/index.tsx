import type { NextPage } from 'next'

const Chats: NextPage = () => { 

    return (
        <div className='py-10 divide-y-2'>
            <div className='flex mb-5 py-3 items-center space-x-3 px-4'>
                <div className='w-10 h-10 rounded-full bg-slate-300'/>
                <div>
                    <p className='text-gray-700'>Steve Jebs</p>
                    <p className='text-xs text-gray-500'>See you tomorrow in the conrner at 2pm</p>
                </div>
            </div>
        </div>
    )
}

export default Chats