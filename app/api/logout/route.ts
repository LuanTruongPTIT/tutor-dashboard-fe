import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    // const result = await authApiRequest.logoutFromNextServerToServer(
    //   sessionToken.value
    // );

    return Response.json("Logout success", {
      status: 200,
      headers: {
        // Xóa cookie sessionToken
        "Set-Cookie": `accesstoken=; Path=/; HttpOnly; Max-Age=0; refreshToken=; Path=/; HttpOnly; Max-Age=0; role=; Path=/; HttpOnly; Max-Age=0`,
      },
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: "Lỗi không xác định",
        },
        {
          status: 500,
        }
      );
    }
  }
}
