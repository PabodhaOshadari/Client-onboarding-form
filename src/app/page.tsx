
import OnboardingForm from "./components/OnboardingForm";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-amber-100">
      <h1 className="text-4xl font-extrabold uppercase mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-purple-600 animated-gradient">
        Client Onboarding Form
      </h1>
      <OnboardingForm />
    </main>
  );
}