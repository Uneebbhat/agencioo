import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ClipboardPlusIcon, FolderPlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Task from "@/components/task";
import Project from "@/components/project";
import { Suspense } from "react";
import ProjectSkeleton from "@/components/skeleton/project-skeleton";
import TaskSkeleton from "@/components/skeleton/task-skeleton";

export default function DashboardTabs() {
  return (
    <Tabs defaultValue="tasks" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
      </TabsList>
      <Separator />
      {/* Tasks Tab */}
      <TabsContent value="tasks">
        <div className="mt-2 flex flex-col gap-5">
          <Button className="w-fit">
            <ClipboardPlusIcon />
            Add task
          </Button>
          <Suspense fallback={<TaskSkeleton />}>
            <Task />
          </Suspense>
        </div>
      </TabsContent>
      {/* Projects Tab */}
      <TabsContent value="projects">
        <div className="mt-2 flex flex-col gap-5">
          <Button className="w-fit">
            <FolderPlusIcon />
            Add project
          </Button>
          <Suspense fallback={<ProjectSkeleton />}>
            <Project />
          </Suspense>
        </div>
      </TabsContent>
    </Tabs>
  );
}