import { render } from '@testing-library/react';

import theme from '../../../styles/theme';

import SelectBox from '.';

describe('SelectBox', () => {
  it('matches snapshot', () => {
    const select = render(<SelectBox options={['first', 'second', 'third']} />);
    expect(select.container).toMatchSnapshot();
  });
});
