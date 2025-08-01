import { render } from '@testing-library/react';
import * as elements from './htmlElements';

describe('HTML Elements', () => {
  // Test all exported elements exist
  const expectedElements = [
    // Document metadata elements
    'title',
    'base',
    'link',
    'meta',
    'style',
    // Content sectioning elements
    'address',
    'article',
    'aside',
    'footer',
    'header',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'hgroup',
    'main',
    'nav',
    'section',
    // Text content elements
    'blockquote',
    'dd',
    'div',
    'dl',
    'dt',
    'figcaption',
    'figure',
    'hr',
    'li',
    'ol',
    'p',
    'pre',
    'ul',
    // Inline text semantics elements
    'a',
    'abbr',
    'b',
    'bdi',
    'bdo',
    'br',
    'cite',
    'code',
    'data',
    'dfn',
    'em',
    'i',
    'kbd',
    'mark',
    'q',
    'rb',
    'rp',
    'rt',
    'rtc',
    'ruby',
    's',
    'samp',
    'small',
    'span',
    'strong',
    'sub',
    'sup',
    'time',
    'u',
    'var_',
    'wbr',
    // Image and multimedia elements
    'area',
    'audio',
    'img',
    'map',
    'track',
    'video',
    // Embedded content elements
    'embed',
    'iframe',
    'object',
    'param',
    'picture',
    'source',
    // Scripting elements
    'canvas',
    'noscript',
    'script',
    // Demarcating edits elements
    'del',
    'ins',
    // Table content elements
    'caption',
    'col',
    'colgroup',
    'table',
    'tbody',
    'td',
    'tfoot',
    'th',
    'thead',
    'tr',
    // Forms elements
    'button',
    'datalist',
    'fieldset',
    'form',
    'input',
    'label',
    'legend',
    'meter',
    'optgroup',
    'option',
    'output',
    'progress',
    'select',
    'textarea',
    // Interactive elements
    'details',
    'dialog',
    'menu',
    'menuitem',
    'summary',
    // Web Components elements
    'slot',
    'template',
    // SVG and MathML elements
    'svg',
    'circle',
    'rect',
    'path',
    'line',
    'polygon',
    'polyline',
    'ellipse',
    'g',
    'text',
    'tspan',
    // MathML elements
    'math',
    'mrow',
    'mfrac',
    'msqrt',
    'mroot',
    'msub',
    'msup',
    'msubsup',
    'munder',
    'mover',
    'munderover',
    'mmultiscripts',
    'mtable',
    'mtr',
    'mtd',
    'maction',
    'merror',
    'mpadded',
    'mphantom',
    'mspace',
    'mstyle',
    'ms',
    'mtext',
    'mn',
    'mo',
    'mi',
    // Fragment
    'fragment',
  ];

  test('all expected elements are exported', () => {
    expectedElements.forEach((elementName) => {
      expect(elements).toHaveProperty(elementName);
    });
  });

  test('elements are functions', () => {
    expectedElements.forEach((elementName) => {
      expect(typeof elements[elementName as keyof typeof elements]).toBe(
        'function'
      );
    });
  });

  describe('Basic element creation', () => {
    test('creates div with children', () => {
      const element = elements.div('Hello World');
      const { container } = render(element);
      expect(container.firstChild).toHaveTextContent('Hello World');
    });

    test('creates div with props and children', () => {
      const element = elements.div({ className: 'test-class' }, 'Hello World');
      const { container } = render(element);
      const div = container.firstChild as HTMLElement;
      expect(div).toHaveClass('test-class');
      expect(div).toHaveTextContent('Hello World');
    });

    test('creates nested elements', () => {
      const element = elements.div(
        { className: 'container' },
        elements.h1('Title'),
        elements.p('Paragraph')
      );
      const { container } = render(element);
      expect(container.firstChild).toHaveClass('container');
      expect(container.querySelector('h1')).toHaveTextContent('Title');
      expect(container.querySelector('p')).toHaveTextContent('Paragraph');
    });
  });

  describe('Form elements', () => {
    test('creates input with props', () => {
      const element = elements.input({
        type: 'text',
        placeholder: 'Enter text',
      });
      const { container } = render(element);
      const input = container.firstChild as HTMLInputElement;
      expect(input.type).toBe('text');
      expect(input.placeholder).toBe('Enter text');
    });

    test('creates form with multiple inputs', () => {
      const element = elements.form(
        { onSubmit: () => {} },
        elements.input({ type: 'text', name: 'username' }),
        elements.input({ type: 'password', name: 'password' }),
        elements.button({ type: 'submit' }, 'Submit')
      );
      const { container } = render(element);
      expect(container.querySelector('form')).toBeTruthy();
      expect(container.querySelectorAll('input')).toHaveLength(2);
      expect(container.querySelector('button')).toHaveTextContent('Submit');
    });
  });

  describe('Table elements', () => {
    test('creates table structure', () => {
      const element = elements.table(
        elements.thead(elements.tr(elements.th('Name'), elements.th('Age'))),
        elements.tbody(elements.tr(elements.td('John'), elements.td('25')))
      );
      const { container } = render(element);
      expect(container.querySelector('table')).toBeTruthy();
      expect(container.querySelector('thead')).toBeTruthy();
      expect(container.querySelector('tbody')).toBeTruthy();
      expect(container.querySelectorAll('th')).toHaveLength(2);
      expect(container.querySelectorAll('td')).toHaveLength(2);
    });
  });

  describe('List elements', () => {
    test('creates unordered list', () => {
      const element = elements.ul(
        elements.li('Item 1'),
        elements.li('Item 2'),
        elements.li('Item 3')
      );
      const { container } = render(element);
      const list = container.firstChild as HTMLElement;
      expect(list.tagName).toBe('UL');
      expect(list.querySelectorAll('li')).toHaveLength(3);
    });

    test('creates ordered list', () => {
      const element = elements.ol(elements.li('First'), elements.li('Second'));
      const { container } = render(element);
      const list = container.firstChild as HTMLElement;
      expect(list.tagName).toBe('OL');
      expect(list.querySelectorAll('li')).toHaveLength(2);
    });
  });

  describe('SVG elements', () => {
    test('creates SVG with circle', () => {
      const element = elements.svg(
        { width: '100', height: '100' },
        elements.circle({ cx: '50', cy: '50', r: '40' })
      );
      const { container } = render(element);
      const svg = container.firstChild as SVGElement;
      expect(svg.tagName).toBe('svg');
      expect(svg.getAttribute('width')).toBe('100');
      expect(svg.getAttribute('height')).toBe('100');
      expect(svg.querySelector('circle')).toBeTruthy();
    });

    test('creates SVG with rect', () => {
      const element = elements.svg(
        { width: '200', height: '100' },
        elements.rect({ x: '10', y: '10', width: '80', height: '80' })
      );
      const { container } = render(element);
      const svg = container.firstChild as SVGElement;
      expect(svg.querySelector('rect')).toBeTruthy();
    });
  });

  describe('Fragment', () => {
    test('creates React Fragment', () => {
      const element = elements.fragment(
        elements.div('First'),
        elements.div('Second')
      );
      const { container } = render(element as React.ReactElement);
      // Fragment doesn't create a DOM element, so we check for the children
      expect(container.children).toHaveLength(2);
      expect(container.firstChild).toHaveTextContent('First');
      expect(container.lastChild).toHaveTextContent('Second');
    });

    test('creates Fragment with props', () => {
      const element = elements.fragment(
        { key: 'test-key' },
        elements.div('Content')
      );
      const { container } = render(element as React.ReactElement);
      expect(container.firstChild).toHaveTextContent('Content');
    });
  });

  describe('Complex nested structures', () => {
    test('creates complex nested structure', () => {
      const element = elements.div(
        { className: 'app' },
        elements.header(
          elements.h1('My App'),
          elements.nav(
            elements.ul(
              elements.li(elements.a({ href: '/' }, 'Home')),
              elements.li(elements.a({ href: '/about' }, 'About'))
            )
          )
        ),
        elements.main(
          elements.article(
            elements.h2('Article Title'),
            elements.p('Article content here.'),
            elements.blockquote('A quote here.')
          )
        ),
        elements.footer(elements.p('© 2024 My App'))
      );

      const { container } = render(element);

      // Check main structure
      expect(container.querySelector('.app')).toBeTruthy();
      expect(container.querySelector('header')).toBeTruthy();
      expect(container.querySelector('main')).toBeTruthy();
      expect(container.querySelector('footer')).toBeTruthy();

      // Check header content
      expect(container.querySelector('h1')).toHaveTextContent('My App');
      expect(container.querySelectorAll('nav a')).toHaveLength(2);

      // Check main content
      expect(container.querySelector('article h2')).toHaveTextContent(
        'Article Title'
      );
      expect(container.querySelector('article p')).toHaveTextContent(
        'Article content here.'
      );
      expect(container.querySelector('blockquote')).toHaveTextContent(
        'A quote here.'
      );

      // Check footer
      expect(container.querySelector('footer p')).toHaveTextContent(
        '© 2024 My App'
      );
    });
  });

  describe('Edge cases', () => {
    test('handles empty children', () => {
      const element = elements.div();
      const { container } = render(element);
      expect(container.firstChild).toBeTruthy();
    });

    test('handles null and undefined children', () => {
      const element = elements.div(null, undefined, 'Valid text');
      const { container } = render(element);
      expect(container.firstChild).toHaveTextContent('Valid text');
    });

    test('handles array children', () => {
      const element = elements.div([
        elements.span({ key: 'first' }, 'First'),
        elements.span({ key: 'second' }, 'Second'),
      ]);
      const { container } = render(element);
      expect(container.querySelectorAll('span')).toHaveLength(2);
    });

    test('handles mixed children types', () => {
      const element = elements.div(
        'Text node',
        elements.span('Element'),
        null,
        undefined,
        ['Array', 'of', 'strings']
      );
      const { container } = render(element);
      expect(container.firstChild).toHaveTextContent(
        'Text nodeElementArrayofstrings'
      );
    });
  });

  // New comprehensive test sections
  describe('Performance and memory', () => {
    test('creates elements efficiently', () => {
      const startTime = performance.now();
      Array.from({ length: 1000 }, (_, i) =>
        elements.div({ key: i }, `Element ${i}`)
      );
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(100); // Should complete in under 100ms
    });

    test('handles large nested structures', () => {
      const createNestedStructure = (depth: number): React.ReactElement => {
        if (depth === 0) return elements.span('Leaf');
        return elements.div(
          { className: `level-${depth}` },
          createNestedStructure(depth - 1),
          createNestedStructure(depth - 1)
        );
      };

      const element = createNestedStructure(10);
      const { container } = render(element);

      // Should render without errors
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('Type safety', () => {
    test('handles proper event handlers', () => {
      const mockHandler = jest.fn();
      const element = elements.button(
        { onClick: mockHandler, type: 'button' },
        'Click me'
      );
      const { container } = render(element);
      const button = container.firstChild as HTMLButtonElement;

      button.click();
      expect(mockHandler).toHaveBeenCalledTimes(1);
    });

    test('handles proper form attributes', () => {
      const element = elements.form(
        { action: '/submit', method: 'post' },
        elements.input({ type: 'text', name: 'test', required: true })
      );
      const { container } = render(element);
      const form = container.firstChild as HTMLFormElement;
      const input = form.querySelector('input') as HTMLInputElement;

      expect(form.action).toContain('/submit');
      expect(form.method).toBe('post');
      expect(input.required).toBe(true);
    });
  });

  describe('Accessibility', () => {
    test('handles ARIA attributes', () => {
      const element = elements.div(
        {
          role: 'button',
          'aria-label': 'Click me',
          'aria-pressed': false,
          tabIndex: 0,
        },
        'Accessible button'
      );
      const { container } = render(element);
      const div = container.firstChild as HTMLElement;

      expect(div.getAttribute('role')).toBe('button');
      expect(div.getAttribute('aria-label')).toBe('Click me');
      expect(div.getAttribute('aria-pressed')).toBe('false');
      expect(div.getAttribute('tabindex')).toBe('0');
    });

    test('handles data attributes', () => {
      const element = elements.div(
        { 'data-testid': 'test-element', 'data-custom': 'value' },
        'Test content'
      );
      const { container } = render(element);
      const div = container.firstChild as HTMLElement;

      expect(div.getAttribute('data-testid')).toBe('test-element');
      expect(div.getAttribute('data-custom')).toBe('value');
    });
  });

  describe('CSS class handling', () => {
    test('handles clsx syntax correctly', () => {
      const element = elements.div(
        {
          className: [
            'base-class',
            { 'conditional-class': true, 'hidden-class': false },
            'another-class',
          ],
        },
        'Content'
      );
      const { container } = render(element);
      const div = container.firstChild as HTMLElement;

      expect(div).toHaveClass('base-class');
      expect(div).toHaveClass('conditional-class');
      expect(div).not.toHaveClass('hidden-class');
      expect(div).toHaveClass('another-class');
    });

    test('handles empty className', () => {
      const element = elements.div({ className: '' }, 'Content');
      const { container } = render(element);
      const div = container.firstChild as HTMLElement;

      expect(div.className).toBe('');
    });

    test('handles undefined className', () => {
      const element = elements.div({ className: undefined }, 'Content');
      const { container } = render(element);
      const div = container.firstChild as HTMLElement;

      expect(div.className).toBe('');
    });
  });

  describe('Error handling', () => {
    test('handles invalid props gracefully', () => {
      // This should not throw an error
      const element = elements.div(
        { invalidProp: 'value' } as Record<string, unknown>,
        'Content'
      );
      const { container } = render(element);
      expect(container.firstChild).toBeTruthy();
    });

    test('handles function props', () => {
      const mockFunction = jest.fn();
      const element = elements.div(
        { onClick: mockFunction, onMouseEnter: mockFunction },
        'Content'
      );
      const { container } = render(element);
      const div = container.firstChild as HTMLElement;

      div.click();
      expect(mockFunction).toHaveBeenCalledTimes(1);
    });
  });
});
