let currentStructure = 'array';
let dataStructure = [];

function changeStructure() {
    currentStructure = document.getElementById('data-structure').value;
    dataStructure = [];
    renderStructure();
}

function addElement() {
    const inputValue = document.getElementById('input-value').value;
    if (inputValue === "") {
        alert("Please enter a value");
        return;
    }
    if (currentStructure === 'array' || currentStructure === 'stack' || currentStructure === 'queue') {
        dataStructure.push(inputValue);
    } else if (currentStructure === 'linkedlist') {
        dataStructure.push({ value: inputValue, next: null });
        if (dataStructure.length > 1) {
            dataStructure[dataStructure.length - 2].next = dataStructure[dataStructure.length - 1];
        }
    }
    document.getElementById('input-value').value = "";
    renderStructure();
}

function removeElement() {
    if (dataStructure.length === 0) {
        alert("Data structure is empty");
        return;
    }
    if (currentStructure === 'array' || currentStructure === 'stack') {
        dataStructure.pop();
    } else if (currentStructure === 'queue') {
        dataStructure.shift();
    } else if (currentStructure === 'linkedlist') {
        dataStructure.shift();
        if (dataStructure.length > 0) {
            dataStructure[0].next = dataStructure.length > 1 ? dataStructure[1] : null;
        }
    }
    renderStructure();
}

function renderStructure() {
    const visualization = document.getElementById('visualization');
    visualization.innerHTML = '';
    if (currentStructure === 'array' || currentStructure === 'stack' || currentStructure === 'queue') {
        dataStructure.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = item;
            itemDiv.className = 'data-item';
            visualization.appendChild(itemDiv);
        });
    } else if (currentStructure === 'linkedlist') {
        dataStructure.forEach(node => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = node.value;
            itemDiv.className = 'data-item';
            visualization.appendChild(itemDiv);
            if (node.next) {
                const arrow = document.createElement('div');
                arrow.innerHTML = '&rarr;';
                arrow.className = 'arrow';
                visualization.appendChild(arrow);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', renderStructure);
