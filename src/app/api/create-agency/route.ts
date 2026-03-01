import getCurrentUserId from "@/helper/getCurrentUser";
import prisma from "@/lib/prisma";
import CreateAgencySchema from "@/schema/create-agency-schema.schema";
import sendEmail from "@/services/sendEmail";
import CreateAgencyEmail from "@/templates/email/create-agency-email";
import { render } from "@react-email/render";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      agencyName,
      agencyEmail,
      agencyWebsite,
      agencyPhone,
      agencyAddress,
      agencyCity,
      agencyZipcode,
      agencyImage,
      agencyDescription,
    } = body;

    const validateBody = await CreateAgencySchema.safeParse(body);
    if (validateBody.error) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          error: validateBody.error.issues[0].message,
        },
        { status: 400 }
      );
    }

    const existingAgency = await prisma.agency.findUnique({
      where: {
        agencyEmail,
      },
    });
    if (existingAgency) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          error: "Agency email already in use",
        },
        { status: 400 }
      );
    }

    const { id, name } = await getCurrentUserId();
    console.log(id);

    try {
      const result = await prisma.$transaction(async (tx) => {
        const agency = await tx.agency.create({
          data: {
            agencyName,
            agencyEmail,
            agencyWebsite,
            agencyPhone,
            agencyAddress,
            agencyCity,
            agencyZipcode,
            agencyImage: agencyImage || "",
            agencyDescription,
          },
        });

        await tx.agencyMember.create({
          data: {
            userId: id,
            agencyId: agency.id,
            role: "OWNER",
          },
        });

        try {
          const emailHtml = await render(
            await CreateAgencyEmail({
              agencyName: agency.agencyName,
              dashboardUrl: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/dashboard`,
              ownerName: name,
              supportEmail: "uneebbhatti3@gmail.com",
            })
          );

          await sendEmail(
            agency.agencyEmail,
            "🎉 Your agency has been created!",
            undefined,
            emailHtml
          );
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error(
              `Failed to send create agency email: ${error.message}`
            );
          } else {
            console.error(`Failed to send welcome email: ${error}`);
          }
        }

        return agency;
      });

      if (!result) {
        return NextResponse.json(
          {
            status: 500,
            success: false,
            error: "An unknown error occurred while creating agency",
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        status: 201,
        success: true,
        message: "Agency created successfully",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return NextResponse.json(
          {
            status: 500,
            success: false,
            error: `Internal Server Error: ${error.message}`,
          },
          { status: 500 }
        );
      } else {
        return NextResponse.json(
          {
            status: 500,
            success: false,
            error: "An unknown error occurred",
          },
          { status: 500 }
        );
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          status: 500,
          success: false,
          error: `Internal Server Error: ${error.message}`,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          status: 500,
          success: false,
          error: "An unknown error occurred",
        },
        { status: 500 }
      );
    }
  }
}
