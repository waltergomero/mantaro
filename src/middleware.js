import NextAuth from 'next-auth';
import { authConfig } from './auth/auth.config';
 
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

// import { NextResponse } from "next/server";
// import { auth, BASE_PATH } from "./auth/index";

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

// export default auth((req) => {
//   const reqUrl = new URL(req.url);
//   if (!req.auth && reqUrl?.pathname !== "/dashboard") {
//     return NextResponse.redirect(
//       new URL(
//         `${BASE_PATH}/signin?callbackUrl=${encodeURIComponent(
//           reqUrl?.pathname
//         )}`,
//         req.url
//       )
//     );
//   }
// });