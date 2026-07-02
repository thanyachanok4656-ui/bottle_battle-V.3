document.addEventListener("DOMContentLoaded", loadHistory);

async function loadHistory() {
  const res = await api("getHistory");
  const tbody = document.getElementById("historyTable");

  if (!res.success) {
    tbody.innerHTML = `<tr><td colspan="4">${res.message}</td></tr>`;
    return;
  }

  tbody.innerHTML = (res.data || []).map(item => `
    <tr>
      <td>${item.timestamp || ""}</td>
      <td>${item.className || ""}</td>
      <td>${Number(item.weightKg || 0).toFixed(2)} kg</td>
      <td>${item.recorder || ""}</td>
    </tr>
  `).join("");
}
