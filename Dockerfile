# Stage 1
FROM node:16

WORKDIR /app

COPY . ./
RUN yarn config set no-progress
RUN yarn

# Stage 2
CMD ["npm", "start"]
