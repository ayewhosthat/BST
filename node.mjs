class Node {
    constructor(data, leftChild=null, rightChild=null) {
        this.data = data;
        this.left = leftChild;
        this.right = rightChild;
    }
}

export { Node }