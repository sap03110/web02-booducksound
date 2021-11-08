import { useState } from 'react';

import styled from '@emotion/styled';
import { NextPage } from 'next';

import { requestLogin, ID_EMPTY_MSG, PASSWORD_EMPTY_MSG } from '~/api/account';
import Button from '~/atoms/Button';
import InputBox from '~/atoms/InputBox';
import MenuInfoBox from '~/atoms/MenuInfoBox';
import PageBox from '~/atoms/PageBox';
import theme from '~/styles/theme';

const LoginContainer = styled.div`
  position: fixed;
  width: calc(100vw - 8rem);
  height: max-content;
  margin: auto;
  text-align: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const SearchPwdBtn = styled.a`
  color: ${theme.colors.deepgray};
  text-align: center;
  margin-top: 1.5rem;
`;

const InputContainer = styled.div`
  width: fit-content;
  margin: 0 auto;

  > * {
    margin: 0 auto 0.8rem auto !important;
  }

  a {
    margin-top: 2rem !important;
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

const Login: NextPage = () => {
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!id) alert(ID_EMPTY_MSG);
    else if (!password) alert(PASSWORD_EMPTY_MSG);
    else await requestLogin(id, password);
  };

  return (
    <>
      <MenuInfoBox name="로그인" />
      <PageBox>
        <LoginContainer>
          <InputContainer>
            <InputBox
              isSearch={false}
              placeholder="아이디를 입력하세요."
              width={'100%'}
              height={'80px'}
              fontSize={'20px'}
              value={id}
              onChangeHandler={({ target }) => setID((target as HTMLInputElement).value)}
            ></InputBox>
            <InputBox
              isPassword={true}
              isSearch={false}
              placeholder="비밀번호를 입력하세요."
              width={'100%'}
              height={'80px'}
              fontSize={'20px'}
              value={password}
              onChangeHandler={({ target }) => setPassword((target as HTMLInputElement).value)}
            ></InputBox>
            <Button
              width={'560px'}
              background={theme.colors.sky}
              fontSize={'30px'}
              paddingH={'24px'}
              content={'로그인'}
              onClick={handleLogin}
            />
            <SearchPwdBtn href="#none">비밀번호를 잊어버리셨나요?</SearchPwdBtn>
          </InputContainer>
        </LoginContainer>
      </PageBox>
    </>
  );
};

export default Login;