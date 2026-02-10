async function loadData() {
  try {
    const res = await fetch('./data.json?t=' + Date.now());
    if (!res.ok) throw new Error('HTTP ' + res.status);

    const data = await res.json();

    document.getElementById('status').innerText =
      '✅ Оновлено: ' + new Date().toLocaleTimeString();

    let html = '';
    for (const key in data) {
      const s = data[key];
      html += `
        <div class="card">
          <h2>${key} / USDT (${s.timeframe ?? s.tf})</h2>
          <p>Сигнал: ${s.signal ?? s.bias}</p>
          <p>Вхід: ${s.entry ?? s.zone}</p>
          <p>TP: ${(s.tp ?? s.take_profit ?? []).join(' / ')}</p>
          <p>SL: ${s.sl ?? s.stop_loss}</p>
        </div>
      `;
    }
    document.getElementById('content').innerHTML = html;

  } catch (e) {
    document.getElementById('status').innerText = '❌ Помилка завантаження';
    console.error(e);
  }
}

loadData();
setInterval(loadData, 60000);
