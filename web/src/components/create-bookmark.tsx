import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { BsX } from 'react-icons/bs';
import { Button, HStack, Input, useBreakpointValue } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryCache } from 'react-query';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import IconButton from './icon-button';
import { bookmarks } from '../api';
import { useAuthStore } from '../stores/auth-store';
import { queryCacheKeys } from '../utils/constants';

interface CreateBookmarkForm {
  url: string;
}

interface CreateBookmarkProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Form = styled.form`
  display: flex;
  width: 100%;
`;

const URL_REGEX = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

const schema = yup.object().shape({
  url: yup.string().trim().matches(URL_REGEX, 'Must be a valid URL').required(),
});

function CreateBookmark({ isOpen, onToggle }: CreateBookmarkProps) {
  const isSmallScreen = useBreakpointValue<boolean>({ sm: true, md: false });
  const user = useAuthStore(useCallback(state => state.user, []));
  const { register, reset, handleSubmit } = useForm<CreateBookmarkForm>({
    resolver: yupResolver(schema),
  });
  const queryCache = useQueryCache();

  const resetForm = useCallback(() => {
    reset();
    onToggle();
  }, [reset, onToggle]);

  const [mutate] = useMutation(bookmarks.create, {
    onSuccess: response => {
      queryCache.setQueryData(
        queryCacheKeys.bookmarks,
        (old?: bookmarks.Bookmark[]) => {
          if (!old) return [response.data];
          return [response.data, ...old];
        }
      );
      resetForm();
    },
    onError: (error: Error) => {
      toast.error(error.message);
      resetForm();
    },
    throwOnError: true,
  });

  const onSubmit = handleSubmit(
    data => {
      mutate({ user_id: user!.id, ...data });
    },
    errors => {
      toast.error(errors.url!.message);
      resetForm();
    }
  );

  if (isOpen) {
    return (
      <Form onSubmit={onSubmit}>
        <HStack ml={{ sm: 10, md: 24 }} spacing={2} w="full">
          <Input
            ref={register}
            name="url"
            placeholder="Save a URL https://..."
            type="text"
          />
          {isSmallScreen && (
            <IconButton icon={<BsX size="1.5rem" />} onClick={onToggle}>
              Cancel
            </IconButton>
          )}
          {!isSmallScreen && (
            <>
              <Button colorScheme="blue" type="submit">
                Save
              </Button>
              <Button variant="outline" onClick={onToggle}>
                Cancel
              </Button>
            </>
          )}
        </HStack>
      </Form>
    );
  }

  return null;
}

export default CreateBookmark;
