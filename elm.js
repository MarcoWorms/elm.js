
const $ = document.querySelector.bind(document)

function bindTriggers(program) {

  const forEachTrigger = (func) => {
    Object.keys(program.viewUpdateTriggers).forEach(selector => {
      const trigger = program.viewUpdateTriggers[selector]
      func(selector, trigger)
    })
  }

  forEachTrigger( (selector, trigger) => {
    if (trigger.click) {
      const msg = trigger.click
      document.querySelector(selector).onclick = () => {
        const model = Immutable.Map(program.model)
        program.model = program.update(msg, model)
        renderHTML(program)
      }
    }
  })
}

function renderHTML(program) {
  const renderView = () => program.view(Immutable.Map(program.model))
  $('body').innerHTML = renderView()
  bindTriggers(program)
}

function run(program) {
  renderHTML(program)
}

function when (value, validValues) {
  var result = null
  const chain = {
    is (match, func) {
      if (match === value) {
        result = func()
      }
      return chain
    },
    end () {
      return result
    }
  }
  return chain
}
