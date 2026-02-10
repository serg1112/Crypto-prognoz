const URL = 'data.json';
const INTERVAL = 60000; // 60 сек

async function loadData() {
  try {
    const res = await fetch(URL + '?t=' + Date.now());
    const data = await res.json();
    render(data);
  } catch (e) {
    document.getElementById('content').innerText = '❌ Помилка завантаження';
  }
}

function render(data) {
  const el = document.getElementById('content');
  el.innerHTML = '';

  for (const coin in data) {
    const s = data[coin];

    el.innerHTML += `
      <div class="card">
        <h2>${coin} / USDT (${s.tf})</h2>
        <div class="type">🟡 ${s.type}</div>
        <div class="entry">Вхід: ${s.entry}</div>
        <div class="sl">SL: ${s.sl}</div>
        <div class="tp">TP: ${s.tp.join(' / ')}</div>
      </div>
    `;
  }
}

loadData();
setInterval(loadData, INTERVAL);
