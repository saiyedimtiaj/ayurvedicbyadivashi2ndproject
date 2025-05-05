"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        toastOptions={{
          style: {
            background: "green",
            color: "white",
            border: "none",
          },
        }}
      />
      {children}
    </QueryClientProvider>
  );
};

export default Provider;
