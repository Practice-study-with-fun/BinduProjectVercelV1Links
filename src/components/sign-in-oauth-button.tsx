"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";

interface SignInOauthButtonProps {
  provider: "google" | "github";
  signUp?: boolean;
  className?: string;
}

export const SignInOauthButton = ({
  provider,
  signUp,
  className,
}: SignInOauthButtonProps) => {
  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    setIsPending(true);

    await signIn.social({
      provider,
      callbackURL: "/payments",
      errorCallbackURL: "/auth/login/error",
    });

    setIsPending(false);
  }

  const action = signUp ? "Up" : "In";
  const providerName = provider === "google" ? "Google" : "GitHub";

  return (
    <Button onClick={handleClick} disabled={isPending} className={className}>
      Sign {action} with {providerName}
    </Button>
  );
};
