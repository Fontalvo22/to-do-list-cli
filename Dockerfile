FROM node:22-alpine3.19
WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

CMD ["entrypoint.sh"]