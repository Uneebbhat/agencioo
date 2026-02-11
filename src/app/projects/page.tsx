import Project from "@/components/project"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProjectHeader from "@/modules/projects/components/project-header"
import { FolderPlusIcon } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects | Agencioo - Manage Collaborations, Deadlines, and Progress",
  description: "Easily create, track, and collaborate on projects with Agencioo. Stay organized, meet deadlines, and monitor project progress for a more productive agency workflow.",
  openGraph: {
    title: "Projects | Agencioo - Collaborate & Manage Agency Projects",
    description: "Discover smart project management with Agencioo. Streamline project creation, tracking, and teamwork to drive agency success.",
    url: "/projects",
    type: "website",
    images: [
      {
        url: "/og/projects-og-image.png",
        width: 1200,
        height: 630,
        alt: "Agencioo Projects Dashboard"
      }
    ]
  },
  alternates: {
    canonical: "/projects",
  },
  keywords: [
    "agency projects",
    "project management",
    "team collaboration",
    "task tracking",
    "agency workflow",
    "Agencioo projects",
    "deadline management"
  ]
}

export default function ProjectsPage() {
  return (
    <>
      <div className="px-6 flex flex-col md:flex-row gap-2 md:items-center justify-between">
        <ProjectHeader />
      </div>

      <div className='px-6 flex flex-col gap-5 mt-6'>
        <Project />
      </div>
    </>
  )
}
