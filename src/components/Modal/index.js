import React, { Component }   from  'react'
import { connect }            from  'react-redux'
import { bindActionCreators } from  'redux'
import { withRouter }         from  'react-router-dom';
import PropTypes              from  'prop-types'
import { Dialog }             from  'material-ui'
import RaisedButton           from  'material-ui/RaisedButton';

/* component styles */
import { styles } from './styles.scss'

/* actions */
import * as contractActionCreators from 'core/actions/actions-contract'

class Modal extends Component {
  constructor(props) {
    super(props)
  }

  navToShop=() => {
    const { history, actions } = this.props
    actions.contract.togglePurchaseModal(false)
    history.push(`/shop`)
  }

  handleClose=() => {
    const { actions } = this.props
    actions.contract.togglePurchaseModal(false)
  }

  render() {
    const { title, content, className, customStyles, contract } = this.props
    const mergedStyles = styles + ' ' + className
    const actions = [
      <RaisedButton
        className="btn"
        label="Return To Shop"
        backgroundColor="#ffa000"
        onClick={this.navToShop}
      />,
      <RaisedButton
        className="btn"
        label="Close"
        backgroundColor="#ffa000"
        onClick={this.handleClose}
      />
    ]
    return(
      <div>
        <Dialog
          title={title}
          actions={actions}
          modal={true}
          open={contract.purchaseModal}
          children={<div className="modal-content">{content}</div>}>
        </Dialog>
      </div>
    )
  }

}

Modal.propTypes = {
  open      : PropTypes.bool.isRequired,
  title     : PropTypes.string,
  uiActions : PropTypes.object,
  content   : PropTypes.element,
  className : PropTypes.string
}

Modal.defaultProps = {
  open  : false,
  title : 'ShopFront Purchase Error'
}

function mapStateToProps(state) {
  return {
    provider: state.provider,
    contract: state.contract
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      contract: bindActionCreators(contractActionCreators, dispatch)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modal));
