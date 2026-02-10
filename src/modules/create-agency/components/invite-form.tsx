"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { X } from "lucide-react";

interface Invitee {
  id: string;
  email: string;
}

export function InviteForm() {
  const [invitees, setInvitees] = useState<Invitee[]>([
    { id: "1", email: "" },
    { id: "2", email: "" },
    { id: "3", email: "" },
    { id: "4", email: "" },
  ]);

  const handleEmailChange = (id: string, email: string) => {
    setInvitees(
      invitees.map((invitee) =>
        invitee.id === id ? { ...invitee, email } : invitee,
      ),
    );
  };

  const handleRemoveInvitee = (id: string) => {
    setInvitees(invitees.filter((invitee) => invitee.id !== id));
  };

  const handleAddMore = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setInvitees([...invitees, { id: newId, email: "" }]);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // submit logic...
  };

  const handleSkip = () => {
    // logic to skip inviting
  };

  return (
    <>
      <CardHeader className="flex flex-col items-center gap-2 text-center mb-6">
        <CardTitle className="text-3xl">Invite Team Members</CardTitle>
        <CardDescription>
          Invite team members to your agency by entering their email addresses
          below.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleFormSubmit}>
        <CardContent>
          <div className="flex flex-col gap-4">
            {invitees.map((invitee) => (
              <div key={invitee.id} className="relative">
                <Input
                  type="email"
                  value={invitee.email}
                  onChange={(e) =>
                    handleEmailChange(invitee.id, e.target.value)
                  }
                  placeholder="Email address"
                />
                {invitees.length > 4 && (
                  <Button
                    size={"icon-xs"}
                    variant={"ghost"}
                    onClick={() => handleRemoveInvitee(invitee.id)}
                    className="absolute right-2 top-1.5"
                  >
                    <X size={18} />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="ghost"
            onClick={handleAddMore}
            className="mt-4"
          >
            + Add more
          </Button>
        </CardContent>
        <CardFooter className="mt-4 flex items-center justify-between gap-2">
          <Button type="button" variant="outline" onClick={handleSkip}>
            Skip
          </Button>

          <Button type="submit" disabled={invitees.every((inv) => !inv.email)}>
            Send Invites
          </Button>
        </CardFooter>
      </form>
    </>
  );
}
