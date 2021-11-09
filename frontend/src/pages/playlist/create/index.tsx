import { useState } from 'react';

import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Router from 'next/router';
import { useSelector } from 'react-redux';

import { createPlaylist } from '~/api/playlist';
import Button from '~/atoms/Button';
import MenuInfoBox from '~/atoms/MenuInfoBox';
import PageBox from '~/atoms/PageBox';
import { FAILED, SUCCESS } from '~/constants/index';
import useEventListener from '~/hooks/useEventListener';
import Chip from '~/molecules/Chip';
import CreatePlaylistInputBox from '~/organisms/CreatePlaylistInputBox';
import CreatePlaylistMusicList from '~/organisms/CreatePlaylistMusicList';
import CreatePlaylistMusicModal from '~/organisms/CreatePlaylistMusicModal';
import theme from '~/styles/theme';
import { Music } from '~/types/Music';

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;
  margin-bottom: 40px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
const SubmitButtonWrapper = styled.div`
  display: inline;
  text-align: center;
`;
const Container = styled.div`
  @media (max-width: 1200px) {
    & > div > :last-child {
      padding: 70px;
      border-radius: 100px;
    }
  }
  @media (max-width: 768px) {
    & > div > :last-child {
      padding: 50px;
      border-radius: 80px;
    }
  }
  @media (max-width: 480px) {
    & > div > :last-child {
      padding: 40px;
      border-radius: 60px;
    }
  }
`;
const TARGET_INIT = 0;

interface ModalOption {
  type: 'close' | 'create' | 'modify';
  target: number;
}

const PlaylistCreate: NextPage = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [hashTag, setHashTag] = useState<string>('');
  const [chips, setChips] = useState<string[]>([]);
  const [musics, setMusics] = useState<Music[]>([]);
  const [modalOption, setModalOption] = useState<ModalOption>({ type: 'close', target: TARGET_INIT });
  const userInfo = useSelector((state: any) => state.user);

  const checkAllValidInput = () => {
    if (!title || !description || !chips.length) return false;
    if (musics.length < 3 || musics.length > 50) return false;
    return true;
  };
  const handleAddChip = (e: globalThis.KeyboardEvent) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    if (!hashTag) return;
    setHashTag('');
    setChips((preState) => [...preState, hashTag.trim()]);
  };
  const handleSubmit = async () => {
    if (!checkAllValidInput()) {
      alert('입력을 확인해주세요.');
      return;
    }
    const createResult = await createPlaylist({
      playlistName: title,
      musics: musics,
      hashTags: chips,
      userId: userInfo.id,
    });
    const { status } = createResult;
    if (status === FAILED) {
      alert('플레이리스트 등록에 실패하였습니다.');
    } else if (status === SUCCESS) {
      Router.push('/lobby');
    }
  };
  useEventListener('keyup', handleAddChip);

  return (
    <Container>
      <MenuInfoBox name="플레이리스트 추가"></MenuInfoBox>
      <PageBox>
        <Wrapper>
          <CreatePlaylistInputBox
            setTitle={(e) => setTitle((e.currentTarget as HTMLTextAreaElement).value)}
            setDescription={(e) => setDescription((e.currentTarget as HTMLTextAreaElement).value)}
            setHashTag={(e) => setHashTag((e.currentTarget as HTMLTextAreaElement).value)}
            title={title}
            description={description}
            hashTag={hashTag}
          />
          <ChipContainer>
            {chips.map((chip, idx) => (
              <Chip
                key={idx}
                deleteHandler={(e) => {
                  setChips((preState) => [...preState.filter((chip, i) => i !== idx)]);
                }}
              >
                {chip}
              </Chip>
            ))}
          </ChipContainer>
          <CreatePlaylistMusicList
            musics={musics}
            setModalOption={setModalOption}
            setMusics={setMusics}
          ></CreatePlaylistMusicList>
          <SubmitButtonWrapper>
            <Button
              content="등록"
              background={theme.colors.sky}
              fontSize="1.5em"
              paddingH="2%"
              width="45%"
              onClick={handleSubmit}
            ></Button>
          </SubmitButtonWrapper>
        </Wrapper>
      </PageBox>
      {modalOption.type === 'create' ? (
        <CreatePlaylistMusicModal
          setModalOption={setModalOption}
          setMusics={(newMusic: Music) => setMusics((preMusics) => [...preMusics, newMusic])}
        ></CreatePlaylistMusicModal>
      ) : modalOption.type === 'modify' ? (
        <CreatePlaylistMusicModal
          setModalOption={setModalOption}
          setMusics={(newMusic: Music) =>
            setMusics((preMusics) => {
              const next = [...preMusics];
              next[modalOption.target] = newMusic;
              return next;
            })
          }
          musicInfo={musics[modalOption.target]}
        ></CreatePlaylistMusicModal>
      ) : null}
    </Container>
  );
};

export default PlaylistCreate;
