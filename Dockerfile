# Build stage
FROM node:20.11.1 AS build
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run build

# Serve stage
FROM node:20.11.1
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist"]