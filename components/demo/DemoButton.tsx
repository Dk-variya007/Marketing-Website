"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Button, type ButtonProps } from "../ui/Button";
import { useDemo } from "./DemoProvider";

/** A Button that opens the site-wide demo modal. Usable from server components. */
export function DemoButton({ children = "Book a Demo", icon, ...props }: Omit<ButtonProps, "onClick" | "href">) {
  const { openDemo } = useDemo();
  return (
    <Button onClick={openDemo} icon={icon === undefined ? <ArrowRight className="h-4 w-4" /> : icon} {...props}>
      {children}
    </Button>
  );
}
