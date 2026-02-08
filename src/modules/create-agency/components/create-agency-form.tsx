import { Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export function CreateAgencyForm() {
  return (
    <>
      <CardHeader className="flex flex-col items-center gap-2 text-center">
        <CardTitle className="text-3xl">Create Your Agency</CardTitle>
        <CardDescription>Fill in the details below to create your agency profile.</CardDescription>
      </CardHeader>
      <form>
        <CardContent>
          <FieldGroup>
            <div className="grid grid-cols-1 gap-5">
              <Field>
                <FieldLabel htmlFor="agencyName">Agency Name</FieldLabel>
                <Input
                  id="agencyName"
                  type="text"
                  name="agencyName"
                  placeholder="Your agency name"
                  required
                  autoFocus
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="agencyEmail">Agency Email</FieldLabel>
                <Input
                  id="agencyEmail"
                  type="email"
                  name="agencyEmail"
                  placeholder="agency@example.com"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="agencyWebsite">Agency Website</FieldLabel>
                <Input
                  id="agencyWebsite"
                  type="url"
                  name="agencyWebsite"
                  placeholder="https://youragency.com"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="agencyPhone">Agency Phone</FieldLabel>
                <Input
                  id="agencyPhone"
                  type="tel"
                  name="agencyPhone"
                  placeholder="+1 555-555-5555"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="agencyAddress">Agency Address</FieldLabel>
                <Input
                  id="agencyAddress"
                  type="text"
                  name="agencyAddress"
                  placeholder="123 Main St, Suite 100"
                  required
                />
              </Field>

              {/* Responsive 2-column row for City and Zipcode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="city">City</FieldLabel>
                  <Input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="zipcode">Zipcode</FieldLabel>
                  <Input
                    id="zipcode"
                    type="text"
                    name="zipcode"
                    placeholder="Zip or Postal Code"
                    required
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="agencyImage">Agency Image</FieldLabel>
                <div className="flex items-center gap-4">
                  <Input
                    id="agencyImage"
                    name="agencyImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                  >
                    <ImageIcon className="w-5 h-5 mr-2" />
                    <span>Upload Image</span>
                  </Button>
                </div>
                <FieldDescription>Recommended size: 128x128px, JPG or PNG.</FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="agencyDescription">Agency Description (optional)</FieldLabel>
                <Textarea
                  id="agencyDescription"
                  name="agencyDescription"
                  placeholder="Tell us a little about your agency…"
                  className="min-h-[80px]"
                  maxLength={500}
                ></Textarea>
                <FieldDescription>
                  Briefly describe your agency (<span className="font-mono text-xs">max 500 chars</span>).
                </FieldDescription>
              </Field>
            </div>
          </FieldGroup>
        </CardContent>
        <CardFooter className="mt-4">
          <Button className="w-full">
            Create Agency
          </Button>
        </CardFooter>
      </form>
    </>
  )
}
