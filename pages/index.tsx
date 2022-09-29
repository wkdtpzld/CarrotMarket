import type { NextPage } from 'next'
import AddBtn from '@components/Icon/AddBtn';
import Item from '@components/Items/Item';
import Layout from '@components/Common/Layout';
import useUser from '../libs/client/useUser';
import Head from 'next/head';

const Home: NextPage = () => {

  const { user, isLoading } = useUser();
  
  console.log(user);
  

  return (
    <Layout title='홈' hasTabBar>
      <Head>
        <title>Home</title>
      </Head>
      <div className='flex px-4 flex-col divide-y-2'>
        {[1, 1, 1].map((_, i) => (
          <Item
            key={i}
            Name='name'
            Category='category'
            Price={30}
            Like={1}
            ChatCount={2} />
        ))}
        <AddBtn IconD='M12 6v6m0 0v6m0-6h6m-6 0H6' />
      </div>
    </Layout>
  )
}

export default Home;