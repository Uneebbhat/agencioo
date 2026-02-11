import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function TaskSkeleton() {
  return (
    <div className="overflow-hidden rounded-md border">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Task ID</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Task Name</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Project</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Assignee</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Start Date</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">End Date</th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-b">
              {[...Array(6)].map((_, j) => (
                <td key={j} className="p-4">
                  <Skeleton className="h-4 w-full max-w-[90px]" />
                </td>
              ))}
              <td className="p-4 w-8 text-right">
                <Skeleton className="h-4 w-6 ml-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
