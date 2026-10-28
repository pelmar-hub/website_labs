// 1. БАЗА ДАНИХ ТЕПЕР НА СЕРВЕРІ
const API_URL = 'http://localhost:3000/api/shoes';
let shoes = []; // Масив порожній, ми заповнимо його з сервера
let editingId = null; 

// 2. ЗНАХОДИМО ЕЛЕМЕНТИ В DOM
const viewList = document.getElementById('view-list');
const viewCreate = document.getElementById('view-create');
const btnShowList = document.getElementById('btn-show-list');
const btnShowCreate = document.getElementById('btn-show-create');
const cardsGrid = document.getElementById('cards-grid');

const btnCount = document.querySelector('.btn-count');
const totalSumEl = document.querySelector('.total-value');
const sortCheckbox = document.getElementById('sort-checkbox');
const createForm = document.getElementById('create-form');

// 3. НАВІГАЦІЯ
btnShowCreate.addEventListener('click', () => {
  viewList.classList.add('hidden');
  viewCreate.classList.remove('hidden');
  btnShowCreate.classList.add('active');
  btnShowList.classList.remove('active');
});

btnShowList.addEventListener('click', () => {
  viewList.classList.remove('hidden');
  viewCreate.classList.add('hidden');
  btnShowList.classList.add('active');
  btnShowCreate.classList.remove('active');
});

// 4. ВІДОБРАЖЕННЯ КАРТОК
function renderCards(arrayToRender) {
  cardsGrid.innerHTML = ''; 

  const cardsHTML = arrayToRender.map(shoe => {
    return `
      <div class="boots-card">
        <div class="card-img" style="font-size: 18px;">Picture</div>
        <div class="card-body">
          <h3>${shoe.title}</h3>
          <p class="desc">Колір: ${shoe.color} | Ціна: ₴${shoe.price} | Розмір: ${shoe.sizeFrom}-${shoe.sizeTo}</p>
          <div class="card-actions">
            <button class="btn-edit" onclick="editShoe(${shoe.id})">Edit</button>
            <button class="btn-remove" onclick="removeShoe(${shoe.id})">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  cardsGrid.insertAdjacentHTML('beforeend', cardsHTML);
}

// 5. ОПЕРАЦІЇ З СЕРВЕРОМ (CRUD)

// READ (GET) - Завантаження даних
// Оновлена функція завантаження з підтримкою параметрів
async function loadShoes(searchQuery = '') {
  try {
    const url = searchQuery ? `${API_URL}?search=${searchQuery}` : API_URL;
    const response = await fetch(url);
    shoes = await response.json(); 
    renderCards(shoes);
  } catch (error) {
    console.error('Помилка завантаження:', error);
  }
}
// DELETE - Видалення
window.removeShoe = async function(idToRemove) {
  await fetch(`${API_URL}/${idToRemove}`, { 
    method: 'DELETE' 
  });
  
  // Після видалення на сервері, завантажуємо оновлений список
  loadShoes();
};

// CREATE & UPDATE (POST / PUT) - Форма
createForm.addEventListener('submit', async (event) => {
  event.preventDefault(); 

  const formData = {
    title: document.getElementById('title_input').value,
    price: parseFloat(document.getElementById('price_input').value),
    sizeFrom: document.getElementById('size_from').value,
    sizeTo: document.getElementById('size_to').value,
    color: document.getElementById('color_input').value
  };

  if (editingId !== null) {
    // РЕЖИМ РЕДАГУВАННЯ (PUT запит)
    await fetch(`${API_URL}/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    editingId = null;
    document.querySelector('#create-form h3').innerText = 'Create card';
    document.querySelector('#create-form button[type="submit"]').innerText = 'Submit';
  } else {
    // РЕЖИМ СТВОРЕННЯ (POST запит)
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
  }

  createForm.reset(); 
  btnShowList.click(); 
  loadShoes(); // Оновлюємо інтерфейс новими даними з сервера
});

// 6. ІНШІ ФУНКЦІЇ (Працюють з локальною копією завантажених даних)
btnCount.addEventListener('click', () => {
  const total = shoes.reduce((sum, shoe) => sum + shoe.price, 0);
  totalSumEl.innerText = `₴${total}`;
});

sortCheckbox.addEventListener('change', (event) => {
  if (event.target.checked) {
    const sortedShoes = [...shoes].sort((a, b) => b.price - a.price);
    renderCards(sortedShoes);
  } else {
    renderCards(shoes);
  }
});

const searchInput = document.querySelector('.search-input');
const btnSearch = document.querySelector('.btn-search');
const btnClear = document.querySelector('.btn-clear');

// Оновлені обробники кнопок пошуку
btnSearch.addEventListener('click', () => {
  const searchText = searchInput.value.trim();
  loadShoes(searchText); // Відправляємо запит на сервер із текстом
});

btnClear.addEventListener('click', () => {
  searchInput.value = ''; 
  loadShoes(); // Завантажуємо весь список без параметрів
});

window.editShoe = function(id) {
  const shoeToEdit = shoes.find(shoe => shoe.id === id);
  document.getElementById('title_input').value = shoeToEdit.title;
  document.getElementById('price_input').value = shoeToEdit.price;
  document.getElementById('size_from').value = shoeToEdit.sizeFrom;
  document.getElementById('size_to').value = shoeToEdit.sizeTo;
  document.getElementById('color_input').value = shoeToEdit.color;
  
  editingId = id;
  document.querySelector('#create-form h3').innerText = 'Edit card';
  document.querySelector('#create-form button[type="submit"]').innerText = 'Save Changes';
  btnShowCreate.click();
};

// 7. СТАРТ ПРОГРАМИ
loadShoes();