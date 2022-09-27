import { useState } from 'react';
import axios from 'axios';


interface UseMutationState {
    loading: boolean;
    data?: object;
    error?: object;
}

type UseMutationResult = [(data: any) => void, UseMutationState];

export default function useMutation(url: string): UseMutationResult{

    const [state, setState] = useState({
        loading: false,
        data: undefined,
        error: undefined
    })
    

    function mutation(data: any) {
        setState((prev) => ({...prev, loading: true}))
        axios.post(url, data, {
            headers: { "Content-Type": "application/json" }
        })
            .then((response) => setState((prev) => ({...prev, data: response.data})))
            .catch((error) => setState((prev) => ({...prev, error})))
            .finally(() => setState((prev) => ({...prev, loading: false})));
    }

    return [mutation, { ...state}];
}