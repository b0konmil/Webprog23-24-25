const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
app.use(bodyParser.json());

const users = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    class: 'A',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    class: 'B',
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@example.com',
    class: 'C',
  },
];

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'Felhasználókezelő API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./index.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - class
 *       properties:
 *         id:
 *           type: string
 *           description: Id
 *         firstName:
 *           type: string
 *           description: Keresztnév
 *         lastName:
 *           type: string
 *           description: Vezetéknév
 *         email:
 *           type: string
 *           description: Email cím
 *         class:
 *           type: string
 *           description: Osztály
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Összes felhasználó lekérése
 *     responses:
 *       200:
 *         description: Felhasználók sikeresen lekérve
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
app.get('/users', (req, res) => res.json(users));

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Új felhasználó hozzáadása
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Új felhasználó sikeresen hozzáadva
 */
app.post('/users', (req, res) => {
  const newUser = { id: Date.now().toString(), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Egy adott felhasználó lekérése
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Felhasználó azonosítója
 *     responses:
 *       200:
 *         description: Felhasználó sikeresen lekérve
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Felhasználó nem található
 */
app.get('/users/:id', (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Felhasználó adatainak módosítása
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Felhasználó azonosítója
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Felhasználó sikeresen módosítva
 *       404:
 *         description: Felhasználó nem található
 */
app.put('/users/:id', (req, res) => {
  const userIndex = users.findIndex((u) => u.id === req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users[userIndex] = { ...users[userIndex], ...req.body };
  res.json(users[userIndex]);
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Felhasználó törlése
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Felhasználó azonosítója
 *     responses:
 *       200:
 *         description: Felhasználó sikeresen törölve
 *       404:
 *         description: Felhasználó nem található
 */
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex((u) => u.id === req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(userIndex, 1);
  res.json({ message: 'User deleted' });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000/docs'));
