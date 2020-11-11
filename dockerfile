FROM node:latest
WORKDIR /app

# Install dependencies
COPY ./package-lock.json ./package.json ./
RUN npm i

# Copy all files
COPY . .

# Start server
CMD npm run start
