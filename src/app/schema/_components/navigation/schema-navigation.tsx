import { SearchField } from "@/app/_components/fields/search-field";
import { type FC } from "react";
import { SchemaNavigationTreePart } from "../parts/schema-navigation-tree-part";

export const SchemaNavigation: FC = () => {
  return (
    <section className="col-span-4 flex flex-col gap-6">
      <SearchField placeholder="Search components and entries" />
      <SchemaNavigationTreePart />
    </section>
  );
};
