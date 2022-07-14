 
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

