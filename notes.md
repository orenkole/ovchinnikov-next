 
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
