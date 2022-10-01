import type { NextPage } from 'next'
import Item from '@components/Items/Item';
import Layout from '@components/Common/Layout';
import ProductListItems from '../../components/Items/ProductListItems';

const Bought: NextPage = () => { 
    return (
        <Layout canGoBack>
            <ProductListItems kind='Purchase' />
        </Layout>
    )
}

export default Bought;