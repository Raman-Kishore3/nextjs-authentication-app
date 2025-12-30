import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface TokenPayLoad {
  id: string;
}
export const getDataFromToken = (request: NextRequest): string => {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      throw new Error("no token provided");
    }
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as TokenPayLoad;
    if (!decodedToken.id) {
      throw new Error("Invalid token: missing userID");
    }
    return decodedToken.id;
  } catch (error: any) {
    throw new Error("Token verification failed", error.message);
  }
};
