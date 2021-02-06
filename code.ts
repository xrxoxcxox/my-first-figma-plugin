// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { height: 300 });

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'create-rectangles') {
    const nodes: SceneNode[] = [];
    const centerX = figma.viewport.center['x'];
    const centerY = figma.viewport.center['y'];
    console.log(msg.width, msg.height)
    for (let i = 0; i < msg.count; i++) {
      let node: RectangleNode | EllipseNode
      if (msg.nodeType === 'rectangle') {
        node = figma.createRectangle();
      } else if (msg.nodeType === 'ellipse') {
        node = figma.createEllipse();
      }
      node.x = centerX + i * 150;
      node.y = centerY;
      node.resizeWithoutConstraints(msg.width, msg.height);
      node.fills = [{type: 'SOLID', color: {r: 0.768, g: 0.768, b: 0.768}}];
      figma.currentPage.appendChild(node);
      nodes.push(node);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  // figma.closePlugin();
};
