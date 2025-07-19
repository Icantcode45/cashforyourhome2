document.addEventListener("DOMContentLoaded", function () {
  const clients = document.getElementById("clients");
  const services = document.getElementById("services");

  clients.addEventListener("click", function (e) {
    e.preventDefault();
    clients.classList.toggle("active");
    if (!clients.classList.contains("active")) {
      document.querySelectorAll(".parent").forEach(el => {
        if (el !== clients) el.classList.remove("invisible");
      });
    } else {
      document.querySelectorAll(".parent").forEach(el => {
        if (el !== clients) el.classList.add("invisible");
      });
    }
  });

  services.addEventListener("click", function (e) {
    e.preventDefault();
    services.classList.toggle("active");
    if (!services.classList.contains("active")) {
      document.querySelectorAll(".parent").forEach(el => {
        if (el !== services) el.classList.remove("invisible");
      });
    } else {
      document.querySelectorAll(".parent").forEach(el => {
        if (el !== services) el.classList.add("invisible");
      });
    }
  });
});
