figma.showUI(__html__, { height: 300 });

figma.ui.onmessage = msg => {
  if (msg.type === 'create-rectangles') {
    const nodes: SceneNode[] = [];
    const centerX = figma.viewport.center['x'];
    const centerY = figma.viewport.center['y'];
    for (let i = 0; i < msg.count; i++) {
      let node: RectangleNode | EllipseNode
      if (msg.nodeType === 'rectangle') {
        node = figma.createRectangle();
      } else if (msg.nodeType === 'ellipse') {
        node = figma.createEllipse();
      }
      node.x = centerX + i * (msg.width + msg.space);
      node.y = centerY;
      node.resizeWithoutConstraints(msg.width, msg.height);
      node.fills = [{type: 'SOLID', color: {r: 0.768, g: 0.768, b: 0.768}}];
      figma.currentPage.appendChild(node);
      nodes.push(node);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
};
