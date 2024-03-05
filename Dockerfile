FROM node:20.11.1-bullseye-slim
ENV NODE_ENV production
ENV PORT 80
WORKDIR /app
COPY . /app
RUN npm install --production
CMD ["node", "src/app.js"]