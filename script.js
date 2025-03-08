document.addEventListener("DOMContentLoaded", () => {
  // Moving background with particles
  const canvas = document.getElementById("background-canvas")
  const ctx = canvas.getContext("2d")

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 2 + 0.5
      this.speedX = Math.random() * 0.5 - 0.25
      this.speedY = Math.random() * 0.5 - 0.25
      this.color = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.5 + 0.2})`
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      // Wrap around edges
      if (this.x < 0) this.x = canvas.width
      if (this.x > canvas.width) this.x = 0
      if (this.y < 0) this.y = canvas.height
      if (this.y > canvas.height) this.y = 0
    }

    draw() {
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Create particles
  const particles = []
  const particleCount = 150

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw particles
    particles.forEach((particle) => {
      particle.update()
      particle.draw()
    })

    // Connect particles with lines if they're close enough
    connectParticles()

    requestAnimationFrame(animate)
  }

  function connectParticles() {
    const maxDistance = 100

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance) {
          // Calculate opacity based on distance
          const opacity = 1 - distance / maxDistance

          ctx.strokeStyle = `rgba(100, 150, 255, ${opacity * 0.2})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
  }

  animate()

  // Cursor effect
  const cursorEffect = document.createElement("div")
  cursorEffect.classList.add("cursor-effect")
  document.body.appendChild(cursorEffect)

  document.addEventListener("mousemove", (e) => {
    cursorEffect.style.left = e.clientX + "px"
    cursorEffect.style.top = e.clientY + "px"
  })

  document.addEventListener("mousedown", () => {
    cursorEffect.style.width = "30px"
    cursorEffect.style.height = "30px"
    cursorEffect.style.backgroundColor = "rgba(236, 72, 153, 0.5)"
  })

  document.addEventListener("mouseup", () => {
    cursorEffect.style.width = "20px"
    cursorEffect.style.height = "20px"
    cursorEffect.style.backgroundColor = "rgba(59, 130, 246, 0.5)"
  })

  // Scroll animations
  const revealElements = document.querySelectorAll(".section-reveal")

  function checkReveal() {
    const windowHeight = window.innerHeight
    const revealPoint = 150

    revealElements.forEach((element) => {
      const revealTop = element.getBoundingClientRect().top

      if (revealTop < windowHeight - revealPoint) {
        element.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", checkReveal)
  checkReveal() // Check on load

  // Header scroll effect
  const header = document.querySelector("header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Animated counter
  const statNumbers = document.querySelectorAll(".stat-number")

  function animateCounter(element) {
    const target = Number.parseInt(element.textContent)
    const duration = 2000
    const step = Math.ceil(target / (duration / 16))
    let current = 0

    const timer = setInterval(() => {
      current += step

      if (current >= target) {
        element.textContent = target.toLocaleString()
        clearInterval(timer)
      } else {
        element.textContent = current.toLocaleString()
      }
    }, 16)
  }

  function checkCounters() {
    statNumbers.forEach((number) => {
      const position = number.getBoundingClientRect().top

      if (position < window.innerHeight - 100) {
        number.classList.add("active")
        if (!number.classList.contains("counted")) {
          animateCounter(number)
          number.classList.add("counted")
        }
      }
    })
  }

  window.addEventListener("scroll", checkCounters)
  checkCounters() // Check on load

  // Testimonial carousel
  const testimonials = document.querySelectorAll(".testimonial")
  let currentTestimonial = 0

  function rotateTestimonials() {
    testimonials.forEach((testimonial, index) => {
      if (index === currentTestimonial) {
        testimonial.style.opacity = "1"
        testimonial.style.transform = "translateY(0)"
      } else {
        testimonial.style.opacity = "0.5"
        testimonial.style.transform = "translateY(20px)"
      }
    })

    currentTestimonial = (currentTestimonial + 1) % testimonials.length
  }

  // Uncomment to enable automatic testimonial rotation
  // setInterval(rotateTestimonials, 5000)

  // FAQ accordion functionality
  const faqQuestions = document.querySelectorAll(".faq-question")

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling
      const isActive = answer.classList.contains("active")

      // Close all answers
      document.querySelectorAll(".faq-answer").forEach((item) => {
        item.classList.remove("active")
      })

      document.querySelectorAll(".faq-question").forEach((item) => {
        item.classList.remove("active")
      })

      // Toggle current answer
      if (!isActive) {
        answer.classList.add("active")
        question.classList.add("active")
      }
    })
  })

  // Contact form submission
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      // Here you would typically send the form data to a server
      alert("Thank you for your message! We'll get back to you soon.")
      contactForm.reset()
    })
  }

  // Form input animations
  const formInputs = document.querySelectorAll(".form-group input, .form-group textarea")

  formInputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.querySelector("label").style.color = "var(--primary)"
    })

    input.addEventListener("blur", () => {
      input.parentElement.querySelector("label").style.color = ""
    })
  })

  // Add animation classes to elements
  function addAnimationClasses() {
    const elements = [
      { selector: ".hero-content h1", classes: ["fade-in-up"] },
      { selector: ".hero-content p", classes: ["fade-in-up", "delay-1"] },
      { selector: ".hero-content .btn", classes: ["fade-in-up", "delay-2"] },
      { selector: ".hero-image", classes: ["fade-in-right", "delay-2"] },
      { selector: ".brand-content h2", classes: ["fade-in-up"] },
      { selector: ".brand-content p", classes: ["fade-in-up", "delay-1"] },
      { selector: ".brand-icon", classes: ["zoom-in"], multiple: true },
      { selector: ".feature-card", classes: ["fade-in-up"], multiple: true },
      { selector: ".project-card", classes: ["fade-in-up"], multiple: true },
      { selector: ".testimonial", classes: ["fade-in-up"], multiple: true },
      { selector: ".cta-box", classes: ["zoom-in"] },
      { selector: ".calendly-widget", classes: ["fade-in-up"] },
      { selector: ".form-container", classes: ["fade-in-up"] },
    ]

    elements.forEach((item) => {
      if (item.multiple) {
        const elements = document.querySelectorAll(item.selector)
        elements.forEach((el, index) => {
          el.classList.add(...item.classes)
          el.classList.add(`delay-${(index % 5) + 1}`)
        })
      } else {
        const element = document.querySelector(item.selector)
        if (element) {
          element.classList.add(...item.classes)
        }
      }
    })
  }

  addAnimationClasses()

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })

  // Parallax effect
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY

    // Apply parallax to different elements
    const parallaxElements = [
      { selector: ".hero::before", factor: 0.2 },
      { selector: ".brand-potential::before", factor: -0.1 },
      { selector: ".projects::before", factor: 0.15 },
      { selector: ".features::before", factor: -0.05 },
    ]

    parallaxElements.forEach((item) => {
      const element = document.querySelector(item.selector)
      if (element) {
        element.style.transform = `translateY(${scrollY * item.factor}px)`
      }
    })
  })

  // Typing animation for headings
  const headings = document.querySelectorAll("h1, h2")
  headings.forEach((heading) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            heading.classList.add("typing-animation")
            observer.unobserve(heading)
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(heading)
  })
})

