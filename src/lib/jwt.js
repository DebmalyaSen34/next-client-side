import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export function generateToken(payload){
    return jwt.sign(payload, secret, { expiresIn: '15d' });
}

export function verifyToken(token){
    try{
        return jwt.verify(token, secret);
    }catch(error){
        return null;
    }
}