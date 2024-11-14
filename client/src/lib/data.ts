import { z } from 'zod';

export enum MealSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export const MealInput = z.object({
  style: z.string().min(2).max(50),
  size: z.enum([MealSize.Small, MealSize.Medium, MealSize.Large]),
  extras: z.string().max(200),
});

export type MealInputType = z.infer<typeof MealInput>;
