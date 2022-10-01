import type { NextPage } from 'next'
import ProductListItems from '@components/Items/ProductListItems';
import Layout from '@components/Common/Layout';

const Sold: NextPage = () => { 
    
    return (
        <Layout canGoBack>
            <ProductListItems kind='Sale' />
        </Layout>
    )
}

export default Sold;