import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const token = await getToken({ req });
  const url = process.env.NEXTAUTH_URL;
  const apiKey = req.headers.get("x-api-key");

  //grant access to the public folder for all clients
  const PUBLIC_FILE = /\.(.*)$/;
  if (PUBLIC_FILE.test(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (req.url.split("/").includes("admin")) {
    if (
      token?.email === "v.wagner2k@gmail.com" ||
      apiKey === process.env.ADMIN_API_KEY
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(url);
  }
}
