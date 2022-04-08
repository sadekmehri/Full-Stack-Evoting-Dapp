import React from 'react'
import Button from '../../../reusable/html/button'
import MetaMask from '../../../reusable/meta-mask'
import { withRouter } from 'react-router-dom'

class HeaderInfo extends MetaMask {
  render() {
    return (
      <div className='meet'>
        <p className='text-small accent2'>Election</p>
        <h2>Your Decision Is Important</h2>
        <p>
          Elections make a fundamental contribution to democratic governance.
          Because direct democracy is a form of government in which political
          decisions are made directly by the entire body of qualified citizens
          is impractical in most modern societies, democratic government must be
          conducted through representatives.
        </p>
        <div style={{ display: 'flex' }}>
          <Button
            className={'btn-custom accent1-bg bkg1-link'}
            value={'Start Voting Now'}
            disabled={!this.isMetaMaskInstalled()}
            onClick={this.handleLoadWeb3}
          />
          <Button
            className={'btn-custom'}
            style={{ backgroundColor: '#ef233c', color: '#fff' }}
            value={'Some statistics'}
            disabled={false}
            onClick={() => {
              this.props.history.replace('/statistics')
            }}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(HeaderInfo)
