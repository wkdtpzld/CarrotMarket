import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { User } from '@prisma/client';

interface ProfileResponse {
    ok: boolean
    profile: User
}

export default function useUser() {

    const {data, error} = useSWR<ProfileResponse>("/api/users/me");

    const router = useRouter();

    useEffect(() => {
        if (data && !data.ok) {
            router.replace("/enter");
        }
    }, [data, router]);

    if (data && data.ok && router.pathname === "/enter") {
        router.replace("/profile");
    }

    return {
        user: data?.profile,
        isLoading: !data && !error 
    }
}