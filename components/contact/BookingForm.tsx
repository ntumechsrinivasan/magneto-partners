"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CONSULTATION_TIERS, TIMEZONES } from "@/lib/constants";

const bookingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  organisation: z.string().min(1, "Organisation is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  consultationType: z.string().min(1, "Select a consultation type"),
  timezone: z.string().min(1, "Select a timezone"),
  message: z.string().min(10, "Please provide at least 10 characters of context"),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const inputClass =
  "w-full rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[13px] text-[var(--text)] transition-colors focus:border-[var(--border2)]";
const labelClass = "mb-1.5 block text-[11.5px] font-medium text-[var(--text2)]";

interface BookingFormProps {
  selectedPlanId: string | null;
}

export default function BookingForm({ selectedPlanId }: BookingFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  const selectedTier = CONSULTATION_TIERS.find((t) => t.id === selectedPlanId);

  useEffect(() => {
    if (selectedPlanId) {
      setValue("consultationType", selectedPlanId);
    }
  }, [selectedPlanId, setValue]);

  const onSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4500);
  };

  return (
    <div className="rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-8">
      {selectedTier && (
        <div className="mb-6 rounded-[8px] border border-[rgba(0,184,255,0.14)] bg-[rgba(0,184,255,0.05)] px-4 py-3 text-[12.5px] text-[var(--text2)]">
          Selected: <strong className="text-white">{selectedTier.name}</strong> — You will
          receive a calendar link and confirmation within 2 business hours.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>First Name</label>
            <input {...register("firstName")} className={inputClass} />
            {errors.firstName && (
              <p className="mt-1 text-[11px] text-[#ff6b6b]">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input {...register("lastName")} className={inputClass} />
            {errors.lastName && (
              <p className="mt-1 text-[11px] text-[#ff6b6b]">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className={labelClass}>Organisation</label>
          <input {...register("organisation")} className={inputClass} />
          {errors.organisation && (
            <p className="mt-1 text-[11px] text-[#ff6b6b]">{errors.organisation.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" {...register("email")} className={inputClass} />
            {errors.email && <p className="mt-1 text-[11px] text-[#ff6b6b]">{errors.email.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input type="tel" {...register("phone")} className={inputClass} />
            {errors.phone && <p className="mt-1 text-[11px] text-[#ff6b6b]">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Consultation Type</label>
            <select {...register("consultationType")} className={inputClass} defaultValue="">
              <option value="" disabled>
                Select a consultation type
              </option>
              {CONSULTATION_TIERS.map((tier) => (
                <option key={tier.id} value={tier.id}>
                  {tier.name}
                </option>
              ))}
            </select>
            {errors.consultationType && (
              <p className="mt-1 text-[11px] text-[#ff6b6b]">{errors.consultationType.message}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Preferred Timezone</label>
            <select {...register("timezone")} className={inputClass} defaultValue="">
              <option value="" disabled>
                Select a timezone
              </option>
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
            {errors.timezone && (
              <p className="mt-1 text-[11px] text-[#ff6b6b]">{errors.timezone.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className={labelClass}>Message</label>
          <textarea
            {...register("message")}
            className={`${inputClass} min-h-[90px] resize-y`}
            placeholder="Briefly describe your challenge or objective for Dr Gopalan — the more context you provide, the more productive the session."
          />
          {errors.message && (
            <p className="mt-1 text-[11px] text-[#ff6b6b]">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full rounded-[6px] px-6 py-4 font-[family-name:var(--font-heading)] text-[12.5px] font-bold uppercase tracking-[0.06em] text-white transition-all duration-300 ${
            submitted
              ? "bg-[linear-gradient(135deg,#00c48c,#00ffb8)]"
              : "bg-[linear-gradient(135deg,#3a6fff,#00b8ff)] hover:-translate-y-0.5"
          }`}
        >
          {submitted ? "BOOKING CONFIRMED — DR GOPALAN WILL BE IN TOUCH ✓" : "CONFIRM BOOKING REQUEST →"}
        </button>
      </form>
    </div>
  );
}
