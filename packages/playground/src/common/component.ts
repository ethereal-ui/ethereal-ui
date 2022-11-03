import { JSX, Component as SComp } from 'solid-js';

import { CssMeta } from '../css/CssMeta';
import { DescendantsSpec } from '../css/DescendantsSpec';
import { Component } from '../types/Component';

export const component = <
  Props extends {},
  Modifier extends string,
  Descendants extends DescendantsSpec
>(
  css: CssMeta<Modifier, Descendants>,
  impl: (props: Props) => JSX.Element
): Component<Props, CssMeta<Modifier, Descendants>> =>
  Object.assign(impl, { css });
