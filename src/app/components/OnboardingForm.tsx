
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema, OnboardingFormData } from "../../../lib/schema";
import { useState } from "react";


// Main form component
export default function OnboardingForm() {

  console.log("Env check:", process.env.NEXT_PUBLIC_ONBOARD_URL);
  
  const [dialogState, setDialogState] = useState<{
    visible: boolean;
    isSuccess: boolean;
    message: string;
    data?: OnboardingFormData | null;
  }>({
    visible: false,
    isSuccess: false,
    message: "",
    data: null,
  });


  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),  // Connect Zod validation
  });


   // Submit handler
  const onSubmit = async (data: OnboardingFormData) => {
    try {
      
       const apiUrl = process.env.NEXT_PUBLIC_ONBOARD_URL;
      console.log("API URL:", apiUrl); 

      if (!apiUrl) {
        setDialogState({
          visible: true,
          isSuccess: false,
          message: "API URL is not defined.",
        });
        return;
      }
      

      // POST form data to external API
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setDialogState({
          visible: true,
          isSuccess: true,
          message: "Form submitted successfully! ",
          data,
        });
        reset();
      } else {
        setDialogState({
          visible: true,
          isSuccess: false,
          message: "Please try again.",
        });
      }
    } catch (error) {
      setDialogState({
        visible: true,
        isSuccess: false,
        message: "Network error. Please check your connection.",
      });
    }
  };

  const closeDialog = () => {
    setDialogState({
      visible: false,
      isSuccess: false,
      message: "",
      data: null,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 border p-8 rounded-lg shadow-lg w-full max-w-md bg-gray-50">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block font-medium mb-1 text-gray-700">Full Name</label>
          <input
            id="fullName"
            {...register("fullName")}
            className="border p-2 w-full rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
          />
          {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-medium mb-1 text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="border p-2 w-full rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block font-medium mb-1 text-gray-700">Company Name</label>
          <input
            id="companyName"
            {...register("companyName")}
            className="border p-2 w-full rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
          />
          {errors.companyName && <p className="text-red-600 text-sm mt-1">{errors.companyName.message}</p>}
        </div>

        {/* Services */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">Services Interested In</label>
          <div className="grid grid-cols-2 gap-2">
            {["UI/UX", "Branding", "Web Dev", "Mobile App"].map((service) => (
              <div key={service} className="flex items-center space-x-2">
                <input
                  id={`service-${service.replace(/\s/g, '-')}`}
                  type="checkbox"
                  value={service}
                  {...register("services")}
                  className="rounded text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor={`service-${service.replace(/\s/g, '-')}`} className="text-gray-800">{service}</label>
              </div>
            ))}
          </div>
          {errors.services && <p className="text-red-600 text-sm mt-1">{errors.services.message}</p>}
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="budgetUsd" className="block font-medium mb-1 text-gray-700">Budget (USD)</label>
          <input
            id="budgetUsd"
            type="number"
            {...register("budgetUsd", { valueAsNumber: true })}
            className="border p-2 w-full rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            placeholder="e.g., 50000"
          />
          {errors.budgetUsd && <p className="text-red-600 text-sm mt-1">{errors.budgetUsd.message}</p>}
        </div>

        {/* Project Start Date */}
        <div>
          <label htmlFor="projectStartDate" className="block font-medium mb-1 text-gray-700">Project Start Date</label>
          <input
            id="projectStartDate"
            type="date"
            {...register("projectStartDate")}
            className="border p-2 w-full rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
          />
          {errors.projectStartDate && <p className="text-red-600 text-sm mt-1">{errors.projectStartDate.message}</p>}
        </div>

        {/* Accept Terms */}
        <div className="flex items-center space-x-2">
          <input
            id="acceptTerms"
            type="checkbox"
            {...register("acceptTerms")}
            className="rounded text-purple-600 focus:ring-purple-500"
          />
          <label htmlFor="acceptTerms" className="text-gray-800">I accept the terms</label>
          {errors.acceptTerms && <p className="text-red-600 text-sm mt-1">{errors.acceptTerms.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg shadow-md hover:shadow-lg"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Dialog Box with Blur Effect */}
      {dialogState.visible && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className={`bg-white p-8 rounded-lg shadow-xl w-full max-w-sm ${dialogState.isSuccess ? 'border-t-4 border-green-500' : 'border-t-4 border-red-500'}`}>
            <h3 className={`text-xl font-bold mb-4 ${dialogState.isSuccess ? 'text-green-600' : 'text-red-600'}`}>
              {dialogState.message}
            </h3>
            {dialogState.isSuccess && dialogState.data && (
              <div className="text-sm text-gray-700">
                <p><strong>Full Name:</strong> {dialogState.data.fullName}</p>
                <p><strong>Email:</strong> {dialogState.data.email}</p>
                <p><strong>Company Name:</strong> {dialogState.data.companyName}</p>
                <p><strong>Services:</strong> {dialogState.data.services.join(", ")}</p>
                <p><strong>Budget (USD):</strong> {dialogState.data.budgetUsd ? `$${dialogState.data.budgetUsd.toLocaleString()}` : "N/A"}</p>
                <p><strong>Project Start Date:</strong> {dialogState.data.projectStartDate}</p>
              </div>
            )}
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeDialog}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${dialogState.isSuccess ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-red-600 text-white hover:bg-red-700'}`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}