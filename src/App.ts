import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {
  Fragment as fragment,
  div,
  a,
  img,
  h1,
  button,
  p,
  code,
} from './htmlElements';

function App() {
  const [count, setCount] = useState(0);

  return fragment(
    undefined,
    div(
      undefined,
      a(
        { href: 'https://vite.dev', target: '_blank' },
        img({
          src: viteLogo,
          className: 'logo',
          alt: 'Vite logo',
        })
      ),
      a(
        { href: 'https://react.dev', target: '_blank' },
        img({
          src: reactLogo,
          className: 'logo react',
          alt: 'React logo',
        })
      )
    ),
    h1(undefined, 'Vite + React'),
    div(
      { className: 'card' },
      button(
        { onClick: () => setCount((count) => count + 1) },
        'count is ',
        count
      ),
      p(
        undefined,
        'Edit ',
        code(undefined, 'src/App.tsx'),
        ' and save to test HMR'
      )
    ),
    p(
      { className: 'read-the-docs' },
      'Click on the Vite and React logos to learn more'
    )
  );
}

export default App;
