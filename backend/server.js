const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Початковий список інструментів у постаматі
const tools = [
  {
    id: "tool_1",
    boxId: "02",
    title: "Перфоратор Bosch GBH 2-28 F",
    category: "Перфоратори",
    dayPrice: 280,
    depositPrice: 3000,
    specs: "880 Вт / 3.2 Дж / SDS-Plus",
    imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80",
    available: true
  },
  {
    id: "tool_2",
    boxId: "05",
    title: "Лазерний рівень 3D Huepar 903CG",
    category: "Вимірювальні",
    dayPrice: 320,
    depositPrice: 3500,
    specs: "12 ліній 360° / Зелений промінь",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    available: true
  },
  {
    id: "tool_3",
    boxId: "03",
    title: "Мийка високого тиску Kärcher K5",
    category: "Клінінг",
    dayPrice: 450,
    depositPrice: 5000,
    specs: "145 бар / 500 л/год / Водяне охолодження",
    imageUrl: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80",
    available: true
  },
  {
    id: "tool_4",
    boxId: "08",
    title: "Болгарка DeWalt DWE4257",
    category: "Шліфувальні",
    dayPrice: 220,
    depositPrice: 2500,
    specs: "1500 Вт / 125 мм / Регулювання обертів",
    imageUrl: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=600&q=80",
    available: true
  },
  {
    id: "tool_5",
    boxId: "01",
    title: "Акумуляторний шуруповерт Makita DDF485",
    category: "Шуруповерти",
    dayPrice: 200,
    depositPrice: 2800,
    specs: "18 В / 50 Нм / Безщітковий",
    imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80",
    available: true
  },
  {
    id: "tool_6",
    boxId: "06",
    title: "Будівельний пилосос Kärcher WD 3",
    category: "Клінінг",
    dayPrice: 260,
    depositPrice: 3200,
    specs: "1000 Вт / Бак 17 л / Сухе і вологе",
    imageUrl: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80",
    available: true
  }
];

// GET /api/tools (з підтримкою фільтрації за категорією)
app.get('/api/tools', (req, res) => {
  const { category } = req.query;
  // Штучна затримка 600мс, щоб викладач чітко бачив роботу Loader (спінера)
  setTimeout(() => {
    if (category && category !== 'all') {
      return res.json(tools.filter(t => t.category === category));
    }
    res.json(tools);
  }, 600);
});

// GET /api/tools/:id
app.get('/api/tools/:id', (req, res) => {
  const item = tools.find(t => t.id === req.params.id);
  if (!item) return res.status(404).json({ message: "Не знайдено" });
  res.json(item);
});

app.listen(5000, () => {
  console.log('REST API запущено на http://localhost:5000');
});