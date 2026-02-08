import { CreateAgencyForm } from "@/modules/create-agency/components/create-agency-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Agency",
  description:
    "Set up your agency on Agencioo to manage teams, projects, and clients efficiently with secure, role-based access and scalable workflows.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function CreateAgencyPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <CreateAgencyForm />
      </div>
    </div>
  )
}
