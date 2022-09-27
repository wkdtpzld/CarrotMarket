import type { NextPage } from 'next'
import Layout from '@components/Common/Layout';
import Item from '@components/Items/Item';

const Sold: NextPage = () => { 
    return (
        <Layout hasTabBar canGoBack>
            <div className='flex px-4 flex-col space-y-5 py-10'>
            {[1, 1, 1].map((_, i) => (
            <Item
                key={i}
                Name="New Item"
                Category='category'
                Price={4}
                Like={1}
                ChatCount={3}
            />
            ))}
            </div>
        </Layout>
    )
}

export default Sold;