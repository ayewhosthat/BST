import { Node } from './node.mjs';

class Tree {
    constructor(arr) {
        const newArr = [...new Set(arr)];
        console.log(newArr);
        // remove duplicates, then sort
        const sortedArr = newArr.toSorted();
        console.log(sortedArr);
        this.root = buildTree(sortedArr, 0, newArr.length-1);
    }
}

function buildTree(arr, start, end) {
    if (start > end) {
        return null;
    }

    let mid = Math.floor((start + end) / 2);
    let node = new Node(arr[mid]);
    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);
    return node;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const treeArr = [1, 2, 3, 4, 5, 6, 7, 3];
  const tree = new Tree(treeArr);
  prettyPrint(tree.root);