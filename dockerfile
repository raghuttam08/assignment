# Step 1: Use the official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies first
COPY package.json package-lock.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Set environment variables (ensure MongoDB connection is mocked during build)
ENV MONGODB_URI=mongodb://admin:adminpassword@db:27017/ecom?authSource=admin


# Step 7: Build the Next.js app (production build)
RUN npm run build

# Step 8: Expose the port the app will run on
EXPOSE 3000

# Step 9: Start the Next.js app in production mode
CMD ["npm", "start"]
