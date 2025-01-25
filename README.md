# Flegridjs
 Craft nice looking grids with a simple configuration.

 Flegrid uses a very simple config language allowing you to create nice looking gird very easily, it converts the config into html and it uses css flexbox to generate the layout.

To start using Flegridjs from the cdn you can inculde this script into your html:
```html
<script type="module" src="https://www.unpkg.com/flegrid@latest/flegrid.js"></script>
```

To install Flegridjs using npm:
```bash
npm i flegrid
```

# Demos & Examples

1. 
```flegrid
row[blockW=(20vw, 200px), gap=10]:
col=[(1,1),(1,1)]
col=[(2,2)]
col=[(1,1),(1,1)]
```
![image](https://github.com/user-attachments/assets/e22df46e-fbdf-4846-af0a-ace8965f7761)  
[Codpen Example 1](https://codepen.io/pmnzt/pen/pvzQQLo)

The first line `row[blockW=(20vw, 200px), gap=10]:`
- `row`:
meaning that the root element is a row.
- `gap=10`:
meaning that the blocks will have a gap of 10px between them.
-  `blockW=(20vw, 200px)`:
meaning each block will have the size of either `20vw, 200px` depending on the size of the screen it will pick one of these values it done atuomatically via css `min()`.
- `col=[(1,1),(1,1)]`:
meaning that the first element is a column with 2 blocks, both have `(1,1)` a size of 1 block in width and 1 block in height.
- `col=[(2,2)]`:
meaning that the second element is a column with 1 block, `(2,2)` a size of 2 blocks in width and 2 blocks in height.
- `col=[(1,1),(1,1)]`:
meaning that the third element is a column with 2 blocks, both have `(1,1)` a size of 1 block in width and 1 block in height.

# Styling
Styling the layout blocks can be easily done via css by trageting the id `#flegrid-block`:
```css
#flegrid-block {
  overflow: clip;
  background-color: gray;
  width: min(20vw, 200px);
  height: min(20vw, 200px);
  border-radius: 10px;
}
```

```js
import { createLayout } from "flegrid"

const layoutConfig = `
row[blockW=(20vw, 200px), gap=10]:
col=[(1,1),(1,1)]
col=[(2,2)]
col=[(1,1),(1,1)]
`

const html = createLayout(layoutConfig);
document.querySelector('body').appendChild(html)
```
when using `createLayout` you can add a callback function to have access to the blocks dom elements and play with them as you wish:
```js
const html = createLayout(layoutConfig, (node) => {
  nodes.forEach((node, index) => {
    node.addEventListener('click', () => {
      console.log(index)
    })
  })
})
```
