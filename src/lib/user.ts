import  jwt  from "jsonwebtoken";
import { TOKEN_SECRET } from "$env/static/private";

export async function authenticate(username: string, password : string)
{
    return true;
}

export async function createToken(username: string)
{
    const payload = {
    userId: 123,
    username: username,
    ip: "10.10.10.10"
    };
    const token = jwt.sign(payload, TOKEN_SECRET, {expiresIn: '1d'});
    return token;
}