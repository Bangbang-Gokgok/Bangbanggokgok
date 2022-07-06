import 'sanitize.css';

import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { defaultTheme, GlobalStyle } from '@/style';

import Home from '@/pages/Home';
//  나중에 test하고 지우고 push 할지 이야기해보기
import FeedDetail from '@/components/Layout/FeedDetail/FeedDetail';

const App = () => {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* 나중에 test하고 지우고 push 할지 이야기해보기 */}
            <Route path="/feed-detail" element={<FeedDetail />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
