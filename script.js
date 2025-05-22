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
  const inputText = document.getElementById("inputText").value.trim();
  const targetLang = document.getElementById("targetLang").value;
  const output = document.getElementById("output");

  if (!inputText) {
    output.textContent = "❗ Please enter some text to translate.";
    output.classList.add("show");
    return;
  }

  try {
    // Dummy Azure API call structure (replace values as per your actual API details)
    const response = await fetch(
      "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=" +
        targetLang,
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key":
            "BNT05m83kPAaXOdVnlIOv2orwKgInzSRcZtCgsSKeXQjnFlvG5hAJQQJ99BEACGhslBXJ3w3AAAbACOGHbUB",
          "Ocp-Apim-Subscription-Region": "centralindia",
          "Content-type": "application/json",
        },
        body: JSON.stringify([{ Text: inputText }]),
      }
    );

    const data = await response.json();
    const translated = data[0]?.translations[0]?.text || "Translation failed.";
    output.textContent = translated;
    output.classList.add("show");
  } catch (error) {
    console.error(error);
    output.textContent =
      "❌ Error while translating. Please check the API key or network.";
    output.classList.add("show");
  }
}
