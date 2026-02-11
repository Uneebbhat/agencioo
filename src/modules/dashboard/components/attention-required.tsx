import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CalendarClock } from "lucide-react";

export type AttentionItem = {
  id: string;
  title: string;
  meta: string;
  kind: "overdue_task" | "due_soon_task" | "at_risk_goal";
};

function kindBadge(kind: AttentionItem["kind"]) {
  switch (kind) {
    case "overdue_task":
      return <Badge variant="destructive">Overdue</Badge>;
    case "due_soon_task":
      return <Badge variant="secondary">Due soon</Badge>;
    case "at_risk_goal":
      return <Badge variant="outline">At risk</Badge>;
  }
}

function kindIcon(kind: AttentionItem["kind"]) {
  switch (kind) {
    case "overdue_task":
      return <AlertTriangle className="size-4 text-destructive" />;
    case "due_soon_task":
      return <CalendarClock className="size-4 text-muted-foreground" />;
    case "at_risk_goal":
      return <AlertTriangle className="size-4 text-muted-foreground" />;
  }
}

export default function AttentionRequired({ items }: { items: AttentionItem[] }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Attention Required</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            No critical items. You&apos;re on track.
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-3 rounded-lg border p-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {kindIcon(item.kind)}
                    <div className="truncate text-sm font-medium">
                      {item.title}
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {item.meta}
                  </div>
                </div>
                <div className="shrink-0">{kindBadge(item.kind)}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}


