# Using React Components Without React.createElement

This guide shows you different ways to use existing React components without having to call `React.createElement` directly.

## Approaches

### 1. **JSX (Recommended)**

The most common and preferred approach is to use JSX syntax:

```tsx
import React from 'react';
import MyComponent from './MyComponent';

const App = () => {
  return (
    <div>
      <MyComponent prop="value">child content</MyComponent>
    </div>
  );
};
```

**Pros:**

- Most readable and intuitive
- Standard React pattern
- Great IDE support with autocomplete
- TypeScript support

**Cons:**

- Requires `.tsx` files
- Needs JSX transformation

### 2. **Function-Based Approach (Using this library)**

Use the utility functions provided by this library to create function-based wrappers for React components:

```typescript
import { asComponentFn, asComponentFnWithChildren } from 'react-dom-functions';
import MyComponent from './MyComponent';

// Create a function-based wrapper
const myComponent = asComponentFn<MyComponentProps>(MyComponent);

// Use it like other DOM elements
const element = myComponent({ title: 'Hello', count: 5 });
```

**Pros:**

- Consistent with the library's function-based approach
- No JSX required
- Type-safe
- Works with existing DOM element functions

**Cons:**

- Additional setup required
- Less intuitive than JSX

### 3. **Direct React.createElement (What you want to avoid)**

```typescript
// Avoid this approach
const element = React.createElement(MyComponent, { prop: 'value' }, 'child');
```

**Pros:**

- No additional dependencies
- Works everywhere

**Cons:**

- Verbose and hard to read
- Error-prone
- No IDE autocomplete for props

## Utility Functions

### `asComponentFn<Props>(Component)`

Creates a function-based wrapper for React components that don't accept children:

```typescript
import { asComponentFn } from 'react-dom-functions';

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

// Create the wrapper
const myComponent = asComponentFn<MyComponentProps>(MyComponent);

// Use it
const element = myComponent({ title: 'Hello', count: 5 });
```

### `asComponentFnWithChildren<Props>(Component)`

Creates a function-based wrapper for React components that accept children:

```typescript
import { asComponentFnWithChildren } from 'react-dom-functions';

type ContainerProps = {
  className?: string;
  children?: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ className, children }) => {
  return React.createElement('div', { className }, children);
};

// Create the wrapper
const container = asComponentFnWithChildren<{ className?: string }>(Container);

// Use it with children
const element = container(
  { className: 'wrapper' },
  myComponent({ title: 'Nested Component' })
);
```

## Complete Example

```typescript
import React from 'react';
import { div, h1, p, button } from 'react-dom-functions';
import { asComponentFn, asComponentFnWithChildren } from 'react-dom-functions';
import { DOMFC } from 'react-dom-functions';

// Define your React component
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

// Create function-based wrapper
const myComponent = asComponentFn<MyComponentProps>(MyComponent);

// Use in your component
const App: DOMFC = () => {
  const [count, setCount] = React.useState(0);

  return div(
    { className: 'app' },
    h1('My App'),
    myComponent({ title: 'Dynamic Component', count }),
    button({ onClick: () => setCount(count + 1) }, 'Increment')
  );
};
```

## Migration Guide

### From JSX to Function-Based

If you're migrating from JSX to the function-based approach:

**Before (JSX):**

```tsx
const App = () => (
  <div className="app">
    <MyComponent title="Hello" count={5}>
      <span>Child content</span>
    </MyComponent>
  </div>
);
```

**After (Function-based):**

```typescript
const App = () =>
  div(
    { className: 'app' },
    myComponent({ title: 'Hello', count: 5 }, span('Child content'))
  );
```

### From React.createElement to Function-Based

**Before:**

```typescript
const element = React.createElement(MyComponent, { title: 'Hello', count: 5 });
```

**After:**

```typescript
const myComponent = asComponentFn<MyComponentProps>(MyComponent);
const element = myComponent({ title: 'Hello', count: 5 });
```

## Best Practices

1. **Use JSX when possible** - It's the most readable and standard approach
2. **Use function-based approach for consistency** - When working with this library's DOM elements
3. **Create reusable wrappers** - Define your component wrappers once and reuse them
4. **Use TypeScript** - Get better type safety and IDE support
5. **Avoid direct React.createElement** - It's verbose and error-prone

## Type Safety

The utility functions provide full TypeScript support:

```typescript
// TypeScript will catch errors
const myComponent = asComponentFn<MyComponentProps>(MyComponent);

// ✅ Correct
myComponent({ title: 'Hello', count: 5 });

// ❌ TypeScript error - missing required prop
myComponent({ count: 5 });

// ❌ TypeScript error - invalid prop
myComponent({ title: 'Hello', invalidProp: 'value' });
```
