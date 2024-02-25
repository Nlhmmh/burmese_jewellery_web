import { NextRequest, NextResponse } from "next/server";

const userRoutes = ["/profile"];
const adminRoutes = ["/admin/dashboard"];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = request.nextUrl;
  const { locale, modifiedPathname } = extractLocaleAndPathname(pathname);

  const cookie = request.cookies.get("user");
  const user = cookie?.value;

  if (adminRoutes.includes(modifiedPathname!)) {
    if (user) return NextResponse.redirect(url);
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
}

function extractLocaleAndPathname(pathname: string): {
  locale: string | null;
  modifiedPathname: string | null;
} {
  const match = pathname.match(/(\/(en|mm))(.*)/);
  if (!match) {
    return { locale: null, modifiedPathname: pathname };
  }
  const locale = match[2];
  let modifiedPathname = match[3];
  if (modifiedPathname === "") modifiedPathname = "/";
  return { locale, modifiedPathname };
}
