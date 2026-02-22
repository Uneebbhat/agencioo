import UserDTO from "@/dto/userDTO.dto";
import generateToken from "@/helper/generateToken";
import { comparePassword } from "@/helper/passwordHashing";
import prisma from "@/lib/prisma";
import UserLoginSchema from "@/schema/user-login-schema.schema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    const body = await req.json();

    const { email, password } = body;

    const validateBody = await UserLoginSchema.safeParse(body);
    if (validateBody.error) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          error: validateBody.error.issues[0].message,
        },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          error: "User not found",
        },
        { status: 404 },
      );
    }

    const decryptPassword = await comparePassword(
      password,
      existingUser.password,
    );
    if (!decryptPassword) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          error: "Invalid credentials",
        },
        { status: 400 },
      );
    }

    const token = await generateToken(existingUser);

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    const userDTO = new UserDTO(existingUser);

    return NextResponse.json(
      {
        status: 200,
        success: true,
        message: "Login successfully",
        data: { user: userDTO },
        token,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          status: 500,
          success: false,
          error: `Internal Server Error: ${error.message}`,
        },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        {
          status: 500,
          success: false,
          error: "An unknown error occurred",
        },
        { status: 500 },
      );
    }
  }
}
