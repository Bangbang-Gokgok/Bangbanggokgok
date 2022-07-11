import 'sanitize.css';

import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { defaultTheme, GlobalStyle } from '@/style';
import { useLogin } from '@/features/auth';
import { useAxiosInterceptor } from '@/lib';
import AppRouter from './Router';

const App = () => {
  // useLogin();
  // useAxiosInterceptor();

  return (
    <>
      <RecoilRoot>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <AppRouter isLoggedIn={false} />
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
};

export default App;
