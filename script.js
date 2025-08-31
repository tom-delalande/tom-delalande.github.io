class Carousel {
  constructor(element) {
    this.element = element
    this.images = JSON.parse(element.dataset.images || "[]")
    this.currentIndex = 0

    if (this.images.length <= 1) {
      element.setAttribute("data-single", "true")
      return
    }

    this.init()
  }

  init() {
    this.preloadImages()
    this.createDots()
    this.bindEvents()
    this.updateDisplay()
  }

  preloadImages() {
    this.images.forEach((url, _) => {
      (new Image()).src = url;
    })
  }

  createDots() {
    const dotsContainer = this.element.querySelector(".cd")
    dotsContainer.innerHTML = ""

    this.images.forEach((_, _index) => {
      const dot = document.createElement("div")
      dot.className = "cd-dot"
      dotsContainer.appendChild(dot)
    })
  }

  bindEvents() {
    const prev = this.element.querySelector(".cp")
    const next = this.element.querySelector(".cn")

    prev && prev.addEventListener("click", () => this.goToPrevious())
    next && next.addEventListener("click", () => this.goToNext())
  }

  goToPrevious() {
    this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1
    this.updateDisplay()
  }

  goToNext() {
    this.currentIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1
    this.updateDisplay()
  }

  updateDisplay() {
    const image = this.element.querySelector(".ci")
    const counter = this.element.querySelector(".ct")
    const dots = this.element.querySelectorAll(".cd-dot")

    if (image && this.images[this.currentIndex]) {
      image.src = this.images[this.currentIndex]
      image.alt = `${image.alt.split(" - ")[0]} - ${this.currentIndex + 1}`
    }

    if (counter) {
      counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`
    }

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex)
    })
  }
}

const scrollToTop = () => {
  const t = document.getElementById("top")
  window.addEventListener("scroll", () => window.scrollY > 300 ? t.classList.add("visible") : t.classList.remove("visible"))
  t.addEventListener("click", () => window.scrollTo({ top: 0, behavior: 'smooth' }))
}

const carousel = () => {
  const carousels = document.querySelectorAll(".cr")
  console.log(carousels)
  carousels.forEach((carousel) => new Carousel(carousel))
}

document.addEventListener("DOMContentLoaded", () => {
  carousel()
  scrollToTop()
})
