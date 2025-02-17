import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export function generateToken(payload) {
    return jwt.sign(payload, secret, { expiresIn: '5d' });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}