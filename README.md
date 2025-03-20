
# GraphQL and React App Tasks




`src/index.js` - Application Entry Point 

`src/App.js` - Main Application Component

`queries.js` - Defines GraphQL Queries & Mutations

`src/components/` - UI Components

`ProductForm.js` - Add & Edit Products

`ProductList.js` - Display Products & Delete Functionality

`SweetAlert2` (swal.fire) for delete confirmation.

`index.css` Main Stylesheet

 




## Frontend (React & GraphQL)


1. Implement all the above CRUD operations in the React app using GraphQL queries and mutations.
2. Ensure that when adding a new product:
    * The add mutation runs asynchronously.
    * The mutation is executed via Celery to prevent frontend delays.
    * Instead of waiting for a response, the mutation should be passed to a Celery task, which will process it in the background.
## Screenshots

![App Screenshot](https://i.ibb.co/FkH8KKt7/productlist.png)
![App Screenshot](https://i.ibb.co/5gwGkHpG/add-product.jpg) 
