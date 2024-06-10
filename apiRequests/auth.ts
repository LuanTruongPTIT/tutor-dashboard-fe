import http from "@/lib/http";
import { LoginBodyType } from "@/schema/auth";
import { infer, z } from "zod";

const TypeResponseLogin = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresInAccessToken: z.number(),
  expiresInRefreshToken: z.number(),
  role: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
  }),
});
export type TypeResponseLogin = z.infer<typeof TypeResponseLogin>;
export const authApiRequests = {
  login: (body: LoginBodyType) => http.post("api/auth/sign-in/tutor", body),
};
