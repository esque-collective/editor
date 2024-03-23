import { type FC, type PropsWithChildren } from "react";
import { SchemaNavigation } from "../navigation/schema-navigation";

export const SchemaNavigationLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="container grid min-h-dvh grid-cols-12 gap-4 pt-20">
      <SchemaNavigation />
      {children}
    </main>
  );
};
