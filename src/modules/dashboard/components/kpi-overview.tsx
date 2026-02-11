import { Card, CardContent } from "@/components/ui/card";

export type KpiItem = {
  label: string;
  value: string | number;
};

export default function KpiOverview({ items }: { items: KpiItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      {items.map((item) => (
        <Card key={item.label} className="py-4">
          <CardContent className="px-4">
            <div className="text-2xl font-semibold leading-none">
              {item.value}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {item.label}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


