'use strict';

import pg from 'pg';

console.log('inside controllers/accounts')

export const getAccounts = async (req, res) => {
    const client = new pg.Client({
        database: "expense_tracker"
    });
    try {
        await client.connect();
        console.log('pg client connected')
        const query = 'SELECT * FROM accounts';
        const result = await client.query(query)
        if (result.rowCount !== 0) {
            res.status(200).json({ "accounts": result.rows })
        } else {
            res.json({ "accounts": [] })
        }
    } catch (error) {
        console.error('Error querying accounts:', error)
    } finally {
        await client.end();
        console.log('pg client disconnected')
    }
};

export const getAccount = async (req, res) => {
    const client = new pg.Client({
        database: "expense_tracker"
    });
    try {
        await client.connect();
        console.log('pg client connected')
        const accountId = req.params.id;
        const query = `SELECT * FROM accounts WHERE account_id = ${accountId}`;
        const result = await client.query(query)
        if (result.rowCount !== 0) {
            res.status(200).json({ "accounts": result.rows })
        } else {
            res.json({ "accounts": [] })
        }
    } catch (error) {
        console.error('Error querying accounts by id:', error)
    } finally {
        await client.end();
        console.log('pg client disconnected')
    }
};

export const createAccount = async (req, res) => {
    const client = new pg.Client({
        database: "expense_tracker"
    });
    try {
        await client.connect();
        console.log('pg client connected')
        // TODO: input needs to be sanitized
        // TODO: should we allow duplicate names? probably not
        const accountNumber = req.body.number;
        const accountName = req.body.name;
        const accountBank = req.body.bank;
        const query = `
        INSERT INTO
        accounts(number, name, bank) 
        VALUES('${accountNumber}', '${accountName}', '${accountBank}')
        RETURNING account_id, number, name, bank
        `;
        console.log(`Executing Query: ${query}`)
        const result = await client.query(query)
        console.log(result)
        if (result.rowCount !== 0) {
            res.status(201).json(result.rows)
        } else {
            res.json({ "accounts": [] })
        }
    } catch (error) {
        console.error('Error querying accounts by id:', error)
    } finally {
        await client.end();
        console.log('pg client disconnected')
    }
};

export const updateAccount = async (req, res) => {
    const client = new pg.Client({
        database: "expense_tracker"
    });
    try {
        await client.connect();
        console.log('pg client connected');
        // TODO: All these params are required, make some optional? 
        const accountId = req.params.id;
        const accountNumber = req.body.number;
        const accountName = req.body.name;
        const accountBank = req.body.bank;
        const query = `
        UPDATE accounts 
        SET
            number = '${accountNumber}',
            name = '${accountName}',
            bank = '${accountBank}'
        WHERE account_id = '${accountId}'
        RETURNING account_id, number, name, bank
        `;
        console.log(`Executing query: ${query}`)
        const result = await client.query(query)
        if (result.rowCount !== 0) {
            res.status(201).json(result.rows)
        } else {
            res.json({ "accounts": [] })
        }
    }
    catch (error) {
        console.errror("Error updating account id:", error)
    }
    finally {
        await client.end();
        console.log('pg client disconnected')
    }
};

export const deleteAccount = async (req, res) => {
    const client = new pg.Client({
        database: "expense_tracker"
    });
    try {
        await client.connect();
        console.log('pg client connected')
        const accountId = req.params.id;
        const query = `
        DELETE FROM accounts
        WHERE account_id = '${accountId}'
        RETURNING account_id, name
        `;
        console.log(`Executing query: ${query}`)    
        const result = await client.query(query)
        if (result.rowCount !== 0) {
            res.status(200).json(result.rows)
        } else {
            res.json({ "accounts": [] })
        }
    }
    catch (error) {
        console.errror("Error updating account id:", error)
    }
    finally {
        await client.end();
        console.log('pg client disconnected')
    }
};
