import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import theme from '../../../styles/theme';
import Button from '../../atoms/Button';

interface Props {
  title: string;
}

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px 10px 5px;
  border-bottom: 2px solid #eee;
`;
const MusicTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const CreatePlaylistMusicItem = ({ title }: PropsWithChildren<Props>) => {
  return (
    <ItemContainer>
      <MusicTitle>{title}</MusicTitle>
      <ButtonBox>
        <Button content={'수정'} background={theme.colors.sky} fontSize={'12px'} paddingH={'7px'} width={'100px'} />
        <Button content={'삭제'} background={theme.colors.peach} fontSize={'12px'} paddingH={'7px'} width={'100px'} />
      </ButtonBox>
    </ItemContainer>
  );
};

export default CreatePlaylistMusicItem;