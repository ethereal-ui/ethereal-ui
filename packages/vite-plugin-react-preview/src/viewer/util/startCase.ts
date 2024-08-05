export const startCase = (input: string): string =>
  input
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(/[ _-]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
