import bill from '@/assets/images/bill.jpg';

import { Main } from '@/components/Layout';
import { Avartar } from '@/components/Avatar';
import { UserInfo } from '@/components/UserInfo';
import { FeedFolded } from '@/components/FeedFolded';
import { flex } from 'styled-system';

const Home = () => {
  return (
    <Main>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Avartar size="sm" />
        <Avartar size="md" />
        <Avartar kind="square" size="lg" />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Avartar kind="circle" size="sm" src={bill as string} />
        <Avartar kind="circle" size="md" src={bill as string} />
        <Avartar kind="circle" size="lg" src={bill as string} />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <UserInfo name="Bill Gates" image={bill as string} />
        <UserInfo name="unknown" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <FeedFolded name="Bill Gates" image={bill as string} title="가평에서 보낸 하룻밤 😋" />
        <FeedFolded
          name="Bill Gates"
          image={bill as string}
          title="내가 마소에 있을 때 말이지... 😎"
        />
        <FeedFolded name="xxxx" title="맛집을 찾았다! " />
      </div>
    </Main>
  );
};

export default Home;
