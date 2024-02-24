# The commands in base-stage will run whatever NODE_ENV you're. 
FROM node as base



# Now, we can use (base) instead of (node)
FROM base as development

WORKDIR /app
COPY package.json .
# Declare a variable "NODE_ENV" to check its value
ARG NODE_ENV
COPY . .
EXPOSE 4000
CMD [ "npm", "run", "start-dev" ]



FROM base as production

WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY . .
EXPOSE 4000 
CMD [ "npm", "start" ]

# NOTE: to know which starge we're workig in, we have to specify from (docker-compose)
# we specify "stage" in (target) 