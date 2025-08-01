# Advanced Usage Guide

This guide covers advanced patterns and best practices for using `react-dom-functions` in production applications.

## Table of Contents

1. [Performance Best Practices](#performance-best-practices)
2. [State Management Patterns](#state-management-patterns)
3. [Form Handling Patterns](#form-handling-patterns)
4. [Component Composition](#component-composition)
5. [Accessibility Best Practices](#accessibility-best-practices)
6. [Testing Strategies](#testing-strategies)
7. [Error Handling](#error-handling)
8. [Performance Monitoring](#performance-monitoring)
9. [Custom Hooks](#custom-hooks)
10. [Integration Patterns](#integration-patterns)

## Performance Best Practices

### 1. Memoization for Complex Components

```typescript
import React from 'react';
import { div, span, button } from 'react-dom-functions';

// Use React.memo for components that receive the same props frequently
const ExpensiveComponent = React.memo(({ data }: { data: string[] }) => {
  return div(
    { className: 'expensive-component' },
    ...data.map((item, index) => span({ key: index, className: 'item' }, item))
  );
});

// Use useMemo for expensive computations
const MyComponent = ({ items }: { items: string[] }) => {
  const processedItems = React.useMemo(
    () => items.filter((item) => item.length > 3),
    [items]
  );

  return div(
    { className: 'container' },
    ...processedItems.map((item, index) => span({ key: index }, item))
  );
};

// Use useCallback for stable function references
const StableComponent = ({ onUpdate }: { onUpdate: (id: string) => void }) => {
  const handleClick = React.useCallback(
    (id: string) => {
      onUpdate(id);
    },
    [onUpdate]
  );

  return div(
    { className: 'stable-component' },
    button({ onClick: () => handleClick('item-1') }, 'Update Item 1'),
    button({ onClick: () => handleClick('item-2') }, 'Update Item 2')
  );
};
```

### 2. Conditional Rendering Patterns

```typescript
import { div, span, button } from 'react-dom-functions';

// Pattern 1: Inline conditional
const Component = ({ showButton }: { showButton: boolean }) => {
  return div(
    { className: 'container' },
    span('Content'),
    showButton && button({ onClick: () => {} }, 'Click me')
  );
};

// Pattern 2: Ternary operator
const Component2 = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return div(isLoggedIn ? span('Welcome back!') : span('Please log in'));
};

// Pattern 3: Helper function
const renderConditional = (condition: boolean, content: React.ReactNode) => {
  return condition ? content : null;
};

// Pattern 4: Switch-like rendering
const StatusComponent = ({
  status,
}: {
  status: 'loading' | 'success' | 'error';
}) => {
  const statusContent = {
    loading: span({ className: 'loading' }, 'Loading...'),
    success: span({ className: 'success' }, 'Success!'),
    error: span({ className: 'error' }, 'Error occurred'),
  };

  return div({ className: 'status' }, statusContent[status]);
};
```

### 3. List Rendering with Keys

```typescript
import { ul, li, div } from 'react-dom-functions';

// Good: Using stable keys
const TodoList = ({
  todos,
}: {
  todos: Array<{ id: string; text: string }>;
}) => {
  return ul(
    { className: 'todo-list' },
    ...todos.map((todo) =>
      li({ key: todo.id, className: 'todo-item' }, todo.text)
    )
  );
};

// Better: Using a dedicated key function
const UserList = ({
  users,
}: {
  users: Array<{ id: number; name: string }>;
}) => {
  return ul(
    { className: 'user-list' },
    ...users.map((user, index) =>
      li({ key: `user-${user.id}`, className: 'user-item' }, user.name)
    )
  );
};

// Advanced: Virtual scrolling for large lists
const VirtualList = ({ items }: { items: string[] }) => {
  const [visibleRange, setVisibleRange] = React.useState({ start: 0, end: 20 });

  const visibleItems = items.slice(visibleRange.start, visibleRange.end);

  return div(
    { className: 'virtual-list' },
    ...visibleItems.map((item, index) =>
      div({ key: visibleRange.start + index, className: 'list-item' }, item)
    )
  );
};
```

## State Management Patterns

### 1. Local State with Custom Hooks

```typescript
import React from 'react';
import { div, input, button, span } from 'react-dom-functions';

// Custom hook for form state
const useFormState = <T extends Record<string, any>>(initialState: T) => {
  const [state, setState] = React.useState<T>(initialState);

  const updateField = React.useCallback((field: keyof T, value: T[keyof T]) => {
    setState((prev) => ({ ...prev, [field]: value }));
  }, []);

  const reset = React.useCallback(() => {
    setState(initialState);
  }, [initialState]);

  return { state, updateField, reset };
};

// Usage
const FormComponent = () => {
  const { state, updateField, reset } = useFormState({
    name: '',
    email: '',
    message: '',
  });

  return div(
    { className: 'form' },
    input({
      value: state.name,
      onChange: (e) => updateField('name', e.target.value),
      placeholder: 'Name',
    }),
    input({
      value: state.email,
      onChange: (e) => updateField('email', e.target.value),
      placeholder: 'Email',
    }),
    button({ onClick: reset }, 'Reset'),
    div({ className: 'preview' }, JSON.stringify(state, null, 2))
  );
};
```

### 2. Context-based State Management

```typescript
import React from 'react';
import { div, button, span } from 'react-dom-functions';

// Create context
type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

// Provider component
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return ThemeContext.Provider({
    value: { theme, toggleTheme },
    children,
  });
};

// Custom hook for using theme
const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Usage
const ThemedComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return div(
    { className: `app ${theme}` },
    span({ className: 'theme-indicator' }, `Current theme: ${theme}`),
    button({ onClick: toggleTheme }, 'Toggle Theme')
  );
};
```

## Form Handling Patterns

### 1. Controlled Components with Validation

```typescript
import React from 'react';
import { form, input, button, label, span, div } from 'react-dom-functions';

const ControlledForm = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return form(
    { onSubmit: handleSubmit, className: 'contact-form' },
    div(
      { className: 'form-group' },
      label({ htmlFor: 'name' }, 'Name:'),
      input({
        id: 'name',
        type: 'text',
        value: formData.name,
        onChange: handleChange('name'),
        required: true,
      })
    ),
    div(
      { className: 'form-group' },
      label({ htmlFor: 'email' }, 'Email:'),
      input({
        id: 'email',
        type: 'email',
        value: formData.email,
        onChange: handleChange('email'),
        required: true,
      })
    ),
    div(
      { className: 'form-group' },
      label({ htmlFor: 'message' }, 'Message:'),
      textarea({
        id: 'message',
        value: formData.message,
        onChange: handleChange('message'),
        rows: 4,
        required: true,
      })
    ),
    button({ type: 'submit', className: 'submit-btn' }, 'Submit')
  );
};
```

### 2. Form Validation with Error Handling

```typescript
import React from 'react';
import { form, input, span, div } from 'react-dom-functions';

const ValidatedForm = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form is valid:', formData);
    }
  };

  return form(
    { onSubmit: handleSubmit, className: 'validated-form' },
    div(
      { className: 'form-group' },
      label({ htmlFor: 'email' }, 'Email:'),
      input({
        id: 'email',
        type: 'email',
        value: formData.email,
        onChange: handleChange('email'),
        className: errors.email ? 'error' : '',
      }),
      errors.email && span({ className: 'error-message' }, errors.email)
    ),
    div(
      { className: 'form-group' },
      label({ htmlFor: 'password' }, 'Password:'),
      input({
        id: 'password',
        type: 'password',
        value: formData.password,
        onChange: handleChange('password'),
        className: errors.password ? 'error' : '',
      }),
      errors.password && span({ className: 'error-message' }, errors.password)
    ),
    button({ type: 'submit' }, 'Submit')
  );
};
```

### 3. Dynamic Form Fields

```typescript
import React from 'react';
import { form, input, button, div, span } from 'react-dom-functions';

const DynamicForm = () => {
  const [fields, setFields] = React.useState([{ id: 1, name: '', value: '' }]);

  const addField = () => {
    setFields((prev) => [...prev, { id: Date.now(), name: '', value: '' }]);
  };

  const removeField = (id: number) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  const updateField = (id: number, field: 'name' | 'value', value: string) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  return form(
    { className: 'dynamic-form' },
    ...fields.map((field) =>
      div(
        { key: field.id, className: 'field-group' },
        input({
          placeholder: 'Field name',
          value: field.name,
          onChange: (e) => updateField(field.id, 'name', e.target.value),
        }),
        input({
          placeholder: 'Field value',
          value: field.value,
          onChange: (e) => updateField(field.id, 'value', e.target.value),
        }),
        button(
          {
            type: 'button',
            onClick: () => removeField(field.id),
            className: 'remove-btn',
          },
          'Remove'
        )
      )
    ),
    button({ type: 'button', onClick: addField }, 'Add Field')
  );
};
```

## Component Composition

### 1. Higher-Order Components

```typescript
import React from 'react';
import { div, span } from 'react-dom-functions';

// HOC for adding loading state
const withLoading = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P & { loading?: boolean }) => {
    if (props.loading) {
      return div({ className: 'loading-container' }, span('Loading...'));
    }

    const { loading, ...componentProps } = props;
    return React.createElement(Component, componentProps as P);
  };
};

// HOC for error boundaries
const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return class ErrorBoundaryWrapper extends React.Component<
    P & { fallback?: React.ReactNode },
    { hasError: boolean }
  > {
    constructor(props: P & { fallback?: React.ReactNode }) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    render() {
      if (this.state.hasError) {
        return this.props.fallback || div(span('Something went wrong'));
      }

      const { fallback, ...componentProps } = this.props;
      return React.createElement(Component, componentProps as P);
    }
  };
};

// Usage
const MyComponent = ({ data }: { data: string }) => {
  return div(span(data));
};

const MyComponentWithLoading = withLoading(MyComponent);
const MyComponentWithErrorBoundary = withErrorBoundary(MyComponent);
```

### 2. Render Props Pattern

```typescript
import React from 'react';
import { div, span, button } from 'react-dom-functions';

type DataFetcherProps = {
  children: (
    data: string[],
    loading: boolean,
    error: string | null
  ) => React.ReactNode;
};

const DataFetcher = ({ children }: DataFetcherProps) => {
  const [data, setData] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(['Item 1', 'Item 2', 'Item 3']);
      setLoading(false);
    }, 1000);
  }, []);

  return children(data, loading, error);
};

// Usage
const App = () => {
  return DataFetcher({
    children: (data, loading, error) => {
      if (loading) return div(span('Loading...'));
      if (error) return div(span('Error: ', error));

      return div(
        { className: 'data-list' },
        ...data.map((item, index) =>
          span({ key: index, className: 'item' }, item)
        )
      );
    },
  });
};
```

### 3. Compound Components

```typescript
import React from 'react';
import { div, span, button } from 'react-dom-functions';

type TabsContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

const useTabs = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within Tabs');
  }
  return context;
};

const Tabs = ({
  children,
  defaultTab,
}: {
  children: React.ReactNode;
  defaultTab: string;
}) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  return TabsContext.Provider({
    value: { activeTab, setActiveTab },
    children: div({ className: 'tabs' }, children),
  });
};

const TabList = ({ children }: { children: React.ReactNode }) => {
  return div({ className: 'tab-list' }, children);
};

const Tab = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { activeTab, setActiveTab } = useTabs();

  return button(
    {
      className: activeTab === id ? 'tab active' : 'tab',
      onClick: () => setActiveTab(id),
    },
    children
  );
};

const TabPanel = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { activeTab } = useTabs();

  if (activeTab !== id) return null;

  return div({ className: 'tab-panel' }, children);
};

// Usage
const TabExample = () => {
  return Tabs(
    { defaultTab: 'tab1' },
    TabList(
      Tab({ id: 'tab1' }, 'Tab 1'),
      Tab({ id: 'tab2' }, 'Tab 2'),
      Tab({ id: 'tab3' }, 'Tab 3')
    ),
    TabPanel({ id: 'tab1' }, span('Content for tab 1')),
    TabPanel({ id: 'tab2' }, span('Content for tab 2')),
    TabPanel({ id: 'tab3' }, span('Content for tab 3'))
  );
};
```

## Accessibility Best Practices

### 1. ARIA Attributes and Roles

```typescript
import { div, button, span } from 'react-dom-functions';

const AccessibleComponent = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return div(
    { className: 'accessible-component' },
    button(
      {
        'aria-expanded': isExpanded,
        'aria-controls': 'content',
        onClick: () => setIsExpanded(!isExpanded),
        className: 'toggle-button',
      },
      isExpanded ? 'Hide content' : 'Show content'
    ),
    div(
      {
        id: 'content',
        'aria-hidden': !isExpanded,
        className: 'content',
      },
      span('This is the expandable content')
    )
  );
};

// Accessible form with proper labels
const AccessibleForm = () => {
  return form(
    { className: 'accessible-form' },
    div(
      { className: 'form-group' },
      label({ htmlFor: 'username', id: 'username-label' }, 'Username:'),
      input({
        id: 'username',
        'aria-labelledby': 'username-label',
        'aria-describedby': 'username-help',
        type: 'text',
        required: true,
      }),
      span(
        { id: 'username-help', className: 'help-text' },
        'Enter your username (minimum 3 characters)'
      )
    )
  );
};
```

### 2. Keyboard Navigation

```typescript
import React from 'react';
import { div, button, span } from 'react-dom-functions';

const KeyboardNavigableList = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const items = ['Item 1', 'Item 2', 'Item 3'];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        console.log('Selected:', items[selectedIndex]);
        break;
    }
  };

  return div(
    {
      role: 'listbox',
      'aria-label': 'Select an item',
      onKeyDown: handleKeyDown,
      tabIndex: 0,
      className: 'keyboard-list',
    },
    ...items.map((item, index) =>
      div(
        {
          key: index,
          role: 'option',
          'aria-selected': index === selectedIndex,
          className: index === selectedIndex ? 'selected' : '',
        },
        span(item)
      )
    )
  );
};

// Focus management
const FocusTrap = ({ children }: { children: React.ReactNode }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, []);

  return div({ ref: containerRef, className: 'focus-trap' }, children);
};
```

### 3. Screen Reader Support

```typescript
import { div, button, span } from 'react-dom-functions';

const ScreenReaderFriendly = () => {
  const [count, setCount] = React.useState(0);

  return div(
    { className: 'screen-reader-friendly' },
    span({ 'aria-live': 'polite' }, `Count: ${count}`),
    button(
      {
        onClick: () => setCount((prev) => prev + 1),
        'aria-label': `Increment counter. Current count is ${count}`,
      },
      'Increment'
    ),
    // Hidden text for screen readers
    span(
      { 'aria-hidden': 'true', className: 'sr-only' },
      'This counter can be incremented using the button above'
    )
  );
};

// Live regions for dynamic content
const LiveRegion = () => {
  const [messages, setMessages] = React.useState<string[]>([]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prev) => [...prev, `Message ${prev.length + 1}`]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return div(
    { className: 'live-region' },
    div(
      { 'aria-live': 'polite', 'aria-atomic': 'true' },
      ...messages.map((msg, index) => div({ key: index }, msg))
    )
  );
};
```

## Testing Strategies

### 1. Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import { div, button, span } from 'react-dom-functions';

const TestComponent = ({
  count,
  onIncrement,
}: {
  count: number;
  onIncrement: () => void;
}) => {
  return div(
    { className: 'test-component' },
    span({ 'data-testid': 'count' }, count.toString()),
    button(
      {
        onClick: onIncrement,
        'data-testid': 'increment-button',
      },
      'Increment'
    )
  );
};

// Test
describe('TestComponent', () => {
  it('renders count and button', () => {
    const mockIncrement = jest.fn();
    render(TestComponent({ count: 5, onIncrement: mockIncrement }));

    expect(screen.getByTestId('count')).toHaveTextContent('5');
    expect(screen.getByTestId('increment-button')).toBeInTheDocument();
  });

  it('calls onIncrement when button is clicked', () => {
    const mockIncrement = jest.fn();
    render(TestComponent({ count: 0, onIncrement: mockIncrement }));

    screen.getByTestId('increment-button').click();
    expect(mockIncrement).toHaveBeenCalledTimes(1);
  });
});
```

### 2. Custom Hooks Testing

```typescript
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('increments counter', () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(6);
  });
});
```

### 3. Integration Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { form, input, button } from 'react-dom-functions';

const LoginForm = () => {
  const [credentials, setCredentials] = React.useState({
    username: '',
    password: '',
  });
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return form(
    { onSubmit: handleSubmit, 'data-testid': 'login-form' },
    input({
      'data-testid': 'username',
      value: credentials.username,
      onChange: (e) =>
        setCredentials((prev) => ({ ...prev, username: e.target.value })),
      placeholder: 'Username',
    }),
    input({
      'data-testid': 'password',
      type: 'password',
      value: credentials.password,
      onChange: (e) =>
        setCredentials((prev) => ({ ...prev, password: e.target.value })),
      placeholder: 'Password',
    }),
    button({ type: 'submit', 'data-testid': 'submit' }, 'Login'),
    submitted && div({ 'data-testid': 'success' }, 'Form submitted!')
  );
};

describe('LoginForm Integration', () => {
  it('submits form with user input', () => {
    render(LoginForm());

    fireEvent.change(screen.getByTestId('username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'testpass' },
    });
    fireEvent.click(screen.getByTestId('submit'));

    expect(screen.getByTestId('success')).toBeInTheDocument();
  });
});
```

## Error Handling

### 1. Error Boundaries

```typescript
import React from 'react';
import { div, span, button } from 'react-dom-functions';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return div(
        { className: 'error-boundary' },
        span('Something went wrong.'),
        button(
          {
            onClick: () => this.setState({ hasError: false }),
            className: 'retry-button',
          },
          'Try again'
        )
      );
    }

    return this.props.children;
  }
}
```

### 2. Async Error Handling

```typescript
import React from 'react';
import { div, span, button } from 'react-dom-functions';

const AsyncComponent = () => {
  const [data, setData] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return div({ className: 'loading' }, span('Loading...'));
  }

  if (error) {
    return div(
      { className: 'error' },
      span('Error: ', error),
      button({ onClick: fetchData }, 'Retry')
    );
  }

  return div({ className: 'data' }, span('Data: ', data));
};
```

## Performance Monitoring

### 1. Performance HOC

```typescript
import React from 'react';
import { div } from 'react-dom-functions';

// HOC for performance monitoring
const withPerformanceMonitoring = <P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) => {
  return (props: P) => {
    const startTime = performance.now();

    React.useEffect(() => {
      const endTime = performance.now();
      console.log(`${componentName} render time:`, endTime - startTime);
    });

    return React.createElement(Component, props);
  };
};

// Usage
const ExpensiveComponent = ({ data }: { data: string[] }) => {
  return div(
    { className: 'expensive' },
    ...data.map((item, index) => div({ key: index }, item))
  );
};

const MonitoredComponent = withPerformanceMonitoring(
  ExpensiveComponent,
  'ExpensiveComponent'
);
```

### 2. Memory Leak Detection

```typescript
import React from 'react';
import { div } from 'react-dom-functions';

const useMemoryLeakDetection = (componentName: string) => {
  React.useEffect(() => {
    const initialMemory = performance.memory?.usedJSHeapSize || 0;

    return () => {
      const finalMemory = performance.memory?.usedJSHeapSize || 0;
      const memoryDiff = finalMemory - initialMemory;

      if (memoryDiff > 1024 * 1024) {
        // 1MB threshold
        console.warn(
          `${componentName} may have a memory leak: ${memoryDiff} bytes`
        );
      }
    };
  }, [componentName]);
};

const MemoryMonitoredComponent = ({ data }: { data: string[] }) => {
  useMemoryLeakDetection('MemoryMonitoredComponent');

  return div(
    { className: 'memory-monitored' },
    ...data.map((item, index) => div({ key: index }, item))
  );
};
```

## Custom Hooks

### 1. Form Validation Hook

```typescript
import React from 'react';

const useFormValidation = <T extends Record<string, any>>(
  initialState: T,
  validationRules: Record<keyof T, (value: any) => string | null>
) => {
  const [values, setValues] = React.useState<T>(initialState);
  const [errors, setErrors] = React.useState<Partial<Record<keyof T, string>>>(
    {}
  );
  const [touched, setTouched] = React.useState<
    Partial<Record<keyof T, boolean>>
  >({});

  const validateField = (field: keyof T, value: T[keyof T]) => {
    const validator = validationRules[field];
    return validator ? validator(value) : null;
  };

  const setValue = (field: keyof T, value: T[keyof T]) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error || undefined }));
    }
  };

  const setTouchedField = (field: keyof T) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, values[field]);
    setErrors((prev) => ({ ...prev, [field]: error || undefined }));
  };

  const validateAll = () => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(validationRules).forEach((key) => {
      const field = key as keyof T;
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(validationRules).reduce(
        (acc, key) => ({
          ...acc,
          [key]: true,
        }),
        {}
      )
    );

    return isValid;
  };

  return {
    values,
    errors,
    touched,
    setValue,
    setTouchedField,
    validateAll,
    isValid: Object.keys(errors).length === 0,
  };
};
```

### 2. Debounced Hook

```typescript
import React from 'react';

const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Usage example
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  React.useEffect(() => {
    if (debouncedSearchTerm) {
      // Perform search with debounced value
      console.log('Searching for:', debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return input({
    value: searchTerm,
    onChange: (e) => setSearchTerm(e.target.value),
    placeholder: 'Search...',
  });
};
```

## Integration Patterns

### 1. Redux Integration

```typescript
import React from 'react';
import { div, button, span } from 'react-dom-functions';
import { useSelector, useDispatch } from 'react-redux';

const ReduxComponent = () => {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  return div(
    { className: 'redux-component' },
    span('Count: ', count),
    button(
      { onClick: () => dispatch({ type: 'counter/increment' }) },
      'Increment'
    ),
    button(
      { onClick: () => dispatch({ type: 'counter/decrement' }) },
      'Decrement'
    )
  );
};
```

### 2. React Router Integration

```typescript
import React from 'react';
import { div, a } from 'react-dom-functions';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return div(
    { className: 'navigation' },
    Link(
      { to: '/', className: location.pathname === '/' ? 'active' : '' },
      'Home'
    ),
    Link(
      {
        to: '/about',
        className: location.pathname === '/about' ? 'active' : '',
      },
      'About'
    ),
    Link(
      {
        to: '/contact',
        className: location.pathname === '/contact' ? 'active' : '',
      },
      'Contact'
    )
  );
};
```

### 3. Styled Components Integration

```typescript
import React from 'react';
import styled from 'styled-components';
import { div, span } from 'react-dom-functions';

const StyledContainer = styled.div`
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
`;

const StyledComponent = () => {
  return StyledContainer(
    div({ className: 'content' }, span('This is styled content'))
  );
};
```

This comprehensive guide covers the most important advanced patterns and best practices for using `react-dom-functions` in production applications. Each section provides practical examples that you can adapt to your specific use cases.
