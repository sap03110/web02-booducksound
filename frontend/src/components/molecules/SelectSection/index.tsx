import { ChangeEventHandler } from 'react';

import SelectBox from '@atoms/SelectBox';
import styled from '@emotion/styled';

interface InputLabelContainerProps {
  titleSize: string;
  margin: string;
}

interface Props extends InputLabelContainerProps {
  title: string;
  options: string[] | number[];
  defaultValue: string | number;
  onChange: ChangeEventHandler;
}

const InputSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputLabelContainer = styled.label<InputLabelContainerProps>`
  font-size: ${({ titleSize }) => titleSize};
  margin-bottom: ${({ margin }) => margin};
  font-weight: 700;
`;

const SelectSection = ({ titleSize, margin, title, options, defaultValue, onChange }: Props) => {
  return (
    <InputSectionContainer>
      <InputLabelContainer titleSize={titleSize} margin={margin}>
        {title}
      </InputLabelContainer>
      <SelectBox options={options} defaultValue={defaultValue} onChange={onChange} />
    </InputSectionContainer>
  );
};

export default SelectSection;
