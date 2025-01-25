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
checkout this example on the [vue playground](https://play.vuejs.org/#eNqtVm1v2zYQ/is3bYOVTpblpP2i2l23Ih82dC/YAuxDFCC0REuMJZIgKduB4f++IynJstumX2rAhnivz909POsQ/CJlvG1pkAYLnSsmDWhqWvku46yRQhk4gKLrCAT/Q7Tc0CICTvfmjuUbOMJaiQYm6D95O3LIFSWGfiTPojWD0bqmpWLFmeGOmLy6DJMLrg3QPWlk3QXRsIT7x4wrsbtf1SLf/LcMr5PtLoLrJJH7qwhKIpfz5CG17vXyPpxH86vI/T70ouvo+nSY+8NjBN847Ej/TYJbkf19KQUqvpoCYQzOPmoXYqy46aI+4Bj6QZDcsG0/zKUlQ5hcndSsISW183msjJE6nc0ky3XbxLISRujZTZLY78+K8EI0S0Tbe9bjkC7iwLEwvILlOzhkHDxHwjGKCEZqGOg4drIfHz/ekrqlMZGS8uJDxeoiHNMzPOfZ/TiPd33AdFwUVJ9Hx7xWGK+FuiUI0NlEwHhB95eWAH2vSiy3EHnbUG5ij+O2pvYUTlA7ucLGn7xQEmuVo0/X5Z/g8YeDS3F0jTyZ2uwxKYrbLcb6yLShnKpwktfYmMlFw8agRE3jWpShxz3WH91ILjOM2ojoRg7WvH/qHr3oGPV5WdPQgmHJKRjVUqdEE59oMfPrBxcPHgzFoaAlngAWBduCNs81XWaBFJoZJniKtEELHFYWOCu0u0OSeW0n+aIvWWHlraFvswDSDX1G5XjyQ8ghBHIUbTylULuYoXBss2qNERy2U+QDGoZsoALjF7ssrikvTYWZe1wNUSVDVG/k3gJ676Z2AcmSwAY8gwb+dmKj+tt0OACD43GEbOahub72ohP4xeyiab1yMRvNAI8OKz5+3+3xqVs4frRiS9W6FrsUELl0FF6RfFMqvM3FFLeTUCmUijw71Y4VpkqhYfxsWTldRVlZmS8oV0IVVE0VKVirU5ijwsnzVmmbQQqGy0OhDOv/BKm9fA6tGQq2PMRnHFkDSfxaAyWaThmfYifHUOdJ8uMZvEEgVk80N9M1Q2Fu2/D55GlldRcQbNoUdE5qGs7jG1ujc529gh3F1HWNxMEJIIF2FTFgKqopdphojaugEG7xfQevZhmPt1O89tgbz5jISWpKtrSTfFq5kCRn5hnrfuPr7tMPseyf8jiSEd20vWcKiXfBm9txI4gCo3GrrFkZP2nB8aXCeWRBLhrJaqr+kja7zoK0XwrI8hqp87uT2bWAKb08r2i++Yz8SeMlSPHhb4UNUXYBDDqDN4niBbXq23//xAaNlI0o2hqtX1D+Q91eQIze7FckMMIe2Tm0v7kXGMbLO327x1Wr+6KGvebsswBfaT68UPoJ7k382vlhR7GL/gVp2hB50UevOA/SMc0D7v+Ed7td3HK5KWNs/awzeT+PkzjpTxg6C4akx/8Bsq5CKg==).
