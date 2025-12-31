import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CONTACT_EMAIL } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").trim(),
  email: z.string().email("Email inválido").min(1, "El email es requerido"),
  message: z.string().min(1, "El mensaje es requerido").trim(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export function useContactForm() {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  const onSubmit = (data: ContactFormData) => {
    const subject = `Contacto desde Portfolio - ${data.name}`;
    const body = `Nombre: ${data.name}\nEmail: ${data.email}\n\nMensaje:\n${data.message}`;

    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  const nameValue = watch("name");
  const emailValue = watch("email");
  const messageValue = watch("message");

  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  const createBlurHandler = (
    field: string,
    value: string | undefined,
    onBlur: (
      e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
  ) => {
    return (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onBlur(e);
      if (!value) {
        setFocusedField(null);
      }
    };
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    isValid,
    focusedField,
    handleFocus,
    createBlurHandler,
    nameValue,
    emailValue,
    messageValue,
  };
}
