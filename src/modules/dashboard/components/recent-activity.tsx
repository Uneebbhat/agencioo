import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCompactDateTime } from "@/modules/dashboard/lib/date";

export type RecentActivityItem = {
  id: string;
  userName: string;
  description: string;
  timestampAt: string;
};

export default function RecentActivity({ items }: { items: RecentActivityItem[] }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            No recent activity.
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className="min-w-0">
                  <div className="text-sm">
                    <span className="font-medium">{item.userName}</span>{" "}
                    <span className="text-muted-foreground">
                      {item.description}
                    </span>
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {formatCompactDateTime(item.timestampAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}


