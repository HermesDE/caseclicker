import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const token = await getToken({ req });
  const url = process.env.NEXTAUTH_URL;

  //grant access to the public folder for all clients
  const PUBLIC_FILE = /\.(.*)$/;
  if (PUBLIC_FILE.test(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  if (!token) {
    if (req.url === url + "/" || req.url.split("/").pop() === "cases") {
      return NextResponse.next();
    }
    if (!req.url.split("/").includes("auth")) {
      return NextResponse.redirect(url + "/api/auth/signin");
    }
  }
  if (req.url.split("/").includes("admin")) {
    if (token.email === "v.wagner2k@gmail.com") {
      return NextResponse.next();
    }
    return NextResponse.redirect(url);
  }
}
