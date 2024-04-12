import { type PropsWithChildren, type FC } from "react";

export const SchemaContainerSection: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="col-span-9 grid h-full grid-cols-2 grid-rows-[min-content_1fr] gap-4 gap-y-6 pb-4">
      {children}
    </section>
  );
};
