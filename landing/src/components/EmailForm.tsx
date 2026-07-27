"use client";

import { useId, useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function EmailForm({
  source,
  ctaLabel = "가장 먼저 체험해보기",
  align = "left",
}: {
  source: string;
  ctaLabel?: string;
  align?: "left" | "center";
}) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const honeypotId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, source }),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(
          data.error === "INVALID_EMAIL"
            ? "이메일 형식을 다시 확인해주세요."
            : "잠시 후 다시 시도해주세요."
        );
      }

      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "잠시 후 다시 시도해주세요."
      );
    }
  }

  if (status === "success") {
    return (
      <p
        className={`text-sm font-medium text-up ${align === "center" ? "text-center" : ""}`}
      >
        등록 완료! 가장 먼저 체험 소식을 알려드릴게요.
      </p>
    );
  }

  return (
    <div className={`w-full max-w-md ${align === "center" ? "mx-auto" : ""}`}>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-2 sm:flex-row"
        noValidate
      >
        <div className="hidden" aria-hidden="true">
          <label htmlFor={honeypotId}>회사명</label>
          <input
            id={honeypotId}
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </div>

        <input
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110 disabled:opacity-60"
        >
          {status === "loading" ? "등록 중..." : ctaLabel}
        </button>
      </form>

      {status === "error" && (
        <p className={`mt-2 text-xs text-down ${align === "center" ? "text-center" : ""}`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
