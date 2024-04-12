import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

type ParamValue = { kind?: string; value: string | null };
type HrefParam = {
  kind: "href";
} & ParamValue;
type StringParam = {
  kind: "string";
} & ParamValue;

type SetSearchParamProps = HrefParam | StringParam;

export const useSearchParamsLink = (param: string) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const value = useMemo(() => searchParams.get(param), [searchParams, param]);

  const setSearchParam = useCallback(
    ({ value, kind }: SetSearchParamProps) => {
      const modSearchParams = new URLSearchParams(searchParams.toString());

      if (value === null) {
        modSearchParams.delete(param);
      } else {
        modSearchParams.set(param, value);
      }

      switch (kind) {
        case "string":
          const search = modSearchParams.toString();
          return `${pathname}${search ? `?${search}` : ""}`;
        default:
          const query: Record<string, string[]> = {};
          modSearchParams.forEach((value, key) => {
            if (value === undefined || value === null) {
              return;
            }
            if (query[key] === undefined) {
              query[key] = [value];
              return;
            }
            query?.[key]?.push(value);
          });
          return { pathname, query } as const;
      }
    },
    [pathname, searchParams, param],
  );

  return [value, setSearchParam] as const;
};
