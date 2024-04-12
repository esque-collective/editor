import { type ReactNode } from "react";
import { SchemaNavigationLayout } from "./_components/layout/schema-navigation-layout";
import { SchemaContainerSection } from "./_components/sections/schema-container-section";

export default async function SchemaLayout({
  children,
  left,
  right,
}: {
  children: ReactNode;
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <SchemaNavigationLayout>
      <SchemaContainerSection>
        {children}
        {left}
        {right}
      </SchemaContainerSection>
    </SchemaNavigationLayout>
  );
}
