"use client";

import { FC, useEffect } from "react";

interface IInvoiceErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const InvoiceError: FC<IInvoiceErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    console.warn(error.message);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">{error.message}</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
};

export default InvoiceError;
