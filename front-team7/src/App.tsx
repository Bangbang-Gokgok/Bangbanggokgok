import { GlobalStyle } from '@/commons/design-system/global-style';
import Hi from '@/commons/Hi';
import { useState } from 'react';

const App = () => {
  const [hi, setHi] = useState('wow!');
  // console.log('process.env.SERVER_PORT :', process.env.SERVER_PORT);
  return (
    <>
      <GlobalStyle />
      <Hi hi={hi} />
    </>
  );
};

export default App;
