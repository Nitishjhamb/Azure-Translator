// Dark mode toggle
function toggleDarkMode() {
  const html = document.documentElement;
  const isDark = html.getAttribute("data-theme") === "dark";
  html.setAttribute("data-theme", isDark ? "light" : "dark");
  document.getElementById("darkIcon").style.display = isDark ? "" : "none";
  document.getElementById("lightIcon").style.display = isDark ? "none" : "";
}

// Apply system preference for dark mode on load
window.addEventListener("DOMContentLoaded", () => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.documentElement.setAttribute("data-theme", "dark");
    document.getElementById("darkIcon").style.display = "none";
    document.getElementById("lightIcon").style.display = "";
  }
});

async function translateText() {
  const inputEl = document.getElementById("inputText");
  const inputText = inputEl.value.trim();
  const targetLang = document.getElementById("targetLang").value;
  const output = document.getElementById("output");

  if (!inputText) {
    output.textContent = "❗ Please enter some text to translate.";
    output.classList.add("show");
    return;
  }

  try {
    const response = await fetch("/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: inputText,
        to: targetLang,
      }),
    });

    const data = await response.json();
    const translated = data[0]?.translations[0]?.text || "Translation failed.";
    output.textContent = translated;
    output.classList.add("show");

    // ✅ Clear input field after successful translation
    inputEl.value = "";
  } catch (error) {
    console.error(error);
    output.textContent = "❌ Error while translating. Please try again later.";
    output.classList.add("show");
  }
}
