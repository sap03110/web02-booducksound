import styled from '@emotion/styled';
import { NextPage } from 'next';
import Link from 'next/link';

import Button from '../components/atoms/Button';
import InputBox from '../components/atoms/InputBox';
import MenuInfoBox from '../components/atoms/MenuInfoBox';
import PageBox from '../components/atoms/PageBox';
import theme from '../styles/theme';

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
    margin: 0 auto 0.5rem auto;
  }

  a {
    margin-top: 1.5rem;
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
  return (
    <>
      <MenuInfoBox name="로그인" />
      <PageBox>
        <LoginContainer>
          <InputContainer>
            <InputBox isSearch={false} placeholder="아이디를 입력하세요." width={540} height={24}></InputBox>
            <InputBox isSearch={false} placeholder="비밀번호를 입력하세요." width={540} height={24}></InputBox>
            <Link href="/join">
              <a>
                <Button width={560} background={theme.colors.sky} fontSize={30} content={'로그인'} />
              </a>
            </Link>
            <SearchPwdBtn href="#none">비밀번호를 잊어버리셨나요?</SearchPwdBtn>
          </InputContainer>
        </LoginContainer>
      </PageBox>
    </>
  );
};

export default Login;
