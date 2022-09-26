import type { NextPage } from 'next'
import InputSubmitBtn from '../../components/Form/InputSubmitBtn';
import Layout from '../../components/Common/Layout';
import ChattingBubble from '../../components/Items/ChattingBubble';

const chatDetail: NextPage = () => {
    
    return (
        <Layout canGoBack>
            <div className='px-4 py-10 space-y-4'>
                <ChattingBubble
                    type='opposite'
                    Message='hello'
                />
                <ChattingBubble
                    type='inside'
                    Message='hi'
                />
                <InputSubmitBtn />
            </div>
        </Layout>
    )
}

export default chatDetail;