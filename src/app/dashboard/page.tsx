import DashboardHeader from "@/modules/dashboard/components/dashboard-header";
import DashboardTabs from "@/modules/dashboard/components/dashboard-tabs";
import KpiOverview from "@/modules/dashboard/components/kpi-overview";
import AttentionRequired from "@/modules/dashboard/components/attention-required";
import GoalsOverview from "@/modules/dashboard/components/goals-overview";
import QuickActions from "@/modules/dashboard/components/quick-actions";
import RecentActivity from "@/modules/dashboard/components/recent-activity";
import {
  mockActivity,
  mockGoals,
  mockProjects,
  mockTasks,
  mockTeamMembers,
} from "@/modules/dashboard/lib/mock-data";
import { buildAttentionItems, computeKpis } from "@/modules/dashboard/lib/metrics";
import { Suspense } from "react";
import DashboardKpiSkeleton from "@/modules/dashboard/skeleton/dashboard-kpi-skeleton";
import DashboardAttentionSkeleton from "@/modules/dashboard/skeleton/dashboard-attention-skeleton";
import DashboardGoalsSkeleton from "@/modules/dashboard/skeleton/dashboard-goals-skeleton";
import DashboardQuickActionsSkeleton from "@/modules/dashboard/skeleton/dashboard-quick-actions-skeleton";
import DashboardActivitySkeleton from "@/modules/dashboard/skeleton/dashboard-activity-skeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Owner Dashboard | Agencioo - Multi-tenant Agency Command Center",
  description:
    "Monitor projects, tasks, goals, team performance, and recent activity in one strategic owner dashboard. Agencioo gives agency owners a real-time command center for their multi-tenant workspace.",
  openGraph: {
    title: "Owner Dashboard | Agencioo - Agency Command Center",
    description:
      "A strategic overview for agency owners: KPIs, attention-required items, goals snapshot, quick actions, and recent activity in one clean dashboard.",
  },
  alternates: {
    canonical: "/dashboard",
  },
};

export default async function DashboardPage() {
  await new Promise((resolve) => setTimeout(resolve, 250));

  const kpis = computeKpis({
    tasks: mockTasks,
    projects: mockProjects,
    goals: mockGoals,
    teamMembersCount: mockTeamMembers.length,
  });

  const attentionItems = buildAttentionItems({
    tasks: mockTasks,
    goals: mockGoals,
  });

  return (
    <>
      <div className="px-6">
        <DashboardHeader />

        <div className="mt-6">
          <Suspense fallback={<DashboardKpiSkeleton />}>
            <KpiOverview
              items={[
                { label: "Total Projects", value: kpis.totalProjects },
                { label: "Active Projects", value: kpis.activeProjects },
                { label: "Total Tasks", value: kpis.totalTasks },
                { label: "Overdue Tasks", value: kpis.overdueTasks },
                { label: "Goals In Progress", value: kpis.goalsInProgress },
                { label: "Total Team Members", value: kpis.totalTeamMembers },
                // { label: "Task Completion Rate", value: `${kpis.taskCompletionRate}%` },
              ]}
            />
          </Suspense>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Suspense fallback={<DashboardAttentionSkeleton />}>
            <AttentionRequired items={attentionItems} />
          </Suspense>

          <Suspense fallback={<DashboardGoalsSkeleton />}>
            <GoalsOverview
              goals={mockGoals
                .filter((g) => g.status === "active")
                .map((g) => ({
                  id: g.id,
                  title: g.title,
                  deadlineAt: g.deadlineAt,
                  progress: g.progress,
                }))}
            />
          </Suspense>
        </div>
      </div>

      <div className="px-6 mt-6">
        <DashboardTabs />

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Suspense fallback={<DashboardQuickActionsSkeleton />}>
            <QuickActions />
          </Suspense>

          <Suspense fallback={<DashboardActivitySkeleton />}>
            <RecentActivity items={mockActivity} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
