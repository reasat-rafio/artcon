import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50),
  access_key: z.string().optional(),
  from_name: z.string().optional(),
  email: z.string().email(),
  message: z.string().min(1, 'Message is required').max(300),
});
export type ContactModel = z.infer<typeof contactSchema>;

export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const inquirySchema = z.object({
  name: z.string().min(1, 'Name is required').max(50),
  access_key: z.string().optional(),
  from_name: z.string().optional(),
  email: z.string().email(),
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
  subject: z.string().optional(),
  page_url: z.string().optional(),
  document_image_url: z.string().optional(),
  message: z.string().optional(),
});

export type InquiryModel = z.infer<typeof inquirySchema>;
