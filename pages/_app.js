import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Provider } from 'next-auth/client';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

export default function App({ Component, pageProps }) {
  const { session } = pageProps;
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Provider session={session}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  );
}
