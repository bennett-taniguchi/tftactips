# Build stage
FROM golang:1.24-alpine AS build

WORKDIR /app

# get env
 
# Copy go.mod and go.sum files
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Production stage
FROM alpine:latest

WORKDIR /app

# Copy binary from build stage
COPY --from=build /app/main .

# Expose port
EXPOSE 8080

# Run the Go backend
CMD ["./main"]