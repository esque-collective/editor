import * as z from "zod";

export const SchemaBase = z.object({
  name: z.string(),
  slug: z.string(),
});

export const FieldBase = SchemaBase.extend({
  required: z.boolean(),
  helperText: z.string().optional(),
});

export const TextField = FieldBase.extend({
  kind: z.literal("text"),
  unique: z.boolean(),
  control: z.union([
    z.literal("input"),
    z.literal("textfield"),
    z.literal("dropdown"),
  ]),
  defaultValue: z.string().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  regex: z.string().optional(),
  options: z.string().array().optional(),
});

export const NumberField = FieldBase.extend({
  kind: z.literal("number"),
  unique: z.boolean(),
  control: z.union([z.literal("input"), z.literal("dropdown")]),
  defaultValue: z.number().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  options: z.number().array().optional(),
});

export const MediaField = FieldBase.extend({
  kind: z.literal("media"),
  control: z.union([z.literal("single"), z.literal("multiple")]),
  min: z.number().optional(),
  max: z.number().optional(),
  extensions: z
    .set(
      z.union([
        z.literal("image"),
        z.literal("video"),
        z.literal("audio"),
        z.literal("document"),
      ]),
    )
    .optional(),
});

export const BooleanField = FieldBase.extend({
  kind: z.literal("number"),
  defaultValue: z.boolean().optional(),
  control: z.union([z.literal("switch"), z.literal("dropdown")]),
  options: z.string().array().optional(),
});

export const MDField = FieldBase.extend({
  kind: z.literal("md"),
  blocks: z.set(
    z.union([z.literal("heading"), z.literal("paragraph"), z.literal("quote")]),
  ),
  inline: z.set(
    z.union([z.literal("bold"), z.literal("italics"), z.literal("underline")]),
  ),
});

export const DateField = FieldBase.extend({
  kind: z.literal("date"),
  unique: z.boolean(),
  control: z.union([
    z.literal("date"),
    z.literal("time"),
    z.literal("datetime"),
  ]),
  defaultValue: z.number().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
});

export const ReferenceField = FieldBase.extend({
  kind: z.literal("reference"),
  type: z.union([z.literal("has-one"), z.literal("has-many")]),
  control: z.union([z.literal("dropdown"), z.literal("component")]),
  enities: z.set(z.string()),
  min: z.number().optional(),
  max: z.number().optional(),
});

export const Field = z.discriminatedUnion("kind", [
  TextField,
  NumberField,
  BooleanField,
  MediaField,
  ReferenceField,
  MDField,
  ReferenceField,
]);

export type Field = z.infer<typeof Field>;

export const Entity = SchemaBase.extend({
  singleton: z.boolean(),
  description: z.string().optional(),
  fields: Field.array(),
});

export type Entity = z.infer<typeof Entity>;

export interface Structure extends z.infer<typeof SchemaBase> {
  kind: "folder" | "entity";
  order: number;
  items: Structure[];
}

export const Structure: z.ZodType<Structure> = z.lazy(() =>
  SchemaBase.extend({
    kind: z.union([z.literal("folder"), z.literal("entity")]),
    order: z.number(),
    items: Structure.array(),
  }),
);

export const Schema = z.object({
  dirty: z.boolean(),
  entities: Entity.array(),
  structure: Structure.array(),
});

export type Schema = z.infer<typeof Schema>;
