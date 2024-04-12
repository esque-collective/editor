/* eslint-disable @typescript-eslint/prefer-for-of */
import { create } from "zustand";
import {
  type Entity,
  type Schema,
  type Structure,
  type Field,
} from "../schema";

interface SchemaStore extends Schema {
  getEntity: (slug: string) => Entity | undefined;
  addEntity: (entity: Entity) => void;
  updateEntity: (entity: Entity) => void;
  deleteEntity: (slug: string) => void;
  getField: (value: { slug: string; entitySlug: string }) => Field | undefined;
  addField: (slug: string, field: Field) => void;
  updateField: (slug: string, field: Field) => void;
  deleteField: (value: { slug: string; entitySlug: string }) => void;
  getStructure: (slug: string) => Structure | undefined;
  moveStructure: (value: { slug: string; destinationSlug: string }) => void;
  addStructure: (structure: Structure, destinationSlug?: string) => void;
  deleteStructure: (slug: string) => void;
  init: (value: { entities: Entity[]; structure: Structure[] }) => void;
}

const traverseStructure = (
  slug: string,
  structure: Structure | Structure[],
  index = 0,
  path = "",
) => {
  if (Array.isArray(structure)) {
    if (index >= structure.length) {
      return;
    }
    traverseStructure(slug, structure[index] ?? [], 0, path + `/${index}`);
    traverseStructure(slug, structure, index + 1, path + `/${index}`);
    return;
  }
  if (structure.slug === slug) {
    return structure;
  }

  traverseStructure(slug, structure.items, index + 1, path + `/${index}`);
};

const traverseAndDeleteStructure = (structure: Structure[], slug: string) => {
  for (let i = 0; i < structure.length; i++) {
    const struct = structure[i];
    if (struct?.slug === slug) {
      structure.splice(i, 1);
      return true;
    } else if (struct?.items && struct.items.length > 0) {
      const deleted = traverseAndDeleteStructure(struct.items, slug);
      if (deleted) {
        return true;
      }
    }
  }
  return false;
};

const traverseAndPutStructure = (
  structure: Structure[],
  payload: Structure,
  slug: string,
) => {
  for (let i = 0; i < structure.length; i++) {
    const struct = structure[i];
    if (struct?.slug === slug) {
      structure[i]?.items.push(payload);
      return true;
    } else if (struct?.items && struct.items.length > 0) {
      const deleted = traverseAndDeleteStructure(struct.items, slug);
      if (deleted) {
        return true;
      }
    }
  }
  return false;
};

export const useSchemaStore = create<SchemaStore>((set, get) => ({
  dirty: false,
  entities: [],
  structure: [],
  getEntity: (slug) => {
    const entity = get().entities.find((entity) => entity.slug === slug);
    if (!entity) {
      throw new Error(
        `Unable to find Entity with slug '${slug}' in SchemaStore`,
      );
    }

    return entity;
  },
  addEntity: (entity) =>
    set(({ entities }) => ({
      dirty: true,
      entities: [...entities, entity],
    })),
  updateEntity: (entity) =>
    set(({ entities }) => ({
      dirty: true,
      entities: entities.map((partial) => {
        if (partial.slug === entity.slug) {
          return entity;
        }
        return partial;
      }),
    })),
  deleteEntity: (slug) =>
    set(({ entities }) => ({
      dirty: true,
      entities: entities.filter((partial) => partial.slug !== slug),
    })),
  getField: ({ slug, entitySlug }) => {
    const entity = get().getEntity(entitySlug)!;
    const field = entity.fields.find((field) => field.slug === slug);

    return field;
  },
  addField: (entitySlug, field) => {
    const entity = get().getEntity(entitySlug)!;
    entity.fields.push(field);
    get().updateEntity(entity);
  },
  updateField: (entitySlug, field) => {
    const entity = get().getEntity(entitySlug)!;
    entity.fields.push(field);
    get().updateEntity(entity);
  },
  deleteField: ({ slug, entitySlug }) => {
    const entity = get().getEntity(entitySlug)!;
    entity.fields = entity.fields.filter((field) => field.slug !== slug);
    get().updateEntity(entity);
  },
  getStructure: (slug) => {
    return traverseStructure(slug, get().structure);
  },
  addStructure: (structure) =>
    set(({ structure: partial }) => ({ structure: [...partial, structure] })),
  moveStructure: ({ slug, destinationSlug }) => {
    const structure = get().getStructure(slug);

    if (structure) {
      get().deleteStructure(slug);
      set(({ structure: partial }) => {
        traverseAndPutStructure(partial, structure, destinationSlug);
        return { structure: partial };
      });
    }
  },
  deleteStructure: (slug) => {
    const structure = get().structure;
    const deleted = traverseAndDeleteStructure(structure, slug);

    if (deleted) {
      set({ structure });
    }
  },
  init: (value) => set({ dirty: false, ...value }),
}));
