import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardActivitySkeleton() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>
          <Skeleton className="h-5 w-32" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-28" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}


