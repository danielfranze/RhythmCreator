import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Dropdown} from 'semantic-ui-react'
import '../sass/main.sass';

class MainMenuModal extends Component {
    state = { modalOpen: false }

    handleOpen = () => this.setState({ modalOpen: true })
  
    handleClose = () => this.setState({ modalOpen: false })
  
    render() {
      return (
        <Modal
          dimmer="blurring"
          trigger={<Dropdown.Item icon='trash' text='Reset' onClick={this.handleOpen}></Dropdown.Item>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          basic
          size='massive'
        >
          <Header size='huge' icon='question' content='Confirm Deletion' />
          <Modal.Content>
            <h3>
                <p><Icon size='huge' name='angle double right'/>This will delete all of your inputs!</p> 
                <p><Icon size='huge' name='angle double right'/>Are you sure you want to permanently remove your inputs?</p>
            </h3>
          </Modal.Content>
          <Modal.Actions>
          <Button size='huge' color='green' onClick={this.handleClose} inverted>
              <Icon size='huge' name='checkmark' /> No
            </Button>

            <Button size='huge' color='red' onClick={this.handleClose} inverted>
              <Icon size='huge' name='delete' /> Delete
            </Button>
          </Modal.Actions>
        </Modal>
      )
    }
}

export default MainMenuModal