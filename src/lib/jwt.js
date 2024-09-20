import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export function generateToken(payload){
    return jwt.sign(payload, secret, { expiresIn: '1h' });
}

export function verifyToken(token){
    // const deb = jwt.verify(token, secret);
    // console.log(deb);
    try{
        return jwt.verify(token, secret);
    }catch(error){
        return null;
    }
}