const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
document.querySelectorAll(".nav-links a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();

// Make the entire service card a link while preserving its existing links.
document.querySelectorAll(".service-card").forEach(card => {
  const destination = card.querySelector("h3 a, .card-link")?.getAttribute("href");
  if (!destination) return;
  card.setAttribute("role", "link");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `Explore ${card.querySelector("h3")?.textContent.trim() || "service"}`);
  card.addEventListener("click", event => {
    if (event.target.closest("a, button")) return;
    window.location.href = destination;
  });
  card.addEventListener("keydown", event => {
    if (event.target !== card) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      window.location.href = destination;
    }
  });
});

document.getElementById("contactForm")?.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Website enquiry: ${data.get("service")}`);
  const body = encodeURIComponent(
`Name: ${data.get("name")}
Email: ${data.get("email")}
Company: ${data.get("company") || "Not provided"}
Service: ${data.get("service")}

Project details:
${data.get("message")}`
  );
  window.location.href = `mailto:qystraltechnologies@gmail.com?subject=${subject}&body=${body}`;
});
