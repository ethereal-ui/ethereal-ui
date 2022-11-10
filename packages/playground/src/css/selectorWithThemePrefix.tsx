import { CssMeta } from './CssMeta.js';
import { DescendantSelector } from './DescendantSelector.js';
import { DescendantsSpec } from './DescendantsSpec.js';
import { Selector } from './Selector.js';

function* mapDescendants<
  Modifier extends string,
  Descendants extends DescendantsSpec<DescendantName>,
  DescendantName extends string
>(
  descendants: Iterable<DescendantName>,
  selector: Selector<Modifier> &
    DescendantSelector<Descendants, DescendantName>,
  themePrefix: (str: string) => string
) {
  for (const descendant of descendants) {
    yield [
      descendant,
      (...names: any[]) => themePrefix(selector[descendant](...names)),
    ];
  }
}

export const selectorWithThemePrefix = <
  Modifier extends string,
  Descendants extends DescendantsSpec<DescendantName>,
  DescendantName extends string
>(
  themeName: string,
  css: CssMeta<Modifier, Descendants, DescendantName>
): CssMeta<Modifier, Descendants, DescendantName>['selector'] => {
  const prefix = `.eui-theme-${themeName}`;

  const themePrefix = (selector: string) =>
    `${prefix} ${selector}, ${prefix}${selector}`;

  const result: Selector<Modifier> = (...names) =>
    themePrefix(css.selector(...names));

  return Object.assign(
    result,
    Object.fromEntries(
      mapDescendants(css.descendants(), css.selector, themePrefix)
    )
  );
};
