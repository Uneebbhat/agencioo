import UserDTO from "@/dto/userDTO.dto";
import generateToken from "@/helper/generateToken";
import { hashPassword } from "@/helper/passwordHashing";
import prisma from "@/lib/prisma";
import UserSignupSchema from "@/schema/user-signup-schema.schema";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    const body = await req.json();

    const { name, email, password } = body;

    const validateBody = await UserSignupSchema.safeParse(body);
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
    if (existingUser) {
      return NextResponse.json(
        {
          status: 409,
          success: false,
          error: "User already exist",
        },
        { status: 409 },
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "OWNER",
      },
    });
    if (!newUser) {
      return NextResponse.json(
        {
          status: 500,
          success: false,
          error: "An unknown error occurred while creating account",
        },
        { status: 500 },
      );
    }

    const token = await generateToken(newUser);

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    const userDTO = new UserDTO(newUser);

    return NextResponse.json(
      {
        status: 201,
        success: true,
        message: "Account created successfully",
        data: { user: userDTO },
        token,
      },
      { status: 201 },
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
