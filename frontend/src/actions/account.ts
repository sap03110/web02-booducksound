import Router from 'next/router';
import { Cookies } from 'react-cookie';

export const ID_EMPTY_MSG = '아이디를 입력해 주세요';
export const PASSWORD_EMPTY_MSG = '비밀번호를 입력해 주세요';
export const NICKNAME_EMPTY_MSG = '닉네임을 입력해 주세요';
export const headers = { 'Content-Type': 'application/json' };

export const cookie = new Cookies();

export const getCookie = () => {
  return cookie.get('token');
};

export const setCookie = (value: string) => {
  const date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000); // 1day
  cookie.set('token', value, { path: '/', expires: date });
};

export const removeCookie = () => {
  cookie.remove('token');
};

export const handleLoginUser = () => {
  const token = getCookie();
  if (token) Router.push('/lobby');
};

export const requestLogin = async (id: string, password: string) => {
  return await fetch(`http://localhost:5000/signIn`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      id,
      password,
    }),
  })
    .then((res) => res.json())
    .then(({ isLogin, message, token }) => {
      if (isLogin) {
        setCookie(token);
        Router.push('/lobby');
      } else alert(message);
    });
};

export const requestEnter = async (nickname: string, color: string) => {
  return await fetch(`http://localhost:5000/guestSignIn`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      nickname,
      color,
    }),
  })
    .then((res) => res.json())
    .then(({ isLogin, message, token }) => {
      if (isLogin) {
        setCookie(token);
        Router.push('/lobby');
      } else alert(message);
    });
};

export const requestJoin = async (id: string, password: string, nickname: string, color: string) => {
  return await fetch(`http://localhost:5000/signUp`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      id,
      password,
      nickname,
      color,
    }),
  })
    .then((res) => res.json())
    .then(({ isLogin, message, token }) => {
      if (isLogin) {
        setCookie(token);
        Router.push('/lobby');
      } else alert(message);
    });
};
