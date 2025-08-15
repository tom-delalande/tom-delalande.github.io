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
    this.createDots()
    this.bindEvents()
    this.updateDisplay()
  }

  createDots() {
    const dotsContainer = this.element.querySelector(".carousel-dots")
    dotsContainer.innerHTML = ""

    this.images.forEach((_, index) => {
      const dot = document.createElement("button")
      dot.className = "carousel-dot"
      dot.setAttribute("aria-label", `View image ${index + 1}`)
      dot.addEventListener("click", () => this.goToSlide(index))
      dotsContainer.appendChild(dot)
    })
  }

  bindEvents() {
    const prev = this.element.querySelector(".carousel-prev")
    const next = this.element.querySelector(".carousel-next")

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

  goToSlide(index) {
    this.currentIndex = index
    this.updateDisplay()
  }

  updateDisplay() {
    const image = this.element.querySelector(".carousel-image")
    const counter = this.element.querySelector(".carousel-counter")
    const dots = this.element.querySelectorAll(".carousel-dot")

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
  window.addEventListener("scroll", () => console.log(window.scrollY, t))
  window.addEventListener("scroll", () => window.scrollY > 300 ? t.classList.add("visible") : t.classList.remove("visible"))
  t.addEventListener("click", () => window.scrollTo({ top: 0, behavior: 'smooth' }))
}

const carousel = () => {
  const carousels = document.querySelectorAll(".carousel")
  carousels.forEach((carousel) => new Carousel(carousel))
}

document.addEventListener("DOMContentLoaded", () => {
  carousel()
  scrollToTop()
})
