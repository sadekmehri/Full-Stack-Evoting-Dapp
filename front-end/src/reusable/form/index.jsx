import { Component } from 'react'
import Joi from 'joi'
import { eliminateCommas } from '../../utils/eliminateCommas'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      errors: {},
    }
  }

  // Validate the form using joi. Returns null when there is no error or return errors object
  validate = () => {
    const option = { abortEarly: false }
    const result = this.schema.validate(this.state.data, option)

    if (!result.error) return null

    const errors = {}
    for (let item of result.error.details)
      errors[item.path[0]] = eliminateCommas(item.message)

    return errors
  }

  // Validate specific property
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }
    const schema = Joi.object({ [name]: this.globalSchema[name] })
    const { error } = schema.validate(obj)
    return error ? error.details[0].message : null
  }

  // Verify each propery after key stroke event
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors }
    const errMessage = this.validateProperty(input)

    const { name, value } = input
    if (errMessage) errors[name] = eliminateCommas(errMessage)
    else delete errors[name]

    const data = { ...this.state.data }
    data[name] = value
    this.setState({ data, errors })
  }

  // Reset Data form
  handleReset = () => {
    const data = { ...this.state.data }
    Object.keys(data).map((key) => (data[key] = ''))
    this.setState({ data })
  }

  // Enable or disable button
  isEnabledButton = () => {
    return this.validate() === null ? false : true
  }

  // Submit form process
  handleSubmit = (e) => {
    e.preventDefault()
    const errors = this.validate()
    this.setState({ errors: errors || {} })

    if (errors) return

    this.doSubmit()
  }
}

export default Form
