import { useState, useEffect } from 'react';
import { axios } from '@/lib';

export const useGetReviews = (feedId: string) => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    async function getReviews() {
      const reviewData = await axios.get(`/api/reviews/page/list/feed/${feedId}`, {
        params: {
          page,
          perPage,
        },
      });
      return reviewData;
    }

    getReviews()
      .then(setReviews)
      .catch((e) => console.log(e));
  }, [page]);

  return [reviews, setPage];
};
