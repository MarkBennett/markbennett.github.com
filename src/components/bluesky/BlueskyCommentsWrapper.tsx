import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BlueskyComments from "./BlueskyComments";

// Polling interval in milliseconds (60 seconds = 1 minute)
const COMMENT_POLL_INTERVAL = 60000;

// Create a client instance (outside component to persist across renders)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: COMMENT_POLL_INTERVAL, // Consider data fresh for same duration as poll interval
      refetchOnWindowFocus: true, // Refetch when tab gains focus
      retry: 1, // Only retry once on failure
    },
  },
});

interface BlueskyCommentsWrapperProps {
  postUrl: string;
}

export default function BlueskyCommentsWrapper({
  postUrl,
}: BlueskyCommentsWrapperProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <BlueskyComments postUrl={postUrl} />
    </QueryClientProvider>
  );
}
