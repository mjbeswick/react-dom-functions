import React from 'react';
import { div, h1, p, button, ul, li, span } from './src/htmlElements';
import { asComponentFn, asComponentFnWithChildren } from './src/utils';
import { DOMFC } from './src/types';

// Example React component
type MyComponentProps = {
  title: string;
  count?: number;
};

const MyComponent: React.FC<MyComponentProps> = ({ title, count = 0 }) => {
  return React.createElement(
    'div',
    {},
    React.createElement('h2', {}, title),
    React.createElement('p', {}, 'Count: ', count)
  );
};

// Example React component with children
type ContainerProps = {
  className?: string;
  children?: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ className, children }) => {
  return React.createElement('div', { className }, children);
};

// Create function-based versions of the components
const myComponent = asComponentFn<MyComponentProps>(MyComponent);
const container = asComponentFnWithChildren<{ className?: string }>(Container);

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

    // Using React components with function-based approach
    container(
      { className: 'react-component-section' },
      myComponent({ title: 'My React Component', count }),
      myComponent({ title: 'Another Component' })
    ),

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

// Example showing different approaches to use React components
const ComponentUsageExamples = () => {
  // Approach 1: Using the utility functions (function-based style)
  const component1 = myComponent({ title: 'Function-based', count: 5 });

  // Approach 2: Direct React.createElement (what you want to avoid)
  const component2 = React.createElement(MyComponent, {
    title: 'Direct createElement',
    count: 10,
  });

  // Approach 3: Using JSX (if you have .tsx files)
  // const component3 = <MyComponent title="JSX Style" count={15} />;

  // Approach 4: Using the container with children
  const wrappedComponent = container(
    { className: 'wrapper' },
    myComponent({ title: 'Wrapped Component', count: 20 })
  );

  return div(
    { className: 'examples' },
    h1('Different Ways to Use React Components'),
    div({ className: 'example-1' }, component1),
    div({ className: 'example-2' }, component2),
    div({ className: 'example-4' }, wrappedComponent)
  );
};

export default ExampleComponent;
export { ComponentUsageExamples };
