import 'sanitize.css';

import { ThemeProvider } from 'styled-components';
import { defaultTheme, GlobalStyle } from '@/style';
import AppRouter from './Router';

const App = () => {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <AppRouter isLoggedIn={true} />
      </ThemeProvider>
    </>
  );
};

export default App;
