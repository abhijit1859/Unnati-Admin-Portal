# Step 1: Use Node.js base image
FROM node:18

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json first
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install --production

# Step 5: Copy rest of the application code
COPY . .

# Step 6: Expose port 8000
EXPOSE 8000

# Step 7: Start the app
CMD ["npm", "start"]
