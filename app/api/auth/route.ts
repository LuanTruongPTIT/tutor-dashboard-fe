import { cookies } from "next/headers";
export async function POST(request: Request) {
  const data = await request.json();
  const body = data.payload;
  const accessToken = body.accesstoken as string;
  const expiresAtAccessToken = body.exipresInAccessToken as string;

  const refreshToken = body.refreshtoken as string;
  const expiresAtRefreshToken = body.expiresInRefreshToken as string;
  const role = body.role as string;
  console.log(
    accessToken,
    expiresAtAccessToken,
    refreshToken,
    expiresAtRefreshToken,
    role
  );
  if (!accessToken && !refreshToken) {
    return Response.json({ message: "Token invalid" }, { status: 401 });
  }
  const expiresAccessTokenDate = new Date(expiresAtAccessToken).toUTCString();
  const expiresRefreshToken = new Date(expiresAtRefreshToken).toUTCString();
  cookies().set("refreshToken", refreshToken, { httpOnly: true, path: "/" });
  cookies().set("accesstoken", accessToken, { httpOnly: true, path: "/" });
  cookies().set("expiresAtAccessToken", expiresAccessTokenDate, {
    httpOnly: true,
    path: "/",
  });
  cookies().set("expiresAtRefreshToken", expiresRefreshToken, {
    httpOnly: true,
    path: "/",
  });
  cookies().set("role", role, { httpOnly: true, path: "/" });
  return Response.json(body, {});
}
