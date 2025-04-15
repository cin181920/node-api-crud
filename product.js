import { json } from 'micro';

let products = [
  { id: 1, name: "Sandal", price: 50000 },
  { id: 2, name: "Sepatu", price: 150000 },
];

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    const body = await json(req);
    products.push(body);
    res.status(201).json(body);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

  