const questions = document.querySelector('.questions')

if (questions) {
  const button = questions.querySelector('[data-questions-toggle]')
  const label = questions.querySelector('[data-questions-toggle-label]')
  const additionalQuestions = questions.querySelector('#questions-more')

  const updateExpandedHeight = () => {
    additionalQuestions.style.setProperty(
      '--questions-expanded-height',
      `${additionalQuestions.scrollHeight}px`,
    )
  }

  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true'

    updateExpandedHeight()
    button.setAttribute('aria-expanded', String(!expanded))
    additionalQuestions.classList.toggle('questions__more--expanded', !expanded)
    additionalQuestions.inert = expanded
    label.textContent = expanded ? 'Load All FAQ’s' : 'Show Less'
  })

  window.addEventListener('resize', updateExpandedHeight)
}
