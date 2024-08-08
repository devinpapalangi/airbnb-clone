"use client";

import React, { useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface Props {
  error: Error;
}

const ErrorState: React.FC<Props> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, []);

  return <EmptyState title="Uh Oh" subtitle="Something went wrong" />;
};

export default ErrorState;
