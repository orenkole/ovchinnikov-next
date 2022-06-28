 
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


