import type { NextPage } from 'next'
import Layout from '@components/Common/Layout';
import Item from '@components/Items/Item';
import ProductListItems from '@components/Items/ProductListItems';

const Loved: NextPage = () => { 
    return (
        <Layout canGoBack>
            <ProductListItems kind='Fav' />
        </Layout>
    )
}

export default Loved;