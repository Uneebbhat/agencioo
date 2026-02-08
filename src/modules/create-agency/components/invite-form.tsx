"use client"

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { X } from "lucide-react";

function EmailChip({ email, onRemove }: { email: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center m-1 px-2 py-1 rounded-full bg-muted text-sm border">
      {email}
      <button
        type="button"
        onClick={onRemove}
        className="ml-2 hover:text-destructive"
        aria-label="Remove"
      >
        <X size={16} />
      </button>
    </span>
  );
}

export function InviteForm() {
  const [emails, setEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Simple email validation
  const isValidEmail = (value: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);

  const handleEmailInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === "Enter" || e.key === "," || e.key === "Tab") &&
      emailInput.trim()
    ) {
      e.preventDefault();
      const trimmed = emailInput.trim();
      if (isValidEmail(trimmed) && !emails.includes(trimmed)) {
        setEmails([...emails, trimmed]);
        setEmailInput("");
      }
    }
  };

  const handleRemoveEmail = (idx: number) => {
    setEmails(emails.filter((_, i) => i !== idx));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // submit logic...
  };

  const handleSkip = () => {
    // logic to skip inviting, e.g., navigate or close modal
    // For demonstration, window.location.reload(); or route somewhere else
    // Add actual skip logic here if using next/router, etc.
  };

  return (
    <>
      <CardHeader className="flex flex-col items-center gap-2 text-center">
        <CardTitle className="text-3xl">Invite Members</CardTitle>
        <CardDescription>
          Invite team members to your agency by entering their email addresses below.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleFormSubmit}>
        <CardContent>
          <FieldGroup>
            <div className="grid grid-cols-1 gap-5">
              <Field>
                <FieldLabel htmlFor="invite-emails">
                  Email Addresses
                </FieldLabel>
                <div
                  className="flex flex-wrap items-center min-h-12 border rounded-md p-2 bg-background focus-within:ring-2 focus-within:ring-ring"
                  onClick={() => emailInputRef.current?.focus()}
                >
                  {emails.map((email, idx) => (
                    <EmailChip
                      key={email}
                      email={email}
                      onRemove={() => handleRemoveEmail(idx)}
                    />
                  ))}
                  <Input
                    id="invite-emails"
                    ref={emailInputRef}
                    type="email"
                    value={emailInput}
                    name="inviteEmails"
                    autoComplete="off"
                    onChange={handleInputChange}
                    onKeyDown={handleEmailInputKeyDown}
                    placeholder={emails.length ? "" : "Enter email address and press Enter"}
                    className="flex-1 min-w-[120px] border-0 outline-none shadow-none focus-visible:ring-0 px-0 py-0 h-7 bg-transparent"
                  />
                </div>
                <FieldDescription>
                  Press <span className="font-mono text-xs">Enter</span> or <span className="font-mono text-xs">,</span> to add each email. You may add multiple emails.
                </FieldDescription>
              </Field>
            </div>
          </FieldGroup>
        </CardContent>
        <CardFooter className="mt-4 flex flex-col gap-2">
          <Button className="w-full" type="submit" disabled={emails.length === 0}>
            Send Invites
          </Button>
          <Button
            className="w-full"
            type="button"
            variant="outline"
            onClick={handleSkip}
          >
            Skip
          </Button>
        </CardFooter>
      </form>
    </>
  );
}
