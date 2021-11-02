import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

interface InputBoxContainerProps {
  width: string;
  height: string;
}
interface TextInputContainerProps {
  height: string;
  fontSize: string;
}
interface ImageContainerProps {
  rightMargin: number;
  size: string;
}
interface Props {
  isSearch: boolean;
  placeholder: string;
  width: string;
  height: string;
  fontSize: string;
}

const InputBoxContainer = styled.div<InputBoxContainerProps>`
  border: 2px solid black;
  border-radius: 100px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding-left: ${({ height }) => height};
  padding-right: ${({ height }) => height};
  text-align: center;
  display: flex;
  box-shadow: 2px 2px 10px gray;
  background-color: white;
`;
const TextInputContainer = styled.input<TextInputContainerProps>`
  display: inline-block;
  width: 100%;
  outline: none;
  border: none;
  font-size: ${({ fontSize }) => fontSize};
`;

const ImageContainer = styled.div<ImageContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => size};
  margin-right: ${({ rightMargin }) => rightMargin};
`;

const ReadingGlass = styled.img`
  height: 50%;
  user-select: none;
`;

const InputBox = ({ isSearch, placeholder, width, height, fontSize }: PropsWithChildren<Props>) => {
  return (
    <InputBoxContainer width={width} height={height}>
      {isSearch ? (
        <ImageContainer rightMargin={height} size={fontSize}>
          <ReadingGlass src="/images/readingGlass.png" draggable="false"></ReadingGlass>
        </ImageContainer>
      ) : null}
      <TextInputContainer placeholder={placeholder} height={height} fontSize={fontSize}></TextInputContainer>
    </InputBoxContainer>
  );
};

export default InputBox;
