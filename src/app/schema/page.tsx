import { Button } from "@/components/ui/button";

export default async function Schema() {
  return (
    <section className="col-span-2 flex h-min justify-between">
      <h1 className="text-3xl font-semibold">Schema Builder</h1>
      <section className="flex gap-2">
        <Button size="sm" variant="ghost">
          Reset
        </Button>
        <Button size="sm">Push Schema Changes</Button>
      </section>
    </section>
  );
}
