import { Heading } from '@chakra-ui/core';
import React from 'react';
import { useQuery } from 'react-query';
import { client } from '../api/client';
import { queryCacheKeys } from '../utils/constants';

function Bookmarks() {
  const {
    isLoading,
    error,
    data: bookmarks,
  } = useQuery(queryCacheKeys.bookmarks, () =>
    client.get('bookmarks').then(({ data }) => data)
  );
  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong...</div>;

  return (
    <>
      <Heading mb={3} size="md">
        My List
      </Heading>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <ul>
          {bookmarks.map((bookmark: any) => (
            <li key={bookmark.id}>{bookmark.url}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Bookmarks;
