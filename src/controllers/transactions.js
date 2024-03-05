'use strict';

import TransactionModel from '../models/transactionModel.js';

export const getTransactions = async (req, res) => {
  const transactionModel = new TransactionModel();
  try {
    const results = await transactionModel.findAll();
    if (results.length !== 0) {
      res.status(200).json({ transactions: results });
    } else {
      res.status(204).json({ transactions: [] });
    }
  } catch (error) {
    console.error(error);
  }
};
export const getTransaction = async (req, res) => {
  const transactionId = req.params.id;
  const transactionModel = new TransactionModel();
  try {
    const results = await transactionModel.findOne(transactionId);
    if (results.length !== 0) {
      res.status(200).json({ transactions: results });
    } else {
      res.status(204).json({ transactions: [] });
    }
  } catch (error) {
    console.error(error);
  }
};
export const createTransaction = async (req, res) => {
  const merchant = req.body.merchant;
  const amount = req.body.amount;
  const date = req.body.date;
  const accountId = req.body.accountId;
  const categoryId = req.body.categoryId;
  const transactionModel = new TransactionModel();
  try {
    const results = await transactionModel.create(
      merchant,
      amount,
      date,
      accountId,
      categoryId
    );
    if (results.length !== 0) {
      res.status(201).json({ transactions: results });
    }
  } catch (error) {
    console.error(error);
  }
};
export const updateTransaction = async (req, res) => {
  const transactionId = req.params.id;
  const merchant = req.body.merchant;
  const amount = req.body.amount;
  const date = req.body.date;
  const accountId = req.body.accountId;
  const categoryId = req.body.categoryId;
  const transactionModel = new TransactionModel();
  try {
    const results = await transactionModel.update(
      transactionId,
      merchant,
      amount,
      date,
      accountId,
      categoryId
    );
    if (results.length !== 0) {
      res.status(201).json({ transactions: results });
    } else {
      res.json({ transactions: [] });
    }
  } catch (error) {
    console.error(error);
  }
};
export const deleteTransaction = async (req, res) => {
  const transactionId = req.params.id;
  const transactionModel = new TransactionModel();
  try {
    const results = await transactionModel.delete(transactionId);
    if (results.lenght !== 0) {
      res.status(202).json({ transactions: results });
    }
  } catch (error) {
    console.error(error);
  }
};
