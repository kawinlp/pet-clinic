FROM golang:1.19-alpine

WORKDIR /go/src/github.com/G1J1/sut66/team04
COPY backend .
RUN apk add build-base
RUN go mod tidy
RUN go build -o main .
EXPOSE 8080
CMD ["./main"]