import { readFile, writeFile } from 'node:fs/promises';

const filename = '2024-07-01_2024-07-29_transactions.csv';

function removeExtraWhitespace(text) {
  return text.replace(/\s+/g, ' ');
}

function removeDoubleQuotes(str) {
  return str.replace(/"/g, '');
}

function removeFirstChar(text) {
  return text.replace(/^./, '');
}

function isNegative(number) {
  return number < 0;
}

async function readFileAsync(filename) {
  try {
    const data = await readFile(filename, { encoding: 'utf-8' });
    return data;
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

async function writeFileAsync(data, filePath) {
  try {
    await writeFile(filePath, data);
    console.log('File has been written successfully');
  } catch (err) {
    console.error('Error writing file:', err);
  }
}

const transformed = [];
const data = await readFileAsync(filename);
const rows = data.split('\n');
for (const row of rows) {
  const split = row.split(',');
  let date = new Date(split[0]).toISOString().slice(0, 10);
  let amount = split[1];
  let merchant = removeExtraWhitespace(split[3]);
  merchant = removeDoubleQuotes(merchant);
  let type = '';
  let cardHolder = '';
  if (isNegative(amount)) {
    type = 'debit';
    amount = removeFirstChar(amount);
    if (merchant.startsWith('4141')) {
      cardHolder = 'alex';
      merchant = merchant.slice(5);
    } else if (merchant.startsWith('1443')) {
      cardHolder = 'curtis';
      merchant = merchant.slice(5);
    }
  } else {
    type = 'credit';
  }
  let transformedRow = `${date},${amount},${merchant},${type},${cardHolder}`;
  transformed.push(transformedRow);
}

const transformedData = transformed.join('\n');
await writeFileAsync(transformedData, 'transformed.csv');
