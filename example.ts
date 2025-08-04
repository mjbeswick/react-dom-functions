import React from 'react';
import { div, h1, p, button, ul, li, span } from './src/htmlElements';
import { DOMFC } from './src/types';

type ExampleComponentProps = {
  title?: string;
  description?: string;
  items?: string[];
};

const ExampleComponent: DOMFC<ExampleComponentProps> = ({
  title = 'React HTML Elements Example',
  description = 'This is an example of using the library',
  items = ['Item 1', 'Item 2', 'Item 3'],
}) => {
  const [count, setCount] = React.useState(0);

  return div(
    { className: 'container' },
    h1({ className: 'title' }, title),
    p({ className: 'description' }, description),

    div(
      { className: 'counter-section' },
      p('Count: ', span({ className: 'count' }, count.toString())),
      button(
        {
          className: 'btn',
          onClick: () => setCount(count + 1),
        },
        'Increment'
      )
    ),

    div(
      { className: 'list-section' },
      h1('Items List'),
      ul(
        { className: 'items-list' },
        ...items.map((item, index) =>
          li({ key: index, className: 'item' }, item)
        )
      )
    )
  );
};

export default ExampleComponent;
