import React from 'react'
import axios from 'axios'
import Joi from 'joi'
import Form from '../../reusable/form'
import Input from '../../reusable/html/input'
import Button from '../../reusable/html/button'
import TextArea from '../../reusable/html/textarea'
import Image from '../../reusable/html/image'
import proposal from '../../services/proposals'
import { toastify } from '../../utils/toast'

class RegisterProposal extends Form {
  constructor(props) {
    super(props)
    this.state = {
      data: { fullName: '', description: '', image: '' },
      errors: {},
    }
  }

  // Validation Proposal schema using Joi -- Create Proposal
  globalSchema = {
    fullName: Joi.string()
      .pattern(new RegExp('^[a-zA-Z ]+$'))
      .min(3)
      .max(50)
      .label('Full Name')
      .messages({
        'string.pattern.base': 'Full Name should be only letters',
      }),
    description: Joi.string().required().min(3).max(50).label('Description'),
    image: Joi.optional(),
  }

  /* Load random user image from server */
  componentDidMount = async () => {
    await this.loadProfileImage()
  }

  /* Load Random photo from server */
  loadProfileImage = async () => {
    try {
      const { data } = { ...this.state }
      const { data: res } = await axios.get('https://randomuser.me/api/')
      data.image = res.results[0].picture.large
      this.setState(() => {
        return { data }
      })
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toastify('error', ex.response.data.message)
    }
  }

  schema = Joi.object(this.globalSchema)

  // Reset Data form
  handleResetForm = () => {
    this.handleReset()
    this.loadProfileImage()
  }

  /* Submit Form */
  async doSubmit() {
    try {
      const { data } = this.state
      const { data: res } = await proposal.createProposal(data)
      toastify('success', res.message)
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toastify('error', ex.response.data.message)
    }

    this.handleReset()
    this.loadProfileImage()
  }

  render() {
    const { data, errors } = this.state

    return (
      <div className='row'>
        <div className='d-flex justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>
                <h5 className='card-title mb-0'>Create Proposal</h5>
              </div>

              <div className='card-body'>
                <form onSubmit={this.handleSubmit}>
                  <Input
                    label={'Full Name'}
                    type={'text'}
                    name={'fullName'}
                    id={'fullName'}
                    placeholder={'Full Name'}
                    onChange={this.handleChange}
                    value={data.fullName}
                    error={errors.fullName}
                  />

                  <TextArea
                    label={'Description'}
                    type={'text'}
                    name={'description'}
                    id={'description'}
                    placeholder={'Short Description'}
                    onChange={this.handleChange}
                    value={data.description}
                    error={errors.description}
                  />

                  <div className='mb-3'>
                    <Image
                      src={data.image}
                      alt={'Proposal Image'}
                      className={'img-thumbnail'}
                    />
                  </div>

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
                      onClick={this.handleResetForm}
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

export default RegisterProposal
