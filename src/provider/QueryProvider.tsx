import type { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface QueryProviderProps {
  children: React.ReactNode;
  dehydratedState: DehydratedState;
}

interface QueryMetaType {
  onError?: (error: unknown) => void;
  onSuccess?: (data: unknown) => void;
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        throwOnError: true,
        refetchOnMount: true,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
      mutations: {
        throwOnError: true,
      },
    },
    queryCache: new QueryCache({
      onSuccess: (data, query: { meta?: QueryMetaType }) => {
        if (query.meta?.onSuccess) query.meta.onSuccess(data);
      },
      onError: (error, query: { meta?: QueryMetaType }) => {
        if (query.meta?.onError) query.meta.onError(error);
      },
    }),
  });
}

let clientQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === 'undefined') makeQueryClient();
  if (!clientQueryClient) clientQueryClient = makeQueryClient();

  return clientQueryClient;
}

export default function QueryProvider({ children, dehydratedState }: QueryProviderProps) {
  const client = getQueryClient();

  return (
    <QueryClientProvider client={client}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
