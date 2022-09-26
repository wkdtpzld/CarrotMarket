import type { NextPage } from 'next'
import InputSubmitBtn from '../../components/Form/InputSubmitBtn';
import MySideChatItem from '../../components/Items/MySideChatItem';
import OppositeCahtItem from '../../components/Items/OppositeChatItem';
import Layout from '../../components/Common/Layout';

const chatDetail: NextPage = () => {
    
    return (
        <Layout canGoBack>
            <div className='px-4 py-10 space-y-4'>
                <OppositeCahtItem
                    Message='Hi'
                />
                <MySideChatItem
                    Message='Oh Hi'
                />
                <OppositeCahtItem
                    Message='FU'
                />
                <InputSubmitBtn />
            </div>
        </Layout>
    )
}

export default chatDetail;