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
checkout this example on the [vue playground](https://play.vuejs.org/#eNqtVm1v2zYQ/iuctsFKJ0ty0n5R7a5bEWAb0m3YAuxDFCC0REuMJZIgKb/A8H/fkZRk2s2yL01gQ7zXh3fPnXUIfhIi3nQkyIK5KiQVGimiO/EhZ7QVXGp0QJKsIsTZZ94xTcoIMbLT97RYoyNaSd6iCfhP3nsOhSRYkzu8550ejVYNqSQtzwy3WBf1ZZiCM6UR2eFWNH0QhRbo4Slnkm8flg0v1v8swut0s43QdZqK3VWEKiwWs/QxM+7N4iGcRbOryH4/DqLr6Pp0mLnDU4S+clhP/1WCG5H5fi0FKP43BcAYnV3UPoSvuOmjPkIbhkbgQtPN0MyFIUOYXp3UtMUVMf15qrUWKksSQQvVtbGoueYquUlT8/lRYlbydgFoB8/GD2kjjhwLwyu0+IAOOUOOI6GPIkKeGo109J3Mn4sfb3DTkZgyRuQv95/vIF8ewP9LRlgIwspPNW3K0OdweE7GBx+Mc30ETIyXRJ1DAHBGGK+4vMVwC2sTIcpKsru0RGgoaAUYS150LWE6djhuG2JO4QS0kyvozskLJLGSBfj0rfgBPX13sCmOttonU5M9xmV5u4FYd1RpAkUJJ0UD1ZtcVNUHxRsSN7wKHW5ff7R9u8zglRHQeQ7GfHjqH53oGA15aduSksKVM6RlR6wSTFyieeJ2FGwnOGgCTQFLOCE0L+kGKb1vyCIPBFdUU84y4BZYQLPywFqB3T0w0Wl7yX/64iXcvNPkfR6gbE32oPQ7P4YcQwCRwcZRCrTzBIS+zbLTmjO0mQIfwDCkIxUou1h4cUNYpWvIPOBqsawooHondgbQR9u1C0iGBCbgGTTkRhgKNYzc4YAoOh49ZImDdqqIB32eXJRsUM4TrwNwtEjh8dt+1U/tTnKN5RsiVw3fZghwC0vgJS7WlYSBL6ewwLjMUCXx3qm4LImcSlzSTmVoBsvMyotOKmMoOIU1IUEGl/gioZkgm1SPuA2Z4Bnq3qI0fqsQwYpMKZtCOWzkLS11bTKl39tzTWhVa0/Al8+k0NMVBWFhbvNy8qw2ugsIJm2GVIEbEs7iGzO/1jV5g7YEUjcNdB8KCSzY1lgjXRNFoFBYKZjnktsV9w16k+Qs3kxhdqE2ru2RlTQEb0gv+fLmXOCC6j3c+52795B+jGV+fv1ImvdNc54ZSp0LjF/f4iAKtILVsKJV/Kw4g9cH65EHBW8FbYj8Q5jsKg+yYbKBqg0w4DcrM7MNKZ28qEmxfkH+rIDJGTz8KaEg0kzxqNMwDgSmzKhv//4dCuQpW152DVi/ovyL2OEGjM7sZ+AhwPbsLNpf7asKZdW9ut3BvlTDpcblZO3zAF5ePr1y9RPcm/it9YOKQhXdq9C0xeKijk5xHqRnmgM8/Nxut9u4Y2JdxVD6pDf5OIvTOB1OENr94tmkx38Biwg7oA==).
