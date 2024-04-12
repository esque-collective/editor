import { Button } from "@/components/ui/button";
import { type SchemaParams } from "@/lib/routes";

export default async function SchemaEntity({
  params,
}: {
  params: SchemaParams;
}) {
  return (
    <section className="col-span-2 flex justify-between">
      <h1 className="text-3xl font-semibold">{params.entity}</h1>
      <section className="flex gap-2">
        <Button size="sm" variant="ghost">
          Reset
        </Button>
        <Button size="sm">Push Schema Changes</Button>
      </section>
    </section>
  );
}
