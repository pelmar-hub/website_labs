const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());


let shoes = [
  { id: 1, title: 'Nike Air Max', price: 3500, sizeFrom: 36, sizeTo: 42, color: 'whi' },
  { id: 2, title: 'Dr. Martens 1460', price: 5500, sizeFrom: 39, sizeTo: 46, color: 'red' }
];

app.get('/api/shoes', (req, res) => {
  const searchQuery = req.query.search; 

  if (searchQuery) {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredShoes = shoes.filter(shoe => 
      shoe.title.toLowerCase().includes(lowerCaseQuery)
    );
    return res.json(filteredShoes);
  }
  

  res.json(shoes);
});


app.post('/api/shoes', (req, res) => {
  const newShoe = { id: Date.now(), ...req.body };
  shoes.push(newShoe);
  res.status(201).json(newShoe); 
});

app.put('/api/shoes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  shoes = shoes.map(shoe => {
    if (shoe.id === id) {
      return { id, ...updatedData };
    }
    return shoe;
  });

  res.json({ message: 'Оновлено успішно' });
});


app.delete('/api/shoes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  shoes = shoes.filter(shoe => shoe.id !== id);
  
  res.json({ message: 'Видалено успішно' });
});

app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});
