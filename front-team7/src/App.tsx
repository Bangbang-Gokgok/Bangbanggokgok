import 'sanitize.css';

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
          <AppRouter />
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
};

export default App;
