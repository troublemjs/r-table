import React from 'react';

let cached: number;

export const getScrollBarSize = (fresh?: boolean) => {
  if (typeof document === 'undefined') return 0;

  if (fresh || cached === undefined) {
    const inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '100px';

    const outer = document.createElement('div');
    const outerStyle = outer.style;

    outerStyle.position = 'absolute';
    outerStyle.top = '0';
    outerStyle.left = '0';
    outerStyle.pointerEvents = 'none';
    outerStyle.visibility = 'hidden';
    outerStyle.width = '100px';
    outerStyle.height = '50px';
    outerStyle.overflow = 'hidden';

    outer.appendChild(inner);
    document.body.appendChild(outer);

    const widthContained = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let widthScroll = inner.offsetWidth;

    // TODO: why
    // https://github.com/jyzwf/blog/issues/64 中“如何获取滚动条的宽度”小结中有说明，但是使用自己电脑未复现
    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }

    document.body.removeChild(outer);

    cached = widthContained - widthScroll;
  }

  return cached;
};

const ensureSize = (str: string) => {
  const match = str.match(/^(.*)px$/);
  const value = Number(match?.[1]);
  return Number.isNaN(value) ? getScrollBarSize() : value;
};

export const getTargetScrollBarSize = (target: HTMLElement) => {
  if (
    typeof document === 'undefined' ||
    !target ||
    !(target instanceof Element)
  ) {
    return { width: 0, height: 0 };
  }

  const { width, height } = getComputedStyle(target, '::-webkit-scrollbar');
  return {
    width: ensureSize(width),
    height: ensureSize(height),
  };
};

export function renderElement<P = any>(
  render: React.ComponentType<P>,
  props?: P,
): React.ReactElement;
export function renderElement<P = any>(
  render: React.ReactElement,
  props?: P,
): React.ReactElement<P>;
export function renderElement<P = any>(
  render: unknown,
  props?: P,
): React.ReactNode;
export function renderElement(render: any, props: any): React.ReactNode {
  if (React.isValidElement(render)) {
    return React.cloneElement(render, props);
  }
  if (typeof render === 'function') {
    if (render.prototype?.isReactComponent) {
      return React.createElement(render, props);
    }
    if (render.defaultProps) {
      return render({ ...render.defaultProps, ...props });
    }
    return render(props);
  }
  return null;
}
