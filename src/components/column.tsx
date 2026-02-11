"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Task = {
  taskId: string
  taskName: string,
  project: string,
  priority: string,
  assignee: string,
  startDate: string,
  endDate: string,
}

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "taskId",
    header: "Task ID",
  },
  {
    accessorKey: "taskName",
    header: "Task Name",
  },
  {
    accessorKey: "project",
    header: "Project",
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
]