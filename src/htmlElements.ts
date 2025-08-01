import React from 'react';
import clsx from 'clsx';

// HTML element type
type ElementProps = {
  [key: string]: unknown;
  children?: React.ReactNode;
  /**
   * Accepts clsx syntax for conditional and dynamic class names.
   * See: https://github.com/lukeed/clsx
   */
  className?: Parameters<typeof clsx>[0];
};

// Helper function to create element functions
const createElement = (tag: string) => {
  return (
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
};

// Document metadata elements
export const title = createElement('title');
export const base = createElement('base');
export const link = createElement('link');
export const meta = createElement('meta');
export const style = createElement('style');

// Content sectioning elements
export const address = createElement('address');
export const article = createElement('article');
export const aside = createElement('aside');
export const footer = createElement('footer');
export const header = createElement('header');
export const h1 = createElement('h1');
export const h2 = createElement('h2');
export const h3 = createElement('h3');
export const h4 = createElement('h4');
export const h5 = createElement('h5');
export const h6 = createElement('h6');
export const hgroup = createElement('hgroup');
export const main = createElement('main');
export const nav = createElement('nav');
export const section = createElement('section');

// Text content elements
export const blockquote = createElement('blockquote');
export const dd = createElement('dd');
export const div = createElement('div');
export const dl = createElement('dl');
export const dt = createElement('dt');
export const figcaption = createElement('figcaption');
export const figure = createElement('figure');
export const hr = createElement('hr');
export const li = createElement('li');
export const ol = createElement('ol');
export const p = createElement('p');
export const pre = createElement('pre');
export const ul = createElement('ul');

// Inline text semantics elements
export const a = createElement('a');
export const abbr = createElement('abbr');
export const b = createElement('b');
export const bdi = createElement('bdi');
export const bdo = createElement('bdo');
export const br = createElement('br');
export const cite = createElement('cite');
export const code = createElement('code');
export const data = createElement('data');
export const dfn = createElement('dfn');
export const em = createElement('em');
export const i = createElement('i');
export const kbd = createElement('kbd');
export const mark = createElement('mark');
export const q = createElement('q');
export const rb = createElement('rb');
export const rp = createElement('rp');
export const rt = createElement('rt');
export const rtc = createElement('rtc');
export const ruby = createElement('ruby');
export const s = createElement('s');
export const samp = createElement('samp');
export const small = createElement('small');
export const span = createElement('span');
export const strong = createElement('strong');
export const sub = createElement('sub');
export const sup = createElement('sup');
export const time = createElement('time');
export const u = createElement('u');
export const var_ = createElement('var');
export const wbr = createElement('wbr');

// Image and multimedia elements
export const area = createElement('area');
export const audio = createElement('audio');
export const img = createElement('img');
export const map = createElement('map');
export const track = createElement('track');
export const video = createElement('video');

// Embedded content elements
export const embed = createElement('embed');
export const iframe = createElement('iframe');
export const object = createElement('object');
export const param = createElement('param');
export const picture = createElement('picture');
export const source = createElement('source');

// Scripting elements
export const canvas = createElement('canvas');
export const noscript = createElement('noscript');
export const script = createElement('script');

// Demarcating edits elements
export const del = createElement('del');
export const ins = createElement('ins');

// Table content elements
export const caption = createElement('caption');
export const col = createElement('col');
export const colgroup = createElement('colgroup');
export const table = createElement('table');
export const tbody = createElement('tbody');
export const td = createElement('td');
export const tfoot = createElement('tfoot');
export const th = createElement('th');
export const thead = createElement('thead');
export const tr = createElement('tr');

// Forms elements
export const button = createElement('button');
export const datalist = createElement('datalist');
export const fieldset = createElement('fieldset');
export const form = createElement('form');
export const input = createElement('input');
export const label = createElement('label');
export const legend = createElement('legend');
export const meter = createElement('meter');
export const optgroup = createElement('optgroup');
export const option = createElement('option');
export const output = createElement('output');
export const progress = createElement('progress');
export const select = createElement('select');
export const textarea = createElement('textarea');

// Interactive elements
export const details = createElement('details');
export const dialog = createElement('dialog');
export const menu = createElement('menu');
export const menuitem = createElement('menuitem');
export const summary = createElement('summary');

// Web Components elements
export const slot = createElement('slot');
export const template = createElement('template');

// SVG and MathML elements (basic ones)
export const svg = createElement('svg');
export const circle = createElement('circle');
export const rect = createElement('rect');
export const path = createElement('path');
export const line = createElement('line');
export const polygon = createElement('polygon');
export const polyline = createElement('polyline');
export const ellipse = createElement('ellipse');
export const g = createElement('g');
export const text = createElement('text');
export const tspan = createElement('tspan');

// MathML elements
export const math = createElement('math');
export const mrow = createElement('mrow');
export const mfrac = createElement('mfrac');
export const msqrt = createElement('msqrt');
export const mroot = createElement('mroot');
export const msub = createElement('msub');
export const msup = createElement('msup');
export const msubsup = createElement('msubsup');
export const munder = createElement('munder');
export const mover = createElement('mover');
export const munderover = createElement('munderover');
export const mmultiscripts = createElement('mmultiscripts');
export const mtable = createElement('mtable');
export const mtr = createElement('mtr');
export const mtd = createElement('mtd');
export const maction = createElement('maction');
export const merror = createElement('merror');
export const mpadded = createElement('mpadded');
export const mphantom = createElement('mphantom');
export const mspace = createElement('mspace');
export const mstyle = createElement('mstyle');
export const ms = createElement('ms');
export const mtext = createElement('mtext');
export const mn = createElement('mn');
export const mo = createElement('mo');
export const mi = createElement('mi');

// Fragment for React.Fragment
export const fragment = (
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
    return React.createElement(
      React.Fragment,
      propsOrChildren as ElementProps,
      ...children
    );
  } else {
    // First argument is a child, no props
    return React.createElement(
      React.Fragment,
      undefined,
      propsOrChildren,
      ...children
    );
  }
};
