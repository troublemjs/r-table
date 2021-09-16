import React from 'react';

// ====================== Customized ======================
export type GetComponentProps<DataType> = (
  data: DataType,
  index?: number,
) => React.HTMLAttributes<HTMLElement>;

type Component<P> =
  | React.ComponentType<P>
  | React.ForwardRefExoticComponent<P>
  | React.FC<P>
  | keyof React.ReactHTML;

export type CustomizeComponent = Component<any>;

export interface TableComponents {
  cell?: CustomizeComponent;
  headerCell?: CustomizeComponent;
  expandIcon?: CustomizeComponent;
  sortIndicator?: CustomizeComponent;
}

export type GetComponent = (
  name: keyof TableComponents,
  defaultComponent?: CustomizeComponent,
) => CustomizeComponent;
