# Documentación de Rutas 

## Auth Router
### Rutas Públicas (Libre)

- `POST /register`
  - Descripción: Permite a los usuarios registrarse en la aplicación.
  - Controlador: `controllers.registerController`.

- `POST /login`
  - Descripción: Permite a los usuarios iniciar sesión en la aplicación.
  - Controlador: `controllers.loginController`.

- `PUT /forgot-password`
  - Descripción: Permite a los usuarios solicitar restablecer su contraseña en caso de olvido.
  - Controlador: `controllers.forgotPasswordController`.

### Rutas para Usuarios Logueados

- `POST /refresh`
  - Descripción: Permite a los usuarios logueados obtener un token de actualización.
  - Controlador: `controllers.refreshController`.
  - Middleware: `authMiddleware` para autenticación.

- `GET /user/id/:id`
  - Descripción: Obtiene los datos de un usuario por su ID.
  - Controlador: `controllers.getUserByIdController`.
  - Middleware: `authMiddleware` para autenticación.

- `PUT /update/:id`
  - Descripción: Permite a los usuarios logueados actualizar su información.
  - Controlador: `controllers.updateUserController`.
  - Middleware: `authMiddleware` para autenticación.

### Rutas para Administradores

- `GET /users`
  - Descripción: Obtiene la lista de todos los usuarios en la aplicación.
  - Controlador: `controllers.getAllUsersController`.
  - Middleware: `authMiddleware` y `authAdminMiddleware` para autenticación y autorización.

- `DELETE /delete/email/:email`
  - Descripción: Elimina a un usuario por su dirección de correo electrónico.
  - Controlador: `controllers.deleteUserByEmailController`.
  - Middleware: `authMiddleware` y `authAdminMiddleware` para autenticación y autorización.

- `DELETE /delete/id/:id`
  - Descripción: Elimina a un usuario por su ID.
  - Controlador: `controllers.deleteUserByUserIdController`.
  - Middleware: `authMiddleware` y `authAdminMiddleware` para autenticación y autorización.
 
## Brands Router
### Rutas Públicas (Libre)

- `GET /brands/products/id/:id`
  - Descripción: Obtiene los productos asociados a una marca por su ID.
  - Controlador: `controllers.getProductsByBrandIdController`.

- `GET /brands/products/name/:name`
  - Descripción: Obtiene los productos asociados a una marca por su nombre.
  - Controlador: `controllers.getProductsByBrandNameController`.

- `GET /brands/active`
  - Descripción: Obtiene todas las marcas activas en la aplicación.
  - Controlador: `controllers.getActiveBrandsController`.

### Rutas para Administradores

- `GET /brands/:id`
  - Descripción: Obtiene información detallada de una marca por su ID.
  - Controlador: `controllers.getBrandByIdController`.
  - Middleware: `authMiddleware` y `authAdminMiddleware` para autenticación y autorización.

- `POST /brands/new`
  - Descripción: Permite a los administradores crear una nueva marca.
  - Controlador: `controllers.createBrandsController`.
  - Middleware: `authMiddleware` y `authAdminMiddleware` para autenticación y autorización.

- `PUT /brands/update/:id`
  - Descripción: Permite a los administradores actualizar la información de una marca por su ID.
  - Controlador: `controllers.updateBrandController`.
  - Middleware: `authMiddleware` y `authAdminMiddleware` para autenticación y autorización.

- `DELETE /brands/delete/:id`
  - Descripción: Permite a los administradores eliminar una marca por su ID.
  - Controlador: `controllers.deleteBrandByIdController`.
  - Middleware: `authMiddleware` y `authAdminMiddleware` para autenticación y autorización.

## Product Router
### Rutas Públicas (Libre)

- `GET /products`
  - Descripción: Obtiene la lista de todos los productos disponibles en la aplicación.
  - Controlador: `controllers.getAllProductsController`.

- `GET /products/:id`
  - Descripción: Obtiene información detallada de un producto por su ID.
  - Controlador: `controllers.getProductByIdController`.

### Rutas para Administradores

- `POST /products/new`
  - Descripción: Permite a los administradores crear un nuevo producto en la aplicación.
  - Controlador: `controllers.createProductController`.
  - Middleware: `authMiddleware` y `authAdminMiddleware` para autenticación y autorización.

- `PUT /products/update/:id`
  - Descripción: Permite a los administradores actualizar la información de un producto por su ID.
  - Controlador: `controllers.updateProductController`.
  - Middleware: `authMiddleware` y `authAdminMiddleware` para autenticación y autorización.

- `DELETE /products/delete/:id`
  - Descripción: Permite a los administradores eliminar un producto por su ID.
  - Controlador: `controllers.deleteProductByIdController`.
  - Middleware: `authMiddleware` y `authAdminMiddleware` para autenticación y autorización.

## Order Router
### Rutas para Usuarios Logueados

- `POST /orders/new`
  - Descripción: Permite a los usuarios logueados crear una nueva orden.
  - Controlador: `controllers.createOrderController`.
  - Middleware: `authMiddleware` para autenticación.

- `GET /orders/active/user`
  - Descripción: Obtiene las órdenes activas asociadas al usuario logueado.
  - Controlador: `controllers.getActiveOrdersByUserIdController`.
  - Middleware: `authMiddleware` para autenticación.

### Rutas para Administradores

- `GET /orders/orders`
  - Descripción: Obtiene la lista de todas las órdenes en la aplicación.
  - Controlador: `controllers.getAllOrdersController`.
  - Middleware: `authMiddleware` y `authAdminMiddleware` para autenticación y autorización.

- `GET /orders/user/:id`
  - Descripción: Obtiene las órdenes asociadas a un usuario por su ID.
  - Controlador: `controllers.getAllOrdersByUserIdController`.
  - Middleware: `authMiddleware` y `authAdminMiddleware` para autenticación y autorización.

- `GET /orders/:id`
  - Descripción: Obtiene información detallada de una orden por su ID.
  - Controlador: `controllers.getOrderByIdController`.
  - Middleware: `authMiddleware` y `authAdminMiddleware` para autenticación y autorización.

- `DELETE /orders/delete/:id`
  - Descripción: Permite a los administradores eliminar una orden por su ID.
  - Controlador: `controllers.deleteOrderByIdController`.
  - Middleware: `authMiddleware` y `authAdminMiddleware` para autenticación y autorización.




