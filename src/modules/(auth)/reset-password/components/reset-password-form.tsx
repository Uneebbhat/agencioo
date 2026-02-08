import { Eye, GalleryVerticalEnd } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Agencioo</span>
            </Link>
            <h1 className="text-xl font-bold">Reset Password</h1>
            <FieldDescription>
              Enter your new password and login again
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <div className="relative">
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="password"
                required
              />
              <Eye className="w-5 h-5 absolute top-2 right-2 cursor-pointer" />
            </div>
          </Field>
          <Field>
            <Button>Reset password</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
