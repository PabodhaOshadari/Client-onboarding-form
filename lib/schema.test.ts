import { onboardingSchema } from "./schema";

describe("Onboarding Schema", () => {
  it("should pass valid data", () => {
    const validData = {
      fullName: "Ada Lovelace",
      email: "ada@example.com",
      companyName: "Analytical Engines Ltd",
      services: ["UI/UX", "Web Dev"],
      budgetUsd: 50000,
      projectStartDate: new Date().toISOString().split("T")[0],
      acceptTerms: true
    };
    expect(() => onboardingSchema.parse(validData)).not.toThrow();
  });

  it("should fail if fullName is too short", () => {
    const invalidData = {
      fullName: "A",
      email: "ada@example.com",
      companyName: "Analytical Engines Ltd",
      services: ["UI/UX"],
      budgetUsd: 50000,
      projectStartDate: new Date().toISOString().split("T")[0],
      acceptTerms: true
    };
    expect(() => onboardingSchema.parse(invalidData)).toThrow();
  });

  it("should fail if terms not accepted", () => {
    const invalidData = {
      fullName: "Ada Lovelace",
      email: "ada@example.com",
      companyName: "Analytical Engines Ltd",
      services: ["UI/UX"],
      budgetUsd: 50000,
      projectStartDate: new Date().toISOString().split("T")[0],
      acceptTerms: false
    };
    expect(() => onboardingSchema.parse(invalidData)).toThrow();
  });
});
