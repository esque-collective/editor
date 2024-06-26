import { type FC } from "react";
import { SchemaNavigationButton } from "../buttons/schema-navigation-button";
import { useSearchParams } from "next/navigation";

export const SchemaNavigationTreePart: FC = () => {
  const searchParams = useSearchParams();
  return (
    <section className="flex flex-col gap-2">
      <SchemaNavigationButton kind="root">All Schemas</SchemaNavigationButton>
      <section className="flex flex-col gap-1">
        <SchemaNavigationButton slug="home">Home Page</SchemaNavigationButton>
        <SchemaNavigationButton slug="catalog">
          Catalog Page
        </SchemaNavigationButton>
        <SchemaNavigationButton slug="products">
          Products
        </SchemaNavigationButton>
        <SchemaNavigationButton kind="folder" slug="components">
          Components
        </SchemaNavigationButton>
        {searchParams.get("sidebar") !== null && (
          <SchemaNavigationButton identation={1} slug="some-component">
            Some Component
          </SchemaNavigationButton>
        )}
      </section>
    </section>
  );
};
