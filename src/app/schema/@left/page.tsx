import { SchemaRootNavigationTreePart } from "../_components/parts/schema-root-navigation-tree-part";

export default async function SchemaLeftPart() {
  return (
    <section className="col-span-1 h-full">
      <SchemaRootNavigationTreePart />
    </section>
  );
}
