import { SignupForm } from "@/modules/(auth)/signup/components/signup-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Your Account",
  description:
    "Sign up for Agencioo to create your agency, manage projects, track goals, and collaborate with your team in a secure multi-tenant platform.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function SignupPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  )
}
