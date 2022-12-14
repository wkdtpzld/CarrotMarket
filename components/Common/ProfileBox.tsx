import { ImageURL } from '@libs/client/utils';
import Image from 'next/image';
import Link from 'next/link';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

interface IProps {
    Name: string;
    isMine: boolean;
    id: number;
    imageId?: string;
}

const ProfileBox = ({ Name, isMine, id, imageId }: IProps) => {
  const onErrorHandler = (ev: any) => {
    ev.target.style = "display: none";
  };

  return (
    <Link href={!isMine ? `/profile/${id + ""}` : `/profile/edit`}>
      <a className="flex space-x-4 items-center w-60">
        <div className='w-16 h-16 bg-slate-300 rounded-full'>
          <Image
            src={imageId!}
            className="flex space-x-4 items-center w-60 rounded-full"
            width={64}
            height={64}
            alt={Name}
            onError={onErrorHandler}
          />
        </div>
        <div className="flex flex-col">
          {!Name ? (
            <Skeleton />
          ) : (
            <span className="font-medium text-gray-800">{Name}</span>
          )}
          <span className="text-sm text-gray-700">
            {isMine ? `Edit profile →` : "View profile →"}
          </span>
        </div>
      </a>
    </Link>
  );
}

export default ProfileBox;