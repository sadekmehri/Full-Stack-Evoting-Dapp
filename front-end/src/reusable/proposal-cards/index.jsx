import React from 'react'
import PropTypes from 'prop-types'
import Image from '../html/image'
import Button from '../html/button'
import Modal from '../html/modal'

const ProposalCards = ({ proposals, isDisabled, onVote, showVoteBtn }) => {
  return proposals.map((proposal) => {
    return (
      <div
        className='card col-md-4'
        style={{ width: '500px', height: '142px', margin: '20px 20px 0px 0px' }}
        key={proposal.id}
      >
        <div className='row'>
          <div className='col-sm-4'>
            <Image
              src={proposal.imageUrl}
              alt={proposal.fullName}
              className={'w-100  text-center'}
            />
          </div>
          <div className='col-sm-8'>
            <div className='card-body'>
              <h5 className='card-title'>{proposal.fullName}</h5>
              <p className='card-text'>
                Proposal Number {+proposal.id + 1}
                <br />
                Has gained {+proposal.voteCount} Vote(s)
              </p>

              <Button
                type={'button'}
                className={'btn btn-info btn-sm'}
                data-bs-toggle={'modal'}
                data-bs-target={`#exampleModal${+proposal.id}`}
              >
                <i className='far fa-eye'> Profile</i>
              </Button>

              {showVoteBtn && (
                <Button
                  type={'button'}
                  disabled={isDisabled}
                  onClick={() => onVote(proposal.id)}
                  className={'btn btn-success btn-sm m-1'}
                >
                  <i className='far fa-vote-yea'> Vote</i>
                </Button>
              )}
            </div>
          </div>
          <Modal
            text={proposal.description}
            title={`Full Name: ${proposal.fullName}`}
            id={proposal.id}
          />
        </div>
      </div>
    )
  })
}

ProposalCards.propTypes = {
  proposals: PropTypes.array.isRequired,
  isDisabled: PropTypes.bool,
  onVote: PropTypes.func,
  showVoteBtn: PropTypes.bool.isRequired,
}

export default ProposalCards
