import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50),
  access_key: z.string().optional(),
  from_name: z.string().optional(),
  email: z.string().email(),
  message: z.string().min(1, 'Message is required').max(300),
});

export type ContactModel = z.infer<typeof contactSchema>;
