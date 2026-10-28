
const API_URL = 'http://localhost:3000/api/shoes';
let shoes = []; 
let editingId = null; 

const viewList = document.getElementById('view-list');
const viewCreate = document.getElementById('view-create');
const btnShowList = document.getElementById('btn-show-list');
const btnShowCreate = document.getElementById('btn-show-create');
const cardsGrid = document.getElementById('cards-grid');

const btnCount = document.querySelector('.btn-count');
const totalSumEl = document.querySelector('.total-value');
const sortCheckbox = document.getElementById('sort-checkbox');
const createForm = document.getElementById('create-form');

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
window.removeShoe = async function(idToRemove) {
  await fetch(`${API_URL}/${idToRemove}`, { 
    method: 'DELETE' 
  });

  loadShoes();
};

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
    await fetch(`${API_URL}/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    editingId = null;
    document.querySelector('#create-form h3').innerText = 'Create card';
    document.querySelector('#create-form button[type="submit"]').innerText = 'Submit';
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
  }

  createForm.reset(); 
  btnShowList.click(); 
  loadShoes(); 
});
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

btnSearch.addEventListener('click', () => {
  const searchText = searchInput.value.trim();
  loadShoes(searchText); 
});

btnClear.addEventListener('click', () => {
  searchInput.value = ''; 
  loadShoes(); 
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
loadShoes();
