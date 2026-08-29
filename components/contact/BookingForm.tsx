"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CONSULTATION_TIERS, TIMEZONES, SCHEDULING } from "@/lib/constants";

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

const field =
  "w-full rounded-[2px] border border-[var(--line)] bg-[var(--void)] px-[15px] py-[13px] text-[17px] text-[var(--bone)] transition-colors focus:border-[var(--nd)]";

export default function BookingForm({ selectedPlanId }: { selectedPlanId: string | null }) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookingFormValues>({ resolver: zodResolver(bookingSchema) });

  const tier = CONSULTATION_TIERS.find((t) => t.id === selectedPlanId);
  const hasScheduler = Boolean(selectedPlanId && SCHEDULING[selectedPlanId]);

  useEffect(() => {
    if (selectedPlanId) setValue("consultationType", selectedPlanId);
  }, [selectedPlanId, setValue]);

  const onSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4500);
  };

  const err = (m?: string) => m && <p className="mt-[7px] text-[15px] text-[var(--crit)]">{m}</p>;

  return (
    <div className="rv border border-[var(--line)] p-9">
      {tier && (
        <div className="mb-[26px] border-l-2 border-[var(--nd)] bg-[var(--nd-soft)] px-[18px] py-3.5 text-[16.5px] font-light text-[var(--mute)]">
          Selected: <b className="font-semibold text-[var(--bone)]">{tier.name}</b> — you will
          receive a calendar link and confirmation within two business hours.
          {!hasScheduler && (
            <span className="mono mt-2 block text-[var(--dim)]">
              This tier is handled by request rather than self-serve booking
            </span>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[22px]">
        <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2">
          <div>
            <label className="mono mb-2 block text-[var(--dim)]" htmlFor="fn">
              First name
            </label>
            <input id="fn" {...register("firstName")} className={field} />
            {err(errors.firstName?.message)}
          </div>
          <div>
            <label className="mono mb-2 block text-[var(--dim)]" htmlFor="ln">
              Last name
            </label>
            <input id="ln" {...register("lastName")} className={field} />
            {err(errors.lastName?.message)}
          </div>
        </div>

        <div>
          <label className="mono mb-2 block text-[var(--dim)]" htmlFor="og">
            Organisation
          </label>
          <input id="og" {...register("organisation")} className={field} />
          {err(errors.organisation?.message)}
        </div>

        <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2">
          <div>
            <label className="mono mb-2 block text-[var(--dim)]" htmlFor="em">
              Email
            </label>
            <input id="em" type="email" {...register("email")} className={field} />
            {err(errors.email?.message)}
          </div>
          <div>
            <label className="mono mb-2 block text-[var(--dim)]" htmlFor="ph">
              Phone
            </label>
            <input id="ph" type="tel" {...register("phone")} className={field} />
            {err(errors.phone?.message)}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2">
          <div>
            <label className="mono mb-2 block text-[var(--dim)]" htmlFor="ct">
              Consultation type
            </label>
            <select id="ct" {...register("consultationType")} className={field} defaultValue="">
              <option value="">Select…</option>
              {CONSULTATION_TIERS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            {err(errors.consultationType?.message)}
          </div>
          <div>
            <label className="mono mb-2 block text-[var(--dim)]" htmlFor="tz">
              Preferred timezone
            </label>
            <select id="tz" {...register("timezone")} className={field} defaultValue="">
              <option value="">Select…</option>
              {TIMEZONES.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
            {err(errors.timezone?.message)}
          </div>
        </div>

        <div>
          <label className="mono mb-2 block text-[var(--dim)]" htmlFor="ms">
            Message
          </label>
          <textarea
            id="ms"
            {...register("message")}
            placeholder="Briefly describe your challenge or objective for Dr Gopalan — the more context you provide, the more productive the session."
            className={`${field} min-h-[104px] resize-y font-light leading-[1.6]`}
          />
          {err(errors.message?.message)}
        </div>

        <button
          type="submit"
          className={`w-full rounded-[2px] p-[17px] text-[17px] font-semibold text-[var(--void)] transition-colors duration-300 ${
            submitted ? "bg-[var(--flux)]" : "bg-[var(--nd)] hover:bg-[var(--nd-hi)]"
          }`}
        >
          {submitted ? "Booking confirmed — Dr Gopalan will be in touch" : "Confirm booking request"}
        </button>
      </form>
    </div>
  );
}
