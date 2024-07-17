import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === 'POST') {
        console.log(req.body)
        try {
            res.status(200).json({ msg: "OK" })
        } catch (err) {
            res.status(500).json({ error: 'failed to load data' })
        }
    }
}