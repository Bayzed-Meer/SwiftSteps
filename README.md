# SwiftSteps - E-commerce Website

## Project Overview

SwiftSteps is an E-commerce web application developed using the MEAN stack (MongoDB, Express.js, Angular, and Node.js). The project is designed to provide a user-friendly interface for managing products, handling shopping cart functionality, and facilitating product purchase.

## Features

### 1. User Roles

- **Admin:** The application has a single admin role, allowing privileged access to manage products.

### 2. Pages

- **Home:** Landing page providing an overview of the application.
- **Dashboard:** Displays all products in card view with an option to add them to the cart.
- **Products:** Shows a table with product information, allowing admin to edit or delete products.
- **Cart:** Lists all products added to the cart, enabling admin to adjust quantities and remove items.

### 3. Dashboard

- Products are showcased in a card view with an intuitive add-to-cart button.

### 4. Products Page

- Table displaying product details with options for editing and deleting products.
- Server-side pagination and sorting for efficient data handling.
- Admin can add new products through an Angular reactive form.

### 5. Cart

- Displays all products added to the cart.
- Admin can increment, decrement, or remove items.
- Checks product availability before purchase.
- Updates product quantity in the database post-purchase.

## Technologies Used

- **Frontend:** Angular
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Screenshots

Home

![home](https://github.com/Bayzed-Meer/SwiftSteps/assets/145206930/281579a6-6534-4f70-9680-58ed43ee8a03)

Dashbaord

![dashboard](https://github.com/Bayzed-Meer/SwiftSteps/assets/145206930/f8504cec-17d1-41f4-9589-4f8a5af6f6d3)

Products

![products](https://github.com/Bayzed-Meer/SwiftSteps/assets/145206930/7e9f632c-fea9-45e0-a757-2f97eac81eaa)

Add Product

![addProduct](https://github.com/Bayzed-Meer/SwiftSteps/assets/145206930/99099b1b-00f9-4010-a35a-b2ff04a52d5f)

Update Product

![edit](https://github.com/Bayzed-Meer/SwiftSteps/assets/145206930/c9ed6628-e137-487b-9944-28c6248e1ece)

Cart

![cart](https://github.com/Bayzed-Meer/SwiftSteps/assets/145206930/cae9fdf4-0a2a-463d-a227-af940800df28)

## Installation

1. Clone the repository: `git clone https://github.com/Bayzed-Meer/SwiftSteps.git`
2. Navigate to the project directory: `cd SwiftSteps`
3. Install dependencies:

   cd client
   
   npm install
   
   cd server
   
   npm install

5. Usage :
   
   cd server
   
   npm start
   
   cd client
   
   ng serve
7. Open the application in your browser: http://localhost:4200/
