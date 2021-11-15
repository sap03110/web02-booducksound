import { MouseEventHandler, PropsWithChildren } from 'react';

import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import Button from '~/atoms/Button';
import useSocket from '~/hooks/useSocket';
import { RootState } from '~/reducers/index';
import theme from '~/styles/theme';
import { Player } from '~/types/Player';
import { Players } from '~/types/Players';
import { SocketEvents } from '~/types/SocketEvents';

const Container = styled.div`
  max-width: 1600px;
  width: 100%;
  display: grid;
  grid-template:
    'speaker . . .' 4fr
    ' . . start exit' 4fr
    ' . . . .' 1fr
    / 1fr 4fr 1fr 1fr;

  @media (max-width: ${theme.breakpoints.sm}) {
    display: grid;
    grid-template:
      'speaker . start exit' 4fr
      ' . . . .' 1fr
      / 1fr 4fr 1fr 1fr;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 8px 2px;
    column-gap: 4px;
  }
`;

const ButtonWrapper = styled.div`
  width: 80%;
  height: 100%;
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 10%;
  }
`;
const MuteButton = styled.button`
  border: 0;
  outline: 0;
  width: 60px;
  height: 60px;
  grid-area: speaker;
  background: url('images/ic_speaker.png') no-repeat center/45%;
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 30px;
    height: 30px;
  }
  &:hover {
    opacity: 50%;
  }
`;

interface ButtonContainerProps {
  background: string;
  fontSize?: number;
  type?: string;
  onClick: MouseEventHandler;
  disabled?: boolean;
}

const ResponsiveButton = ({
  background,
  children,
  type,
  onClick,
  disabled = false,
}: PropsWithChildren<ButtonContainerProps>) => {
  return (
    <ButtonWrapper style={{ gridArea: type }} onClick={onClick}>
      <Button background={background} disabled={disabled}>
        {children}
      </Button>
    </ButtonWrapper>
  );
};

const converter: { [status: string]: 'ready' | 'prepare' } = { prepare: 'ready', ready: 'prepare' };
const statusEncoder = { king: 'START', prepare: 'PREPARE', ready: 'READY' };

const GameRoomNav = ({ players, isAllReady }: { players: Players; isAllReady: boolean }) => {
  const { uuid } = useSelector((state: RootState) => state.room);
  const socket = useSocket();
  const player = socket && players[socket.id];

  const changeStatus = (player: Player) => () => {
    if (player.status !== 'king') player = { ...player, status: converter[player.status] };
    socket?.emit(SocketEvents.SET_PLAYER, uuid, player);
  };
  const startGame = () => socket?.emit(SocketEvents.START_GAME);
  const handleStartBtnClick = (player: Player) => (player.status === 'king' ? startGame : changeStatus(player));

  return (
    <Container>
      <MuteButton type="button" />
      {player && (
        <ResponsiveButton
          type="start"
          background={theme.colors.whitesmoke}
          fontSize={20}
          onClick={handleStartBtnClick(player)}
          disabled={player.status === 'king' && !isAllReady}
        >
          {statusEncoder[player.status]}
        </ResponsiveButton>
      )}
      <ResponsiveButton type="exit" background={theme.colors.sand} fontSize={20} onClick={() => console.log('나가기')}>
        나가기
      </ResponsiveButton>
    </Container>
  );
};
export default GameRoomNav;
