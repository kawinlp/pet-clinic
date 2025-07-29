package service

import (
	"errors"
	"time"

	jwt "github.com/golang-jwt/jwt/v5"
)

type JwtWrapper struct {
	SecretKey       string
	Issuer          string
	ExpirationHours int64
}

type JwtClaim struct {
	EmployeeID string
	jwt.RegisteredClaims
}

func (j *JwtWrapper) GenerateToken(employeeid string) (signedToken string, err error) {
	claims := &JwtClaim{
		EmployeeID: employeeid,//this
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Duration(j.ExpirationHours) * time.Hour)),
			Issuer:    j.Issuer,
		},
	}//เข้ารหัสข้อมูล

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	signedToken, err = token.SignedString([]byte(j.SecretKey))
	if err != nil {
		return
	}

	return
}

func (j *JwtWrapper) ValidateToken(signedToken string) (claims *JwtClaim, err error) {
	token, err := jwt.ParseWithClaims(
		signedToken,
		&JwtClaim{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(j.SecretKey), nil
		},
	)

	if err != nil {
		return
	}

	claims, ok := token.Claims.(*JwtClaim)
	if !ok {
		err = errors.New("Couldn't parse claims")
		return
	}

	if claims.ExpiresAt.Unix() < time.Now().Local().Unix() {
		err = errors.New("JWT is expired")
		return
	}

	return

}