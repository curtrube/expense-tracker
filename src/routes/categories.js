'use strict';

import { Router } from 'express';
import pg from 'pg';

export const categories = Router();


categories.get("/categories", async (req, res) => {
    const client = new pg.Client({
        database: "expense_tracker"
    });
    try {
        await client.connect();
        console.log('pg client connected')
        const query = 'SELECT * FROM categories;'
        const result = await client.query(query)
        if (result.rowCount !== 0) {
            res.status(200).json({ "categories": result.rows })
        } else {
            res.json({ "categories": [] })
        }
    } catch (error) {
        console.error('Error querying categories:', error)
    } finally {
        await client.end();
        console.log('pg client disconnected')
    }
});

categories.get("/categories/:id", async (req, res) => {
    const client = new pg.Client({
        database: "expense_tracker"
    });
    try {
        await client.connect();
        console.log('pg client connected')
        const categoryId = req.params.id;
        const query = `SELECT * FROM categories WHERE category_id = ${categoryId};`;
        const result = await client.query(query)
        if (result.rowCount !== 0) {
            res.status(200).json({ "categories": result.rows })
        } else {
            res.json({ "categories": [] })
        }
    } catch (error) {
        console.error('Error querying categories by id:', error)
    } finally {
        await client.end();
        console.log('pg client disconnected')
    }
});

categories.post("/categories", async (req, res) => {
    const client = new pg.Client({
        database: "expense_tracker"
    });
    try {
        await client.connect();
        console.log('pg client connected')
        // TODO: input needs to be sanitized
        // TODO: should we allow duplicate names? probably not
        const categoryName = req.body.name;
        console.log(categoryName)
        const query = `INSERT INTO categories(name) VALUES('${categoryName}') RETURNING category_id, name;`;
        console.log(`Executing Query: ${query}`)
        const result = await client.query(query)
        console.log(result)
        if (result.rowCount !== 0) {
            res.status(201).json(result.rows)
        } else {
            res.json({ "categories": [] })
        }
    } catch (error) {
        console.error('Error querying categories by id:', error)
    } finally {
        await client.end();
        console.log('pg client disconnected')
    }
});

categories.put("/categories/:id", async (req, res) => {
    const client = new pg.Client({
        database: "expense_tracker"
    });
    try {
        await client.connect();
        console.log('pg client connected');
        const categoryId = req.params.id;
        const categoryName = req.body.name;
        const query = `UPDATE categories SET name = '${categoryName}' WHERE category_id = '${categoryId}' RETURNING category_id, name;`
        const result = await client.query(query)
        if (result.rowCount !== 0) {
            res.status(201).json(result.rows)
        } else {
            res.json({ "categories": [] })
        }
    }
    catch (error) {
        console.errror("Error updating category id:", error)
    }
    finally {
        await client.end();
        console.log('pg client disconnected')
    }
});

categories.delete("/categories/:id", async (req, res) => {
    const client = new pg.Client({
        database: "expense_tracker"
    });
    try {
        await client.connect();
        console.log('pg client connected')
        const categoryId = req.params.id;
        const query = `DELETE FROM categories WHERE category_id = '${categoryId}' RETURNING category_id, name;`
        const result = await client.query(query)
        if (result.rowCount !== 0) {
            res.status(200).json(result.rows)
        } else {
            res.json({ "categories": [] })
        }
    }
    catch (error) {
        console.errror("Error updating category id:", error)
    }
    finally {
        await client.end();
        console.log('pg client disconnected')
    }
})