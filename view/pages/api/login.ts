import type { NextApiRequest, NextApiResponse } from 'next'
import { stringToHashCode } from '../../common/utility';

type Data = {
    id: string,
    nickname: string,
    auth: string,
} |
{
    message: string,
}

const users = [
    {id: "", password: "", nickname: "", auth: ""},
    {id: "admin", password: "admin", nickname: "admin", auth: "admin"},
]

// login api mocking
const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id, password } = req.query;
    console.log("login");

    // 실제 구현 시에는 hash code로 저장된 값을 db에서 불러오기 때문에 hash code로 변환 불필요
    const user = users.filter((user) => stringToHashCode(user.id) === id && stringToHashCode(user.password) === password)[0];
    console.log(`${new Date().toString()} user: ${user.id}`);
    
    if (user === undefined) res.status(401).json({message: "login failed"});
    res.status(200).json({id: user.id, nickname: user.nickname, auth: user.auth});
}

export default handler;