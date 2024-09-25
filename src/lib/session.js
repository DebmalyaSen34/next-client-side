// @/lib/session.js
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export const sessionOptions = {
  cookieName: "preperly_session",
  password: process.env.JWT_SECRET,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
};

export function withSession(handler) {
  return async function newHandler(request) {
    const session = await getIronSession(cookies(), sessionOptions);

    // Attach the session to the request object
    request.session = session;
    console.log('session', session);

    const response = await handler(request);

    await session.save();

    // Call the original handler
    console.log('response: ', response);
    return response;
  };
}