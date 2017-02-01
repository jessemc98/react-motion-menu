![motion-menu-examples](https://cloud.githubusercontent.com/assets/17962559/22513112/6ab64302-e89b-11e6-85a9-7202c855e696.jpg)

# Installation
Requires `react` as a peer dependency,
only dependency is `react-motion`, if you think this should also be a peer dependency please open an issue on github.

`npm i @jessemc98/motion-menu`

# Demos
To see working demos navigate to the 'demo' folder and run the following command.

### `npm i && npm start`

which downloads all dependencies and runs a development server with multiple demos, open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Importing
```
// using es6 imports
import MotionMenu from '@jessemc98/motion-menu'
import { SpacedMotionMenu } from '@jessemc98/motion-menu'

// using require syntax
var motion = require('@jessemc98/motion-menu')
var MotionMenu = motion.default
var SpacedMotionMenu = motion.SpacedMotionMenu
```

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
  onClick: Function which is called when the button is clicked
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

E.g given `btns={[{},{},{},{}]}` it would render a `MotionMenu` component with the `angle` prop set to 90 in order to evenly space the 4 buttons.

# development
After installation navigate to the installation directory and run the following command to run a test suite using facebooks jest.

### `npm test`

The following command builds a commonJs module at libs/index.js

### `npm run build`

The following command builds an es harmony module at libs/es6.js

### `npm run build:es`
