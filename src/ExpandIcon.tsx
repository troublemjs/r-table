import React from 'react';
import cn from 'classnames';

export interface ExpandIconProps {
  expandable?: boolean;
  expanded?: boolean;
  indentSize?: number;
  depth?: number;
  onExpand?: (...args: any[]) => void;
}

const ExpandIcon: React.FC<ExpandIconProps> = (props) => {
  const { expandable, expanded, indentSize, depth, onExpand, ...rest } = props;

  const handleClick = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    onExpand!(!expanded);
  };

  if (!expandable && indentSize === 0) return null;

  const cls = cn('BaseTable__expand-icon', {
    'BaseTable__expand-icon--expanded': expanded,
  });
  return (
    <div
      {...rest}
      className={cls}
      onClick={expandable && onExpand ? handleClick : null}
      style={{
        fontFamily: 'initial',
        cursor: 'pointer',
        userSelect: 'none',
        width: '16px',
        minWidth: '16px',
        height: '16px',
        lineHeight: '16px',
        fontSize: '16px',
        textAlign: 'center',
        transition: 'transform 0.15s ease-out',
        transform: `rotate(${expandable && expanded ? 90 : 0}deg)`,
        marginLeft: depth! * indentSize!,
      }}
    >
      {expandable && '\u25B8'}
    </div>
  );
};

ExpandIcon.defaultProps = {
  depth: 0,
  indentSize: 16,
};

export default ExpandIcon;
