import TasksHeader from "@/modules/tasks/components/tasks-header";
import Task from "@/components/task";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tasks | Agencioo - Organize, Assign, and Track Agency Work",
  description: "Easily manage and track all your agency's tasks with Agencioo. Assign responsibilities, monitor due dates, and streamline your workflow for maximum productivity.",
  openGraph: {
    title: "Tasks | Agencioo - Organize, Assign, and Track Agency Work",
    description: "Take control of your agency's deliverables. Agencioo helps you organize, assign, and monitor all your agency tasks efficiently.",
    url: "/tasks",
    type: "website",
    images: [
      {
        url: "/og/tasks-og-image.png",
        width: 1200,
        height: 630,
        alt: "Agencioo Tasks Dashboard"
      }
    ]
  },
  alternates: {
    canonical: "/tasks",
  },
  keywords: [
    "agency tasks",
    "task management",
    "team collaboration",
    "task tracking",
    "task assignment",
    "Agencioo tasks",
    "workflow optimization",
    "deadline management"
  ]
}

export default function TasksPage() {
  return (
    <>
      <div className="px-6 flex flex-col md:flex-row gap-2 md:items-center justify-between">
        <TasksHeader />
      </div>

      <div className="px-6 mt-6">
        <Task />
      </div>
    </>
  )
}
