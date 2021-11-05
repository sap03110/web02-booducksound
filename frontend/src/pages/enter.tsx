import { useState } from 'react';

import styled from '@emotion/styled';
import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';

import Button from '../components/atoms/Button';
import InputBox from '../components/atoms/InputBox';
import MenuInfoBox from '../components/atoms/MenuInfoBox';
import PageBox from '../components/atoms/PageBox';
import ProfileSelector from '../components/atoms/ProfileSelector';
import theme from '../styles/theme';

import { NICKNAME_EMPTY_MSG } from './join';
import { headers, getToken, setToken } from './login';

const EnterContainer = styled.div`
  position: fixed;
  width: calc(100vw - 8rem);
  height: max-content;
  margin: auto;
  text-align: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  @media (max-width: 768px) {
    button {
      width: calc(100% - 2rem);
    }
  }
  @media (max-width: 480px) {
    button {
      width: 90%;
    }
  }
`;

const InputContainer = styled.div`
  width: fit-content;
  margin: 0 auto;

  a {
    margin-top: 3rem;
    display: block;
  }

  @media (max-width: 768px) {
    > * {
      width: 100% !important;
    }
    button {
      width: 90%;
    }
  }
`;

const Enter: NextPage = () => {
  const [nickname, setNickname] = useState('');
  const [color, setColor] = useState('fff');

  const handleEnter = async () => {
    if (!nickname) alert(NICKNAME_EMPTY_MSG);
    else {
      await fetch(`http://localhost:5000/enter`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          nickname,
        }),
      })
        .then((res) => res.json())
        .then(({ isLogin, message, token }) => {
          if (isLogin) {
            setToken(token);
            Router.push('/lobby');
          } else alert(message);
        });
    }
  };

  return (
    <>
      <MenuInfoBox name="비회원 로그인" />
      <PageBox>
        <EnterContainer>
          <ProfileSelector color={color} setColor={setColor}></ProfileSelector>
          <InputContainer>
            <InputBox
              isSearch={false}
              placeholder="닉네임을 입력하세요."
              width={'100%'}
              height={'80px'}
              fontSize={'20px'}
              value={nickname}
              onChangeHandler={({ target }) => setNickname(target.value)}
            ></InputBox>
            <a>
              <Button
                width={'480px'}
                background={theme.colors.sky}
                fontSize={'30px'}
                paddingH={'24px'}
                content={'참여하기'}
                onClick={handleEnter}
              />
            </a>
          </InputContainer>
        </EnterContainer>
      </PageBox>
    </>
  );
};

export default Enter;
