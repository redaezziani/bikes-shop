FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG NEXT_PUBLIC_STRAPI_URL
ARG NEXT_PUBLIC_STRAPI_API_URL
ARG NEXT_PUBLIC_STRAPI_API_KEY
ARG NEXT_PUBLIC_MAPBOX_TOKEN

ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL
ENV NEXT_PUBLIC_STRAPI_API_URL=$NEXT_PUBLIC_STRAPI_API_URL
ENV NEXT_PUBLIC_STRAPI_API_KEY=$NEXT_PUBLIC_STRAPI_API_KEY
ENV NEXT_PUBLIC_MAPBOX_TOKEN=$NEXT_PUBLIC_MAPBOX_TOKEN

RUN npm run build

FROM node:20-alpine
WORKDIR /app

RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

# Expose port
EXPOSE 3000

CMD ["dumb-init", "node", "server.js"]