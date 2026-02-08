import { CircleCheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field"
import Link from "next/link"

export default function ResetSuccess({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <CircleCheckIcon className="size-8 text-primary" />
            </div>
            <h1 className="text-xl font-bold">Password Reset Successful</h1>
            <FieldDescription>
              Your password has been successfully reset. You can now login with your new password.
            </FieldDescription>
          </div>
        </div>
        <Field>
          <Button asChild className="w-full">
            <Link href="/login">Login Again</Link>
          </Button>
        </Field>
      </FieldGroup>
    </div>
  )
}
