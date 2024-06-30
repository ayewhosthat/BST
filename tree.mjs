import { Node } from './node.mjs';

class Tree {
    constructor(arr) {
        const newArr = [...new Set(arr)];
        // remove duplicates, then sort
        const sortedArr = newArr.toSorted();
        this.root = buildTree(sortedArr, 0, newArr.length-1);
    }
    insert(key) {
        let node = new Node(key);
        if (this.root === null) {
          this.root = node;
          return;
        }
        let prev = null;
        let temp = this.root;
        while (temp != null) {
          if (temp.data > key) {
            prev = temp;
            temp = temp.left; // updating the root of the subtree
          } else if (temp.data < key) {
            prev = temp;
            temp = temp.right; // updating the root of the subtree
          }
        }
        if (prev.data > key) prev.left = node;
        else prev.right = node;
      }
      deleteItem(root, key) {
        function minValue(node) {
            let minv = node.data;
            while (node.left !== null) {
                minv = node.left.data;
                node = node.left;
            }
            return minv;
        }
        // helper function to find minimum value within right subtree

        if (root === null) {
            return null
        } else if (key > root.data) {
            root.right = this.deleteItem(root.right, key);
        } else if (key < root.data) {
            root.left = this.deleteItem(root.left, key);
        } else {
            // this is the case where we have root.data === key

            // case 1: no children
            if (root.left === null && root.right === null) {
                root = null;
            // case 2: one child is non-null
            } else if (root.left === null && root.right !== null) {
                root = root.right;
            } else if (root.left !== null && root.right === null) {
                root = root.left;
            } else {
            // case 3: both children non-null
            root.data = minValue(root.right);
            root.right = this.deleteItem(root.right, root.data);
            }
        }
        return root;
      }
      find(root, value) {
        if (root === null) {
          return null;
        } else if (root.data === value) {
          return root;
        } else if (root.data < value) {
          return this.find(root.right, value);
        } else {
          return this.find(root.left, value);
        }
      }
      depth(node) { // consider changing this to use the data attribute instead, for easier testing
        // finds the depth of a node
        function depthHelper(start, target) {
          if (start === target || start === null) {
            return 0;
          } else {
            return 1 + Math.min(depthHelper(start.left, target), depthHelper(start.right, target));
          }
        }
        return depthHelper(this.root, node);
      }
      height(node) { // change to data attribute?
        function heightHelper(start) {
          if (start === null || start.left === null && start.right === null) {
            return 0; // subtree empty, or if node has no children aka it is a leaf
          } else {
            return 1 + Math.max(heightHelper(start.left), heightHelper(start.right));
          }
        }
        return heightHelper(node);
      }
      levelOrder(callback) {
        let queue = [];
        let output = [];
        queue.push(this.root);
        output.push(this.root.data)
        while(queue.length !== 0) {
          let focus = queue.shift();
          if (callback !== undefined) {
            callback(focus);
          }
          if (focus.left !== null) {
            queue.push(focus.left);
            output.push(focus.left.data);
          }
          if (focus.right !== null) {
            queue.push(focus.right);
            output.push(focus.right.data);
          }
        }
        if (callback === undefined) {
          return output;
        }
      }
      inOrder(callback) {
        let output = [];
        function inOrderHelper(node) {
          if (node === null) {
            return;
          }
          inOrderHelper(node.left);
          if (callback !== undefined) {
            callback(node);
          }
          output.push(node.data);
          inOrderHelper(node.right);
        }
        inOrderHelper(this.root);
        if (callback === undefined) {
          return output;
        }
      }
      preOrder(callback) {
        let output = [];
        function preOrderHelper(node) {
          if (node === null) {
            return;
          }
          if (callback !== undefined) {
            callback(node);
          }
          output.push(node.data);
          preOrderHelper(node.left);
          preOrderHelper(node.right);
        }
        preOrderHelper(this.root);
      }
      postOrder(callback) {
        let output = [];
        function postOrderHelper(node) {
          if (node === null) {
            return;
          }
          postOrderHelper(node.left);
          postOrderHelper(node.right);
          if (callback !== undefined) {
            callback(node);
          }
          output.push(node.data);
        }
        postOrderHelper(this.root);
      }
      isBalanced(node=this.root) {
        if (node === null) {
          return true;
        }
        // checks to see if the tree is balanced
        // tree is balanced if for every node, the height of the left and right subtrees differ by no more than 1
        const lh = this.height(node.left);
        const rh = this.height(node.right);
        const leftBalanced = this.isBalanced(node.left);
        const rightBalanced = this.isBalanced(node.right);
        return Math.abs(lh - rh) <= 1 && leftBalanced && rightBalanced;
      }
      rebalance() {
        // call one of the traversal methods to get a new array, and then feed it to the buildTree function
        const nodes = this.levelOrder();
        console.log(nodes)
        this.root = buildTree(nodes, 0, nodes.length-1);
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

let arr = [66, 56, 21, 23, 1, 5, 77, 90, 80, 33, 41, 14, 10];
// create tree
let tree = new Tree(arr);
prettyPrint(tree.root);
console.log(`Tree is balanced: ${tree.isBalanced()}`);
function printNode(node) {
  console.log(node.data);
}
console.log('Level order:');
tree.levelOrder(printNode);
console.log('In order:');
tree.inOrder(printNode);
console.log('Pre order:');
tree.preOrder(printNode);
console.log('Post order:');
tree.postOrder(printNode);
const toAdd = [67, 57, 22, 24, 2, 7, 6, 5, 8, 9, 3, 0];
for (const e of toAdd) {
  tree.insert(e);
}
prettyPrint(tree.root);
console.log(`Balanced after adding elements: ${tree.isBalanced()}`);
tree.rebalance();
prettyPrint(tree.root);
console.log(`${tree.isBalanced()}`);
console.log('Level order:');
tree.levelOrder(printNode);
console.log('In order:');
tree.inOrder(printNode);
console.log('Pre order:');
tree.preOrder(printNode);
console.log('Post order:');
tree.postOrder(printNode);
