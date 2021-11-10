import { useState, useEffect } from 'react';

import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useSelector } from 'react-redux';

import { requestChangePassword } from '~/api/account';
import InputBox from '~/atoms/InputBox';
import MenuInfoBox from '~/atoms/MenuInfoBox';
import PageBox from '~/atoms/PageBox';
import { ID_EMPTY_MSG, PASSWORD_EMPTY_MSG, NICKNAME_EMPTY_MSG } from '~/constants/index';
import ResponsiveButton from '~/molecules/ResponsiveButton';
import { RootState } from '~/reducers/index';
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

const FindPwd: NextPage = () => {
  const [id, setID] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const userInfo = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const { id, nickname } = userInfo;
    setID(id);
    setNickname(nickname);
  }, [userInfo]);

  const handleFindPwd = () => {
    if (!id) return alert(ID_EMPTY_MSG);
    if (!nickname) return alert(NICKNAME_EMPTY_MSG);
    if (!password) return alert(PASSWORD_EMPTY_MSG);
    requestChangePassword(id, nickname, password);
  };

  return (
    <>
      <MenuInfoBox name="비밀번호 재설정" />
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
              isSearch={false}
              placeholder="닉네임을 입력하세요."
              width={'100%'}
              height={'80px'}
              fontSize={'20px'}
              value={nickname}
              onChangeHandler={({ target }) => setNickname((target as HTMLInputElement).value)}
            ></InputBox>
            <InputBox
              isPassword={true}
              isSearch={false}
              placeholder="새로운 비밀번호를 입력하세요."
              width={'100%'}
              height={'80px'}
              fontSize={'20px'}
              value={password}
              onChangeHandler={({ target }) => setPassword((target as HTMLInputElement).value)}
            ></InputBox>
            <ResponsiveButton
              width={'560px'}
              background={theme.colors.sky}
              fontSize={'28px'}
              smFontSize={'20px'}
              onClick={handleFindPwd}
            >
              비밀번호 재설정
            </ResponsiveButton>
          </InputContainer>
        </LoginContainer>
      </PageBox>
    </>
  );
};

export default FindPwd;
