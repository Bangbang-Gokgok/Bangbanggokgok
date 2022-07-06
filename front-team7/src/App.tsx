import 'sanitize.css';

import { ThemeProvider } from 'styled-components';
import { defaultTheme, GlobalStyle } from '@/style';
import AppRouter from './Router';

const App = () => {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <AppRouter isLoggedIn={false} />
      </ThemeProvider>
    </>
  );
};

export default App;
