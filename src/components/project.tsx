import { EllipsisVertical, FolderIcon, FolderTree } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { mockProjects } from "@/modules/dashboard/lib/mock-data";

export default function Project() {
  if (mockProjects.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <FolderTree className="mb-2 size-8 text-muted-foreground" />
          <EmptyTitle>No projects available</EmptyTitle>
          <EmptyDescription>
            You have no projects yet. Start your first project to begin collaborating!
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline">Add Project</Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <>
      {mockProjects.map((project) => (
        <Link href={`/projects/board/${project.id}`} key={project.id}>
          <Card>
            <CardContent className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <FolderIcon className="w-5 h-5" />
                  <h3 className="text-lg">{project.name}</h3>
                </div>
                <Progress value={project.progress} className="mt-1" />
                <span>{project.progress}% completed</span>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Edit project</DropdownMenuItem>
                      <DropdownMenuItem variant="destructive">
                        Delete project
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
}
