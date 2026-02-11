import { DashboardGoal, DashboardProject, DashboardTask } from "./mock-data";
import { isBeforeDay, isWithinNextDays } from "./date";

export function computeKpis(input: {
  tasks: DashboardTask[];
  projects: DashboardProject[];
  goals: DashboardGoal[];
  teamMembersCount: number;
  now?: Date;
}) {
  const now = input.now ?? new Date();

  const totalProjects = input.projects.length;
  const activeProjects = input.projects.filter((p) => p.status === "active")
    .length;

  const totalTasks = input.tasks.length;
  const overdueTasks = input.tasks.filter(
    (t) => t.status !== "done" && isBeforeDay(t.dueAt, now)
  ).length;

  const goalsInProgress = input.goals.filter((g) => g.status === "active")
    .length;

  const doneTasks = input.tasks.filter((t) => t.status === "done").length;
  const taskCompletionRate =
    totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

  return {
    totalProjects,
    activeProjects,
    totalTasks,
    overdueTasks,
    goalsInProgress,
    totalTeamMembers: input.teamMembersCount,
    taskCompletionRate,
  };
}

export function buildAttentionItems(input: {
  tasks: DashboardTask[];
  goals: DashboardGoal[];
  now?: Date;
}) {
  const now = input.now ?? new Date();

  const overdueTasks = input.tasks
    .filter((t) => t.status !== "done" && isBeforeDay(t.dueAt, now))
    .map((t) => ({
      id: `overdue_${t.taskId}`,
      title: `${t.taskName}`,
      meta: `Task ${t.taskId} • ${t.project}`,
      kind: "overdue_task" as const,
    }));

  const dueSoonTasks = input.tasks
    .filter(
      (t) =>
        t.status !== "done" &&
        !isBeforeDay(t.dueAt, now) &&
        isWithinNextDays(t.dueAt, 3, now)
    )
    .map((t) => ({
      id: `soon_${t.taskId}`,
      title: `${t.taskName}`,
      meta: `Due soon • ${t.project}`,
      kind: "due_soon_task" as const,
    }));

  // Simple "at risk": within 7 days but progress < 40%
  const atRiskGoals = input.goals
    .filter(
      (g) =>
        g.status === "active" &&
        g.progress < 40 &&
        isWithinNextDays(g.deadlineAt, 7, now)
    )
    .map((g) => ({
      id: `risk_${g.id}`,
      title: g.title,
      meta: `Deadline soon • Progress ${g.progress}%`,
      kind: "at_risk_goal" as const,
    }));

  return [...overdueTasks, ...dueSoonTasks, ...atRiskGoals];
}


