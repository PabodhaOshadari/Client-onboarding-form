
# Client Onboarding Form

## Overview
This project is a **client onboarding form** built with **Next.js**, **React Hook Form**, and **Zod** validation. Users can submit information about themselves and their project. The data is sent to an **external API endpoint** (no local API routes), demonstrating form validation, submission handling, and environment variable usage.

The form includes fields for **full name, email, company name, services interested in, budget, project start date**, and **accepting terms**. Inline validation messages guide users, and submission provides a success or error dialog.

---

## Features

- **Form validation** using Zod + React Hook Form
- Inline error messages for each input
- Services selection via checkboxes (multi-select)
- Optional budget field with number validation
- Project start date validation (today or later)
- Accept terms checkbox validation
- Submit button disabled while submitting
- Success/error dialogs for form submission
- Form values persist on validation errors
- Accessible and keyboard-navigable form

---

## Setup Instructions

1. Clone the repository:

```bash
git clone <your-github-repo-url>
cd client-onboarding-form-simple
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Create a `.env.local` file in the **project root**:

```env
NEXT_PUBLIC_ONBOARD_URL=https://jsonplaceholder.typicode.com/posts
```

> **Note:** `.env.local` is not included in GitHub for security reasons. The assessor should create it locally to run the project.

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open in browser: `http://localhost:3000`

---

## How RHF + Zod are Wired

- **React Hook Form (`useForm`)** manages form state, validation, and submission.
- **Zod schema** defines validation rules for all fields.
- **ZodResolver** connects Zod with React Hook Form:

```ts
const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<OnboardingFormData>({
  resolver: zodResolver(onboardingSchema)
});
```

- Inline error messages display validation errors under each input.

---

## Environment Variable

- The **API endpoint** is stored in `.env.local`:

```
NEXT_PUBLIC_ONBOARD_URL=https://jsonplaceholder.typicode.com/posts
```

- Accessed in code using:

```ts
const apiUrl = process.env.NEXT_PUBLIC_ONBOARD_URL;
```

- This allows easy swapping of endpoints without changing the code.

---

## Validation Rules (Zod Schema)

- **Full Name:** Required, 2–80 characters, letters, spaces, apostrophes, hyphens only
- **Email:** Required, valid email
- **Company Name:** Required, 2–100 characters
- **Services Interested In:** Array of selected services, at least one required
- **Budget USD:** Optional, integer between 100 and 1,000,000
- **Project Start Date:** Required, must be today or later
- **Accept Terms:** Must be checked

---

## Success & Error Handling

- **2xx response** → success dialog shows submitted data
- **Non-2xx / network error** → error dialog appears
- Submit button is disabled while submission is in progress
- Form values persist on validation errors

---

## Assumptions

- Used **JSONPlaceholder** as external API (CORS-friendly, public endpoint)
- Budget is optional
- At least one service must be selected
- Project start date validation ensures today or later
- Accept terms checkbox is required
- Form submission is client-side only (per assessment instructions)

---

## Unit Testing


This project includes unit tests for the form validation schema using **Jest**. The tests verify that:

- Valid form data passes validation.
- Invalid data, such as too short full name or terms not accepted, fails validation.

To run the tests: npm run test

---

## Project Structure

```
client-onboarding-form-simple/
│
├─ .env.local                  # Environment variable (local, not in repo)
├─ package.json
├─ next.config.js
├─ README.md
├─ app/
│   ├─ page.tsx                # Home page with OnboardingForm
│   └─ components/
│       └─ OnboardingForm.tsx  # Form component
├─ lib/
│   └─ schema.ts               # Zod validation schema
```

---

## Styling

- Styling implemented with **Tailwind CSS**
- Responsive form layout
- Focus states for accessibility
- Clear error messages under inputs

---

## Notes

- Uses **Next.js App Router** structure
- Clean code with **comments** explaining validation and logic
- Submission handled via `fetch` to external API endpoint
- `.env.local` should **not be pushed to GitHub** for security; only include public endpoints

---

## How to Run Production Build (Optional)

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

- Open in browser: `http://localhost:3000`
