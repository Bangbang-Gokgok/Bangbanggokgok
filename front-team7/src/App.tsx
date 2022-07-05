import { GlobalStyle } from '@/commons/design-system/global-style';
import { useEffect, useState } from 'react';

import Hi from '@/commons/Hi';

const App = () => {
  const [hi, setHi] = useState('how!');

  const apiFetchData = async () => {
    const res = await fetch('/api/data', {
      method: 'GET',
    });

    const data = (await res.json()) as { message: string };
    console.log(data);

    return data;
  };

  const authFetchData = async () => {
    const res = await fetch('/auth/data', {
      method: 'GET',
    });

    const data = (await res.json()) as { message: string };
    console.log(data);

    return data;
  };

  useEffect(() => {
    apiFetchData().catch((e) => console.log(e));
    authFetchData().catch((e) => console.log(e));
  }, []);

  return (
    <>
      <GlobalStyle />
      <Hi hi={hi} />
      <Hi hi={hi} />
      <Hi hi={'asdasdas'} />
    </>
  );
};

export default App;
