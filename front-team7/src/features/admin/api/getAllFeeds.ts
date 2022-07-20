import { useState, useEffect } from 'react';

import { getAllFeeds } from '@/api/feeds';
import { type FeedsResponse } from '@/store';

export const useGetAllFeeds = () => {
  const [feeds, setFeeds] = useState<Partial<FeedsResponse>[] | null>([]);

  useEffect(() => {
    getAllFeeds()
      .then((res) => setFeeds(res))
      .catch((e) => console.log(e));
  }, [feeds]);

  return feeds;
};
