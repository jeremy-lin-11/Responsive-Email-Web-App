import {render} from '@testing-library/react';
import App from '../App';

/*
 * Should be using at least 10 Material UI Components
 */
test('Using Material UI', async () => {
  render(<App />);
  const elements = document.querySelectorAll('[class^=Mui]');
  expect(elements.length > 10).toBe(true);
});
