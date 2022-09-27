import type { NextPage } from 'next'
import InputSubmitBtn from '@components/Form/InputSubmitBtn';

import Layout from '@components/Common/Layout';
import ChattingBubble from '@components/Items/ChattingBubble';

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
                    <ChattingBubble
                        Message='hi'
                        type='opposite'
                    />
                    <ChattingBubble
                        Message='hello'
                        type='inside'
                    />
                </div>
                <InputSubmitBtn />
            </div>
        </Layout>
    )
}

export default LiveDetail;