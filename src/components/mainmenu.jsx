import React, { Component } from 'react'
import { Menu, Icon, Header, Dropdown} from 'semantic-ui-react'
import '../sass/main.sass';
import MainMenuModal from './mainmenu_modal.jsx';

export default class MainMenu extends Component {
  constructor(props){
    super(props);
      
    this.state = {
      disabled: false
    }
  }

  render() {

    const { activeItem } = this.state

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
          <MainMenuModal />
        </Dropdown.Menu>
      </Dropdown>

    </Menu>

    )
  }
}
