import DashboardLayout from "@/layout/DashboardLayout"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: DashboardLayoutProps) {
  return (
    <DashboardLayout>{children}</DashboardLayout>
  )
}
