Backend
This is a web application developed using Node.js and Express framework, which utilizes MongoDB as a database and Cloudinary for image management. The application showcases user authentication and product management functionalities, allowing users to register, login, manage products, and perform various operations.

Features
1.Users can register with their name, email, password, avatar, and phone number. 2.Passwords are securely hashed using bcrypt before being stored in the database. 3.Registered users can log in with their credentials, and JWT tokens are used for authentication. 4.Users can log out, and JWT tokens are invalidated. 5.Admin users can create, read, update, and delete products. 6.Products are stored with details like name, description, price, images, category, and stock quantity. 7.Product images are uploaded to Cloudinary, allowing easy storage and retrieval of images. 8.Users can browse all products, view detailed information for a specific product, and see products sorted by creation date.

Frontend
In frontend i used ReactJs,for managing state i used react-redux. 1.UserActions.js: This file contains a set of action creators responsible for managing user-related functionalities within a Redux-based web application. It includes actions for user authentication, registration, fetching user details, and handling users and products. These actions interact with the server and update the corresponding states in the Redux store.

2.cartActions.js: In this file, you'll find action creators designed to manage the shopping cart functionality of the application. These actions enable the addition and removal of items from the user's cart, updating the cart state stored in the Redux store.

3.cartReducers.js: The cartReducers file defines a reducer function that handles changes to the shopping cart's state within the Redux store. It responds to actions such as adding items to the cart and removing items, ensuring a consistent and up-to-date representation of the cart's contents.

4.userReducers.js: This file houses several reducer functions tailored to different aspects of user-related states in the Redux store. It includes reducers for handling user authentication, registration, fetching user details, managing users and products, and more. Each reducer manages the corresponding state and responds to specific actions to maintain a well-organized application state.
DEPLOY link: https://repliq-ecomm.onrender.com/