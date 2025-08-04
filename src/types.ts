import React, { ReactNode } from 'react';

/**
 * A function component type that returns a DOM element.
 *
 * Use this type where you would normally use React.FC, but for components that return DOM elements
 * (e.g., when using function-based DOM element factories).
 *
 * @template Props - The props for the component. Defaults to an empty object.
 */
export type DOMFC<Props = Record<string, never>> = React.FC<
  Props & { children?: ReactNode }
>;

// Base element props type
export type BaseElementProps = {
  [key: string]: unknown;
  children?: React.ReactNode;
  /**
   * Accepts clsx syntax for conditional and dynamic class names.
   * See: https://github.com/lukeed/clsx
   */
  className?: string | string[] | Record<string, boolean> | null | undefined;
};

// Override React's className type to support clsx
export type ClsxClassName =
  | string
  | string[]
  | Record<string, boolean>
  | null
  | undefined;

// Specific element prop types for better type safety
export type DivProps = BaseElementProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> & {
    className?: ClsxClassName;
  };
export type SpanProps = BaseElementProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, 'className'> & {
    className?: ClsxClassName;
  };
export type ButtonProps = BaseElementProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
    className?: ClsxClassName;
  };
export type InputProps = BaseElementProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> & {
    className?: ClsxClassName;
  };
export type FormProps = BaseElementProps &
  Omit<React.FormHTMLAttributes<HTMLFormElement>, 'className'> & {
    className?: ClsxClassName;
  };
export type AnchorProps = BaseElementProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & {
    className?: ClsxClassName;
  };
export type ImageProps = BaseElementProps &
  Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'className'> & {
    className?: ClsxClassName;
  };
export type ParagraphProps = BaseElementProps &
  Omit<React.HTMLAttributes<HTMLParagraphElement>, 'className'> & {
    className?: ClsxClassName;
  };
export type HeadingProps = BaseElementProps &
  Omit<React.HTMLAttributes<HTMLHeadingElement>, 'className'> & {
    className?: ClsxClassName;
  };
export type ListProps = BaseElementProps &
  Omit<
    React.OlHTMLAttributes<HTMLOListElement> &
      React.HTMLAttributes<HTMLUListElement>,
    'className'
  > & { className?: ClsxClassName };
export type ListItemProps = BaseElementProps &
  Omit<React.LiHTMLAttributes<HTMLLIElement>, 'className'> & {
    className?: ClsxClassName;
  };
export type TableProps = BaseElementProps &
  Omit<React.TableHTMLAttributes<HTMLTableElement>, 'className'> & {
    className?: ClsxClassName;
  };
export type TableCellProps = BaseElementProps &
  Omit<
    React.TdHTMLAttributes<HTMLTableDataCellElement> &
      React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    'className'
  > & { className?: ClsxClassName };
export type TextAreaProps = BaseElementProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> & {
    className?: ClsxClassName;
  };
export type SelectProps = BaseElementProps &
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'className'> & {
    className?: ClsxClassName;
  };
export type LabelProps = BaseElementProps &
  Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'className'> & {
    className?: ClsxClassName;
  };

// Union type for all element props
export type ElementProps =
  | DivProps
  | SpanProps
  | ButtonProps
  | InputProps
  | FormProps
  | AnchorProps
  | ImageProps
  | ParagraphProps
  | HeadingProps
  | ListProps
  | ListItemProps
  | TableProps
  | TableCellProps
  | TextAreaProps
  | SelectProps
  | LabelProps
  | BaseElementProps;
