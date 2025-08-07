# ui-icons-svg

This library was generated with [Nx](https://nx.dev).

## Purpose

This is the place to store all the SVG icons used in the application.
To avoid copy/pasting the content of the SVG files, into react components, we use the `@svgr/cli` to convert the SVG files into React components.

### 1. Converting SVG files into React components
```bash
$ npm run  generate
```
after running the above command, the SVG files will be converted into React components and stored in the `src/` folder.

### 2. Generating the index file
```bash
$ npm run generate:index

```

Run `nx test ui-icons-svg` to execute the unit tests via [Vitest](https://vitest.dev/).
