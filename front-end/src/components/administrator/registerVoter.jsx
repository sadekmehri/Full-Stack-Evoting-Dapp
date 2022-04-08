import React from 'react'
import Joi from 'joi'
import Form from '../../reusable/form'
import Input from '../../reusable/html/input'
import Button from '../../reusable/html/button'
import Select from '../../reusable/html/select'
import auth from '../../services/voters'
import state from '../../services/states'
import { toastify } from './../../utils/toast'
import { isValidEthereumAddress } from './../../utils/ethereumAddress'

class RegisterVoter extends Form {
  constructor(props) {
    super(props)
    this.state = {
      data: { address: '', age: '', state: '' },
      errors: {},
      states: [],
    }
  }

  /* Load states from server */
  componentDidMount = async () => {
    try {
      const { data } = await state.getStates()
      this.setState({ states: data.message })
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toastify('error', ex.response.data.message)
    }
  }

  // Validation Voter schema using Joi -- Create Voter
  globalSchema = {
    address: Joi.string()
      .required()
      .custom(isValidEthereumAddress)
      .label('Address')
      .messages({
        'any.custom': `Invalid Ethereum Address `,
      }),
    age: Joi.number().integer().positive().min(18).max(150).label('Age'),
    state: Joi.string().required().label('State'),
  }

  schema = Joi.object(this.globalSchema)

  /* Submit Form */
  async doSubmit() {
    try {
      const { data } = this.state
      const { data: res } = await auth.registerVoter(data)
      toastify('success', res.message)
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toastify('error', ex.response.data.message)
    }

    this.handleReset()
  }

  render() {
    const { data, errors, states } = this.state

    return (
      <div className='row'>
        <div className='d-flex justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>
                <h5 className='card-title mb-0'>Create Voter</h5>
              </div>

              <div className='card-body'>
                <form onSubmit={this.handleSubmit}>
                  <Input
                    label={'Ethereum address'}
                    type={'text'}
                    name={'address'}
                    id={'address'}
                    placeholder={'ethereum address'}
                    onChange={this.handleChange}
                    value={data.address}
                    error={errors.address}
                  />

                  <Input
                    label={'Age'}
                    type={'text'}
                    name={'age'}
                    id={'age'}
                    placeholder={'age'}
                    onChange={this.handleChange}
                    value={data.age}
                    error={errors.age}
                  />

                  <Select
                    label={'State'}
                    className={'form-select'}
                    aria-label={'Default select example'}
                    name={'state'}
                    options={states}
                    onChange={this.handleChange}
                    error={errors.state}
                  />

                  <div className='d-flex justify-content align-items-center mb-1'>
                    <Button
                      type={'submit'}
                      className={'btn btn-primary btn-lg'}
                      value={'Submit'}
                      disabled={this.isEnabledButton()}
                      onClick={null}
                    />

                    <Button
                      type={'reset'}
                      className={'btn btn-secondary btn-lg m-1'}
                      value={'Reset'}
                      onClick={this.handleReset}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterVoter
