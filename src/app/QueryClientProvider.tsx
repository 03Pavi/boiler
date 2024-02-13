import {
  QueryClientProvider as ClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import React, { ReactNode } from "react";

const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return <ClientProvider client={queryClient}>{children}</ClientProvider>;
};

export default QueryClientProvider;
