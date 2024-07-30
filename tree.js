class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    add(value) {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this._addNode(this.root, newNode);
        }
    }

    _addNode(current, newNode) {
        if (newNode.value < current.value) {
            if (current.left === null) {
                current.left = newNode;
            } else {
                this._addNode(current.left, newNode);
            }
        } else {
            if (current.right === null) {
                current.right = newNode;
            } else {
                this._addNode(current.right, newNode);
            }
        }
    }

    remove(value) {
        this.root = this._removeNode(this.root, value);
    }

    _removeNode(current, value) {
        if (current === null) {
            return null;
        }

        if (value === current.value) {
            if (current.left === null && current.right === null) {
                return null;
            }
            if (current.left === null) {
                return current.right;
            }
            if (current.right === null) {
                return current.left;
            }
            const smallestValue = this._findMinValue(current.right);
            current.value = smallestValue;
            current.right = this._removeNode(current.right, smallestValue);
            return current;
        } else if (value < current.value) {
            current.left = this._removeNode(current.left, value);
            return current;
        } else {
            current.right = this._removeNode(current.right, value);
            return current;
        }
    }

    _findMinValue(node) {
        return node.left === null ? node.value : this._findMinValue(node.left);
    }

    traverse() {
        const nodes = [];
        this._inOrderTraversal(this.root, nodes);
        return nodes;
    }

    _inOrderTraversal(node, nodes) {
        if (node !== null) {
            this._inOrderTraversal(node.left, nodes);
            nodes.push(node);
            this._inOrderTraversal(node.right, nodes);
        }
    }
}

const tree = new BinaryTree();

function addNode() {
    const inputValue = document.getElementById('input-value').value;
    if (inputValue === "") {
        alert("Please enter a value");
        return;
    }
    tree.add(parseInt(inputValue));
    document.getElementById('input-value').value = "";
    renderTree();
}

function removeNode() {
    const inputValue = document.getElementById('input-value').value;
    if (inputValue === "") {
        alert("Please enter a value");
        return;
    }
    tree.remove(parseInt(inputValue));
    document.getElementById('input-value').value = "";
    renderTree();
}

function renderTree() {
    const visualization = document.getElementById('visualization');
    visualization.innerHTML = '';
    const nodes = tree.traverse();
    const root = tree.root;

    if (root) {
        const rootDiv = createNodeDiv(root);
        visualization.appendChild(rootDiv);
    }
}

function createNodeDiv(node) {
    const nodeDiv = document.createElement('div');
    nodeDiv.className = 'tree-node';
    const valueDiv = document.createElement('div');
    valueDiv.className = 'node';
    valueDiv.textContent = node.value;
    nodeDiv.appendChild(valueDiv);

    if (node.left || node.right) {
        const childrenDiv = document.createElement('div');
        childrenDiv.className = 'children';
        if (node.left) {
            childrenDiv.appendChild(createNodeDiv(node.left));
        } else {
            const placeholder = document.createElement('div');
            placeholder.className = 'node';
            placeholder.style.visibility = 'hidden';
            childrenDiv.appendChild(placeholder);
        }
        if (node.right) {
            childrenDiv.appendChild(createNodeDiv(node.right));
        } else {
            const placeholder = document.createElement('div');
            placeholder.className = 'node';
            placeholder.style.visibility = 'hidden';
            childrenDiv.appendChild(placeholder);
        }
        nodeDiv.appendChild(childrenDiv);
    }

    return nodeDiv;
}

document.addEventListener('DOMContentLoaded', renderTree);
