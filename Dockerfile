FROM node:22-alpine

# Install AWS CLI and other dependencies using Alpine's package manager
RUN apk add --no-cache \
    aws-cli \
    bash \
    curl

# Install Yarn
RUN corepack enable && corepack prepare yarn@4.7.0 --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# Install dependencies
RUN yarn install

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NODE_ENV=development

# Command to run the application
CMD ["yarn", "dev", "--mode=mono"] 