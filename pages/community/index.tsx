import type { NextPage } from 'next'
import AddBtn from '@components/Icon/AddBtn';
import CommunityItem from '@components/Items/CommunityItem';
import Layout from '@components/Common/Layout';

const Community: NextPage = () => { 

    return (
        <Layout title='동내생활' hasTabBar>
            <div className='py-16 px-4 space-y-8'>
                {[1, 2, 3, 4, 5, 6].map((_, i) => (
                    <CommunityItem
                        key={i}
                        Question='What is the best mandu restaurant?'
                        Name='김기태'
                        Answer={1}
                        Attention={2}
                        Time="12 일전"
                    />
                ))}
                <AddBtn IconD='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
            </div>
        </Layout>
        
    )
}

export default Community;