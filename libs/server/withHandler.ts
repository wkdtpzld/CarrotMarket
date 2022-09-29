import { NextApiRequest, NextApiResponse } from 'next';

export interface ResponseType {
    ok: boolean;
    [key: string]: any;
}

interface ConfigType {
    method: "GET" | "POST" | "DELETE" | "PUT",
    fn: (request: NextApiRequest, response: NextApiResponse) => void,
    isPrivate?: boolean
}

export default function withHandler({
        method,
        fn,
        isPrivate = true
    }: ConfigType) {

    return async function (request: NextApiRequest, response: NextApiResponse) : Promise<any> {
        if (request.method !== method) {
            return response.status(405).end();
        }
        if (isPrivate && !request.session.user) {
            return response.status(401).json({
                ok: false,
                error: "Plz log in."
            });
        }
        try {
            await fn(request, response);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ error });
        }
    };

}