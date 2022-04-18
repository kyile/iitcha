import type { NextApiRequest, NextApiResponse } from 'next'
import { stringToHashCode } from '../../common/utility';

type Data = {
    id: string,
    nickname: string,
    auth: string,
}

const users = [
    {id: "", password: "", nickname: "", auth: ""},
    {id: "admin", password: "admin", nickname: "admin", auth: "admin"},
]

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id, password } = req.query;
    console.log("login");

    const user = users.filter((user) => stringToHashCode(user.id) === id && stringToHashCode(user.password) === password)[0];
    if (user !== undefined) res.status(200).json({id: user.id, nickname: user.nickname, auth: user.auth});
}

export default handler;