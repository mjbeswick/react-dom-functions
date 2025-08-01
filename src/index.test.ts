import * as elements from './index';

describe('Index exports', () => {
  test('exports all HTML elements', () => {
    // Check that we have a good number of exports
    const exportKeys = Object.keys(elements);
    expect(exportKeys.length).toBeGreaterThan(100); // Should have many HTML elements
    
    // Check for some key elements
    expect(elements).toHaveProperty('div');
    expect(elements).toHaveProperty('span');
    expect(elements).toHaveProperty('h1');
    expect(elements).toHaveProperty('button');
    expect(elements).toHaveProperty('input');
    expect(elements).toHaveProperty('form');
    expect(elements).toHaveProperty('table');
    expect(elements).toHaveProperty('svg');
    expect(elements).toHaveProperty('fragment');
  });

  test('all exports are functions', () => {
    const exportKeys = Object.keys(elements);
    exportKeys.forEach((key) => {
      expect(typeof elements[key as keyof typeof elements]).toBe('function');
    });
  });

  test('can create elements from index exports', () => {
    const element = elements.div(
      { className: 'test' },
      elements.h1('Title'),
      elements.p('Content')
    );
    
    expect(element).toBeDefined();
    expect(typeof element).toBe('object');
  });
}); 