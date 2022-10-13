import { useState } from 'react';
import axios from 'axios';


interface UseMutationState<T> {
    loading: boolean;
    data?: T;
    error?: object;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(url: string, method: string): UseMutationResult<T>{

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

    function deleteMutation(data: any) {
        setState((prev) => ({...prev, loading: true}))
        axios.delete(url, {
            data,
            headers: { "Content-Type": "application/json" }
        })
            .then((response) => setState((prev) => ({...prev, data: response.data})))
            .catch((error) => setState((prev) => ({...prev, error})))
            .finally(() => setState((prev) => ({...prev, loading: false})));
    }

    function patchMutation(data: any) {
        setState((prev) => ({...prev, loading: true}))
        axios.patch(url, data, {
            headers: { "Content-Type": "application/json" }
        })
            .then((response) => setState((prev) => ({...prev, data: response.data})))
            .catch((error) => setState((prev) => ({...prev, error})))
            .finally(() => setState((prev) => ({...prev, loading: false})));
    }

    if (method === "DELETE") {
        return [deleteMutation, { ...state}];
    }

    if (method === "PATCH") {
        return [patchMutation, { ...state }];
    }

    return [mutation,{...state}]
    

}