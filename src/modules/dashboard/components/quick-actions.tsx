import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ClipboardPlusIcon,
  FolderPlusIcon,
  Goal,
  UserPlus,
} from "lucide-react";
import React from "react";

type QuickAction = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const actions: QuickAction[] = [
  { id: "create_project", label: "Create Project", icon: <FolderPlusIcon /> },
  { id: "invite_member", label: "Invite Member", icon: <UserPlus /> },
  { id: "create_goal", label: "Create Goal", icon: <Goal /> },
  { id: "add_task", label: "Add Task", icon: <ClipboardPlusIcon /> },
];

export default function QuickActions() {
  return (
    <Card className="bg-muted/20">
      <CardHeader className="pb-3">
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 @xl/main:grid-cols-2 @5xl/main:grid-cols-2 gap-5 h-full w-full">
        {actions.map((a) => (
          <Button key={a.id} variant="secondary" className="justify-start w-full h-full">
            {a.icon}
            {a.label}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}


