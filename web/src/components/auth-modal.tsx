import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuthStore } from '../stores/auth-store';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/core';

const schema = yup.object().shape({
  email: yup.string().email('Must be a valid email'),
  password: yup.string(),
});

export function createAuthModal({ isSignup }: { isSignup: boolean }) {
  const title = isSignup ? 'Sign Up' : 'Log In';

  const AuthModal = ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) => {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const { register, handleSubmit, errors } = useForm<{
      email: string;
      password: string;
    }>({
      mode: 'onChange',
      resolver: yupResolver(schema),
    });
    const login = useAuthStore(state =>
      isSignup ? state.actions.signup : state.actions.login
    );
    const onSubmit = handleSubmit(login);

    return (
      <Modal
        closeOnOverlayClick={false}
        isCentered
        initialFocusRef={emailRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={onSubmit}>
              <ModalBody>
                <FormControl
                  isInvalid={!!errors.email}
                  isRequired
                  mb={2}
                  minH={102}
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    ref={e => {
                      register(e);
                      emailRef.current = e;
                    }}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password} isRequired>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input type="password" name="password" ref={register} />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    );
  };
  AuthModal.displayName = isSignup ? 'SignUp' : 'Login';

  return AuthModal;
}

export const Login = createAuthModal({ isSignup: false });

export const Signup = createAuthModal({ isSignup: true });
