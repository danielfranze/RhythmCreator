import React, { Component } from 'react'
import { Menu, Icon, Header, Dropdown, DropdownItem, DropdownDivider } from 'semantic-ui-react'
import '../sass/main.sass';



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

    <Menu borderless stackable inverted color='green' size='medium' >
    
      <Menu.Item  position="left" className='link' href='https://github.com/danielfranze/RhythmCreator'>
          <Icon disabled={this.state.disabled} name='github' size='huge'></Icon>
      </Menu.Item>

      <Menu.Item position="left">
        <Header as='h1' underline='false'>
          <span class='header_title_left'>Rhythm</span><span class='header_title_right'> creator</span> 
        </Header>
      </Menu.Item>

      <Dropdown  position="right" icon='th huge' pointing className='link item' >
        <Dropdown.Menu >
          <Dropdown.Header>File</Dropdown.Header>
          <Dropdown.Item>Save</Dropdown.Item>
          <Dropdown.Item>Load</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Header>Options</Dropdown.Header>
          <Dropdown.Item>Reset</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

    </Menu>






    )
  }
}
