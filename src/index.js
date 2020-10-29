function vdom(type, props, ...children) {
  // 由于jsx语法是有react发明，这里没有引入react库，
  // 所以必须自己声明vdom方法（该方法主要是将jsx声明的‘element’转换成js对象）
  return {
    type,
    props,
    children,
  };
}

function setProps(props, $el) {
  Object.keys(props).forEach((k) => {
    $el.setAttribute(k, props[k]);
  });
}

function createElement(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);
  if (node.props) setProps(node.props, $el); // 如果dom节点上有属性
  node.children.map(createElement).forEach($el.appendChild.bind($el));
  return $el;
}

function changed(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === "string" && node1 !== node2) ||
    node1.type !== node2.type
  );
}

function updateElement($parent, newNode, oldNode, index = 0) {
  // 这里的index应该是比对两个virtual dom 之后，发现新节点无变化，只是减少了某些节点（而产生的）
  // 此处忽略产生index的逻辑
  if (!oldNode) {
    // 变化为新增节点时
    $parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    console.log($parent);
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  } else if (newNode.type) {
    console.log("44444", $parent);
    console.log("44444", $parent.childNodes);
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    console.log(newLength);
    console.log(oldLength);
    for (let i = 0; i < newLength || i < oldLength; i++) {
      console.log("cishu");
      updateElement(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
}

const a = (
  <ul>
    <li>item 1</li>
    <li>item 2</li>
  </ul>
);

const b = (
  <ul>
    <li>item 1</li>
    <li>hello!</li>
  </ul>
);

const $root = document.getElementById("root");
const $reload = document.getElementById("reload");

updateElement($root, a);
// $reload.addEventListener("click", () => {
//   updateElement($root, b, a);
// });
