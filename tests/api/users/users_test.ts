// /// <reference types="codeceptjs" />

// Feature("User Management API");

// const userData = {
//   name: "John Doe",
//   email: "john.doe@example.com",
//   password: "password123"
// };

// let userId: string;

// Before(async ({ I }) => {
//   // Login and get auth token
//   const response = await I.sendPostRequest("/api/auth/login", {
//     email: "admin@example.com",
//     password: "admin123"
//   });
//   I.assertEqual(response.status, 200);
//   I.assertContain(response.data, { token: response.data.token });
//   I.haveRequestHeaders({ Authorization: `Bearer ${response.data.token}` });
// });

// Scenario("Create new user @api @smoke", async ({ I }) => {
//   const response = await I.sendPostRequest("/api/users", userData);

//   I.assertEqual(response.status, 201);
//   I.assertContain(response.data, {
//     name: userData.name,
//     email: userData.email
//   });
//   I.assertJsonSchema(response.data, {
//     type: "object",
//     required: ["id", "name", "email", "createdAt"],
//     properties: {
//       id: { type: "string" },
//       name: { type: "string" },
//       email: { type: "string" },
//       createdAt: { type: "string" }
//     }
//   });
//   userId = response.data.id;
// }).tag("@users");

// Scenario("Get user details @api", async ({ I }) => {
//   const response = await I.sendGetRequest(`/api/users/${userId}`);

//   I.assertEqual(response.status, 200);
//   I.assertContain(response.data, {
//     name: userData.name,
//     email: userData.email
//   });
// }).tag("@users");

// Scenario("Update user @api", async ({ I }) => {
//   const updateData = {
//     name: "John Doe Updated",
//     phone: "+1234567890"
//   };

//   const response = await I.sendPutRequest(`/api/users/${userId}`, updateData);

//   I.assertEqual(response.status, 200);
//   I.assertContain(response.data, updateData);
// }).tag("@users");

// Scenario("Delete user @api", async ({ I }) => {
//   const deleteResponse = await I.sendDeleteRequest(`/api/users/${userId}`);
//   I.assertEqual(deleteResponse.status, 204);

//   // Verify user is deleted
//   const getResponse = await I.sendGetRequest(`/api/users/${userId}`);
//   I.assertEqual(getResponse.status, 404);
// }).tag("@users");

// Scenario("List users with pagination @api", async ({ I }) => {
//   const response = await I.sendGetRequest("/api/users?page=1&limit=10");

//   I.assertEqual(response.status, 200);
//   I.assertJsonSchema(response.data, {
//     type: "object",
//     required: ["items", "total", "page", "limit"],
//     properties: {
//       items: {
//         type: "array",
//         items: {
//           type: "object",
//           required: ["id", "name", "email"],
//           properties: {
//             id: { type: "string" },
//             name: { type: "string" },
//             email: { type: "string" }
//           }
//         }
//       },
//       total: { type: "number" },
//       page: { type: "number" },
//       limit: { type: "number" }
//     }
//   });
//   I.assertToBeAn(
//     response.data.items.length,
//     10,
//     "Items per page should not exceed limit"
//   );
// }).tag("@users");

// Scenario("Search users @api", async ({ I }) => {
//   const response = await I.sendGetRequest(
//     "/api/users?search=john&sortBy=name&order=asc"
//   );

//   I.assertEqual(response.status, 200);
//   I.assertTrue(
//     response.data.items.every((user: { name: string }) =>
//       user.name.toLowerCase().includes("john")
//     ),
//     'All users should contain "john" in their name'
//   );
// }).tag("@users");
