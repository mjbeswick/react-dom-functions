<div align="center">
  <img src="https://raw.githubusercontent.com/mjbeswick/react-dom-functions/main/docs/header.svg" alt="react-dom-functions" width="800" height="200">
</div>

# react-dom-functions

react-dom-functions offers a JSX-like API for React, allowing you to build React elements using simple function calls rather than JSX tags. This approach streamlines your code and eliminates the need for a build step or JSX transpilation, making it especially useful for environments where JSX is not available or desired. By providing a set of functions corresponding to standard HTML elements (such as `div`, `span`, `button`, etc.), you can construct your component trees in a more readable and maintainable way compared to using `React.createElement` directly. This results in cleaner code, improved type safety (especially with TypeScript), and a more ergonomic developer experience when working with React without JSX.


## Installation

```bash
npm install react-dom-functions
```

**Note:** This library includes `clsx` as a dependency for advanced className handling. No additional installation is required.

## Quick Start

```typescript
import React from 'react';
import { div, h1, p, button } from 'react-dom-functions';

function App() {
  const [count, setCount] = React.useState(0);

  return div(
    { className: 'app' },
    h1('Hello World'),
    p('This is a paragraph'),
    button(
      {
        className: {
          btn: true,
          'btn-primary': true,
          'btn-active': count > 0,
        },
        onClick: () => setCount(count + 1),
      },
      `Count: ${count}`
    )
  );
}
```

## Usage

Instead of using JSX syntax, you can create React elements using function calls:

```tsx
import { div, h1, p, button } from 'react-dom-functions';

function MyComponent() {
  return div(
    { className: 'container' },
    h1({ className: 'title' }, 'Hello World'),
    p({ className: 'description' }, 'This is a paragraph'),
    button(
      {
        className: 'btn',
        onClick: () => console.log('clicked'),
      },`
      'Click me'
    )
  );
}
```

## Why Pure TypeScript Over JSX/TSX?

While JSX and TSX are popular for React development, using pure TypeScript with function calls offers several advantages:

### **Type Safety Benefits**

- **Better IntelliSense**: Function calls provide more precise autocomplete and type checking compared to JSX syntax
- **Compile-time Validation**: TypeScript can catch more errors at compile time with explicit function signatures
- **No JSX Transform Dependencies**: Eliminates the need for JSX transformation in your build pipeline

### **Performance Advantages**

- **Smaller Bundle Size**: No JSX runtime overhead or transformation costs
- **Faster Compilation**: Direct function calls compile faster than JSX transformation
- **Tree-shaking Friendly**: Function imports can be better optimized by bundlers

### **Developer Experience**

- **Consistent Syntax**: Uses familiar function call patterns instead of HTML-like syntax
- **Better Refactoring**: IDEs can more easily refactor function calls than JSX elements
- **Explicit Dependencies**: Clear import statements make dependencies more visible

### **Build System Benefits**

- **Simpler Configuration**: No need to configure JSX transformation in your build tools
- **Framework Agnostic**: Works with any build system that supports TypeScript
- **Reduced Tooling Complexity**: Fewer dependencies and configuration requirements

### **Code Generation**

- **Programmatic Creation**: Easier to generate elements programmatically
- **Dynamic Components**: More straightforward to create components based on data or conditions
- **Template Systems**: Better integration with template engines and code generation tools

## API

### Basic Elements

All HTML elements are available as functions. Each function accepts:

1. **Props object** (optional): An object containing React props
2. **Children** (optional): React nodes as additional arguments

```tsx
import { div, span, p, h1, h2, h3, h4, h5, h6 } from 'react-html-elements';

// With props and children
div({ className: 'container' }, 'Hello World');

// With multiple children
div(
  { className: 'container' },
  h1({ className: 'title' }, 'Title'),
  p({ className: 'text' }, 'Paragraph')
);

// Without props
div('Just text content');

// With multiple children without props
div(span('First child'), span('Second child'));
```

### Advanced className with clsx

The `className` prop supports clsx syntax for conditional and dynamic class names. This allows you to create complex class combinations easily:

```tsx
import { div, button, span } from 'react-dom-functions';

function DynamicComponent({ isActive, size, variant }) {
  return div(
    {
      className: {
        'base-class': true,
        active: isActive,
        disabled: !isActive,
        [`size-${size}`]: size,
        [`variant-${variant}`]: variant,
      },
    },
    button(
      {
        className: [
          'btn',
          'btn-primary',
          isActive && 'btn-active',
          size && `btn-${size}`,
        ],
      },
      'Click me'
    ),
    span(
      {
        className: clsx(
          'status',
          isActive ? 'status-active' : 'status-inactive',
          size && `status-${size}`
        ),
      },
      isActive ? 'Active' : 'Inactive'
    )
  );
}
```

#### clsx Syntax Examples

**Conditional classes:**

```tsx
div(
  {
    className: {
      base: true,
      active: isActive,
      disabled: isDisabled,
    },
  },
  'Content'
);
```

**Array syntax:**

```tsx
div(
  {
    className: [
      'base-class',
      isActive && 'active-class',
      size && `size-${size}`,
    ],
  },
  'Content'
);
```

**Direct clsx function:**

```tsx
import clsx from 'clsx';

