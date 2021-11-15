import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SSRProvider } from 'react-bootstrap';

const queryClient = new QueryClient();

function __App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SSRProvider>
        {process.env.NODE_ENV === 'development' ? <ReactQueryDevtools /> : null}

        <Component {...pageProps} />
      </SSRProvider>
    </QueryClientProvider>
  );
}

export default __App;
