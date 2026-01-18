import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name is too long'),
  access_key: z.string().optional(),
  from_name: z.string().optional(),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required').max(300, 'Message is too long'),
});
export type ContactModel = z.infer<typeof contactSchema>;

export const phoneRegex = new RegExp(
  /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
);

export const inquirySchema = z.object({
  name: z.string().min(1, 'Name is required').max(50),
  access_key: z.string().optional(),
  from_name: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required').regex(phoneRegex, 'Invalid phone number'),
  subject: z.string().optional(),
  page_url: z.string().optional(),
  message: z.string().optional(),
  context: z.string().optional(),
});

export type InquiryModel = z.infer<typeof inquirySchema>;
