# `sendOtp`API DOCUMENTATION

## Endpoint
`POST /api/otp/sendOtp`

## Description
This endpoint handles the sending of an OTP (One-Time Password) to a specified mobile number using the Fast2SMS API.

### Request
#### Headers
+ `Content-Type: application/json`
#### Body
The request body should be a JSON object containing the following field:

+ `mobileNumber` (string): The mobile number to which the OTP should be sent.
Example:
``` json
{ "mobileNumber": "1234567890" }
```
### Response
#### Success Response
+  **Status Code**: `200 OK`
+ __Body__: A JSON object containing a success message and the response data from the Fast2SMS API.
Example:
``` json
{
  "message": "OTP sent successfully",
  "data": {
    // Fast2SMS response data
  }
}
```
### Error Responses
+ **Status Code**: 500 Internal Server Error
+ **Body**: A JSON object containing an error message and the error details.
Example:
``` json
{
  "error": "Failed to send OTP",
  "data": {
    // Error details
  }
}
```
#### Environment Variables
Ensure you have the following environment variables set in your `.env` file:
```
AST2SMS_API_KEY=your_fast2sms_api_key
FAST2SMS_API_URL=https://www.fast2sms.com/dev/bulkV2
```

### Notes
+ The `otpGenerator` library is used to generate a 6-digit OTP.
+ The Fast2SMS API key and URL are retrieved from environment variables.
+ The OTP is sent using the Fast2SMS API, and the response is handled accordingly.