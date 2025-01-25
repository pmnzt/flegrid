/* flegridjs allows you to describe simple layouts through config
  written by github.com/pmnzt
  */

 function parseInput(inputString) {
    const wrapper = {
        type: '',
        block_width: [],
        gap: '',
        children: []
    };

    const blockWMatch = inputString.match(/blockW=\(([^)]+)\)/);
    const gapMatch = inputString.match(/gap=(\d+)/);

    const blockW = blockWMatch ? blockWMatch[1] : null;
    const gap = gapMatch ? gapMatch[1] : null; 
    const typeMatch = inputString.match(/(row|col)/);
    const type = typeMatch ? typeMatch[0] : null;

    wrapper.block_width = blockW.replace(/\s/g, '').split(',')
    wrapper.gap = gap
    wrapper.type = type

    const structures = inputString.match(/(row|col)=\[(.*?)\]/g);

    if (structures) {
        structures.forEach(structure => {
            const [type, blocksStr] = structure.split('=');
            const blocks = JSON.parse(blocksStr.replace(/(\d+)/g, '"$&"').replace(/\(/g, '[').replace(/\)/g, ']'));

            const childrenStructure = {
                type: type.trim(),
                blocks: blocks.map(block => ({
                    width: block[0],
                    height: block[1]
                }))
            };
            wrapper.children.push(childrenStructure);
        });
    }

    return wrapper;
}


function parseJsonToHtml(json) {
  const gap = json.gap;
  const block_width = json.block_width

  const createBlock = (width, height) => {
    const blockWidth = width > 1 ? `${width} + ${gap * (width - 1)}px` : width;
    const blockHeight = height > 1 ? `${height} + ${gap * (height - 1)}px` : height;

    return `<div id="flegrid-block" style="width: calc(min(${block_width[0]},${block_width[1]}) * ${blockWidth}); height: calc(min(${block_width[0]},${block_width[1]}) * ${blockHeight});"></div>`;
  };

  const createColumn = (blocks) => {
    return `<div style="display: flex; flex-direction: column; gap: ${gap}px;">
            ${blocks.map(block => createBlock(block.width, block.height)).join('')}
        </div>`;
  };

  const createRow = (blocks) => {
    return `<div style="display: flex; gap: ${gap}px;">
            ${blocks.map(block => createBlock(block.width, block.height)).join('')}
        </div>`;
  };

  const wrapper = (html, type) => {
    const row = `
            <div style="display: flex; gap: ${gap}px;">
                ${html}
            </div>
      `
    const column = `<div style="display: flex; flex-direction: column; gap: ${gap}px;">
            ${html}
        </div>`;

    return type === 'col' ? column : row
  }

  const processChildren = (children) => {
    return children.map(child => {
      if (child.type === "col") {
        return createColumn(child.blocks);
      } else if (child.type === "row") {
        return createRow(child.blocks); 
      }
      return '';
    }).join('');
  };

  if (json.type === "col") {
    return wrapper(processChildren(json.children), 'col');
  } else if (json.type === "row") {
    return wrapper(processChildren(json.children), 'row');
  }

  return '';
}

function parseConfig(input) {
  const json = parseInput(input)
  const html = parseJsonToHtml(json)

  return html
}

export function createLayout(layoutConfig, controlNodes = (nodes) => {}) {
  const wrapperDiv = document.createElement('div');
  const html = parseConfig(layoutConfig)
  wrapperDiv.innerHTML = html;
  controlNodes(wrapperDiv.querySelectorAll('#flegrid-block'))
  return wrapperDiv;
}
