import type { NextPage } from 'next'
import Layout from '../../components/Common/Layout';
import SubmitBtn from '../../components/Form/SubmitBtn';
import TextArea from '../../components/Form/TextArea';
import NormalInput from '../../components/Form/NormalInput';
import PricingInput from '../../components/Form/PricingInput';

const Create: NextPage = () => { 

    return (
        <Layout canGoBack>
            <div className='px-4 py-4 space-y-4'>
                <div>
                    <NormalInput
                        type='text'
                        Name='Name'
                        Label='name'
                    />
                </div>
                <div>
                    <PricingInput />
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