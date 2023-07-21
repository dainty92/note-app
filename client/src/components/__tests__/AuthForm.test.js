import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AuthForm from '../AuthForm';

test('AuthForm submits login form data', () => {
  const onLogin = jest.fn();
  const { queryByLabelText, getByText } = render(
    <AuthForm onLogin={onLogin} loginError={null} registerError={null} />
  );

  const loginUsernameInput = queryByLabelText('login-username');
  const loginPasswordInput = queryByLabelText('login-password');
  const loginButton = getByText('Login');

  fireEvent.change(loginUsernameInput, { target: { value: 'testuser' } });
  fireEvent.change(loginPasswordInput, { target: { value: 'testpassword' } });
  fireEvent.click(loginButton);

  expect(onLogin).toHaveBeenCalledWith({ username: 'testuser', password: 'testpassword' });
});

test('AuthForm submits register form data', () => {
  const onRegister = jest.fn();
  const { queryByLabelText, getByText } = render(
    <AuthForm onRegister={onRegister} loginError={null} registerError={null} />
  );

  const registerUsernameInput = queryByLabelText('register-username');
  const registerPasswordInput = queryByLabelText('register-password');
  const registerButton = getByText('Register');

  fireEvent.change(registerUsernameInput, { target: { value: 'newuser' } });
  fireEvent.change(registerPasswordInput, { target: { value: 'newpassword' } });
  fireEvent.click(registerButton);

  expect(onRegister).toHaveBeenCalledWith({ username: 'newuser', password: 'newpassword' });
});

test('AuthForm displays login error', () => {
  const loginError = 'Invalid credentials';
  const { getByText } = render(
    <AuthForm onLogin={() => {}} loginError={loginError} registerError={null} />
  );

  const errorElement = getByText(loginError);
  expect(errorElement).toBeInTheDocument();
});

test('AuthForm displays register error', () => {
  const registerError = 'Username already exists';
  const { getByText } = render(
    <AuthForm onRegister={() => {}} loginError={null} registerError={registerError} />
  );

  const errorElement = getByText(registerError);
  expect(errorElement).toBeInTheDocument();
});
