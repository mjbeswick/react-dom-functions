import React from 'react';
import { div, h1, p, button, ul, li, span } from 'react-dom-functions';

function ExampleComponent() {
  const [count, setCount] = React.useState(0);
  const items = ['Item 1', 'Item 2', 'Item 3'];

  return div(
    { className: 'container' },
    h1({ className: 'title' }, 'React HTML Elements Example'),
    p({ className: 'description' }, 'This is an example of using the library'),

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
}

export default ExampleComponent;
