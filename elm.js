const elm = {
  $ (selector) {
    return document.querySelector(selector)
  },
  renderHTML (program) {
    const renderView = () => program.view(Immutable.Map(program.model))
    this.$('body').innerHTML = renderView()
    this.bindInteractions(program)
  },
  bindInteractions (program) {
    const forEachTrigger = (func) => {
      Object.keys(program.viewUpdateInteractions).forEach(selector => {
        const interaction = program.viewUpdateInteractions[selector]
        func(selector, interaction)
      })
    }
    const has = (object, value) => {
      return (Object.keys(object).indexOf(value) !== -1)
    }
    forEachTrigger( (selector, interaction) => {
      if (has(interaction, 'click')) {
        const msg = interaction.click
        this.$(selector).onclick = () => {
          const model = Immutable.Map(program.model)
          program.model = program.update(msg, model)
          this.renderHTML(program)
        }
      }
    })
  }
}

function run(program) {
  elm.renderHTML(program)
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
    end (model) {
      if ( result !== null) {
        return result
      }
      console.error('invalid action ' + value + ' in ' + validValues)
      return model
    }
  }
  return chain
}
