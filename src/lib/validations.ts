import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const signupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export const phoneSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
})

export const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
})

export const birthDetailsSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().refine((date) => {
    const today = new Date()
    return new Date(date) < today
  }, 'Date of birth must be in the past'),
  timeOfBirth: z.string().optional(),
  isTimeApproximate: z.boolean().default(false),
  placeOfBirth: z.string().min(2, 'Please enter your place of birth'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  timezone: z.string(),
})

export const chatMessageSchema = z.object({
  sessionId: z.string().uuid(),
  message: z.string().min(1, 'Message cannot be empty').max(2000),
})

export const paymentSchema = z.object({
  sessionId: z.string().uuid(),
  planTier: z.enum(['quick_pass', 'full_consult', 'subscription']),
})

export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type PhoneInput = z.infer<typeof phoneSchema>
export type OtpInput = z.infer<typeof otpSchema>
export type BirthDetailsInput = z.infer<typeof birthDetailsSchema>
export type ChatMessageInput = z.infer<typeof chatMessageSchema>
export type PaymentInput = z.infer<typeof paymentSchema>
