FROM node:3.14.0a1-alpine3.20
WORKDIR /app

COPY . .

RUN npm install
RUN chmod +x index.js
CMD ["npm", "link"]

# RUN npm install -g .

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]