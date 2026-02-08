import { ResetPasswordForm } from "@/modules/(auth)/reset-password/components/reset-password-form"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Your Password",
  description:
    "Set a new password for your Agencioo account and securely regain access to your agency, projects, and goals.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPasswordPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ResetPasswordForm />
      </div>
    </div>
  )
}
