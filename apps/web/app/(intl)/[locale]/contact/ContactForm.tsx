"use client";

import { useState, useTransition } from "react";
import type { FormEvent } from "react";
import { Input, SERVICES, Textarea, buttonClassName } from "@freight/ui";

import { submitContactInquiry } from "./contact-actions";
import type { ContactFormResult } from "./contact-actions";
import { SHIPMENT_TYPE_OPTIONS } from "./contact-options";

// Native <select>, styled like the one on the locations page — the design
// system has no Select component. Label and required marker mirror Input.
function SelectField({
  id,
  name,
  label,
  required,
  defaultValue,
  placeholder,
  options,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
  placeholder: string;
  options: ReadonlyArray<{ value: string; label: string }>;
}) {
  return (
    <div className="flex flex-col gap-tight">
      <label htmlFor={id} className="font-sans text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-danger">
            {" "}
            *
          </span>
        ) : null}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="h-10 rounded-sm border border-border bg-surface px-cozy font-sans text-sm text-foreground transition-colors duration-base ease-standard focus:border-transit"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// useTransition + pending-state pattern, same as DocumentsList.tsx/
// CustomerPicker.tsx: call the server action directly from an event
// handler, track pending locally, and react to what it returns rather than
// navigating away — this is often the visitor's only interaction with the
// site, so success gets a real confirmation state, not a toast that
// vanishes, and failure gets a real message, not silence.
//
// Two modes, decided by the contact page from the URL: with a valid service
// or industry slug the form is a shipment inquiry (extra shipment fields,
// message optional); with neither it is the general form, unchanged.
export function ContactForm({
  initialServiceSlug,
  industrySlug,
}: {
  initialServiceSlug?: string;
  industrySlug?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ContactFormResult | null>(null);
  const shipmentMode = Boolean(initialServiceSlug || industrySlug);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const outcome = await submitContactInquiry(formData);
      setResult(outcome);
    });
  }

  if (result?.status === "success") {
    return (
      <div className="flex flex-col gap-tight">
        <h2 className="font-display text-lg font-semibold text-foreground">Message sent</h2>
        <p className="text-sm text-foreground">{result.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-cozy">
      <Input id="name" name="name" label="Name" required autoComplete="name" />
      <Input id="email" name="email" type="email" label="Email" required autoComplete="email" />
      <Input id="company" name="company" label="Company (optional)" autoComplete="organization" />
      <Input id="phone" name="phone" type="tel" label="Phone (optional)" autoComplete="tel" />

      {shipmentMode ? (
        <>
          {/* The server action re-validates this against INDUSTRIES; a hidden
              field is client-controlled and never trusted. */}
          {industrySlug ? <input type="hidden" name="industry" value={industrySlug} /> : null}

          <div className="grid grid-cols-1 gap-cozy sm:grid-cols-2">
            <Input id="origin" name="origin" label="Origin" required placeholder="City or port, country" />
            <Input
              id="destination"
              name="destination"
              label="Destination"
              required
              placeholder="City or port, country"
            />
          </div>
          <div className="grid grid-cols-1 gap-cozy sm:grid-cols-2">
            <SelectField
              id="service"
              name="service"
              label="Preferred service"
              required
              defaultValue={initialServiceSlug}
              placeholder="Select a service"
              options={SERVICES.map((entry) => ({ value: entry.slug, label: entry.label }))}
            />
            <SelectField
              id="shipmentType"
              name="shipmentType"
              label="Shipment type (optional)"
              placeholder="Select a type"
              options={SHIPMENT_TYPE_OPTIONS}
            />
          </div>
          <Textarea
            id="cargoDescription"
            name="cargoDescription"
            label="Cargo description (optional)"
            rows={3}
          />
          <div className="grid grid-cols-1 gap-cozy sm:grid-cols-2">
            <Input
              id="totalWeightKg"
              name="totalWeightKg"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              label="Total weight, kg (optional)"
            />
            <Input
              id="packageCount"
              name="packageCount"
              type="number"
              inputMode="numeric"
              min="1"
              step="1"
              label="Number of packages (optional)"
            />
          </div>
          <Input
            id="dimensions"
            name="dimensions"
            label="Dimensions (optional)"
            placeholder="e.g. 120 x 80 x 100 cm per package"
          />
          <Input
            id="containerRequirements"
            name="containerRequirements"
            label="Container requirements (optional)"
            placeholder="e.g. 1 x 40 ft high-cube"
          />
          <Textarea
            id="specialHandling"
            name="specialHandling"
            label="Special handling (optional)"
            rows={3}
          />
          <Input
            id="preferredShippingDate"
            name="preferredShippingDate"
            type="date"
            label="Preferred shipping date (optional)"
          />
          <Textarea id="message" name="message" label="Message (optional)" rows={5} />
        </>
      ) : (
        <Textarea id="message" name="message" label="Message" rows={5} required />
      )}

      {result?.status === "error" ? (
        <p role="alert" className="font-sans text-sm text-danger">
          {result.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className={buttonClassName("primary", "md")}
      >
        {isPending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
