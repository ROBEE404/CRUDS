let items = [];

function calculateTotal(price, tax, discount) {
    let taxAmount = price * (tax / 100);
    let discountAmount = price * (discount / 100);
    return price + taxAmount - discountAmount;
}

function addItem() {
    const name = document.getElementById('item-name').value;
    const price = parseFloat(document.getElementById('item-price').value);
    const tax = parseFloat(document.getElementById('item-tax').value);
    const discount = parseFloat(document.getElementById('item-discount').value);
    const category = document.getElementById('item-category').value; // Get category value

    if (!name || isNaN(price) || isNaN(tax) || isNaN(discount) || !category) { // Check for category
        alert('Please fill in all fields correctly.');
        return;
    }

    const total = calculateTotal(price, tax, discount);
    const newItem = { name, price, tax, discount, total, category }; // Add category to item

    items.push(newItem);
    displayItems();
    clearForm();
}

function displayItems() {
    const tableBody = document.getElementById('item-list-body');
    tableBody.innerHTML = '';

    items.forEach((item, index) => {
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.tax}%</td>
                <td>${item.discount}%</td>
                <td>$${item.total.toFixed(2)}</td>
                <td>${item.category}</td> <!-- Display category -->
                <td>
                    <button onclick="editItem(${index})">Edit</button>
                    <button onclick="deleteItem(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function clearForm() {
    document.getElementById('item-name').value = '';
    document.getElementById('item-price').value = '';
    document.getElementById('item-tax').value = '';
    document.getElementById('item-discount').value = '';
    document.getElementById('item-category').value = ''; // Clear category input
}

function editItem(index) {
    const item = items[index];

    document.getElementById('item-name').value = item.name;
    document.getElementById('item-price').value = item.price;
    document.getElementById('item-tax').value = item.tax;
    document.getElementById('item-discount').value = item.discount;
    document.getElementById('item-category').value = item.category; // Set category input

    deleteItem(index);  // Remove the item so we can replace it when re-added
}

function deleteItem(index) {
    items.splice(index, 1);
    displayItems();
}
