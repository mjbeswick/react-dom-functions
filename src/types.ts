import React from 'react';

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

// Specific element prop types for better type safety
export type DivProps = BaseElementProps & React.HTMLAttributes<HTMLDivElement>;
export type SpanProps = BaseElementProps &
  React.HTMLAttributes<HTMLSpanElement>;
export type ButtonProps = BaseElementProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;
export type InputProps = BaseElementProps &
  React.InputHTMLAttributes<HTMLInputElement>;
export type FormProps = BaseElementProps &
  React.FormHTMLAttributes<HTMLFormElement>;
export type AnchorProps = BaseElementProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;
export type ImageProps = BaseElementProps &
  React.ImgHTMLAttributes<HTMLImageElement>;
export type ParagraphProps = BaseElementProps &
  React.HTMLAttributes<HTMLParagraphElement>;
export type HeadingProps = BaseElementProps &
  React.HTMLAttributes<HTMLHeadingElement>;
export type ListProps = BaseElementProps &
  React.OlHTMLAttributes<HTMLOListElement> &
  React.UlHTMLAttributes<HTMLUListElement>;
export type ListItemProps = BaseElementProps &
  React.LiHTMLAttributes<HTMLLIElement>;
export type TableProps = BaseElementProps &
  React.TableHTMLAttributes<HTMLTableElement>;
export type TableCellProps = BaseElementProps &
  React.TdHTMLAttributes<HTMLTableDataCellElement> &
  React.ThHTMLAttributes<HTMLTableHeaderCellElement>;
export type TextAreaProps = BaseElementProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export type SelectProps = BaseElementProps &
  React.SelectHTMLAttributes<HTMLSelectElement>;
export type LabelProps = BaseElementProps &
  React.LabelHTMLAttributes<HTMLLabelElement>;

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
