import { QueryCache, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.error("Error", error, query);
    }
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, //* 5 minutes
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});

export default queryClient;
