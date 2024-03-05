FROM node:20.11.1-bullseye-slim
ENV NODE_ENV production
WORKDIR /app
COPY . /app
RUN npm install --production
CMD ["node", "src/app.js"]