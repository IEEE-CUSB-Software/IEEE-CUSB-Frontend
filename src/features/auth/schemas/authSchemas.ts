import { z } from 'zod';

/**
 * Login Form Schema
 */
export const loginSchema = z.object({
  identifier: z.string().min(1, 'Email or username is required').trim(),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Register Form Schema
 * Note: Role is not included - defaults to Visitor on backend
 */
export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address')
      .trim(),
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(50, 'Username must not exceed 50 characters')
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        'Username can only contain letters, numbers, underscores, and hyphens'
      )
      .trim(),
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must not exceed 100 characters')
      .trim(),
    phone: z
      .string()
      .min(1, 'Phone number is required')
      .regex(
        /^\+?[1-9]\d{1,14}$/,
        'Invalid phone number format (use international format: +1234567890)'
      )
      .trim(),
    faculty: z
      .string()
      .min(2, 'Faculty is required')
      .max(100, 'Faculty must not exceed 100 characters')
      .trim(),
    university: z
      .string()
      .min(2, 'University is required')
      .max(100, 'University must not exceed 100 characters')
      .trim(),
    academic_year: z
      .number()
      .int('Academic year must be a whole number')
      .min(1, 'Academic year must be at least 1')
      .max(6, 'Academic year must not exceed 6'),
    major: z
      .string()
      .min(2, 'Major is required')
      .max(100, 'Major must not exceed 100 characters')
      .trim(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password must not exceed 100 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
