document.addEventListener("DOMContentLoaded", () => {
  loadRanking();
  setInterval(loadRanking, 10000);
});

async function loadRanking() {
  const res = await api("getRanking");

  if (!res.success) {
    alert("โหลด Ranking ไม่สำเร็จ: " + res.message);
    return;
  }

  renderRanking(res.data || []);
}

function renderRanking(data) {
  data.sort((a, b) => Number(b.totalWeight) - Number(a.totalWeight));

  renderTop("top1", data[0], 1);
  renderTop("top2", data[1], 2);
  renderTop("top3", data[2], 3);

  const tbody = document.getElementById("rankingTable");
  tbody.innerHTML = data.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${item.className}</td>
      <td>${Number(item.totalWeight).toFixed(2)} kg</td>
    </tr>
  `).join("");
}

function renderTop(id, item, rank) {
  const box = document.getElementById(id);
  if (!box) return;

  if (!item) {
    box.innerHTML = "";
    return;
  }

  box.innerHTML = `
    <div class="rank-no">${rank}</div>
    <div class="rank-room">${item.className}</div>
    <div class="rank-weight">${Number(item.totalWeight).toFixed(2)} kg</div>
  `;
}
