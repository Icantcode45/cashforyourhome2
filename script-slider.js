function lerp({ x, y }, { x: targetX, y: targetY }) {
  const amt = 0.1;
  return {
    x: x + (targetX - x) * amt,
    y: y + (targetY - y) * amt
  };
}

class Slider {
  constructor(el) {
    this.el = el;
    this.contentEl = el.querySelector("#slider-content");
    this.imagesEl = el.querySelector(".slider__images");
    this.textEl = el.querySelector(".slider__text");
    this.dots = el.querySelectorAll(".slider__nav-dot");

    this.totalSlides = this.imagesEl.children.length;
    this.current = 0;
    this.target = 0;

    this.onNavClick = this.onNavClick.bind(this);
    this.animate = this.animate.bind(this);
    this.onArrowClick = this.onArrowClick.bind(this);

    el.querySelector("#left").addEventListener("click", () => this.onArrowClick(-1));
    el.querySelector("#right").addEventListener("click", () => this.onArrowClick(1));

    this.dots.forEach(dot => {
      dot.addEventListener("click", this.onNavClick);
    });

    this.state = {
      x: 0,
      y: 0,
      tx: 0,
      ty: 0
    };

    this.contentEl.addEventListener("mousemove", e => {
      const rect = this.contentEl.getBoundingClientRect();
      this.state.tx = (e.clientX - rect.left) / rect.width;
      this.state.ty = (e.clientY - rect.top) / rect.height;
    });

    requestAnimationFrame(this.animate);
  }

  onArrowClick(direction) {
    this.target = (this.current + direction + this.totalSlides) % this.totalSlides;
    this.update();
  }

  onNavClick(e) {
    const id = parseInt(e.target.dataset.id, 10) - 1;
    this.target = id;
    this.update();
  }

  update() {
    this.imagesEl.querySelectorAll(".slider__images-item").forEach((img, i) => {
      img.classList.toggle("slider__images-item--active", i === this.target);
    });

    this.textEl.querySelectorAll(".slider__text-item").forEach((txt, i) => {
      txt.classList.toggle("slider__text-item--active", i === this.target);
    });

    this.dots.forEach((dot, i) => {
      dot.classList.toggle("slider__nav-dot--active", i === this.target);
    });

    this.current = this.target;
  }

  animate() {
    this.state = lerp(this.state, { x: this.state.tx, y: this.state.ty });
    const transformX = (this.state.x - 0.5) * 20;
    const transformY = (this.state.y - 0.5) * 20;
    this.imagesEl.style.transform = `rotateY(${transformX}deg) rotateX(${-transformY}deg)`;

    requestAnimationFrame(this.animate);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "https://picsum.photos/id/1015/800/600",
    "https://picsum.photos/id/1016/800/600",
    "https://picsum.photos/id/1018/800/600",
    "https://picsum.photos/id/1020/800/600",
    "https://picsum.photos/id/1024/800/600"
  ];

  const text = {
    "Calm Waters": "Feel the stillness of serene lakes and rivers.",
    "Waves of Energy": "Ride the energetic flow of ocean waves.",
    "Gentle Forests": "Breathe deeply in lush green spaces.",
    "Majestic Skies": "Watch clouds drift over endless horizons.",
    "Twilight Glow": "Unwind with golden sunsets and quiet evenings."
  };

  const sliderEl = document.getElementById("slider");
  const imgContainer = sliderEl.querySelector(".slider__images");
  const textContainer = sliderEl.querySelector(".slider__text");
  const dotsContainer = document.getElementById("slider-dots");

  images.forEach((src, i) => {
    const div = document.createElement("div");
    div.className = `slider__images-item${i === 0 ? " slider__images-item--active" : ""}`;
    div.dataset.id = i + 1;
    const img = document.createElement("img");
    img.src = src;
    div.appendChild(img);
    imgContainer.appendChild(div);
  });

  let idx = 0;
  for (const [key, val] of Object.entries(text)) {
    idx++;
    const div = document.createElement("div");
    div.className = `slider__text-item${idx === 1 ? " slider__text-item--active" : ""}`;
    div.dataset.id = idx;
    div.innerHTML = `<div class="slider__text-item-head"><h3>${key}</h3></div><div class="slider__text-item-info"><p>${val}</p></div>`;
    textContainer.appendChild(div);
  }

  images.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = `slider__nav-dot${i === 0 ? " slider__nav-dot--active" : ""}`;
    dot.dataset.id = i + 1;
    dotsContainer.appendChild(dot);
  });

  new Slider(sliderEl);
});
