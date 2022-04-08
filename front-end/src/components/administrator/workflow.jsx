import React, { Component } from 'react'
import Button from '../../reusable/html/button'
import workflow from '../../services/workflow'
import { toastify } from '../../utils/toast'
import { data } from '../../data/workflowData'

class Workflow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phases: data,
      currentPhase: 0,
    }
  }

  /* Load current phase from server */
  componentDidMount = async () => {
    try {
      const { data } = await workflow.getCurrentPhase()
      this.setState({ currentPhase: data.message.id })
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toastify('error', ex.response.data.message)
    }
  }

  /* Change the election phase */
  handleOnClick = async () => {
    try {
      const { currentPhase, phases } = this.state
      const { data } = await workflow.nextPhase(currentPhase + 1)
      this.setState({ currentPhase: data.message.id })
      toastify(
        'success',
        `Now we are in ${phases[data.message.id].value} phase`
      )
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toastify('error', ex.response.data.message)
    }
  }

  /* Check the validity of submitting the data */
  isEnabledButton = () => {
    const { currentPhase, phases } = this.state
    return currentPhase >= phases.length - 1 ? true : false
  }

  render() {
    const { phases, currentPhase } = this.state

    return (
      <div className='row'>
        <div className='d-flex justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>
                <h5 className='card-title mb-0'>Election Phase</h5>
              </div>

              <div className='card-body'>
                <div className='d-flex justify-content align-items-center mb-1'>
                  <ul className='fa-ul'>
                    {phases.map((option) => (
                      <li key={option.id}>
                        <span className='fa-li'>
                          {option.id <= currentPhase ? (
                            <i className='fas fa-check-circle'></i>
                          ) : (
                            <i className='fas fa-spinner fa-spin'></i>
                          )}
                        </span>
                        {option.value}
                        {option.id < currentPhase ? (
                          <span className='badge bg-success m-1'>Done</span>
                        ) : option.id === currentPhase ? (
                          <span className='badge bg-info m-1'>Current</span>
                        ) : (
                          <span className='badge bg-danger m-1'>Not Yet</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='d-flex justify-content align-items-center mb-1'>
                  <Button
                    type={'submit'}
                    className={'btn btn-primary btn-lg'}
                    value={'Next Phase'}
                    disabled={this.isEnabledButton()}
                    onClick={this.handleOnClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Workflow
