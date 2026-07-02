document.addEventListener("DOMContentLoaded", loadSummary);

async function loadSummary() {
  const res = await api("getSummary");
  if (!res.success) return;

  const d = res.data;
  document.getElementById("totalWeight").textContent = fmt(d.totalWeight);
  document.getElementById("totalBottles").textContent = fmt(d.totalBottles);
  document.getElementById("co2Saved").textContent = fmt(d.co2Saved);
  document.getElementById("topClass").textContent = d.topClass ? d.topClass.className : "-";
}

function fmt(n) {
  return Number(n || 0).toLocaleString("th-TH", { maximumFractionDigits: 2 });
}
