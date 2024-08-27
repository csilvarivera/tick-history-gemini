import { z } from 'zod';

export const reqBody = z.object({
  email: z.string(),
});

export type RequestBody = z.infer<typeof reqBody>;