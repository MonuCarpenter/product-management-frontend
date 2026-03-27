# API Endpoints

## Auth

### Login

- **POST** `/api/auth/login`
- **Request:**
  ```json
  {
    "email": "admin@pms.com",
    "password": "pms@admin"
  }
  ```
- **Response:**
  ```json
  { "token": "<JWT_TOKEN>" }
  ```

### Register Salesman

- **POST** `/api/auth/register` (admin only)
- **Request:**
  ```json
  {
    "name": "Salesman Name",
    "email": "salesman@example.com",
    "phone": "1234567890",
    "password": "password"
  }
  ```
- **Response:**
  ```json
  { "message": "salesman registered" }
  ```

## Users

### Get Current User (by token)

- **GET** `/api/user/me`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Response:**
  ```json
  {
    "id": "...",
    "name": "Admin",
    "email": "admin@pms.com",
    "phone": "",
    "role": "admin"
  }
  ```

### List Users

- **GET** `/api/users?page=1&limit=10` (admin only)
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Response:** Array of user objects

### Get User by ID

- **GET** `/api/users/{id}` (admin only)
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Response:** User object

### Delete User

- **DELETE** `/api/users/{id}` (admin only)
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Response:** `{ "message": "user deleted" }`

## Products

### List Products

- **GET** `/api/products?page=1&limit=10`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Response:** Array of product objects

### Get Product by ID

- **GET** `/api/products/{id}`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Response:** Product object

### Create Product (single)

- **POST** `/api/products` (admin only)
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Request:** Product object (see below)
- **Response:** `{ "message": "product added" }`

### Create Products (bulk)

- **POST** `/api/products/bulk` (admin only)
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Request:** Array of product objects (see below)
- **Response:** `{ "message": "bulk products added" }`

#### Product Object Example

```json
{
  "basepack_code": "16008",
  "sku7": "ABCB610",
  "product_name": "RIN FAB WHTNR ALA BOLT 200ML",
  "hsn_number": "10L5004002",
  "location": "MAIN GODOWN",
  "category": "dets",
  "expiry_date": "2027-12-21T00:00:00Z",
  "upc": "40",
  "units": 75,
  "stocks_in_days": 49,
  "pur_rate": 33.697,
  "mrp": 45.0,
  "cur_stk_value": 3125.03
}
```

## User-Product Changes

### List Changes

- **GET** `/api/changes`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Response:** Array of change objects

### Get Change by ID

- **GET** `/api/changes/{id}`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Response:** Change object

---

## Bulk Product Creation Example

POST `/api/products/bulk`

```json
[
  {
    "basepack_code": "16008",
    "sku7": "ABCB610",
    "product_name": "RIN FAB WHTNR ALA BOLT 200ML",
    "hsn_number": "10L5004002",
    "location": "MAIN GODOWN",
    "category": "dets",
    "expiry_date": "2027-12-21T00:00:00Z",
    "upc": "40",
    "units": 75,
    "stocks_in_days": 49,
    "pur_rate": 33.697,
    "mrp": 45.0,
    "cur_stk_value": 3125.03
  },
  {
    "basepack_code": "70282",
    "sku7": "BA1C202",
    "product_name": "RED LABEL [A]100G POLYPD",
    "hsn_number": "02A6012000",
    "location": "MAIN GODOWN",
    "category": "dets",
    "expiry_date": "2027-01-20T00:00:00Z",
    "upc": "120",
    "units": 1,
    "stocks_in_days": 26,
    "pur_rate": 24.468,
    "mrp": 30.0,
    "cur_stk_value": 26.79
  },
  {
    "basepack_code": "70282",
    "sku7": "BA1C202",
    "product_name": "RED LABEL [A]100G POLYPD",
    "hsn_number": "02B6012000",
    "location": "MAIN GODOWN",
    "category": "dets",
    "expiry_date": "2027-01-31T00:00:00Z",
    "upc": "120",
    "units": 291,
    "stocks_in_days": 26,
    "pur_rate": 24.468,
    "mrp": 30.0,
    "cur_stk_value": 7794.73
  },
  {
    "basepack_code": "15171",
    "sku7": "BATU801",
    "product_name": "LB LEMON.ALOE FRESH SOAP 44G",
    "hsn_number": "01E5021601",
    "location": "MAIN GODOWN",
    "category": "dets",
    "expiry_date": "2027-11-16T00:00:00Z",
    "upc": "216",
    "units": 216,
    "stocks_in_days": 0,
    "pur_rate": 8.458,
    "mrp": 10.0,
    "cur_stk_value": 1999.94
  },
  {
    "basepack_code": "15421",
    "sku7": "BATW00A",
    "product_name": "LIFEBUOY ICE BATH SOAP 100G B4G1",
    "hsn_number": "0AA6001800",
    "location": "MAIN GODOWN",
    "category": "dets",
    "expiry_date": "2028-07-19T00:00:00Z",
    "upc": "18",
    "units": 39,
    "stocks_in_days": 55,
    "pur_rate": 101.493,
    "mrp": 120.0,
    "cur_stk_value": 4333.33
  },
  {
    "basepack_code": "15423",
    "sku7": "BAUC101",
    "product_name": "LIFEBUOY ICE BATH SOAP 260G",
    "hsn_number": "01B6003600",
    "location": "MAIN GODOWN",
    "category": "dets",
    "expiry_date": "2028-08-15T00:00:00Z",
    "upc": "36",
    "units": 195,
    "stocks_in_days": 72,
    "pur_rate": 50.747,
    "mrp": 60.0,
    "cur_stk_value": 10833.42
  },
  {
    "basepack_code": "65063",
    "sku7": "BRBM001",
    "product_name": "BRU INSTANT RS10 6.6G- NON SOUTH",
    "hsn_number": "01B6028800",
    "location": "MAIN GODOWN",
    "category": "dets",
    "expiry_date": "2027-04-21T00:00:00Z",
    "upc": "288",
    "units": 840,
    "stocks_in_days": 30,
    "pur_rate": 8.262,
    "mrp": 10.0,
    "cur_stk_value": 7636.44
  },
  {
    "basepack_code": "70907",
    "sku7": "BRDN201",
    "product_name": "BRU INST RS2 1.3G NS",
    "hsn_number": "01A6115200",
    "location": "MAIN GODOWN",
    "category": "dets",
    "expiry_date": "2026-12-27T00:00:00Z",
    "upc": "1152",
    "units": 672,
    "stocks_in_days": 9,
    "pur_rate": 1.652,
    "mrp": 2.0,
    "cur_stk_value": 1221.7
  },
  {
    "basepack_code": "83088",
    "sku7": "BRDV104",
    "product_name": "BRU INSTANT GLASS JAR 40G",
    "hsn_number": "04A6001200",
    "location": "MAIN GODOWN",
    "category": "dets",
    "expiry_date": "2027-06-21T00:00:00Z",
    "upc": "12",
    "units": 24,
    "stocks_in_days": 180,
    "pur_rate": 118.913,
    "mrp": 140.0,
    "cur_stk_value": 3140.18
  },
  {
    "basepack_code": "83088",
    "sku7": "BRDV104",
    "product_name": "BRU INSTANT GLASS JAR 40G",
    "hsn_number": "04B6001200",
    "location": "MAIN GODOWN",
    "category": "dets",
    "expiry_date": "2027-07-20T00:00:00Z",
    "upc": "12",
    "units": 24,
    "stocks_in_days": 180,
    "pur_rate": 118.913,
    "mrp": 140.0,
    "cur_stk_value": 3140.18
  }
]
```

---

**All endpoints require `Authorization: Bearer <JWT_TOKEN>` except login.**
