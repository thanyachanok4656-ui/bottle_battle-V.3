document.addEventListener("DOMContentLoaded", async () => {
  await loadClassrooms();

  document.getElementById("submitForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      className: document.getElementById("className").value,
      weightKg: document.getElementById("weightKg").value,
      recorder: document.getElementById("recorder").value
    };

    const res = await api("saveCollection", payload);
    const msg = document.getElementById("formMsg");

    if (res.success) {
      msg.textContent = "✅ บันทึกสำเร็จ";
      e.target.reset();
    } else {
      msg.textContent = "❌ " + res.message;
    }
  });
});

async function loadClassrooms() {
  const res = await api("getClassrooms");
  const select = document.getElementById("className");

  select.innerHTML = (res.data || []).map(r =>
    `<option value="${r.className}">${r.className}</option>`
  ).join("");
}
