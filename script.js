const title = document.querySelector("#title");
const price = document.querySelector("#price");
const cat = document.querySelector("#category");
const image = document.querySelector("#image");
const cart = document.querySelector("#cart");
const products = document.querySelector("#products");

let productsArr = JSON.parse(localStorage.getItem('products')) || [];

cart.addEventListener("submit", function(event) {
    event.preventDefault();
    productsArr.push({
        title: title.value,
        price: price.value,
        cat: cat.value,
        image: image.value
    });
    
    localStorage.setItem('products', JSON.stringify(productsArr));
    reload();

    Swal.fire({
        title: 'Success!',
        text: 'Product has been added successfully',
        icon: 'success',
        confirmButtonColor: '#0d6efd',
        timer: 1500,
        showConfirmButton: false
    });
});

products.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete")) {
        const id = event.target.dataset.id;
        
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                productsArr.splice(id, 1);
                localStorage.setItem('products', JSON.stringify(productsArr));
                reload();
                
                Swal.fire(
                    'Deleted!',
                    'Your product has been deleted.',
                    'success'
                );
            }
        });
    }
    
    if (event.target.classList.contains("edit")) {
        const id = event.target.dataset.id;
        const product = productsArr[id];
        
        Swal.fire({
            title: 'Edit Product',
            html: `
                <input type="text" id="swal-title" class="swal2-input" value="${product.title}" placeholder="Title">
                <input type="number" id="swal-price" class="swal2-input" value="${product.price}" placeholder="Price">
                <select id="swal-category" class="swal2-input">
                    <option ${product.cat === 'fruit' ? 'selected' : ''}>Fruit</option>
                    <option ${product.cat === 'vegetable' ? 'selected' : ''}>Vegetable</option>
                    <option ${product.cat === 'meat' ? 'selected' : ''}>Meat</option>
                    <option ${product.cat === 'drinks' ? 'selected' : ''}>Drinks</option>
                    <option ${product.cat === 'dairy' ? 'selected' : ''}>Dairy</option>
                    <option ${product.cat === 'snacks' ? 'selected' : ''}>Snacks</option>
                    <option ${product.cat === 'basic' ? 'selected' : ''}>Basic</option>
                </select>
                <input type="url" id="swal-image" class="swal2-input" value="${product.image}" placeholder="Image URL">
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Save Changes',
            confirmButtonColor: '#ffc107',
            cancelButtonColor: '#6c757d',
            preConfirm: () => {
                return {
                    title: document.getElementById('swal-title').value,
                    price: document.getElementById('swal-price').value,
                    cat: document.getElementById('swal-category').value,
                    image: document.getElementById('swal-image').value
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                productsArr[id] = result.value;
                localStorage.setItem('products', JSON.stringify(productsArr));
                reload();
                
                Swal.fire(
                    'Updated!',
                    'Product has been updated successfully.',
                    'success'
                );
            }
        });
    }
});

function reload() {
    cart.reset();
    products.innerHTML = '';
    
    productsArr.forEach((product, index) => {
        products.insertAdjacentHTML("beforeend", `
            <tr>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.cat}</td>
                <td><img src="${product.image}" style="max-width: 100px;"></td>
                <td>
                    <button data-id="${index}" class="delete btn btn-danger btn-sm">Delete</button>
                    <button data-id="${index}" class="edit btn btn-warning btn-sm">Edit</button>
                </td>
            </tr>
        `);
    });
}

reload();