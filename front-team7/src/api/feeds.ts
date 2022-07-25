import { axios } from '@/lib';
import { FeedListProps } from '@/types/feed';

import { type FeedsResponse } from '@/store';
import { FeedProps } from 'semantic-ui-react';

export const getAllFeeds = async () => {
  return await axios.get<never, FeedsResponse[]>('/api/feeds/list');
};

export const getOneFeed = async (id) => {
  return await axios.get(`/api/feeds/${id}`);
};

export const getFeedListUsingPagination = async (page, perPage) => {
  return await axios.get<FeedListProps, number>('/api/feeds/page/list', {
    params: {
      page: page,
      perPage: perPage,
    },
  });
};

export const createOneFeed = async (sendData) => {
  return await axios.post<never, FeedProps>(`/api/feeds`, sendData, {
    headers: { 'Content-Type': `application/json` },
  });
};

export const updateOneFeed = async (id, sendData) => {
  return await axios.put<never, FeedProps>(`/api/feeds/${id}`, sendData, {
    headers: { 'Content-Type': `application/json` },
  });
};

export const deleteOneFeed = async (id) => {
  return await axios.delete<never, FeedProps>(`/api/feeds/${id}`);
};

export const getUserFeedList = async (userId) => {
  return await axios.get<never, FeedListProps>(`/api/feeds/list/${userId}`);
};

export const deleteOneFeedByAdmin = async (id?: string) => {
  return await axios.delete(`/api/admins/feeds/${id}`);
};