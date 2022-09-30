import Link from 'next/link';
import { useRouter } from 'next/router';
import { cls } from '../../libs/client/utils';
import { motion } from 'framer-motion';

interface IProps {
    to: string;
    IconD: string;
    title: string;
    router: string;
}

const TabBarMenu = ({to, IconD, title, router}:IProps) => {

    const Trouter = useRouter();

    return (
        <Link href={to}>
            <a className='flex flex-col items-center space-y-2 relative' >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                    className={cls("w-6 h-6", router === Trouter.pathname ? "text-orange-400" : "")}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={IconD} />
                </svg>
                <span className={cls("text-sm", router === Trouter.pathname ? "text-orange-400" : "")}>
                    {title}
                </span>
                {router === Trouter.pathname
                    ?
                    <motion.div
                        layoutId='tabBar'
                        className='absolute border-b-2 border-orange-500 w-full flex top-12 '>
                    </motion.div>
                :   null
                }
            </a>
        </Link>
    )
}

export default TabBarMenu;