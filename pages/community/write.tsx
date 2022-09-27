import type { NextPage } from 'next'
import Layout from '@components/Common/Layout';
import SubmitBtn from '@components/Form/SubmitBtn';
import TextArea from '@components/Form/TextArea';

const WriteCommunity: NextPage = () => { 

    return (
        <Layout canGoBack>
            <form className='px-4 py-10'>
                <TextArea
                    Placeholder='Input your question'
                />
                <SubmitBtn
                    Content='Submit'
                />
            </form>
        </Layout>
    )
}

export default WriteCommunity;