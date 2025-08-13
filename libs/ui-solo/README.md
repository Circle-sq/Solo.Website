# ui-solo

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test ui-solo` to execute the unit tests via [Vitest](https://vitest.dev/).

## Create lib
```bash
nx g @nx/react:library --name=ui-solo --unitTestRunner=vitest --bundler=vite --compiler=swc --projectNameAndRootFormat=as-provided  --no-interactive --dry-run 
```
## Create Storybook config (react generator)
```bash
$ npx nx g @nx/react:storybook-configuration --project=ui-asian-view --no-interactive --dry-run
```
## Create Storybook config (storybook generator)
```bash
$ npx nx g @nx/storybook:configuration --project=ui-solo --uiFramework=@storybook/react-vite --bundler=vite --no-interactive
```
