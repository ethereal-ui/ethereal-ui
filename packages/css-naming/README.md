# @ethereal-ui/css-naming

This module provides functions that help create CSS class names and selectors
following a naming convention.

## Installation

To install the package, use the following command:

```sh
npm install @ethereal-ui/css-naming
```

## Motivation

When you develop a web app, you have plenty of options for handling CSS class
name modularization: CSS-in-JS, CSS Modules, Web Components' shadow DOM, and
naming conventions.

However, the requirements for an extensible design system are slightly
different. We need to have namespace isolation while providing extensibility.
There are a few options to accomplish this:

- Some CSS-in-JS solutions allow using components as selectors. However, these
  solutions are specific to a particular CSS-in-JS framework, forcing the design
  system users to use the same framework.
- CSS Custom Properties (aka CSS Variables) are standard and work with Web
  Components or anything using CSS. However, the customization options are
  limited to the defined variables.
- A CSS naming convention is an old workaround, but 0its maintenance is painful.

The goal of this library is to provide functions that ease the maintenance of a
CSS naming convention by supporting TypeScript and providing helpers that are
easy to use from React. The library doesn't depend on React, and you may use it
with other frameworks, but it returns objects with the `className` field to make
it easy to include in React's JSX.

## Naming Convention

Every component has a **root class** with the format: `prefix-ComponentName`.

A component may have sub-elements. The **sub-element class** starts with the
root class and uses camel-case: `prefix-ComponentName-element.`

There is only one level of sub-elements. If you need more nesting levels,
consider creating another component.

The root class may have **modifiers**, which are other classes that indicate a
style variant or component state. Modifiers are prefixed camel-case names always
used with the root class: `prefix-ComponentName prefix-modifier`. Sub-elements
don't have modifiers because modifiers apply to the whole component, and it's
easy to control the sub-element style with them:

```css
.prefix-ComponentName.prefix-modifier .prefix-ComponentName-element {
  /* styles of the element when the modifier is active */
}
```

> **In a Nutshell:**
>
> - Component class: `prefix-ComponentName`
> - Sub-element class: `prefix-ComponentName-subElementName`
> - Modifiers: `prefix-ComponentName prefix-modifierName`

## Usage

The module exports the `componentClassNames` function, which returns a tuple of
objects with strings following a CSS naming convention for a component:

```js
const [classNames, selectors] = componentClassNames('ComponentName');
```

### The Class Names Object

The first value of the result tuple is an object that contains a `className`
field for the component class, simplifying usage with React (for brevity, I
prefer to name it `cn`):

```jsx
import { componentClassNames } from '@ethereal-ui/css-naming';

const [cn] = componentClassNames('Example');
// cn.className === 'eui-Example'

const Example = () => <div {...cn} />;
```

Other fields represent sub-elements:

```jsx
const [cn] = componentClassNames('Example', { elements: ['child'] });
// cn.child.className === "eui-Example-child"

const Example = () => (
  <div {...cn}>
    <div {...cn.child} />
  </div>
);
```

The class names object is also a function, allowing you to pass additional
classes or modifiers:

```jsx
const [cn] = componentClassNames('Example', {
  elements: ['child'],
  modifiers: {
    danger: Boolean,
    variant: ['small', 'large'],
  },
});

const Example = ({ danger, variant }) => (
  <div {...cn({ danger, variant })}>
    <div {...cn.child} />
  </div>
);

// it supports an additional className prop
const AlternativeExample = ({ className, danger, variant }) => (
  <div {...cn(className, { danger, variant })}>
    <div {...cn.child} />
  </div>
);
```

### The Selectors Object

The second value of the result tuple contains CSS selectors and is designed to
work with CSS template strings:

```js
const [cn, selectors] = componentClassNames('Example', {
  elements: ['child'],
  modifiers: {
    danger: Boolean,
    variant: ['small', 'large'],
  },
});

const css = `
  ${selectors.root} {color: gray;}
  ${selectors.child} {color: blue;}
`;
```

The `modifiers` field returns the modifier classes:

```js
const css = `
  ${selectors.modifiers.danger} {color: red;}
  ${selectors.modifiers.variant.large} {font-size: 2rem;}
`;
```

### TypeScript Support

The `componentClassNames` function returns a type that helps to type-check the
class names and selectors object. If your component structure changes, an
invalid selector or element will fail to compile. For this to work as expected,
the type of the options passed to the function should be constant so TypeScript
can infer the names of each element instead of using the general `string` type:

```ts
const [cn, selectors] = componentClassNames(
  'Example',
  {
    elements: ['child'],
    modifiers: {
      danger: Boolean,
      variant: ['small', 'large'],
    },
  } as const /* IMPORTANT: if you want to infer specific types correctly */
);

const css = `
  /* This typo fails to compile: */
  ${selectors.modifiers.dager} {color: red;} 
  /* The medium variant no longer exists and fails to compile: */
  ${selectors.modifiers.variant.medium} {font-size: 2rem;}
`;
```

## API

```ts
function componentClassNames<
  N extends string,
  E extends string,
  M extends ModifiersSpec,
  P extends string = typeof defaultPrefix,
>(
  name: N,
  options?: ComponentClassNameOptions<P, E, M>
): readonly [ComponentClassNames<E, M>, ComponentSelectors<P, N, E, M>];
```

- **name**: the component's name
- **options** (optional):
  - **prefix**: the class names prefix (`eui` by default)
  - **elements**: an array with the sub-elements names
  - **modifiers**: an object specifying the modifiers

> **IMPORTANT:** TypeScript will infer the result type from the `options`
> parameter. Make sure that the type of the `options` object is well defined
> (using `as const` will be enough in most cases).

### The Modifiers Object

Use the `Boolean` constructor to specify on/off modifiers:

```ts
const [cn] = componentClassName('Example', {
  modifiers: { danger: Boolean },
} as const);
const resultOn = cn({ danger: true });
const resultOff = cn({ danger: false });
// resultOn = {className: 'eui-Example eui-danger'}
// resultOff = {className: 'eui-Example'}
```

Use a string array to specify modifier values:

```ts
const [cn] = componentClassName('Example', {
  modifiers: { variant: ['primary', 'secondary'] },
} as const);

const result1 = cn({ variant: 'primary' });
// result1 = {className: 'eui-Example eui-variant-primary'}
const resultSecondary = cn({ variant: 'secondary' });
// result2 = {className: 'eui-Example eui-variant-secondary'}
```
