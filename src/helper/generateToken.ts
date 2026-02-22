import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

interface Payload {
  id: string;
  name: string;
}

if (!process.env.JWT_SECRET) {
  NextResponse.json({
    status: 500,
    success: false,
    error: "JWT Secret is not defined."
  })
}

const generateToken = async (payload: Payload): Promise<string> => {
  const token = await jwt.sign(
    {
      id: payload.id,
      name: payload.name,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  return token;
};

export default generateToken;
