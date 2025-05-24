import { OpenAPIV3 } from "openapi-types";

const swaggerDefinition: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Next.js API Documentation",
    version: "1.0.0",
    description: "API documentation for the Next.js app",
  },
  servers: [
    {
      url: "https://xworks-connect.vercel.app/api/auth",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    "/register": {
      post: {
        summary: "Register a new user",
        description: "Create a new user in the system",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: {
                    type: "string",
                    description: "User's unique username",
                  },
                  name: { type: "string", description: "User's full name" },
                  email: {
                    type: "string",
                    format: "email",
                    description: "User's email address",
                  },
                  password: { type: "string", description: "User's password" },
                },
                required: ["username", "name", "email", "password"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "User successfully registered",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "string",
                      example: "User created successfully",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Bad Request - Missing or invalid fields",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "All fields are required",
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Error occurred during user registration",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/login": {
      post: {
        summary: "Login user",
        description: "Authenticate user and return a JWT token",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                    description: "User's email address",
                  },
                  password: { type: "string", description: "User's password" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successful login",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                      description: "JWT token for the authenticated user",
                    },
                    user_type_id: {
                      type: "integer",
                      description: "User's role type ID",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Bad Request - Missing or invalid fields",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Email and password are required",
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized - Invalid credentials",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Invalid email or password",
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Error occurred during authentication",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/allcourses": {
      get: {
        summary: "Get all courses",
        description: "Retrieve a list of all available courses",
        tags: ["Courses"],
        responses: {
          "200": {
            description: "Successfully retrieved courses",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      course_id: {
                        type: "integer",
                        description: "Unique identifier for the course",
                      },
                      course_name: {
                        type: "string",
                        description: "Name of the course",
                      },
                      description: {
                        type: "string",
                        description: "Course description",
                      },
                      duration_hours: {
                        type: "number",
                        description: "Duration of the course in hours",
                      },
                      level: {
                        type: "string",
                        description: "Difficulty level of the course",
                      },
                      status: {
                        type: "string",
                        description: "Current status of the course",
                      },
                      url: {
                        type: "string",
                        description: "URL associated with the course",
                      },
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Internal Server Error",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/completedcourses": {
      get: {
        summary: "Get user's completed courses",
        description:
          "Retrieve a list of completed courses for the authenticated user",
        tags: ["Courses"],
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Successfully retrieved completed courses",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      course_id: {
                        type: "integer",
                        description: "Unique identifier for the course",
                      },
                      course_name: {
                        type: "string",
                        description: "Name of the course",
                      },
                      course_code: {
                        type: "string",
                        description: "Course code identifier",
                      },
                      description: {
                        type: "string",
                        description: "Course description",
                      },
                      duration_hours: {
                        type: "number",
                        description: "Duration of the course in hours",
                      },
                      price: {
                        type: "number",
                        description: "Price of the course",
                      },
                      category_id: {
                        type: "integer",
                        description: "Category identifier for the course",
                      },
                      level: {
                        type: "string",
                        description: "Difficulty level of the course",
                      },
                      created_at: {
                        type: "string",
                        format: "date-time",
                        description: "Course creation timestamp",
                      },
                      updated_at: {
                        type: "string",
                        format: "date-time",
                        description: "Course last update timestamp",
                      },
                      status: {
                        type: "string",
                        description: "Current status of the course",
                      },
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized - User not authenticated",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Unauthorized",
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Internal Server Error",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/creatingcorpmaster": {
      post: {
        summary: "Create a new corporate Master",
        description: "Creates a corporate entity",
        tags: ["Corporate User Management"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  corporate_name: {
                    type: "string",
                    description: "Corporate entity's name",
                  },
                  registration_number: {
                    type: "string",
                    description: "Corporate entity's registration number",
                  },
                  industry: {
                    type: "string",
                    description: "Corporate entity's industry",
                  },
                  headquarters_address: {
                    type: "string",
                    description: "Corporate entity's headquarters address",
                  },
                  contact_email: {
                    type: "string",
                    format: "email",
                    description: "Corporate entity's contact email",
                  },
                  contact_phone: {
                    type: "string",
                    description: "Corporate entity's contact phone number",
                  },
                  established_date: {
                    type: "string",
                    format: "date",
                    description: "Corporate entity's date of establishment",
                  },
                  tax_id: {
                    type: "string",
                    description: "Corporate entity's tax identification number",
                  },
                  website_url: {
                    type: "string",
                    format: "uri",
                    description: "Corporate entity's website URL",
                  },
                },
                required: [
                  "corporate_name",
                  "registration_number",
                  "industry",
                  "headquarters_address",
                  "contact_email",
                  "contact_phone",
                  "established_date",
                  "tax_id",
                  "website_url",
                ],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Corporate user successfully created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    corporate_id: {
                      type: "integer",
                      description:
                        "The ID of the newly created corporate entity",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Bad Request - Missing or invalid fields",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "All fields are required",
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized - User not authenticated",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string", example: "Unauthorized" },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Error occurred during corporate user creation",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/creatingcorpuser": {
        post: {
          summary: "Create a new corporate user",
          description: "Creates a new corporate user and associates it with a corporate entity",
          tags: ["Corporate User Management"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    corp_id_id: { type: "integer", description: "The corporate entity ID to associate the user with" },
                    dept_id: { type: "integer", description: "The department ID the user belongs to" },
                    username: { type: "string", description: "The unique username for the corporate user" },
                    name: { type: "string", description: "Full name of the corporate user" },
                    email: { type: "string", format: "email", description: "Corporate user's email address" },
                    password: { type: "string", description: "Corporate user's password" },
                  },
                  required: ["corp_id_id", "dept_id", "username", "name", "email", "password"],
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Corporate user successfully created",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: { type: "integer", description: "ID of the newly created corporate user" },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Bad Request - Missing or invalid fields",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: { type: "string", example: "All fields are required" },
                    },
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized - User not authenticated",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: { type: "string", example: "Unauthorized" },
                    },
                  },
                },
              },
            },
            "500": {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: { type: "string", example: "Error occurred during corporate user creation" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/creatingcorpuser(GET)": {
        get: {
          summary: "Get list of corporate entities",
          description: "Fetches all corporate entities in the system",
          tags: ["Corporate User Management"],
          responses: {
            "200": {
              description: "List of corporate entities",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        corporate_id: { type: "integer", description: "ID of the corporate entity" },
                        corporate_name: { type: "string", description: "Name of the corporate entity" },
                      },
                    },
                  },
                },
              },
            },
            "500": {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: { type: "string", example: "Error fetching corporates" },
                    },
                  },
                },
              },
            },
          },
        },
      },

      "/creatingcorpuser/departments/{corporateId}": {
        get: {
          summary: "Get departments for a corporate entity",
          description: "Fetches the list of departments belonging to a specific corporate entity",
          tags: ["Corporate Management"],
          parameters: [
            {
              name: "corporateId",
              in: "path",
              required: true,
              description: "ID of the corporate entity to fetch the departments for",
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            "200": {
              description: "List of departments for the corporate entity",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        department_id: { type: "integer", description: "ID of the department" },
                        department_name: { type: "string", description: "Name of the department" },
                      },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Bad Request - Invalid corporate ID",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: { type: "string", example: "Invalid corporate ID" },
                    },
                  },
                },
              },
            },
            "404": {
              description: "Not Found - No departments found for the specified corporate ID",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: { type: "string", example: "No departments found for the specified corporate ID" },
                    },
                  },
                },
              },
            },
            "500": {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: { type: "string", example: "Error fetching departments" },
                    },
                  },
                },
              },
            },
          },
        },
      },

      "/fetchingdepartmentname": {
        get: {
          summary: "Get all departments",
          description: "Fetches the list of all departments, ordered by department name",
          tags: ["Department Management"],
          responses: {
            "200": {
              description: "List of all departments",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "integer", description: "ID of the department" },
                        name: { type: "string", description: "Name of the department" },
                      },
                    },
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized - No valid session or user found",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Unauthorized" },
                    },
                  },
                },
              },
            },
            "500": {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: { type: "string", example: "Error fetching departments" },
                    },
                  },
                },
              },
            },
          },
        },
      },

      "/forgot-password": {
      post: {
        summary: "Request a password reset",
        description: "Allows a user to request a password reset by providing their email address. A reset link is sent to their email.",
        tags: ["Authentication"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                    description: "The email address of the user who is requesting a password reset",
                  },
                },
                required: ["email"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Password reset link sent successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Password reset link sent." },
                  },
                },
              },
            },
          },
          "400": {
            description: "Bad Request - Missing email",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string", example: "Email is required." },
                  },
                },
              },
            },
          },
          "404": {
            description: "User not found - No user associated with the provided email",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string", example: "User not found." },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal Server Error - Issue sending reset link",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string", example: "Failed to send reset link." },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/interestedcourses": {
        get: {
          summary: "Fetch enrolled or in-progress courses for a user",
          description: "Retrieves the list of courses that the user is currently enrolled in or marked as 'In Progress'. The user must be authenticated to access this route.",
          tags: ["Courses"],
          responses: {
            "200": {
              description: "Successfully retrieved the list of courses",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        course_id: { type: "integer" },
                        course_name: { type: "string" },
                        description: { type: "string" },
                        duration_hours: { type: "integer" },
                        level: { type: "string" },
                        status: { type: "string", enum: ["In Progress", "Enrolled"] },
                      },
                    },
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized - User must be authenticated",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Unauthorized" },
                    },
                  },
                },
              },
            },
            "500": {
              description: "Internal Server Error - An error occurred while fetching the courses",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Internal Server Error" },
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },

      "/job-descriptions": {
      post: {
        summary: "Upload a new job description",
        description: "Uploads a job description along with associated skills. The user must be authenticated.",
        tags: ["Job Descriptions"],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  jobTitle: { type: "string", example: "Software Engineer" },
                  jobDescription: { type: "string", example: "Responsible for building and maintaining software systems." },
                  salaryRange: { type: "string", example: "$80,000 - $100,000" },
                  skills: { type: "string", example: "JavaScript, Node.js, React" },
                  departmentId: { type: "integer", example: 1 },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successfully uploaded job description",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Job description uploaded successfully" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Invalid data",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Invalid data" },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Unauthorized" },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Internal Server Error" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/job-descriptions(GET)": {
      get: {
        summary: "Fetch job descriptions for the authenticated user",
        description: "Fetches a list of job descriptions that are open and associated with the authenticated user.",
        tags: ["Job Descriptions"],
        responses: {
          "200": {
            description: "Successfully retrieved the job descriptions",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      job_id: { type: "integer" },
                      job_title: { type: "string" },
                      job_description: { type: "string" },
                      salary_range: { type: "string" },
                      department_name: { type: "string" },
                      skills: { type: "array", items: { type: "string" } },
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Unauthorized" },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Internal Server Error" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/job-descriptions(PATCH)": {
      patch: {
        summary: "Update job status to 'Closed'",
        description: "Updates the status of the job description to 'Closed'. Only the creator of the job description can perform this operation.",
        tags: ["Job Descriptions"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  jobId: { type: "integer", example: 123 },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successfully updated job status to 'Closed'",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Job description deactivated successfully" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Bad Request - Job ID is required",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Job ID is required" },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Unauthorized" },
                  },
                },
              },
            },
          },
          "404": {
            description: "Job description not found or not authorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Job description not found or not authorized" },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal Server Error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Internal Server Error" },
                  },
                },
              },
            },
          },
        },
      },
    },

    "/reset-password": {
        post: {
          summary: "Reset user password",
          description: "Resets the user password if the provided reset token is valid and not expired.",
          tags: ["Password Reset"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string", example: "a1b2c3d4e5f67890abcdef1234567890abcdef1234567890" },
                    email: { type: "string", example: "user@example.com" },
                    password: { type: "string", example: "NewPassword123!" },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Password reset successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Password reset successful." },
                    },
                  },
                },
              },
            },
            "400": {
              description: "Invalid or expired token",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: { type: "string", example: "Invalid or expired token." },
                    },
                  },
                },
              },
            },
            "404": {
              description: "User not found",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: { type: "string", example: "User not found." },
                    },
                  },
                },
              },
            },
            "500": {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: { type: "string", example: "Failed to reset password." },
                    },
                  },
                },
              },
            },
          },
        },
      },

     
        "/resumeupload": {
          post: {
            summary: "Upload a new resume and mark it as active",
            description: "Uploads a resume and sets it as the active resume for the authenticated user. Marks all previous resumes as inactive.",
            tags: ["Resumes"],
            requestBody: {
              required: true,
              content: {
                "multipart/form-data": {
                  schema: {
                    type: "object",
                    properties: {
                      resumeFile: { type: "string", format: "binary" },
                      resumeTitle: { type: "string", example: "Software Engineer Resume" },
                    },
                  },
                },
              },
            },
            responses: {
              "200": {
                description: "Resume uploaded and marked as active successfully",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: { type: "string", example: "Resume uploaded and marked as active successfully" },
                      },
                    },
                  },
                },
              },
              "400": {
                description: "Invalid data",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: { type: "string", example: "Invalid data" },
                      },
                    },
                  },
                },
              },
              "401": {
                description: "Unauthorized",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: { type: "string", example: "Unauthorized" },
                      },
                    },
                  },
                },
              },
              "500": {
                description: "Internal Server Error",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: { type: "string", example: "Internal Server Error" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "/resumeupload(GET)": {
          get: {
            summary: "Retrieve the active resume of the authenticated user",
            description: "Fetches the active resume for the authenticated user, if available.",
            tags: ["Resumes"],
            responses: {
              "200": {
                description: "Successfully retrieved the active resume",
                content: {
                  "application/pdf": {},
                },
              },
              "404": {
                description: "No active resume found",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: { type: "string", example: "No active resume found" },
                      },
                    },
                  },
                },
              },
              "401": {
                description: "Unauthorized",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: { type: "string", example: "Unauthorized" },
                      },
                    },
                  },
                },
              },
              "500": {
                description: "Internal Server Error",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: { type: "string", example: "Internal Server Error" },
                      },
                    },
                  },
                },
              },
            },
          },
        },

        "/workshops": {
            post: {
              summary: "Create a new workshop",
              description: "Creates a new workshop entry in the system with the provided details.",
              tags: ["Workshops"],
              requestBody: {
                required: true,
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        workshop_name: { type: "string", example: "Advanced JavaScript Workshop" },
                        topic: { type: "string", example: "JavaScript" },
                        duration: { type: "integer", example: 3 },
                        cost: { type: "integer", example: 100 },
                        start_date: { type: "string", format: "date", example: "2024-12-01" },
                        schedule: { type: "string", example: "Weekdays" },
                        is_weekend_only: { type: "boolean", example: false },
                        what_you_will_learn: { type: "array", items: { type: "string" }, example: ["ES6", "Asynchronous JavaScript"] },
                        why_attend: { type: "array", items: { type: "string" }, example: ["Enhance skills", "Advance career"] },
                        about_workshop: { type: "string", example: "This workshop focuses on advanced JavaScript concepts..." },
                        who_should_attend: { type: "array", items: { type: "string" }, example: ["Developers", "Software Engineers"] },
                        prerequisites: { type: "array", items: { type: "string" }, example: ["Basic knowledge of JavaScript"] },
                        main_heading: { type: "string", example: "Advanced JavaScript" },
                      },
                    },
                  },
                },
              },
              responses: {
                "201": {
                  description: "Workshop created successfully",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          workshop_id: { type: "integer", example: 1 },
                        },
                      },
                    },
                  },
                },
                "400": {
                  description: "Invalid data",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          message: { type: "string", example: "Invalid data" },
                        },
                      },
                    },
                  },
                },
                "401": {
                  description: "Unauthorized",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          message: { type: "string", example: "Unauthorized" },
                        },
                      },
                    },
                  },
                },
                "500": {
                  description: "Internal Server Error",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          message: { type: "string", example: "Internal Server Error" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "/workshops(GET)": {
            get: {
              summary: "Get all workshops",
              description: "Fetches all workshops in the system, ordered by creation date.",
              tags: ["Workshops"],
              responses: {
                "200": {
                  description: "Successfully retrieved workshops",
                  content: {
                    "application/json": {
                      schema: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "integer", example: 1 },
                            name: { type: "string", example: "Advanced JavaScript Workshop" },
                            topic: { type: "string", example: "JavaScript" },
                            duration: { type: "integer", example: 3 },
                            cost: { type: "integer", example: 100 },
                            startingOn: { type: "string", format: "date", example: "2024-12-01" },
                            timing: { type: "string", example: "Weekdays" },
                            what_you_will_learn: { type: "array", items: { type: "string" }, example: ["ES6", "Asynchronous JavaScript"] },
                            why_attend: { type: "array", items: { type: "string" }, example: ["Enhance skills", "Advance career"] },
                            about_workshop: { type: "string", example: "This workshop focuses on advanced JavaScript concepts..." },
                            who_should_attend: { type: "array", items: { type: "string" }, example: ["Developers", "Software Engineers"] },
                            prerequisites: { type: "array", items: { type: "string" }, example: ["Basic knowledge of JavaScript"] },
                            main_heading: { type: "string", example: "Advanced JavaScript" },
                          },
                        },
                      },
                    },
                  },
                },
                "500": {
                  description: "Internal Server Error",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          message: { type: "string", example: "Internal Server Error" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },


  },
};

export default swaggerDefinition;
