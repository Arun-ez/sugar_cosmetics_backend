# sugar_cosmetics_backend

Backend services for Sugar Cosmetics Clone

## Live

https://api-sugarcosmetics.vercel.app/

## Related Repositories

- <a href="https://github.com/Arun-ez/SUGAR_COSMETICS-clone"> Frontend </a>
- <a href="https://github.com/Arun-ez/sugar_cosmetics-control_panel"> Control Panel </a>

## Tech Stack

- Node JS, Express JS, MongoDB, JWT, Razorpay API


## API Reference

#### Get all Products

```bash
  GET /api/products
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization Header` | `Bearer Token` |  `Optional` wishlist status of a user can be retrived by passing this |


#### Get Products by category

```bash
  GET /api/products?category=${category}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category`| `string` | **Required**. category to fetch |

#### Get Single Product by Id

```bash
  GET /api/products/${Id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Id`| `string` | **Required**. Id to fetch |

#### Sort Products based on price

```bash
  GET /api/products?category=${category}?sort=asc
  GET /api/products?category=${category}?sort==dsc
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `sort`| `string` | **Required**. sort dependency to fetch |


#### Filter Products

```bash
  GET /api/products?category=${category}&filter=any1%any2%any3%any4
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `filter`| `string` | **Required**. filter value to fetch |

#### Search Products

```bash
  GET /api/products/Search?q=${query}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query`| `string` | **Required**. query value to fetch |

#### Sort Search Results

```bash
  GET /api/products/search?q=${query}&sort=asc/dsc
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query`| `string` | **Required**. query value to fetch |
| `sort`| `string` | **Required**. sort value to fetch |

#### Filter Search Results

```bash
  GET /api/products/search?q=${query}&filter=any1%any2%any3%any4
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query`| `string` | **Required**. query value to fetch |
| `filter`| `string` | **Required**. filter value value should be same as products filter value |

#### Register new account

```bash
  POST /api/account/register
```
| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `body`| `json` | **body** should have the properties { name, email, password } |

#### Login to an account

```bash
  POST /api/account/login
```
| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `body`| `json` | **body** should have the properties { email, password } to fetch |

```bash
  response : {
    name: ***,
    email: ***,
    token: ***
  }
```
#### Login to an account by token

```bash
  POST /api/account/token
```
| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorization header`| `object` | authorization header should have token type as Bearer and a token separated by a space in a single string |

```bash
  < e.g >
  headers: {
      "authorization": `Bearer ${token}`
  } 
   
  response : {
    name: ***,
    email: ***,
    token: ***
  }
```

#### Check a user exist or not

```bash
  POST /api/account/exist
```
| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `body`| `json` | **body** should have the properties { email } |

#### Send an otp to an email

```bash
  POST /api/otp/send
```
| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `body`| `json` | **body** should have the properties { email } |

#### Verify an otp

```bash
  POST /api/otp/verify
```
| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `body`| `json` | **body** should have the properties { email, otp, hashkey } |


#### Post a Product to cart data of a user

```bash
  POST /api/cart
```

| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `body`| `json` | **body** should have the product |
| `authorization header`| `object` | authorization header should have token type as Bearer and a token separated by a space in a single string |

#### Get All cart data of a user

```bash
  GET /api/cart
```

| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorization header`| `object` | authorization header should have token type as Bearer and a token separated by a space in a single string |

#### Patch a single Product from cart data of a user

```bash
  PATCH /api/cart/${Id}
```

| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Id`| `string` | **Required**. Product Id to patch |
| `authorization header`| `object` | authorization header should have token type as Bearer and a token separated by a space in a single string |

#### Delete a single Product from cart data of a user

```bash
  DELETE /api/cart/${Id}
```

| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Id`| `string` | **Required**. Product Id to delete |
| `authorization header`| `object` | authorization header should have token type as Bearer and a token separated by a space in a single string |

#### Erase all cart data of a user

```bash
  DELETE /api/cart/clear/all
```
| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorization header`| `object` | authorization header should have token type as Bearer and a token separated by a space in a single string |


#### Post a Product to wishlist

```bash
  POST /api/wishlist
```

| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `body`| `json` | **body** should have the product |
| `authorization header`| `object` | authorization header should have token type as Bearer and a token separated by a space in a single string |

#### Get All wishlist data of a user

```bash
  GET /api/wishlist
```

| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorization header`| `object` | authorization header should have token type as Bearer and a token separated by a space in a single string |

#### Check existancy of a product in wishlist

```bash
  GET /api/wishlist/exist/${Id}
```

| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Id`| `string` | **Required**. Product Id to delete |
| `authorization header`| `object` | authorization header should have token type as Bearer and a token separated by a space in a single string |

#### Delete single Product from wishlist data of user

```bash
  DELETE /api/wishlist/${Id}
```

| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Id`| `string` | **Required**. Product Id to delete |
| `authorization header`| `object` | authorization header should have token type as Bearer and a token separated by a space in a single string |

#### Post an Address to address data of a user

```bash
  POST /api/address
```

| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `body`| `json` | **body** should have the fields {name, number, flatno, locality, pincode, city, state} |
| `authorization header`| `object` | authorization header should have token type as Bearer and a token separated by a space in a single string |

#### Get All address data of a user

```bash
  GET /api/address
```

| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorization header`| `object` | authorization header should have token type as Bearer and a token separated by a space in a single string |

#### Patch a single Address from address data of a user

```bash
  PATCH /api/address/${Id}
```

| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Id`| `string` | **Required**. Address Id to patch |
| `authorization header`| `object` | authorization header should have token type as Bearer and a token separated by a space in a single string |

#### Delete a single Address from address data of a user

```bash
  DELETE /api/address/${Id}
```

| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Id`| `string` | **Required**. Product Id to delete |
| `authorization header`| `object` | authorization header should have token type as Bearer and a token separated by a space in a single string |


#### Create a new order

```bash
  POST /api/order
```

| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `body`| `json` | **body** should have the fields {orderId, amount, created, delivery, status, products} |
| `authorization header`| `object` | authorization header should have token type as Bearer and a token separated by a space in a single string |

#### Get All orders data of a user

```bash
  GET /api/order
```

| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorization header`| `object` | authorization header should have token type as Bearer and a token separated by a space in a single string |

#### Create a new payment

```bash
  POST /api/payment/create
```

| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `body`| `json` | **body** should have the fields {amount} |

#### Verify Payment signature

```bash
  GET /api/payment/verify
```

| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `body`| `json` | **body** should have the fields  { razorpay_order_id, razorpay_payment_id, razorpay_signature } |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET_KEY` - Json web token secret key(any)
`MONGO_URI` - MongoDB connection string
`KEY_ID` - Razorpay key_id
`KEY_SECRET` - Razorpay key_secret


## Run Locally

Clone the project

```  git clone https://github.com/Arun-ez/sugar_cosmetics_backend.git  ```

```  npm i ```

```  npm start ```

## Author [ Arun Shaw ]
- [Github - arun-ez](https://github.com/Arun-ez)
- [LinkedIn - Arun Shaw](https://www.linkedin.com/in/arun-shaw-60ba64240/)
- [Website - Arun Shaw](https://arunshaw.vercel.app/)


## Support

For support, email arunshaw433@gmail.com



