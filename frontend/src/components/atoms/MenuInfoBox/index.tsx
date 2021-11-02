import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';
interface Props {
  name: string;
}

const MenuInfo = styled.h4`
  font-weight: 600;
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  font-size: 1.25rem;
`;

const BackBtn = styled.a`
  width: 18px;
  height: 1.25rem;
  display: inline-block;
  margin-right: 0.8rem;
  cursor: pointer;
  background: url('images/ic_prev.png') no-repeat center/20px;
`;

const handleBack = () => {
  history.back();
};

const MenuInfoBox = ({ name }: PropsWithChildren<Props>) => {
  return (
    <MenuInfo>
      <BackBtn onClick={handleBack} />
      {name}
    </MenuInfo>
  );
};

export default MenuInfoBox;
