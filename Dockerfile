FROM node:18

WORKDIR /app

# Copy all files
COPY . .

# Install dependencies and build
RUN npm install && npm run build

# Use the CLI script as entrypoint
ENTRYPOINT ["node", "bin/cli.js"] 

