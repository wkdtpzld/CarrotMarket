import type { NextPage } from 'next'
import CommentItem from '../../components/Items/CommentItem';
import Layout from '../../components/Common/Layout';
import ProfileBox from '../../components/Common/ProfileBox';
import SubmitBtn from '../../components/Form/SubmitBtn';
import TextArea from '../../components/Form/TextArea';
import CommunityItemIcon from '../../components/Items/CommunityItemIcon';

const CommunityDetail: NextPage = () => { 
    return (
        <Layout canGoBack>
            <div className=''>
                <span className='inline-flex my-3 ml-4 items-center px-4 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800'
                    >동네질문</span>
                <div className='flex mb-5 py-3 border-t border-b items-center space-x-3 px-4'>
                    <ProfileBox
                        Name='김기태'
                        isMine={false}
                    />
                </div>
                <div className='px-4'>
                    <div className='mt-2 text-gray-700'>
                        <span className='text-orange-500 font-medium'>Q.</span> What is the best mandu restaurant?
                    </div>
                </div>
                <CommunityItemIcon
                    Answer={1}
                    Attention={2}
                />
                <CommentItem
                    Name='김기태'
                    Date='12 시간 전'
                    Comment='김기태가 산적질을 어쩌구저쩌구'
                />
                <div className='px-4'>
                    <TextArea
                        Placeholder='Answer this question'
                    />
                    <SubmitBtn
                        Content='Reply'
                    />
                </div>
            </div>
        </Layout>
        
    )
}

export default CommunityDetail;