"use server";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const loginUser = async (data: { email: string }) => {
  const token = jwt.sign(data, "Strong Secret", { expiresIn: "365d" });
  (await cookies()).set("authTokenForAyurvedic", token, {
    httpOnly: true,
    maxAge: 365 * 24 * 60 * 60,
    sameSite: "strict",
  });
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("authTokenForAyurvedic")?.value;
  let decodedToken = null;
  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return decodedToken;
  }
  return decodedToken;
};
