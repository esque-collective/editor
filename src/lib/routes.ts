export type SchemaParams = { entity: string };
export const routes = {
  index: "/",
  content: "/content",
  schema: "/schema",
  schemaEntry: (slug: string) => `/schema/${slug}`,
  media: "/media",
};
