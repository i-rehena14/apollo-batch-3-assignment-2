## Product Management and Order Management for E-commerce application: backend

This project used Express with TypeScript as the programming language. Data management(product and order data) was done integrating MongoDB with Mongoose. For the validation and data integrity Zod validation was used.

Steps to run the application locally,

Create a folder named "e-commerce-backend" to required directory in your desktop.

**1. Clone the Repository:**

Run these commands in cmd:

```
git clone https://github.com/i-rehena14/apollo-batch-3-assignment-2.git
cd e-commerce-backend
code .
```

**2. Create a file named '.env' in the root of the project and paste these variables:**

You can put your own DB_URL value.

```
PORT=5000
DB_URL=mongodb+srv://apollo-shop-admin:txK8FCxziCVDF5w7@cluster0.rwe3cde.mongodb.net/apollo-shop?retryWrites=true&w=majority&appName=Cluster0
```

**3. Then open terminal to run these commands:**

```
npm install
npm run start-dev
```
