# Foodora – Food Delivery Web Application

> A full-stack food delivery web application built using Java, JSP, Servlets, JDBC, MySQL, HTML, CSS and JavaScript.

Foodora is a web-based food delivery application that allows users to browse restaurants, explore restaurant-specific menus, manage their cart, authenticate securely, proceed through checkout, select a payment method, place orders and view their order history.

The application follows a structured **MVC architecture** with separate Model, DAO, DAO Implementation and Controller layers, while JSP pages are responsible for the presentation layer.

---

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Problem Statement](#-problem-statement)
- [Project Objectives](#-project-objectives)
- [Key Features](#-key-features)
- [Application Flow](#-application-flow)
- [Complete End-to-End Flow](#-complete-end-to-end-flow)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Database Design](#-database-design)
- [Database Tables](#-database-tables)
- [Module Description](#-module-description)
- [Authentication Flow](#-authentication-flow)
- [Restaurant and Menu Flow](#-restaurant-and-menu-flow)
- [Cart Management Flow](#-cart-management-flow)
- [Checkout and Payment Flow](#-checkout-and-payment-flow)
- [Order Placement Flow](#-order-placement-flow)
- [Order History Flow](#-order-history-flow)
- [Request Processing Flow](#-request-processing-flow)
- [MVC Responsibilities](#-mvc-responsibilities)
- [Setup and Installation](#-setup-and-installation)
- [Database Configuration](#-database-configuration)
- [How to Run the Project](#-how-to-run-the-project)
- [Application Pages](#-application-pages)
- [Servlet Endpoints](#-servlet-endpoints)
- [Future Enhancements](#-future-enhancements)
- [Learning Outcomes](#-learning-outcomes)
- [Author](#-author)

---

## 🚀 Project Overview

Foodora is designed to simulate a real-world food delivery platform.

The application manages the complete customer journey:

```text
User
  ↓
Registration / Login
  ↓
Restaurant Listing
  ↓
Select Restaurant
  ↓
View Restaurant Menu
  ↓
Add Food Items
  ↓
Manage Cart
  ↓
Proceed to Checkout
  ↓
Authentication Check
  ↓
Payment Method Selection
  ↓
Confirm Order
  ↓
Create Order
  ↓
Create Order Items
  ↓
Clear Cart
  ↓
Order Confirmation
  ↓
View My Orders



Problem Statement
Traditional restaurant ordering requires customers to physically visit restaurants or depend on separate ordering systems.
The objective of Foodora is to provide a centralized web application where users can:
- Discover restaurants
- View restaurant information
- Browse menus
- Select food items
- Manage quantities
- Calculate order totals
- Authenticate before checkout
- Select a payment method
- Place orders
- View previous orders
The system also maintains persistent application data using MySQL.
🎯 Project Objectives
The major objectives of the project are:
1. Build a complete food delivery web application.
2. Implement user registration and authentication.
3. Display restaurants dynamically from the database.
4. Display menus based on the selected restaurant.
5. Implement session-based cart management.
6. Restrict a cart to items from one restaurant at a time.
7. Implement quantity increase and decrease functionality.
8. Implement checkout and payment selection.
9. Store orders and order items in MySQL.
10. Display user-specific order history.
11. Follow MVC and DAO-based application architecture.
12. Separate presentation, business/request handling and database access responsibilities.
✨ Key Features
👤 User Management
- User registration
- Email-based user lookup
- Login authentication
- Session management
- Logout
- Logged-in user tracking
- Role support through the role field
🏪 Restaurant Management
- Dynamic restaurant listing
- Restaurant name
- Cuisine type
- Address
- Rating
- Delivery time
- Restaurant image
- Active/inactive restaurant status
🍽️ Menu Management
- Restaurant-specific menus
- Menu item name
- Description
- Price
- Availability status
- Food images
- Dynamic menu retrieval using restaurant ID
🛒 Cart Management
- Add food items
- Increase quantity
- Decrease quantity
- Remove items
- Clear cart
- Dynamic cart count
- Automatic subtotal calculation
- Restaurant-level cart validation
Single Restaurant Cart Rule
A user can add items only from one restaurant at a time.
For example:
Restaurant A
    ↓
Pizza
Burger
Biryani
    ↓
Cart

If the user tries to add an item from Restaurant B while Restaurant A's items are already in the cart, the application prevents the operation.
This rule is implemented inside the Cart model.
💳 Checkout and Payment
The checkout flow includes:
- Cart validation
- Login validation
- Order summary
- Delivery fee
- Platform fee
- Final amount
- Payment mode selection
Supported payment modes:
- UPI
- Card
- Cash on Delivery
📦 Order Management
After successful checkout:
- An order record is created.
- Order items are created.
- The order is associated with the logged-in user.
- The order is associated with the selected restaurant.
- Payment mode is stored.
- Order status is stored.
- The cart is cleared.
- Order confirmation is displayed.
Users can then access their previous orders through My Orders.
🔄 Application Flow
The complete application flow is:
                    ┌───────────────┐
                    │     User      │
                    └───────┬───────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │ Register / Login  │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │    Restaurants    │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │  Select Restaurant│
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │   Restaurant Menu │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │    Add to Cart    │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │   Manage Cart     │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │  Proceed to Pay   │
                  └─────────┬─────────┘
                            │
                     ┌──────▼──────┐
                     │ Logged In ? │
                     └───┬─────┬───┘
                         │ No  │ Yes
                         ▼     │
                      Login    │
                         │     │
                         └──┬──┘
                            ▼
                  ┌───────────────────┐
                  │ Payment Selection │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │   Confirm Order   │
                  └─────────┬─────────┘
                            │
                 ┌──────────▼──────────┐
                 │ Create Order Record │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Create Order Items  │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │     Clear Cart      │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Order Confirmation  │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │     My Orders       │
                 └─────────────────────┘

🔁 Complete End-to-End Flow
Step 1 – User Registration
A new user opens the registration page and enters:
- Username
- Password
- Email
- Phone
- Address
The registration request is sent to:
RegisterController

The controller validates whether the email already exists.
If the email is available, a User object is created and passed to:
UserDaoImpl

The DAO inserts the user into the MySQL user table.
Register.jsp
     ↓
RegisterController
     ↓
UserDaoImpl
     ↓
MySQL
     ↓
user table

Step 2 – Login
The user enters email and password.
Login.jsp
     ↓
LoginController
     ↓
UserDaoImpl
     ↓
MySQL

The application retrieves the user using the email.
The password is then checked.
After successful authentication:
HttpSession
    ↓
user object stored in session

The session allows the application to identify the logged-in user across different requests.
Step 3 – Restaurant Listing
When the user opens the restaurant page:
restaurant

the request reaches:
RestaurantController

The controller calls:
RestaurantDaoImpl

which retrieves restaurants from MySQL.
The result is placed into the request:
restaurants

The request is forwarded to:
restaurant.jsp

Flow:
Browser
   ↓
RestaurantController
   ↓
RestaurantDaoImpl
   ↓
MySQL
   ↓
Restaurant objects
   ↓
restaurant.jsp
   ↓
Browser

Step 4 – Restaurant Selection
When the user selects View Menu, the restaurant ID is sent through the URL.
Example:
/menu?restaurantId=5

The MenuController receives the restaurant ID.
It retrieves:
1. Restaurant information
2. Menu items belonging to that restaurant
using:
RestaurantDaoImpl
MenuDaoImpl

The controller then forwards the data to:
Menu.jsp

Step 5 – Menu Display
The menu page displays:
- Restaurant image
- Restaurant name
- Restaurant address
- Rating
- Delivery time
- Food image
- Food name
- Food description
- Food price
- Availability
- Add button
- Quantity controls
The menu data comes directly from the database.
🛒 Cart Management Flow
The cart is maintained using the user's HTTP session.
The cart contains:
restaurantId
items

The items are stored using a map:
Map<Integer, CartItem>

where the key is the menuId.
Each CartItem contains:
Menu
Quantity

Add Item
When the user clicks +:
Menu.jsp
   ↓
POST /cart
   ↓
CartController
   ↓
MenuDaoImpl
   ↓
Menu
   ↓
Cart.addItem()
   ↓
HttpSession

If the item already exists:
quantity = quantity + 1

Otherwise:
new CartItem(menu, 1)

is created.
Increase Quantity
When the user clicks + for an existing item:
quantity = quantity + 1

The cart count is also updated.
Decrease Quantity
When the user clicks −:
quantity = quantity - 1

If quantity becomes zero, the item is removed from the cart.
Remove Item
An item can also be completely removed from the cart.
Clear Cart
The entire cart can be cleared.
This resets:
items
restaurantId
cart count

🏪 Single Restaurant Cart Validation
Foodora uses a single-restaurant cart rule.
The first item added determines the restaurant:
Cart.restaurantId = Menu.restaurantId

Every subsequent item is checked against that restaurant.
Conceptually:
if (cartRestaurantId == menuRestaurantId) {
    addItem();
} else {
    rejectItem();
}

This prevents a cart from containing items from multiple restaurants.
💰 Cart Total Calculation
Each CartItem calculates its subtotal:
Item Price × Quantity

The complete cart total is:
Σ(Item Price × Quantity)

The checkout bill additionally displays:
Item Total
+ Delivery Fee
+ Platform Fee
----------------
Grand Total

🔐 Authentication-Aware Checkout
When the user clicks:
Proceed to Pay

the request goes through:
ProceedController

The controller checks:
Is cart empty?
       ↓
Is user logged in?

If the cart is empty:
/cart

If the user is not logged in:
/login

with the payment URL preserved as the return destination.
After successful login, the user is redirected back to:
/payment

This provides a continuous checkout experience.
💳 Payment Flow
The payment page displays:
Payment Methods
UPI
Card
Cash on Delivery

The user selects one payment mode and confirms the order.
The payment request is sent to:
ConfirmOrderController

📦 Order Placement Flow
After clicking Confirm Order, the application performs the following operations.
Payment.jsp
      ↓
POST /confirmOrder
      ↓
ConfirmOrderController
      ↓
Check User
      ↓
Check Cart
      ↓
Check Payment Mode
      ↓
Create Order object
      ↓
OrderDaoImpl
      ↓
orders table
      ↓
Create OrderItem objects
      ↓
OrderItemDaoImpl
      ↓
orderItem table
      ↓
Clear Cart
      ↓
Order Confirmation

The Order contains information such as:
orderId
userId
restaurantId
orderDate
totalAmount
status
paymentMode

Each food item ordered is stored separately in:
orderItem

with:
orderItemId
orderId
menuId
totalAmount

This separates the order-level information from the individual ordered items.
✅ Order Confirmation
After successful order creation, the application stores the latest order in the session and redirects the user to:
/orderConfirmation

The confirmation page displays information such as:
- Order ID
- Payment mode
- Order status
- Confirmation message
The user can then:
View My Orders

or:
Continue Shopping

📋 My Orders Flow
When a logged-in user opens My Orders:
/orders

the request reaches:
OrderController

The controller obtains the logged-in user from the session.
Then:
OrderDaoImpl

retrieves orders belonging to that user.
The orders are placed into the request:
orders

and forwarded to:
Orders.jsp

Therefore, each user sees only their own order history.
🏗️ System Architecture
Foodora follows a layered MVC-based architecture.
                    ┌─────────────────────┐
                    │       Browser       │
                    │   HTML/CSS/JS/JSP   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Controllers     │
                    │      Servlets       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Models        │
                    │  POJO / Data Model  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     DAO Layer       │
                    │   DAO Interfaces   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   DAO Implement.    │
                    │    JDBC Queries     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    DBConnection     │
                    │   JDBC Connection   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       MySQL         │
                    │      Foodora DB     │
                    └─────────────────────┘

🧱 Technology Stack
Frontend
Technology	Purpose
HTML5	Page structure
CSS3	Styling and responsive design
JavaScript	Client-side interactions
JSP	Dynamic server-side presentation


Backend
Technology	Purpose
Java	Core application language
Servlets	HTTP request/response handling
JDBC	Database connectivity
DAO Pattern	Database access abstraction
MVC	Application architecture


Database
Technology	Purpose
MySQL	Persistent data storage
MySQL JDBC Driver	Java-MySQL communication


Server & Development
Tool	Purpose
Apache Tomcat 10.1	Web application server
Eclipse	Development IDE
Git	Version control
GitHub	Source code hosting


📁 Project Structure
foodora
│
├── src
│   └── main
│       ├── java
│       │   └── com.tap
│       │       │
│       │       ├── controller
│       │       │   ├── RestaurantController.java
│       │       │   ├── MenuController.java
│       │       │   ├── CartController.java
│       │       │   ├── LoginController.java
│       │       │   ├── RegisterController.java
│       │       │   ├── LogoutController.java
│       │       │   ├── ProceedController.java
│       │       │   ├── PaymentController.java
│       │       │   ├── ConfirmOrderController.java
│       │       │   ├── OrderConfirmationController.java
│       │       │   └── OrderController.java
│       │       │
│       │       ├── dao
│       │       │   ├── UserDao.java
│       │       │   ├── RestaurantDao.java
│       │       │   ├── MenuDao.java
│       │       │   ├── OrderDao.java
│       │       │   └── OrderItemDao.java
│       │       │
│       │       ├── daoImpl
│       │       │   ├── UserDaoImpl.java
│       │       │   ├── RestaurantDaoImpl.java
│       │       │   ├── MenuDaoImpl.java
│       │       │   ├── OrderDaoImpl.java
│       │       │   └── OrderItemDaoImpl.java
│       │       │
│       │       ├── model
│       │       │   ├── User.java
│       │       │   ├── Restaurant.java
│       │       │   ├── Menu.java
│       │       │   ├── Order.java
│       │       │   ├── OrderItem.java
│       │       │   ├── Cart.java
│       │       │   └── CartItem.java
│       │       │
│       │       └── util
│       │           └── DBConnection.java
│       │
│       └── webapp
│           │
│           ├── images
│           │   ├── restaurants
│           │   └── menu
│           │       ├── morning
│           │       ├── afternoon
│           │       ├── evening
│           │       └── night
│           │
│           ├── restaurant.jsp
│           ├── restaurants.css
│           ├── Menu.jsp
│           ├── Menu.css
│           ├── Cart.jsp
│           ├── Cart.css
│           ├── Login.jsp
│           ├── Register.jsp
│           ├── account.css
│           ├── Payment.jsp
│           ├── payment.css
│           ├── OrderConfirmation.jsp
│           ├── Orders.jsp
│           │
│           └── WEB-INF
│               └── lib
│                   └── mysql-connector-j-9.2.0.jar
│
└── README.md

🧩 Package Responsibilities
com.tap.model
Contains application data models.
Examples:
User
Restaurant
Menu
Order
OrderItem
Cart
CartItem

These classes represent application entities and transfer data between layers.
com.tap.dao
Contains DAO interfaces.
The DAO layer defines database operations without exposing their implementation details.
Example:
User getUser(int userId);
User getUserByEmail(String email);
List<User> getAllUsers();
void addUser(User user);
void updateUser(User user);
void deleteUser(int userId);

com.tap.daoImpl
Contains the actual JDBC implementation of DAO interfaces.
Responsibilities include:
- Opening database connections
- Executing SQL statements
- Reading ResultSet
- Creating model objects
- Performing INSERT
- Performing SELECT
- Performing UPDATE
- Performing DELETE
com.tap.controller
Contains Servlet controllers.
Controllers are responsible for:
- Receiving HTTP requests
- Reading request parameters
- Calling DAO classes
- Managing sessions
- Setting request attributes
- Forwarding to JSP
- Redirecting users
- Controlling application flow
com.tap.util
Contains utility classes.
The main utility is:
DBConnection

which provides the JDBC connection to MySQL.
🗄️ Database Design
Database name:
foodora

The application uses the following major tables:
user
restaurant
menu
orders
orderItem

📊 Database Tables
1. User Table
Stores user information.
user
├── userId
├── username
├── password
├── email
├── phone
├── address
└── role

userId is the primary key.
email is unique.
2. Restaurant Table
Stores restaurant information.
restaurant
├── restaurantId
├── name
├── cuisineType
├── deliveryTime
├── address
├── adminUserId
├── rating
├── isActive
└── imagePath

restaurantId is the primary key.
adminUserId references the user table.
3. Menu Table
Stores food items belonging to restaurants.
menu
├── menuId
├── restaurantId
├── itemName
├── description
├── price
├── isAvailable
└── imagePath

menuId is the primary key.
restaurantId references the restaurant table.
4. Orders Table
Stores order-level information.
orders
├── orderId
├── userId
├── restaurantId
├── orderDate
├── totalAmount
├── status
└── paymentMode

Relationships:
user
  │
  └──── orders

restaurant
  │
  └──── orders

5. OrderItem Table
Stores individual food items belonging to an order.
orderItem
├── orderItemId
├── orderId
├── menuId
└── totalAmount

Relationships:
orders
   │
   └──── orderItem

menu
   │
   └──── orderItem

🔗 Database Relationship Overview
              ┌──────────────┐
              │     User     │
              └──────┬───────┘
                     │
                     │ userId
                     ▼
              ┌──────────────┐
              │    Orders    │
              └──────┬───────┘
                     │
                     │ orderId
                     ▼
              ┌──────────────┐
              │  OrderItem   │
              └──────┬───────┘
                     │
                     │ menuId
                     ▼
              ┌──────────────┐
              │     Menu     │
              └──────┬───────┘
                     │
                     │ restaurantId
                     ▼
              ┌──────────────┐
              │ Restaurant   │
              └──────────────┘

🧠 MVC Responsibilities
Foodora separates application responsibilities using MVC principles.
Model
Responsible for representing data.
User
Restaurant
Menu
Order
OrderItem
Cart
CartItem

View
Responsible for displaying data to users.
JSP
HTML
CSS
JavaScript

Examples:
restaurant.jsp
Menu.jsp
Cart.jsp
Login.jsp
Register.jsp
Payment.jsp
Orders.jsp

Controller
Responsible for processing requests and controlling application flow.
Implemented using Java Servlets.
Examples:
LoginController
RegisterController
RestaurantController
MenuController
CartController
ProceedController
PaymentController
ConfirmOrderController
OrderController

🔄 Request Processing Flow
A typical database-backed request follows:
Browser
   ↓
JSP / HTML
   ↓
HTTP Request
   ↓
Servlet Controller
   ↓
Model / Request Data
   ↓
DAO
   ↓
DAO Implementation
   ↓
JDBC
   ↓
MySQL
   ↓
ResultSet
   ↓
Model Objects
   ↓
Controller
   ↓
JSP
   ↓
HTTP Response
   ↓
Browser

For example:
GET /menu?restaurantId=5

becomes:
MenuController
      ↓
RestaurantDaoImpl
      ↓
MenuDaoImpl
      ↓
MySQL
      ↓
Restaurant + Menu objects
      ↓
Menu.jsp

🔌 DAO Pattern
Foodora uses the DAO pattern to separate database operations from controllers.
Example:
Controller
    ↓
UserDao
    ↓
UserDaoImpl
    ↓
JDBC
    ↓
MySQL

This prevents controllers from directly containing SQL queries.
DAO interfaces define the operations, while DAO implementation classes contain the JDBC logic.
🔐 Session Management
HTTP is stateless, so Foodora uses HttpSession for maintaining user-specific information.
Session data includes information such as:
user
cart
count
lastOrder

The cart is therefore maintained separately for each user's session.
🚪 Logout Flow
When the user clicks Logout:
Logout
   ↓
LogoutController
   ↓
session.invalidate()
   ↓
Restaurant page

Invalidating the session removes session-based authentication and cart-related state.
🛠️ Setup and Installation
Prerequisites
Install the following software:
- Java JDK
- Eclipse IDE
- Apache Tomcat 10.1
- MySQL Server
- MySQL Workbench
- Git
- Web browser
🗃️ Database Setup
Create the database:
CREATE DATABASE foodora;

Select the database:
USE foodora;

Create the required tables:
user
restaurant
menu
orders
orderItem

Make sure the foreign key relationships are configured correctly.
🔌 Database Configuration
The project uses:
Host     : localhost
Port     : 3306
Database : foodora
Username : root

The JDBC driver used by the project is:
mysql-connector-j-9.2.0.jar

The driver is placed inside:
src/main/webapp/WEB-INF/lib

The database connection is centralized inside:
com.tap.util.DBConnection

▶️ How to Run the Project
1. Clone the Repository
git clone <YOUR-GITHUB-REPOSITORY-URL>

2. Import into Eclipse
Open Eclipse and import the project as a Dynamic Web Project.
3. Configure Apache Tomcat
Configure:
Apache Tomcat 10.1

as the project server.
4. Configure MySQL
Make sure MySQL Server is running.
Create the:
foodora

database and required tables.
5. Configure Database Credentials
Update the credentials inside:
DBConnection.java

according to your local MySQL configuration.
6. Start Tomcat
Run the project using:
Run on Server

7. Open the Application
The application can be accessed through:
http://localhost:8080/foodora/

🌐 Application Pages
Page	Purpose
Restaurant Page	Displays available restaurants
Menu Page	Displays restaurant-specific food items
Login Page	User authentication
Register Page	New user registration
Cart Page	Cart management and bill
Payment Page	Payment mode selection
Order Confirmation	Displays successful order information
My Orders	Displays logged-in user's order history


🔗 Servlet Endpoints
Endpoint	Method	Responsibility
/restaurant	GET	Fetch restaurants
/menu	GET	Fetch restaurant and menu
/cart	GET/POST	Manage cart
/login	GET/POST	Login
/register	GET/POST	Registration
/logout	GET	Logout
/proceed	GET	Checkout validation
/payment	GET	Payment page
/confirmOrder	POST	Create order
/orderConfirmation	GET	Order confirmation
/orders	GET	User order history


🧪 Core Functional Scenarios
Scenario 1 – New User
Register
   ↓
User stored in MySQL
   ↓
Login
   ↓
Session created
   ↓
Browse restaurants

Scenario 2 – Existing User
Login
   ↓
Session created
   ↓
Browse restaurants
   ↓
Select restaurant
   ↓
View menu

Scenario 3 – Add Food
Menu
   ↓
Click +
   ↓
CartController
   ↓
Cart.addItem()
   ↓
Session Cart
   ↓
Cart count updated

Scenario 4 – Different Restaurant
Restaurant A item already in cart
             ↓
User selects Restaurant B item
             ↓
Restaurant IDs compared
             ↓
Different restaurant
             ↓
Item rejected

Scenario 5 – Checkout Without Login
Cart
 ↓
Proceed to Pay
 ↓
User not logged in
 ↓
Login
 ↓
Successful authentication
 ↓
Payment

Scenario 6 – Successful Order
Payment
   ↓
Select payment mode
   ↓
Confirm Order
   ↓
Create orders record
   ↓
Create orderItem records
   ↓
Clear cart
   ↓
Order confirmation
   ↓
My Orders

🧰 Development Tools
The project was developed using:
Eclipse IDE
Apache Tomcat 10.1
MySQL
MySQL Workbench
Git
GitHub

📈 Project Architecture Benefits
The architecture provides:
Separation of Concerns
Different responsibilities are separated into different layers.
Maintainability
Database logic is separated from controllers.
Reusability
DAO methods can be reused by multiple controllers.
Scalability
New modules can be added without placing all application logic into a single class.
Readability
The project structure makes it easier for developers to understand and maintain the application.
🔮 Future Enhancements
The application can be extended with:
- Online payment gateway integration
- Real-time order tracking
- Restaurant admin dashboard
- Restaurant owner login
- Admin dashboard
- Food search
- Food category filtering
- Restaurant filtering
- Sorting by rating
- Location-based restaurant discovery
- User profile management
- Password reset
- Email notifications
- Order cancellation
- Order status tracking
- Ratings and reviews
- Favorites/wishlist
- Coupon and discount system
- Delivery partner module
- REST API integration
- Spring Boot migration
- Spring Security integration
- Cloud deployment
- Docker containerization
📚 Learning Outcomes
This project provided practical experience with:
- Core Java
- Object-Oriented Programming
- Java Servlets
- JSP
- JDBC
- MySQL
- SQL
- DAO Pattern
- MVC Architecture
- HTTP Request/Response
- Session Management
- CRUD Operations
- Foreign Key Relationships
- Dynamic Web Applications
- Form Handling
- Authentication
- Cart Management
- Order Processing
- Git and GitHub
- Apache Tomcat
💡 Why This Project Is Important
Foodora is not just a static frontend project.
It demonstrates the complete flow of a database-driven Java web application:
Frontend
   ↓
HTTP Request
   ↓
Servlet
   ↓
Java Objects
   ↓
DAO
   ↓
JDBC
   ↓
MySQL
   ↓
Database Response
   ↓
JSP
   ↓
Frontend

The project therefore demonstrates how multiple technologies work together to build a complete web application.
🏁 Project Status
Project Type : Full-Stack Web Application
Architecture : MVC + DAO
Backend      : Java Servlets
Frontend     : JSP + HTML + CSS + JavaScript
Database     : MySQL
Server       : Apache Tomcat 10.1
Status       : Development / Functional

👨‍💻 Author
Tellamekala Harikrishna
B.Tech – Computer Science Engineering
Interested in:
- Java Development
- Full-Stack Development
- Backend Development
- Web Technologies
- Machine Learning
- Artificial Intelligence
📌 Project Highlights
✓ User Registration
✓ User Login / Logout
✓ Session Management
✓ Dynamic Restaurant Listing
✓ Dynamic Restaurant Menus
✓ Session-Based Cart
✓ Quantity Management
✓ Single-Restaurant Cart Validation
✓ Checkout Flow
✓ Payment Mode Selection
✓ Order Creation
✓ Order Item Management
✓ Order Confirmation
✓ User-Specific Order History
✓ MVC Architecture
✓ DAO Pattern
✓ JDBC + MySQL
✓ Apache Tomcat Deployment

⭐ Conclusion
Foodora is a Java-based full-stack food delivery web application that demonstrates the complete lifecycle of an online food ordering system, from user authentication and restaurant discovery to menu selection, cart management, checkout, order creation and order history.
The project combines Java, JSP, Servlets, JDBC, MySQL, HTML, CSS and JavaScript using a structured MVC + DAO architecture to provide a maintainable and scalable application design.
