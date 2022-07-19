import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TbReportSearch, TbTrash } from 'react-icons/tb';
import { BiCommentDots } from 'react-icons/bi';

import { useGetAllFeeds } from '@/features/admin/api';
import { deleteOneFeedByAdmin } from '@/api/feeds';

export const AdminFeed = () => {
  const feeds = useGetAllFeeds();

  if (!feeds || feeds.length === 0) return <div>피드 정보가 없습니다.</div>;

  return (
    <StyledAdminFeed>
      <ul className="feed-ul">
        {feeds?.map((feed) => {
          const date = new Date(feed.createdAt as string);

          const convertedDate = `${date.getFullYear()}년 ${
            date.getMonth() + 1
          }월 ${date.getDate()}일`;

          return (
            <li className="feed-list" key={feed._id}>
              <div className="first-line-container">
                <div>
                  <span className="title">작성자: </span>
                  <span className="content">{feed.userName}</span>
                </div>
                <div className="icon-container">
                  <Link to={`/feedmap/${feed.userId}`} className="icon">
                    <TbReportSearch />
                  </Link>
                  <button className="icon">
                    <BiCommentDots />
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm('해당 게시글을 정말 삭제하시겠습니까?'))
                        await deleteOneFeedByAdmin(feed._id);
                    }}
                    className="icon"
                  >
                    <TbTrash />
                  </button>
                </div>
              </div>
              <div>
                <span className="title">제목: </span>
                <span className="content">{feed.title}</span>
              </div>
              <div className="description">
                <span className="title">내용: </span>
                <span className="content">{feed.description}</span>
              </div>
              <div>
                <span className="title">작성일: </span>
                <span className="content">{convertedDate}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </StyledAdminFeed>
  );
};

const StyledAdminFeed = styled.div`
  .feed-ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 0;
    padding: 10px;

    .feed-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      border-radius: 7px;
      color: #a3a3a3;
      list-style: none;
      padding: 15px 12px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

      .first-line-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .description {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .icon-container {
        display: flex;

        .icon {
          display: flex;
          align-items: center;
          font-size: 2rem;
          background: none;
          border: none;
          padding: 3px 6px;
          color: #a3a3a3;
          transition: color 0.3s ease;
          cursor: pointer;

          &:hover {
            color: gold;
          }
        }
      }
    }
  }
`;
