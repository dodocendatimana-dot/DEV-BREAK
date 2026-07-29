import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "dev sale API",
    version: "1.0.0",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          fullName: { type: "string" },
          email: { type: "string", format: "email" },
          phoneNumber: { type: "string" },
          password: { type: "string" },
          role: { type: "string", enum: ["admin", "customer", "seller"] },
          status: { type: "string", enum: ["active", "inactive", "blocked"] },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Product: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string" },
          description: { type: "string" },
          price: { type: "number", format: "float" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Order: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          userId: { type: "string", format: "uuid" },
          productId: { type: "string", format: "uuid" },
          quantity: { type: "integer" },
          totalPrice: { type: "number", format: "float" },
          status: { type: "string", enum: ["pending", "completed", "cancelled"] },
          date: { type: "string", format: "date-time" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }],
  tags: [
    {
      name: "Users",
      description: "API endpoints for users",
    },
    {
      name: "Products",
      description: "API endpoints for products",
    },
    {
      name: "Orders",
      description: "API endpoints for orders",
    },
  ],
  paths: {
    "/api/register": {
      post: {
        summary: "Register new user in system",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  fullName: { type: "string" },
                  email: { type: "string" },
                  phoneNumber: { type: "string" },
                  password: { type: "string" },
                },
                required: ["fullName", "email", "phoneNumber", "password"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "User registered successfully",
          },
          400: {
            description: "Bad request",
          },
        },
      },
    },
    "/api/getAllProducts": {
      get: {
        summary: "Get all products",
        tags: ["Products"],
        responses: {
          200: {
            description: "List of all products",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Product",
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/getProduct/{id}": {
      get: {
        summary: "Get a single product by ID",
        tags: ["Products"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
            description: "Product ID",
          },
        ],
        responses: {
          200: {
            description: "Product found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          404: {
            description: "Product not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/createProduct": {
      post: {
        summary: "Create a new product",
        tags: ["Products"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  price: { type: "number", format: "float" },
                },
                required: ["name", "price"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Product created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          400: {
            description: "Bad request - name and price are required",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/updateProduct/{id}": {
      put: {
        summary: "Update a product by ID",
        tags: ["Products"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
            description: "Product ID",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  price: { type: "number", format: "float" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Product updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          404: {
            description: "Product not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/deleteProduct/{id}": {
      delete: {
        summary: "Delete a product by ID",
        tags: ["Products"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
            description: "Product ID",
          },
        ],
        responses: {
          200: {
            description: "Product deleted successfully",
          },
          404: {
            description: "Product not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/getAllOrder": {
      get: {
        summary: "Get all orders",
        tags: ["Orders"],
        responses: {
          200: {
            description: "List of all orders",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Order",
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/getOrder/{id}": {
      get: {
        summary: "Get a single order by ID",
        tags: ["Orders"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
            description: "Order ID",
          },
        ],
        responses: {
          200: {
            description: "Order found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Order",
                },
              },
            },
          },
          404: {
            description: "Order not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/createOrder": {
      post: {
        summary: "Create a new order",
        tags: ["Orders"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  userId: { type: "string", format: "uuid" },
                  productId: { type: "string", format: "uuid" },
                  quantity: { type: "integer" },
                  totalPrice: { type: "number", format: "float" },
                  status: { type: "string", enum: ["pending", "completed", "cancelled"] },
                  date: { type: "string", format: "date-time" },
                },
                required: ["userId", "productId", "quantity", "totalPrice"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Order created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Order",
                },
              },
            },
          },
          400: {
            description: "Bad request - userId, productId, quantity, and totalPrice are required",
          },
          404: {
            description: "User or product not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/updateOrder/{id}": {
      put: {
        summary: "Update an order by ID",
        tags: ["Orders"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
            description: "Order ID",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  userId: { type: "string", format: "uuid" },
                  productId: { type: "string", format: "uuid" },
                  quantity: { type: "integer" },
                  totalPrice: { type: "number", format: "float" },
                  status: { type: "string", enum: ["pending", "completed", "cancelled"] },
                  date: { type: "string", format: "date-time" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Order updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Order",
                },
              },
            },
          },
          404: {
            description: "Order not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/deleteOrder/{id}": {
      delete: {
        summary: "Delete an order by ID",
        tags: ["Orders"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
            description: "Order ID",
          },
        ],
        responses: {
          200: {
            description: "Order deleted successfully",
          },
          404: {
            description: "Order not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
  },
};

const swaggerSpec = swaggerJSDoc({ definition: swaggerDefinition, apis: [] });

export default swaggerSpec;
