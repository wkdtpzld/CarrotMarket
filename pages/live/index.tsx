import type { NextPage } from 'next'
import AddBtn from '../../components/Icon/AddBtn';
import StreamItem from '../../components/Items/StreamItem';
import Layout from '../../components/Common/Layout';

const Live: NextPage = () => { 

    return (
        <Layout title='Live' hasTabBar>
            <div className='py-10 divide-y-2 space-y-4'>
                {[1, 1, 1, 1, 1, 1].map((_, i) => ( 
                    <StreamItem
                        key={i}
                        Name='아이템 소개 스트리밍'
                    />
                ))}
                <AddBtn IconD='M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z' />
            </div>
        </Layout>
    )
}

export default Live