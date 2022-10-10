import type { NextPage, NextPageContext } from 'next'
import Layout from '@components/Common/Layout';
import ProfileBox from '@components/Common/ProfileBox';
import ProfileMenu from '@components/Common/Profilemenu';
import useUser from '@libs/client/useUser';
import useSWR, { SWRConfig } from 'swr';
import { Review, User } from '@prisma/client';
import ReviewsItem from '@components/Items/ReviewsItem';
import Link from 'next/link';
import { withSsrSession } from '@libs/server/withSession';
import client from '@libs/server/client';

interface ReviewWithUser extends Review {
    createdBy: User
}

interface ReviewsResponse {
    ok: boolean;
    reviews: ReviewWithUser[]
}

const Profile: NextPage = () => { 

    const { user, isLoading } = useUser();
    const { data } = useSWR<ReviewsResponse>(`api/reviews`);

    return (
        <Layout title='프로필' hasTabBar>
            <div className="py-10 px-4">
                <ProfileBox
                    Name={user?.name!}
                    isMine
                    id={user?.id!}
                    imageId={user?.avator!}
                />
                <div className='mt-10 flex justify-around'>
                    <Link href='/profile/sold'>
                        <a>
                            <ProfileMenu
                                title="판매내역"
                                IconD='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' />
                        </a>
                    </Link>
                    <Link href="/profile/bought">
                        <a>
                            <ProfileMenu
                                title="구매내역"
                                IconD='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                            />
                        </a>
                    </Link>
                    <Link href="/profile/loved">
                        <a>
                            <ProfileMenu
                                title="관심목록"
                                IconD='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                            />
                        </a>
                    </Link>
                </div>
                <div className='mt-12'>
                    {data?.reviews?.map(item => (
                        <>
                            <ReviewsItem
                                key={item.id}
                                name={item.createdBy.name}
                                score={item.score}
                                review={item.review}
                            />
                        </>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

const Page: NextPage<{profile:User, ok:boolean}> = ({profile, ok}) => {
    return (
        <SWRConfig
            value={{
                fallback: {
                    "/api/users/me": {
                        profile,
                        ok
                    }
                }
            }}
        >
            <Profile />
        </SWRConfig>
    )
}

export const getServerSideProps = withSsrSession(async function (
    {req}: NextPageContext
) {
    const profile = await client.user.findUnique({
        where: {
            id: req?.session.user?.id
        }
    });
    return {
        props: {
            profile: JSON.parse(JSON.stringify(profile)),
            ok: true
        }
    }
})

export default Page