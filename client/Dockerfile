FROM node:18-alpine
WORKDIR /app/frontend
COPY package.json .
ENV NODE_ENV=${NODE_ENV}
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]