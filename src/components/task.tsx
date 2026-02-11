import React from "react";
import { DataTable } from "./data-table";
import { Task, columns } from "./column";
import { mockTasks } from "@/modules/dashboard/lib/mock-data";

async function getData(): Promise<Task[]> {
  // Table expects the simpler Task shape (string dates).
  return mockTasks.map((t) => ({
    taskId: t.taskId,
    taskName: t.taskName,
    project: t.project,
    priority: t.priority,
    assignee: t.assignee,
    startDate: t.startDate,
    endDate: t.endDate,
  }));
}

export default async function Task() {
  const data = await getData();
  return <DataTable columns={columns} data={data} />;
}
