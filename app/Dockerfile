FROM node:20

# Install MySQL client
RUN apt-get update && apt-get install -y default-mysql-client

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# Install dev dependencies for seeding
RUN npm install -g tsx
RUN npm install @faker-js/faker --save-dev

# Copy the rest of the app AFTER installing dependencies
# This prevents COPY from overwriting node_modules
COPY . .

ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true

EXPOSE 3000

RUN chmod +x ./init.sh

CMD ["./init.sh"]
