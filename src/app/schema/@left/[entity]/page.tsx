import { type SchemaParams } from "@/lib/routes";

export default async function SchemaLeftPart({
  params,
}: {
  params: SchemaParams;
}) {
  return (
    <section className="col-span-1 h-full rounded-xl border border-secondary-foreground">
      {params.entity}
    </section>
  );
}
