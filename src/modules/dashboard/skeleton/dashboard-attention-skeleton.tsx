import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardAttentionSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>
          <Skeleton className="h-5 w-32" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-start justify-between gap-3 rounded-lg border p-3"
          >
            <div className="min-w-0 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}


