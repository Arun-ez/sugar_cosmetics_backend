# sugar_cosmetics_backend

## API Reference

#### Get all Products

```bash
  GET /api/products
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `N/A` | `N/A` |   `N/A` |

#### Limit number of Products

```bash
  GET /api/products?limit=10
```

| query | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `limit` | `number` |   `limit number of response` |

#### Get Products by category

```bash
  GET /api/products/${category}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category`| `string` | **Required**. category to fetch |

#### Get Single Product by Id

```bash
  GET /api/products/${category}/${Id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category`| `string` | **Required**. category to fetch |
| `Id`| `string` | **Required**. Id to fetch |

#### Sort Products

```bash
  GET /api/products/${category}?sort=price&order=asc
  GET /api/products/${category}?sort=price&order=dsc
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category`| `string` | **Required**. category to fetch |
| `sort`| `string` | **Required**. sort dependency to fetch |
| `order`| `string` | **Required**. sort order to fetch |

#### Filter Products

```bash
  GET /api/products/${category}?filter=Matte
  GET /api/products/${category}?filter=Matte&filter=liner
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category`| `string` | **Required**. category to fetch |
| `filter`| `string` | **Required**. filter value to fetch |

#### Search Products

```bash
  GET /api/products/Search/${query}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query`| `string` | **Required**. query value to fetch |

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


#### Post a Product to cart

```bash
  POST /api/cart
```

| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `body`| `json` | **body** should have the product |
| `authorization header`| `object` | authorization header should have token type as Bearer and a token separated by a space in a single string |

#### Get All cart data of a single user

```bash
  GET /api/cart
```

| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `authorization header`| `object` | authorization header should have token type as Bearer and a token separated by a space in a single string |

#### Patch single Product from cart data of a single user

```bash
  PATCH /api/cart/${Id}
```

| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Id`| `string` | **Required**. Product Id to patch |
| `authorization header`| `object` | authorization header should have token type as Bearer and a token separated by a space in a single string |

#### Delete single Product from cart data of a single user

```bash
  DELETE /api/cart/${Id}
```

| Required | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Id`| `string` | **Required**. Product Id to delete |
| `authorization header`| `object` | authorization header should have token type as Bearer and a token separated by a space in a single string |

#### Erase all cart data of a single user

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