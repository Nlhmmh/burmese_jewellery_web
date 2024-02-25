import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const userRoutes = ["/profile"];
const adminRoutes = ["/admin/dashboard"];

type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

export const withAccessFilter: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res = await next(request, _next);
    const url = request.nextUrl.clone();
    const { pathname } = request.nextUrl;
    const { locale, modifiedPathname } = extractLocaleAndPathname(pathname);

    const cookie = request.cookies.get("user");
    const user = cookie?.value;

    if (adminRoutes.includes(modifiedPathname!)) {
      if (user) return NextResponse.redirect(url);
      url.pathname = `${locale}/admin/login`;
      return NextResponse.redirect(url);
    }
    return res;
  };
};

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
