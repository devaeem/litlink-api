/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         publishedYear:
 *           type: integer
 *           description: Year when the book was published

 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management API
 */

/**
 * @swagger
 * /api/book:
 *   get:
 *     summary: Returns list of all books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         required: true
 *         description: page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         required: true
 *         description: limit
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: sort
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: search
 *       - in: query
 *         name: populate
 *         schema:
 *           type: string
 *         description: populate
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: filter
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: object
 *                   properties:
 *                     rows:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "6766bfdd5097a6891567f069"
 *                           isActive:
 *                             type: boolean
 *                             example: true
 *                           kind:
 *                             type: string
 *                             example: "Book"
 *                           title:
 *                             type: string
 *                             example: "string"
 *                           author:
 *                             type: string
 *                             example: "string"
 *                           publishedYear:
 *                             type: integer
 *                             example: 70
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-12-21T13:17:17.076Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-12-21T13:17:17.076Z"
 *                           __v:
 *                             type: integer
 *                             example: 0
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     total:
 *                       type: integer
 *                       example: 1
 *                     pageCount:
 *                       type: integer
 *                       example: 1
 *                     hasNextPage:
 *                       type: boolean
 *                       example: false
 *                     hasPreviousPage:
 *                       type: boolean
 *                       example: false
 *                     previousPage:
 *                       type: integer
 *                       example: 0
 *                     nextPage:
 *                       type: integer
 *                       example: 2
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */

/**
 * @swagger
 * /api/book/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */
