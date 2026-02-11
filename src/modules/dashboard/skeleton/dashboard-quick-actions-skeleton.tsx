import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardQuickActionsSkeleton() {
  return (
    <Card className="bg-muted/20">
      <CardHeader className="pb-3">
        <CardTitle>
          <Skeleton className="h-5 w-28" />
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 @xl/main:grid-cols-2 @5xl/main:grid-cols-2 gap-5 h-full w-full">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton key={idx} className="h-9 w-full rounded-md" />
        ))}
      </CardContent>
    </Card>
  );
}