div(
  {
    className: clsx(
      'base',
      isActive && 'active',
      size && `size-${size}`,
      variant && `variant-${variant}`
    ),
  },
  'Content'
);
```

**Mixed syntax:**

```tsx
div(
  {
    className: [
      'base',
      { conditional: someCondition },
      otherCondition && 'other-class',
    ],
  },
  'Content'
);
```

### Fragment

Use the `fragment` function to create React fragments:

```tsx
import { fragment, div, span } from 'react-dom-functions';

function MyComponent() {
  return fragment(div('First element'), div('Second element'));
}
```

### Form Elements

```tsx
import {
  form,
  input,
  button,
  label,
  textarea,
  select,
  option,
} from 'react-dom-functions';

function ContactForm() {
  return form(
    { onSubmit: (e) => e.preventDefault() },
    div(
      { className: 'form-group' },
      label({ htmlFor: 'name' }, 'Name:'),
      input({
        id: 'name',
        type: 'text',
        placeholder: 'Enter your name',
      })
    ),
    div(
      { className: 'form-group' },
      label({ htmlFor: 'message' }, 'Message:'),
      textarea({
        id: 'message',
        rows: 4,
        placeholder: 'Enter your message',
      })
    ),
    button({ type: 'submit' }, 'Submit')
  );
}
```

### Lists

```tsx
import { ul, ol, li } from 'react-dom-functions';

function TodoList() {
  const todos = ['Learn React', 'Build app', 'Deploy'];

  return ul(
    { className: 'todo-list' },
    ...todos.map((todo, index) =>
      li({ key: index, className: 'todo-item' }, todo)
    )
  );
}
```

### Tables

```tsx
import { table, thead, tbody, tr, th, td } from 'react-dom-functions';

function DataTable() {
  const data = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
  ];

  return table(
    { className: 'data-table' },
    thead(tr(th('Name'), th('Age'))),
    tbody(
      ...data.map((row, index) =>
        tr({ key: index }, td(row.name), td(row.age.toString()))
      )
    )
  );
}
```

### SVG Elements

```tsx
import { svg, circle, rect, path } from 'react-dom-functions';

function SimpleIcon() {
  return svg(
    { width: 100, height: 100, viewBox: '0 0 100 100' },
    circle({
      cx: 50,
      cy: 50,
      r: 40,
      fill: 'blue',
    })
  );
}
```

## Available Elements

### Document Metadata

- `title`, `base`, `link`, `meta`, `style`

### Content Sectioning

- `address`, `article`, `aside`, `footer`, `header`
- `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `hgroup`
- `main`, `nav`, `section`

### Text Content

- `blockquote`, `dd`, `div`, `dl`, `dt`
- `figcaption`, `figure`, `hr`, `li`, `ol`, `p`, `pre`, `ul`

### Inline Text Semantics

- `a`, `abbr`, `b`, `bdi`, `bdo`, `br`, `cite`, `code`
- `data`, `dfn`, `em`, `i`, `kbd`, `mark`, `q`
- `rb`, `rp`, `rt`, `rtc`, `ruby`, `s`, `samp`
- `small`, `span`, `strong`, `sub`, `sup`, `time`
- `u`, `var_`, `wbr`

### Image and Multimedia

- `area`, `audio`, `img`, `map`, `track`, `video`

### Embedded Content

- `embed`, `iframe`, `object`, `param`, `picture`, `source`

### Scripting

- `canvas`, `noscript`, `script`

### Demarcating Edits

- `del`, `ins`

### Table Content

- `caption`, `col`, `colgroup`, `table`, `tbody`
- `td`, `tfoot`, `th`, `thead`, `tr`

### Forms

- `button`, `datalist`, `fieldset`, `form`, `input`
- `label`, `legend`, `meter`, `optgroup`, `option`
- `output`, `progress`, `select`, `textarea`

### Interactive Elements

- `details`, `dialog`, `menu`, `menuitem`, `summary`

### Web Components

- `slot`, `template`

### SVG Elements

- `svg`, `circle`, `rect`, `path`, `line`, `polygon`
- `polyline`, `ellipse`, `g`, `text`, `tspan`

### MathML Elements

- `math`, `mrow`, `mfrac`, `msqrt`, `mroot`, `msub`
- `msup`, `msubsup`, `munder`, `mover`, `munderover`
- `mmultiscripts`, `mtable`, `mtr`, `mtd`, `maction`
- `merror`, `mpadded`, `mphantom`, `mspace`, `mstyle`
- `ms`, `mtext`, `mn`, `mo`, `mi`

## TypeScript Support

This library is written in TypeScript and provides full type safety. All element functions are properly typed with React's element types.

## Performance

This library is optimized for performance:

- **Tree-shaking friendly**: Only import what you use
- **Minimal runtime overhead**: Direct function calls
- **Memoized element creation**: Cached element functions
- **Small bundle size**: ~2KB gzipped

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## License

MIT
