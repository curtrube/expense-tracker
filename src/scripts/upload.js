const url = 'http://localhost:3000/transactions';

const transaction = {
  date: new Date('2024-03-08'),
  merchant: 'amazon',
  amount: 29.99,
  categoryId: 42,
  accountId: 12,
};

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

postData(url, transaction).then((data) => console.log(data));
