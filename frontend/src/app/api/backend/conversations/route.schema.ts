import { z } from 'zod';

export enum Persona {
  sap = 'sap',
  assetinventory = 'assetinventory',
  ama = 'ama',
}

export enum Role {
  human = 'human',
  ai = 'ai',
}

export const reqBody = z.object({
  persona: z.nativeEnum(Persona),
  question: z.string().max(1_024),
  email: z.string().optional(),

});

export type RequestBody = z.infer<typeof reqBody>;