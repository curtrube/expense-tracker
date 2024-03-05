'use strict';

import AccountModel from '../models/accountModel.js';

export const getAccounts = async (req, res) => {
  const accountModel = new AccountModel();
  try {
    const results = await accountModel.findAll();
    if (results.length !== 0) {
      res.status(200).json({ accounts: results });
    } else {
      res.status(204).json({ accounts: [] });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAccount = async (req, res) => {
  const accountId = req.params.id;
  const accountModel = new AccountModel();
  try {
    const results = await accountModel.findOne(accountId);
    if (results.length !== 0) {
      res.status(200).json({ accounts: results });
    } else {
      res.status(204).json({ accounts: [] });
    }
  } catch (error) {
    console.error(error);
  }
};

export const createAccount = async (req, res) => {
  // TODO: input needs to be sanitized
  // TODO: should we allow duplicate names? probably not
  // TODO: is there a better way to init or get body params?
  const accountNumber = req.body.number;
  const accountName = req.body.name;
  const accountBank = req.body.bank;
  const accountModel = new AccountModel();
  try {
    const results = await accountModel.create(
      accountNumber,
      accountName,
      accountBank
    );
    if (results.length !== 0) {
      res.status(201).json({ accounts: results });
    } else {
      res.json({ accounts: [] });
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateAccount = async (req, res) => {
  // TODO: All these params are required, make some optional?
  const accountId = req.params.id;
  const accountNumber = req.body.number;
  const accountName = req.body.name;
  const accountBank = req.body.bank;
  const accountModel = new AccountModel();
  try {
    const results = await accountModel.update(
      accountId,
      accountNumber,
      accountName,
      accountBank
    );
    if (results.length !== 0) {
      res.status(201).json({ accounts: results });
    } else {
      res.json({ accounts: [] });
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteAccount = async (req, res) => {
  const accountId = req.params.id;
  const accountModel = new AccountModel();
  try {
    const results = await accountModel.delete(accountId);
    if (results.length !== 0) {
      res.status(202).json({ accounts: results });
    } else {
      res.json({ accounts: [] });
    }
  } catch (error) {
    console.error(error);
  }
};
