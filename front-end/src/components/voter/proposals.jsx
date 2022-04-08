import React, { Component } from 'react'
import ProposalCards from '../../reusable/proposal-cards'
import Pagination from '../../reusable/pagination'
import auth from '../../services/voters'
import Spinner from '../../reusable/spinner'
import workflow from '../../services/workflow'
import election from '../../services/election'
import { connect } from 'react-redux'
import { loadProposals } from '../../store/proposals'
import { paginate } from '../../utils/paginate'
import { data } from '../../data/electionData'
import { toastify } from '../../utils/toast'
import { Phase } from '../../utils/workflow'

class ProposalsDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSize: 9,
      currentPage: 1,
      currentPhase: 0,
      phases: data,
      hasVoted: false,
    }
  }

  componentDidMount = async () => {
    try {
      const { data: phase } = await workflow.getCurrentPhase()
      const { data: voter } = await auth.voterInfo()
      this.setState({
        currentPhase: phase.message.id,
        hasVoted: voter.message.hasVoted,
      })
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toastify('error', ex.response.data.message)
    }

    const { loadProposals } = this.props
    loadProposals()
  }

  /* Handle change page pagination */
  handlePageChange = (page = 1) => {
    this.setState({ currentPage: page })
  }

  /* Disable vote button if the current user had voted or the current phase doesnt allow him */
  isDisabledBtn = () => {
    const { currentPhase, hasVoted } = this.state
    return currentPhase !== Phase.VotingSessionStarted || hasVoted
  }

  /* Voter submit his choice */
  handleVote = async (choice) => {
    try {
      await election.vote(choice)
      toastify(
        'success',
        'You have successfully submitted your vote. Thank You.'
      )

      this.setState({ hasVoted: true })
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toastify('error', ex.response.data.message)
    }
  }

  render() {
    const { loading, proposals } = this.props
    const { length: count } = proposals
    const { pageSize, currentPage } = this.state
    const paginatedProposals = paginate(proposals, currentPage, pageSize)

    return (
      <>
        {loading ? (
          <Spinner hidden={!loading} />
        ) : (
          <>
            {count === 0 ? (
              <h1 className='h1 d-inline align-middle'>
                There are no Proposals
              </h1>
            ) : (
              <>
                <h1 className='h1 d-inline align-middle'>List of Proposals</h1>
                <div className='row'>
                  <ProposalCards
                    proposals={paginatedProposals}
                    isDisabled={this.isDisabledBtn()}
                    onVote={this.handleVote}
                    showVoteBtn={true}
                  />
                </div>
                <Pagination
                  itemsCount={count}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </>
            )}
          </>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.entities.proposals.loading,
  proposals: state.entities.proposals.list,
})

const mapDispatchToProps = (dispatch) => ({
  loadProposals: () => dispatch(loadProposals()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProposalsDetails)
