"use client";

import { Button, CircularProgress, Input } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";

type LoginInput = {
  email: string;
  dynamic: string;
};

const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .trim()
    .min(1, { message: "An email is required" }),
  dynamic: z
    .string()
    .trim()
    .min(1, { message: "A dynamic string is required" }),
});

export default function SendEmailForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSend = async (values: LoginInput) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }
      toast.success("Email sent, please check your inbox");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong, please try again later");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSend)}
      className="flex justify-center items-center flex-col gap-4 w-full p-8"
    >
      <Input
        size="lg"
        variant="underlined"
        id="email"
        {...register("email")}
        className="mb-8"
        label="Email Address"
        errorMessage={errors.email?.message}
      />
      <Input
        size="lg"
        variant="underlined"
        id="dynamic"
        {...register("dynamic")}
        className="mb-8"
        label="Dynamic Value"
        errorMessage={errors.dynamic?.message}
      />
      <Button
        className="mx-auto mb-6"
        type="submit"
        aria-label="Subscribe"
        color="warning"
        radius="full"
        size="lg"
      >
        {isSubmitting ? (
          <CircularProgress
            color="default"
            strokeWidth={3}
            aria-label="Progress indicator"
          />
        ) : (
          <p className="font-bold text-white">Send Email</p>
        )}
      </Button>
    </form>
  );
}
