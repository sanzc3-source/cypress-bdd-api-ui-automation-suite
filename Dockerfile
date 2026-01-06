FROM cypress/browsers:node-22.14.0-chrome-133.0.6943.126-1-ff-135.0.1-edge-133.0.3065.82-1

WORKDIR /e2e

COPY package.json package-lock.json ./

RUN npm ci
RUN npx cypress verify

COPY . .

RUN mkdir -p /e2e/reports && chmod -R 777 /e2e/reports

CMD ["bash", "-lc", "npx cypress run --browser chrome --headless"]
