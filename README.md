# API Reference

### &lt;MotionMenu />
#### Usage
```jsx
<MotionMenu
  btns={[
    {iconSrc: './myIcon.svg', alt: 'icon', onClick: () => null},
    {iconSrc: './myIcon.svg', alt: 'icon'}
    ]} />
```

#### Props

##### - btns: Buttons

Required. An array of button types to be shown in the menu.
The `Button` type is an object with the following structure:
```
{
  iconSrc: String matching the src of the icon for the button,
  alt: String which is used as the alternative text for the button icon,
  onClick: function which is called when the button is clicked
}
```

##### - angle?: Angle
Optional. The angle between each of the buttons in the menu in degrees.

- Default: 30

##### - angleOffset?: Angle Offset
Optional. The angle to offset the buttons in degrees. The offset is counted anti-clockwise starting from a bearing of 0. E.g. if you gave `angleOffset={90}` the buttons center would be pointing left.

##### - btnRadius?: Small Button Radius
Optional. The radius of the smaller, menu buttons in px.

- Default: 25

##### - mainBtnRadius?: Main Button Radius
Optional. The radius of the open/close button in px.

- Default: 35

##### - spaceBetween?: Space Between
Optional. The amount of margin/space between the main button and the small buttons in px.

- Default: 40

##### - springConfig?: Spring Configuration
Optional. An Object of the following structure:
```
{
  open: {stiffness: NUM, damping: NUM},
  close: {stiffness: NUM, damping: NUM}
}
```
MotionMenu uses `react-motion` behind the scenes, the springConfig prop uses the same structure as `react-motion`'s `spring` config. You can learn more about the details of this config object [here](https://github.com/chenglou/react-motion/blob/master/README.md#helpers)

- Default:
```
{
  open: {stiffness: 550, damping: 29},
  close: {stiffness: 200, damping: 20}
}
```
---
### &lt;SpacedMotionMenu />
#### Usage
```jsx
<SpacedMotionMenu
  btns={[
    {iconSrc: './myIcon.svg', alt: 'icon', onClick: () => null},
    {iconSrc: './myIcon.svg', alt: 'icon'}
    ]} />
```

#### Props

The `SpacedMotionMenu` component takes the same props as the `MotionMenu` component, the main difference is, that the `SpacedMotionMenu` does not take an `angle` prop. Instead it calculates an angle where, with the given props.btns, every button would be evenly spaced around the main button.

E.g given `btns={[{},{},{},{}]}` it would render a `MotionMenu` component with the `angle` prop set to 90 in order to evenly space the 4 buttons

---

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of the full guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
