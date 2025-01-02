// init-mongo.js
db = db.getSiblingDB('ecom');  // Switch to the 'ecom' database (will create if it doesn't exist)

db.createCollection('users');  // Create a collection for users

// Add default login data (e.g., admin user)
db.users.insertOne({
  userID: "user1", 
  password: "password",  // Make sure to hash the password in production
});
