import type { NextPage } from 'next'
import Layout from '@components/Common/Layout';
import ProfileBox from '@components/Common/ProfileBox';
import ProfileMenu from '@components/Common/Profilemenu';
import Star from '@components/Icon/Star';
import { StarType } from '../../libs/client/utils';

const Profile: NextPage = () => { 

    return (
        <Layout title='프로필' hasTabBar>
            <div className="py-10 px-4">
                <ProfileBox
                    Name="김기태"
                    isMine
                />
                <div className='mt-10 flex justify-around'>
                    <ProfileMenu
                        title="판매내역"
                        IconD='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' />
                    <ProfileMenu
                        title="구매내역"
                        IconD='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                    />
                    <ProfileMenu
                        title="관심목록"
                        IconD='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                    />
                </div>
                <div className='mt-12'>
                    <div className='flex items-center space-x-4'>
                        <div className='w-12 h-12 rounded-full bg-slate-300'/>
                        <div>
                            <h4 className='text-sm font-bold text-gray-800'>김기태</h4>
                            <div className='flex items-center'>
                                <Star type={StarType.Fill} />
                                <Star type={StarType.Fill} />
                                <Star type={StarType.Fill} />
                                <Star type={StarType.Fill} />
                                <Star type={StarType.Empty} />
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 text-gray-600 text-[15px]'>
                        <p>
                        Normally, both your asses would be dead as fucking fried chicken,
                        but you happen to pull this shit while I&apos;m in a transitional
                        period so I don&apos;t wanna kill you, I wanna help you. But I
                        can&apos;t give you this case, it don&apos;t belong to me. Besides,
                        I&apos;ve already been through too much shit this morning over this
                        case to hand it over to your dumb ass.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile