import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCompactDate } from "@/modules/dashboard/lib/date";

export type GoalOverviewItem = {
  id: string;
  title: string;
  deadlineAt: string;
  progress: number; // 0-100
};

export default function GoalsOverview({ goals }: { goals: GoalOverviewItem[] }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Goals Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {goals.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            No active goals yet.
          </div>
        ) : (
          goals.map((goal) => (
            <div key={goal.id} className="rounded-lg border p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">
                    {goal.title}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Deadline: {formatCompactDate(goal.deadlineAt)}
                  </div>
                </div>
                <Badge variant="outline">{goal.progress}%</Badge>
              </div>
              <Progress value={goal.progress} className="mt-3" />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}


