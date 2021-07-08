---
id: authentication
title: Authentication
sidebar_label: Authentication
---

To authenticate users of application server we use JWT. When the user logs in,
they send their username and password and appserver returns signed JWT
containing username, timespan of the token validity and audience indicating
what it can be used for. With every request requiring authentication user
includes this JWT in HTTP header as follows:

```
Grpc-Metadata-Authorization: Bearer eyJhbGciOiJ...
```

Some requests may additionally require a code for second factor authentication. It maybe TOTP code, or recovery code. For these requests the code should be added into `Grpc-Metadata-X-OTP` header:

```
Grpc-Metadata-X-OTP: 738854
```

TOTP and recovery codes may be used interchangeably, you can use either in any
request. Each code may be used only once, and you may only use it once in every
30 seconds interval.

## Login Procedure

To log in you need to send request to `/api/internal/login` with username and
password. If password is correct the call will return JWT and flag indicating
if second factor authentication is required. If second factor authentication is
not required, then returned JWT can be immediately used to call other APIs. In
case of second factor authentication you need to call
`/api/internal/loging-2fa` and you need include the OTP code and the JWT into
the request. If OTP is valid you will get another JWT token that you can use to
call other APIs.

## Enabling Two-Factor Authentication

The following calls handle two-factor authentication configuration:

### /api/internal/totp-status

This call returns the current status of two factor authentication, indicating
if it is enabled or not.

### /api/internal/totp-configuration

This call generates a random secret for generating TOTP and 10 recovery codes.
It returns the secret as string, URL and QR code, and also it returns the list
of recovery codes. Note, that this call does not enables two-factor
authentication, but just creates the configuration.

### /api/internal/totp-enable

This call requires you to include OTP into the header and if it is correct,
then two-factor authentication will be enabled.

### /api/internal/totp-disable

This call requires you to include OTP into the header and if it is correct,
then two-factor authentication will be disabled.

### /api/internal/totp-recovery-codes

This call requires you to include OTP into the header and if it is correct,
then it returns a list of 10 recovery codes. If you didn't use any recovery
codes, then the list returned every time will be the same, if you used some
codes, then they will be replaced with the new ones. And you can also
explicitely request to regenerate all the codes, if your old list has been lost
and you are concerned that somebody else may use it.

## Password Recovery

If user has forgotten their password, they can request password reset. To
request the password reset a call has to be send to
`/api/internal/request-password-reset` with the name of the user. If the user
exists then email will be send to them containing 6 digit code that can be used
to reset their password. This code has to be sent then to
`/api/internal/confirm-password-reset` with username, and new password. For
security reasons we require at least 30 days between password resets.

## Related DB Tables

The following tables are used in authentication process:

### user

this table contains user id, username, hashed password and the flag indicating
if user is active or not.

### totp_configuration

this table contains totp configuration for users including if two-factor
authentication is enabled, the secret used to generate TOTP and the timestamp
for the last code that has been used. The secret is stored encrypted.

### totp_recovery_codes

this table contains recovery codes for users. They are stored encrypted, just
like TOTP secret.

### password_reset

this table stores information required for resetting password. It stores the 6
digit recovery code, the date when it was generated and the number attempts
left to enter it correctly.
