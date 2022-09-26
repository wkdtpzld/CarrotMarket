import type { NextPage } from 'next'
import Layout from '../../components/Common/Layout';
import SubmitBtn from '../../components/Form/SubmitBtn';
import TextArea from '../../components/Form/TextArea';
import NormalInput from '../../components/Form/NormalInput';

const Create: NextPage = () => { 

    return (
        <Layout canGoBack>
            <div className='px-4 py-4 space-y-4'>
                <div>
                    <NormalInput
                        type='email'
                        Name='Name'
                        Label='name'
                    />
                </div>
                <div>
                    <NormalInput
                        type='price'
                        Name='Price'
                        Label='Price'
                    />
                </div>
                <TextArea
                    Placeholder='introduce your item'
                    Name='Description'
                />
                <SubmitBtn
                    Content='Go Live'
                />
            </div>
        </Layout>
    )
}

export default Create; 