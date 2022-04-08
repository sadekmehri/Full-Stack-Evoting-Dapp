import React, { Component } from 'react'
import axios from 'axios'
import Card from '../../reusable/admin-card'
import proposalImg from '../../assets/images/illustrations/create-proposal.jpg'
import voterImg from '../../assets/images/illustrations/create-voter.jpg'
import auth from '../../services/voters'
import proposal from '../../services/proposals'
import { generateProposals } from '../../utils/generateProposals'
import { generateVoters } from '../../utils/generateVoters'
import { toastify } from './../../utils/toast'
import './styles.css'

class AdminDashboard extends Component {
  /* Generate random voters */
  handleGenerateVoters = () => {
    const voters = generateVoters(5)

    axios
      .all(voters.map((voter) => auth.registerVoter(voter)))
      .then(() => {
        toastify('success', 'You have successfully generated voters')
      })
      .catch((ex) => {
        toastify('error', ex.response.data.message)
      })
  }

  /* Generate random proposals */
  handleGenerateProposals = () => {
    const proposals = generateProposals(5)

    axios
      .all(proposals.map((proposall) => proposal.createProposal(proposall)))
      .then(() => {
        toastify('success', 'You have successfully generated proposals')
      })
      .catch((ex) => {
        toastify('error', ex.response.data.message)
      })
  }

  render() {
    return (
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div id='cards_landscape_wrap-2'>
              <div className='container'>
                <div className='row'>
                  <Card
                    src={voterImg}
                    alt={'Generate Voters'}
                    paragraph={
                      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.'
                    }
                    header={'Generate Voters'}
                    onClick={this.handleGenerateVoters}
                  />

                  <Card
                    src={proposalImg}
                    alt={'Generate Proposals'}
                    paragraph={
                      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.'
                    }
                    header={'Generate Proposals'}
                    onClick={this.handleGenerateProposals}
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

export default AdminDashboard
