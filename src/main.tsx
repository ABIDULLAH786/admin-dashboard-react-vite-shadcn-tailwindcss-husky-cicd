import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index.tsx';
import ErrorBoundary from '@/providers/ErrorBoundary'; //
import ErrorFallback from './components/common/ErrorFallback.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from "@/components/ui/tooltip"

// Configure the "Zero-Stale" Manager
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // Market data is always considered old
      gcTime: 1000 * 60 * 5, // Keep in memory for 5 mins
      retry: 1, // Only retry once to avoid spamming Binance API
      refetchOnWindowFocus: true, // Refresh when user switches back to tab
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={0}>
      <ErrorBoundary
        // For the global level, we usually hide retry or make it "Refresh Page"
        fallback={(error) => (
          <div className="h-screen w-screen  flex items-center justify-center">
            <ErrorFallback
              error={error}
              onRetry={() => window.location.reload()} // Global retry = Page Refresh
              title="Application Error"
            />
          </div>
        )}
      >
        <RouterProvider router={router} />
      </ErrorBoundary>
        </TooltipProvider>

    </QueryClientProvider>

  </StrictMode>
);