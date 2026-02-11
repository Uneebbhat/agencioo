import TeamHeader from '@/modules/team/components/team-header'
import TeamTable from '@/modules/team/components/team-table'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Team | Agencioo - Manage Your Agency's Members and Roles",
  description: "View, organize, and manage your agency team members. Assign roles and keep your team structure clear with Agencioo's collaborative platform.",
  openGraph: {
    title: "Team | Agencioo - Manage Your Agency's Members and Roles",
    description: "Maintain clarity by organizing your agency's team members. Assign, update, and review team roles easily with Agencioo.",
    url: "/team",
    type: "website",
    images: [
      {
        url: "/og/team-og-image.png",
        width: 1200,
        height: 630,
        alt: "Agencioo Team Management Dashboard"
      }
    ]
  },
  alternates: {
    canonical: "/team",
  },
  keywords: [
    "agency team",
    "member management",
    "role assignment",
    "team structure",
    "team dashboard",
    "Agencioo team",
    "user roles",
    "team collaboration"
  ]
}

export default function TeamPage() {
  return (
    <>
      <div className="px-6 flex flex-col md:flex-row gap-2 md:items-center justify-between">
        <TeamHeader />
      </div>

      <div className="px-6 mt-6">
        <TeamTable />
      </div>
    </>
  )
}
