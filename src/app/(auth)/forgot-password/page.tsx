import { ForgotPasswordForm } from "@/modules/(auth)/forgot-password/components/forgot-password-form"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Forgot your Agencioo password? Request a secure password reset link to regain access to your account and agency workspace.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function ForgotPasswordPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
