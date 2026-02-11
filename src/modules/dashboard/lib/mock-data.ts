export type DashboardTask = {
  taskId: string;
  taskName: string;
  project: string;
  priority: "Low" | "Medium" | "High" | "Very high";
  assignee: string;
  startDate: string; // display
  endDate: string; // display
  startAt: string; // ISO
  dueAt: string; // ISO
  status: "todo" | "in_progress" | "done";
};

export type DashboardProject = {
  id: number;
  name: string;
  progress: number; // 0-100
  status: "active" | "paused" | "completed";
};

export type DashboardGoal = {
  id: string;
  title: string;
  deadlineAt: string; // ISO
  progress: number; // 0-100
  status: "active" | "completed";
};

export type DashboardActivityItem = {
  id: string;
  userName: string;
  description: string;
  timestampAt: string; // ISO
};

export type DashboardTeamMember = {
  id: string;
  name: string;
  role: "Owner" | "Manager" | "Member";
};

export const mockTeamMembers: DashboardTeamMember[] = [
  { id: "tm_01", name: "Uneeb", role: "Owner" },
  { id: "tm_02", name: "Sara", role: "Manager" },
  { id: "tm_03", name: "Ahmad", role: "Member" },
  { id: "tm_04", name: "Fatima", role: "Member" },
  { id: "tm_05", name: "Bilal", role: "Member" },
];

export const mockProjects: DashboardProject[] = [
  { id: 1, name: "Agencioo Platform", progress: 38, status: "active" },
  { id: 2, name: "Client Onboarding Revamp", progress: 71, status: "active" },
  { id: 3, name: "Design System Cleanup", progress: 100, status: "completed" },
  { id: 4, name: "Marketing Website", progress: 16, status: "active" },
];

export const mockGoals: DashboardGoal[] = [
  {
    id: "goal_01",
    title: "Ship MVP for agency onboarding",
    deadlineAt: "2026-02-28T18:00:00.000Z",
    progress: 62,
    status: "active",
  },
  {
    id: "goal_02",
    title: "Reach 10 active client workspaces",
    deadlineAt: "2026-03-10T18:00:00.000Z",
    progress: 25,
    status: "active",
  },
  {
    id: "goal_03",
    title: "Stabilize tasks workflow (v1)",
    deadlineAt: "2026-02-18T18:00:00.000Z",
    progress: 35,
    status: "active",
  },
];

export const mockTasks: DashboardTask[] = [
  {
    taskId: "AGEN-1",
    taskName: "Owner dashboard command center layout",
    project: "Agencioo Platform",
    priority: "Very high",
    assignee: "Uneeb",
    startDate: "Feb 11, 2026",
    endDate: "Feb 14, 2026",
    startAt: "2026-02-11T09:00:00.000Z",
    dueAt: "2026-02-14T18:00:00.000Z",
    status: "in_progress",
  },
  {
    taskId: "AGEN-2",
    taskName: "Project creation flow polish",
    project: "Agencioo Platform",
    priority: "High",
    assignee: "Sara",
    startDate: "Feb 08, 2026",
    endDate: "Feb 10, 2026",
    startAt: "2026-02-08T09:00:00.000Z",
    dueAt: "2026-02-10T18:00:00.000Z",
    status: "in_progress",
  },
  {
    taskId: "AGEN-3",
    taskName: "Invite member UI & validation",
    project: "Client Onboarding Revamp",
    priority: "Medium",
    assignee: "Ahmad",
    startDate: "Feb 11, 2026",
    endDate: "Feb 12, 2026",
    startAt: "2026-02-11T09:00:00.000Z",
    dueAt: "2026-02-12T18:00:00.000Z",
    status: "todo",
  },
  {
    taskId: "AGEN-4",
    taskName: "Audit overdue tasks logic",
    project: "Client Onboarding Revamp",
    priority: "Low",
    assignee: "Fatima",
    startDate: "Feb 05, 2026",
    endDate: "Feb 09, 2026",
    startAt: "2026-02-05T09:00:00.000Z",
    dueAt: "2026-02-09T18:00:00.000Z",
    status: "todo",
  },
  {
    taskId: "AGEN-5",
    taskName: "Refactor progress UI components",
    project: "Design System Cleanup",
    priority: "Medium",
    assignee: "Bilal",
    startDate: "Feb 01, 2026",
    endDate: "Feb 15, 2026",
    startAt: "2026-02-01T09:00:00.000Z",
    dueAt: "2026-02-15T18:00:00.000Z",
    status: "done",
  },
];

export const mockActivity: DashboardActivityItem[] = [
  {
    id: "act_01",
    userName: "Sara",
    description: "created project “Marketing Website”",
    timestampAt: "2026-02-11T08:12:00.000Z",
  },
  {
    id: "act_02",
    userName: "Uneeb",
    description: "moved task AGEN-1 to In progress",
    timestampAt: "2026-02-11T07:48:00.000Z",
  },
  {
    id: "act_03",
    userName: "Ahmad",
    description: "updated goal “Ship MVP for agency onboarding”",
    timestampAt: "2026-02-10T16:30:00.000Z",
  },
  {
    id: "act_04",
    userName: "Fatima",
    description: "joined the workspace",
    timestampAt: "2026-02-09T12:10:00.000Z",
  },
];


