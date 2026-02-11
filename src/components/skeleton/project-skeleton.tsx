import React from "react";
import { Card, CardContent } from "../ui/card";
import { FolderIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";

export default function ProjectSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, idx) => (
        <div key={idx} className="pointer-events-none select-none">
          <Card>
            <CardContent className="flex items-center justify-between">
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <FolderIcon className="w-5 h-5 text-muted" />
                  <Skeleton className="h-6 w-28" />
                </div>
                <Skeleton className="mt-1 h-2 w-full max-w-[150px]" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-8 h-8 p-0"
                      tabIndex={-1}
                      aria-label="Loading"
                      disabled
                    >
                      <Skeleton className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem disabled>
                        <Skeleton className="h-4 w-24" />
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled>
                        <Skeleton className="h-4 w-24" />
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </>
  );
}
