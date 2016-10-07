function bindTriggers(program) {
  Object.keys(program.viewUpdateTriggers).forEach(selector => {
    const trigger = program.viewUpdateTriggers[selector]
    if (trigger.click) {
      const msg = trigger.click
      document
        .querySelector(selector)
        .onclick = () => { 
          program.model = program.update(msg, program.model)
          renderHTML(program)
        }   
    }
  })
}

function renderHTML(program) {
  document
    .querySelector('body')
    .innerHTML = program.view(program.model)
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

