
import { z } from "zod";

// Zod schema for onboarding form validation
export const onboardingSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name must be less than 80 characters")
    .regex(/^[A-Za-z\s'-]+$/, "Only letters, spaces, apostrophes, and hyphens allowed"),

 // Email: required, must be a valid email address
  email: z.string().email("Invalid email address"),

   // Company Name: required, 2–100 characters
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),

  // Services: array of selected services, at least one required 
  services: z
    .array(z.enum(["UI/UX", "Branding", "Web Dev", "Mobile App"]))
    .min(2, "Select at least two services"),

  // // Budget USD: optional, integer between 100 and 1,000,000
  budgetUsd: z
    .number()
    .int("Budget must be an integer")
    .min(100, "Minimum budget is 100")
    .max(1000000, "Maximum budget is 1,000,000")
    .optional(),


  projectStartDate: z.string().refine(
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(date);
      return selectedDate >= today;
    },
    {
      message: "Project start date must be today or later",
    },
  ),

  
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;