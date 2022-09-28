import { NextApiRequest, NextApiResponse } from 'next';

export interface ResponseType {
    ok: boolean;
    [key: string]: any;
}

export default function withHandler(
    method: "GET" | "POST" | "DELETE" | "PUT",
    fn: (request: NextApiRequest, response: NextApiResponse) => void) {

    return async function (request: NextApiRequest, response: NextApiResponse) : Promise<any> {
        if (request.method !== method) {
            return response.status(405).end();
        }
        try {
            await fn(request, response);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ error });
        }
    };

}