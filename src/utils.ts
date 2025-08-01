import React from 'react';
import clsx from 'clsx';
import type { ElementProps } from './types';

// Memoized element creator for better performance
const elementCache = new Map<
  string,
  (
    propsOrChildren?: ElementProps | React.ReactNode,
    ...children: React.ReactNode[]
  ) => React.ReactElement
>();

export const createMemoizedElement = (tag: string) => {
  if (elementCache.has(tag)) {
    return elementCache.get(tag)!;
  }

  const elementFunction = (
    propsOrChildren?: ElementProps | React.ReactNode,
    ...children: React.ReactNode[]
  ) => {
    // If the first argument is not an object (i.e., it's a child), treat it as children
    if (
      propsOrChildren &&
      typeof propsOrChildren === 'object' &&
      !React.isValidElement(propsOrChildren) &&
      !Array.isArray(propsOrChildren)
    ) {
      // First argument is props
      const props = propsOrChildren as ElementProps;

      // Process className with clsx if it exists
      if (props.className !== undefined) {
        const processedProps = {
          ...props,
          className: clsx(props.className),
        };
        return React.createElement(tag, processedProps, ...children);
      }

      return React.createElement(tag, props, ...children);
    } else {
      // First argument is a child, no props
      return React.createElement(tag, undefined, propsOrChildren, ...children);
    }
  };

  elementCache.set(tag, elementFunction);
  return elementFunction;
};

// Helper function to create multiple elements at once
export const createElements = (tags: string[]) => {
  const elements: Record<
    string,
    (
      propsOrChildren?: ElementProps | React.ReactNode,
      ...children: React.ReactNode[]
    ) => React.ReactElement
  > = {};
  tags.forEach((tag) => {
    elements[tag] = createMemoizedElement(tag);
  });
  return elements;
};

// Utility function for conditional rendering
export const conditional = (
  condition: boolean,
  element: React.ReactNode,
  fallback?: React.ReactNode
) => {
  return condition ? element : fallback || null;
};

// Utility function for list rendering with better key handling
export const mapWithKeys = <T>(
  items: T[],
  renderFn: (item: T, index: number) => React.ReactNode,
  keyFn?: (item: T, index: number) => string | number
) => {
  return items.map((item, index) => {
    const key = keyFn ? keyFn(item, index) : index;
    return React.cloneElement(renderFn(item, index) as React.ReactElement, {
      key,
    });
  });
};
