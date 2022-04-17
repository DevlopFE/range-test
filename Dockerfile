FROM node:16-alpine as builder

WORKDIR /app
ADD package-lock.json package.json ./
RUN npm install
ADD . .
RUN npm run build


FROM nginxinc/nginx-unprivileged:alpine
COPY --chown=nginx --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]