import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const signedToken = jwt.sign(token, process.env.NEXTAUTH_SECRET);

  res.send(JSON.stringify(signedToken, null, 2));
}
