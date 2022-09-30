import type { NextPage } from 'next'
import AddBtn from '@components/Icon/AddBtn';
import CommunityItem from '@components/Items/CommunityItem';
import Layout from '@components/Common/Layout';
import useSWR from 'swr';
import { Post, User } from '@prisma/client';

interface PostWithUser extends Post {
    user: User,
    _count: {
        answers: number;
        wondering: number;
    }
}

interface PostsResponse {
    ok: boolean;
    posts: PostWithUser[]
}

const Community: NextPage = () => { 

    const { data } = useSWR<PostsResponse>(`/api/posts`);

    console.log(data);
    

    return (
        <Layout title='동내생활' hasTabBar>
            <div className='py-16 px-4 space-y-8'>
                {data?.posts.map((post) => (
                    <CommunityItem
                        key={post.id}
                        Question={post?.question}
                        Name={post.user.name}
                        Answer={post._count.answers}
                        Attention={post._count.wondering}
                        Time="12 일전"
                        id={post.id}
                    />
                ))}
                <AddBtn IconD='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
            </div>
        </Layout>
    )
}

export default Community;