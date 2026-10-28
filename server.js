const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware (проміжні обробники)
app.use(cors()); // Дозволяє запити з інших портів (фронтенду)
app.use(express.json()); // Дозволяє серверу розуміти дані у форматі JSON

// Наша "База даних" тепер живе на сервері
let shoes = [
  { id: 1, title: 'Nike Air Max', price: 3500, sizeFrom: 36, sizeTo: 42, color: 'whi' },
  { id: 2, title: 'Dr. Martens 1460', price: 5500, sizeFrom: 39, sizeTo: 46, color: 'red' }
];

// ==========================================
// REST API МАРШРУТИ (CRUD)
// ==========================================

// 1. READ (GET) - Отримати всі кросівки АБО знайти за запитом
app.get('/api/shoes', (req, res) => {
  const searchQuery = req.query.search; 

  if (searchQuery) {
    // Якщо є параметр пошуку, фільтруємо на сервері
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredShoes = shoes.filter(shoe => 
      shoe.title.toLowerCase().includes(lowerCaseQuery)
    );
    return res.json(filteredShoes);
  }
  
  // Якщо пошукового запиту немає, віддаємо весь масив
  res.json(shoes);
});

// 2. CREATE (POST) - Додати нові кросівки
app.post('/api/shoes', (req, res) => {
  const newShoe = { id: Date.now(), ...req.body };
  shoes.push(newShoe);
  res.status(201).json(newShoe); // Повертаємо створений об'єкт
});

// 3. UPDATE (PUT) - Оновити існуючі кросівки за ID
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

// 4. DELETE (DELETE) - Видалити кросівки за ID
app.delete('/api/shoes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  shoes = shoes.filter(shoe => shoe.id !== id);
  
  res.json({ message: 'Видалено успішно' });
});

// ==========================================
// ЗАПУСК СЕРВЕРА
// ==========================================
app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});