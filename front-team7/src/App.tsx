import 'sanitize.css';

import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { defaultTheme, GlobalStyle } from '@/style';
import AppRouter from './Router';

const App = () => {
  return (
    <>
      <RecoilRoot>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <Suspense fallback={<div>loading...</div>}>
            <AppRouter />
          </Suspense>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
};

export default App;
