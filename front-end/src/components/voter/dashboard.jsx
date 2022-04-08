import React, { Component } from 'react'
import workflow from '../../services/workflow'
import election from '../../services/election'
import IsLoadingHOC from '../../hoc/isLoadingHOC'
import { data } from '../../data/electionData'
import { toastify } from '../../utils/toast'
import { Phase } from '../../utils/workflow'
import Canvas from './../../reusable/html/canvas'
import ProposalCards from './../../reusable/proposal-cards'

class VoterDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPhase: 0,
      phases: data,
      winner: null,
    }
  }

  componentDidMount = async () => {
    const { setLoading } = this.props

    try {
      const { data: phase } = await workflow.getCurrentPhase()
      const { data: winner } = await election.getWinner()

      this.setState({
        currentPhase: phase.message.id,
        winner: winner.message,
      })
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toastify('error', ex.response.data.message)
    }

    setLoading(false)
  }

  isVoteResultRevealed = () => {
    const { currentPhase } = this.state
    return currentPhase === Phase.VotesRallied
  }

  render() {
    const { winner } = this.state

    if (!this.isVoteResultRevealed())
      return <h1 className='h1'> Result will be revealed soon</h1>

    return (
      <>
        <div className='d-flex justify-content-center align-items-center'>
          <ProposalCards proposals={[winner]} showVoteBtn={false} />
          <Canvas />
        </div>
      </>
    )
  }
}

export default IsLoadingHOC(VoterDashboard)
