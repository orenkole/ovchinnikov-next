 
# Section 1. Intro
## 1. Create-next-app with Typescript
 
`npx create-next-app@latest --ts`
`npm run dev`

https://github.com/nickovchinnikov/coursesbox

## 3. NextJS and Storybook

`npx sb init --builder webpack5`
`yes` for _eslintPlugin

https://github.com/storybookjs/eslint-plugin-storybook#usage

Add "plugin:storybook/recommended"
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:storybook/recommended"
  ]
}
```

`npm run storybook`

## 4. Images Optimization and Storybook

_.storybook/main.js_

create file
_coursesbox/stories/Home.stories.tsx_
```jsx
import Home from "../pages";

export default {
    title: 'Pages/Home',
    Component: Home,
}

export const HomePage = () => <Home />
```

We don't have image in storybook

Big part of Next is Image component and Image optimization

Point to static folder `-s ./public`  
_package.json_
```json
    "storybook": "start-storybook -p 6006 -s ./public",
```
_coursesbox/.storybook/preview.js_
```javascript
import * as NextImage from "next/image";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
    configurable: true,
    value: (props) => <OriginalNextImage {...props} unoptimized />
});
```

## 5. Prettier
`npm install --save-dev --save-exact prettier`
` npm i -D eslint-plugin-prettier`

_.eslintrc.json_
```json
  "plugins": [
    "prettier"
  ],
  "rules": {
    "prettier/prettier": "error"
  }
```

## 6. CSS-IN-JS. EmotionJS

use _raw strings_
` npm i --save @emotion/styled @emotion/react`

## 7. The first component

---
Error:
Cannot find module 'webpack/lib/util/makeSerializable.js"
https://github.com/storybookjs/storybook/issues/15336

Solution:
install webpack as a dev dependency


# Section 2. The power of storybook

## Jest and react testing library

`npm i --save-dev jest @testing-library/react @testing-library/jest-dom`  
`npm i --save-dev jest-environment-jsdom`  

create _jest.config.js_  
```javascript
const nextJest = require("next/jest")

const createJestConfig = nextJest({
    // Provide tha path to your Next.js app to load next.config.jad and .env files in your test environment
    dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
    // Add more setup options before each test is run
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    // if using Typescript with a baseUrl st to the root directory then you need the below for aliases to work
    moduleDirectories: ["node_modules", "<rootDir>/"],
    testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this wat to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
```

_jest.setup.js_  
```javascript
import '@testing-library/jest-dom/extend-expect'
```
https://github.com/testing-library/jest-dom

Add _test_ script  
_package.json_  
```json
"test": "jest"
```

Write test for _Button_  
```tsx
import React from "react";
import {render} from "@testing-library/react";
import {Button} from "./Button";

describe("Button test cases", () => {
    it("Render check", () => {
        const onClick = jest.fn();
        const { asFragment } = render(<Button onClick={onClick}>
            Button
        </Button>)

        expect(asFragment()).toMatchSnapshot();
    })
})
```

We've got a snapshot.  

Change text it component.  
Snapshot testing fails.  

---

Test click:

`npm i --save-dev @testing-library/user-event`

_Button.test.tsx_  
```tsx
    it("Check onClick callbck", () => {
        const onClick = jest.fn();
        render(<Button onClick={onClick}>Button</Button>)
        // screen.debug();
        const element = screen.getByRole('button');
        userEvent.click(element);
        expect(onClick).toHaveBeenCalled();
    })
```

_userEvent_ acts as real user, instead of _fireEvent_  

## Dark / Light themes in Storybook

install background addon:  
`npm i -D @storybook/addon-backgrounds`

in _coursesbox/.storybook/preview.js_ we are able to export decorators that can be applied to our story:
```javascript
const withThemeProvider = (Story, context) => {
    console.log('context.globals.backgrounds', context.globals.backgrounds)
    return (
        <Story {...context} />
    )
}

export const decorators = [withThemeProvider]

export const parameters = {
    backgrounds: {
        default: 'dark',
        values: [
            { name: 'dark', value: '#5e5c64' },
            { name: 'light', value: '#e4ebf5'}
        ]
    },
```
![img.png](images-notes/storybook-theme.png)

Fix typing: https://emotion.sh/docs/typescript#define-a-theme  
_emotion.d.ts_  
```ts
import '@emotion/react'

declare module '@emotion/react' {
    export interface Theme extends Record<string, any> {}
}
```

Use in component:   
```tsx
export const getColors = (theme: AppTheme, color?: Color): SerializedStyles => {
    switch (color) {
        case "primary":
            return css`
        background: ${theme.components[color]};
        color: ${theme.font.button};
      `;
// ...
export const Button = styled.button<Props>`
  ${({theme}) => `box-shadow: 0.5vmin 0.5vmin 1vmin ${theme.components.shadow1}, -0.5vmin -0.5vmin 1vmin ${theme.components.shadow1};`}
```

Fix typings:  
_coursesbox/.storybook/main.js_  
```json
  "features": {
      "emotionAlias": false
  }
```

## Aliases, Fonts and Global styles
_tsconfig.json_  
```json
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    },
```
_Button.tsx_
```tsx
import {AppTheme} from "@/styles/themes";
```
---

Global fonts:  
create file:  
_coursesbox/.storybook/preview-head.html_
```html
<link href="https://fonts.googleapis.com/css2?family=Edu+VIC+WA+NT+Beginner&display=swap" rel="stylesheet">
```

create file:  
_coursesbox/styles/global.ts_
```ts
import { css } from "@emotion/react";

export const GlobalStyles = css`
  * {
    font-family: "Poppins", sans-serif;
  }
`;
```

_coursesbox/.storybook/preview.js_  
```tsx
import {..., Global} from "@emotion/react";

const withGlobalStyles = (Story, context) => (
    <>
        <Global styles={GlobalStyles} />
        <Story {...context} />
    </>
)

export const decorators = [..., withGlobalStyles]
```

---

Move styles to a util:  
crete file:  
_coursesbox/components/style.ts_
```ts
import { css } from "@emotion/react";

// https://github.com/styled-components/styled-components/issues/397

export const boxShadow = (
    shadowColor1: string,
    shadowColor2: string,
    inset = false
) => {
    const insetStr = inset ? "inset" : "";
    return css`
    box-shadow: ${insetStr} 0.5vmin 0.5vmin 1vmin ${shadowColor1},
      ${insetStr} -0.5vmin -0.5vmin 1vmin ${shadowColor2};
  `;
};

export const transition = () =>
    css`
    transition: all 0.4s ease;
  `;
```

use in component:  
_Button.tsx_
```tsx
export const Button = styled.button<Props>`
  ${transition()};
  //...
${({theme}) => boxShadow(theme.components.shadow1, theme.components.shadow2)};
  &:active {
    ${({theme}) => boxShadow(theme.components.shadow1, theme.components.shadow2, true)};
  }
  `
```
