import React, { Component } from 'react'
import StatisticCard from '../../reusable/stat-card'
import Spinner from '../../reusable/spinner'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  loadVoters,
  getRegisteredVotersByState,
  getRegisteredVotersByIsVoted,
  getRegisteredVotersByAge,
  getVotersDidntVoteByAge,
} from '../../store/voters'

class Statistics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      colors: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'],
    }
  }

  /* Load list of voters */
  componentDidMount = () => {
    const { loadVoters } = this.props
    loadVoters()
  }

  render() {
    const {
      votersByState,
      votersByIsVoted,
      votersByAge,
      votersDidntVoteByAge,
      loading,
    } = this.props

    const { colors } = this.state

    return (
      <>
        {loading ? (
          <Spinner hidden={!loading} />
        ) : (
          <main className='content'>
            <div className='container-fluid p-0'>
              <div className='mb-3'>
                <h1 className='h1 d-inline align-middle'>Some statistics</h1>
                <Link
                  className='badge bg-dark text-white ms-2'
                  style={{ textDecoration: 'none' }}
                  to='/'
                >
                  Go back home
                </Link>
              </div>
              <div className='row'>
                <StatisticCard
                  type={'bar'}
                  label={'Number of voters'}
                  data={votersByState}
                  title={'Total of registred voters in each state'}
                  colors={colors}
                />

                <StatisticCard
                  type={'bar'}
                  label={'Number of voters'}
                  data={votersByIsVoted}
                  title={
                    'Total of voters who submitted their vote in each state'
                  }
                  colors={colors}
                />

                <StatisticCard
                  type={'bar'}
                  label={'Number of voters'}
                  data={votersByAge}
                  title={'Number of registered voters filtered by age'}
                  colors={colors}
                />

                <StatisticCard
                  type={'bar'}
                  label={'Number of voters'}
                  data={votersDidntVoteByAge}
                  title={
                    "Number of voters who didnt't submit their vote filtered by age"
                  }
                  colors={colors}
                />
              </div>
            </div>
          </main>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.entities.voters.loading,
  votersByState: getRegisteredVotersByState(state),
  votersByIsVoted: getRegisteredVotersByIsVoted(state),
  votersByAge: getRegisteredVotersByAge(state),
  votersDidntVoteByAge: getVotersDidntVoteByAge(state),
})

const mapDispatchToProps = (dispatch) => ({
  loadVoters: () => dispatch(loadVoters()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Statistics)
