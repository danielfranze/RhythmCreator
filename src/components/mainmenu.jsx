import React, { Component } from 'react'
import { Menu, Icon, Header, Dropdown, Modal, Button} from 'semantic-ui-react'
import '../sass/main.sass';


export default class MainMenu extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {


    return (

    <Menu borderless stackable inverted size='massive'>
    
      <Menu.Item  id="menu-item-left" position="left" className='link' href='https://github.com/danielfranze/RhythmCreator'>
          <Icon disabled={this.state.disabled} name='github' size='huge'></Icon>
      </Menu.Item>

      <Menu.Item id="menu-item-center">
        <Header as='h1' underline='false'>
          <span className='header_title_left'>Rhythm</span><span className='header_title_right'> creator</span> 
        </Header>
      </Menu.Item>

      <Dropdown  width="100px" position="right" icon='th huge' pointing='top right' className='link item'>
        <Dropdown.Menu >
          <Dropdown.Item icon='folder' text='Open'/>
          <Dropdown.Item icon='file' text='Save'/>


            <Modal
            dimmer="blurring"
            trigger={<Dropdown.Item icon='trash' text='Reset' onClick={this.handleOpen}></Dropdown.Item>}
            open={this.state.modalOpen}
            onClose={this.handleClose}
            basic
            size='large'
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


        </Dropdown.Menu>
      </Dropdown>

    </Menu>

    )
  }
}
