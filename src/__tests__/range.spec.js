import { render } from '@testing-library/react';
import {Range} from '../components/rangeComponents/range' 

describe('Range', () => {
  it('should be defined', () => {
    expect(Range).toBeDefined();
  });

  it('should render correctly in normal mode', () => {
    const { container } = render(<Range minValue={0} maxValue={100} />);
    expect(container).toMatchSnapshot();
  })

  it('should render correctly in fixed mode', () => {
    const { container } = render(<Range rangeValues={[0,50,100]} />);
    expect(container).toMatchSnapshot();
  })
}
);
