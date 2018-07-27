import React, { Component } from 'react'
import { Menu, Icon, Header, Dropdown, Modal, Button, Transition} from 'semantic-ui-react'

import Workspace from './workspace.jsx';

import { Slider } from 'react-semantic-ui-range'
import {Segment,Grid,Label,Input} from 'semantic-ui-react';
//import '../css/main.sass';


export default class MainMenu extends Component {
  

  constructor(props){
    super(props)
    this.child = React.createRef();
    this.state = { 
      modalOpen: false, 
      dropDownMenuOpen: false,
      playButtonActive: true,
      playButtonName: "pause circle",
      CurrentRangeToneLines: 4,
      showSettings: false,
      settingsButton: "setting",
      settingsText: "Settings",
      bpm: 120
    }

  }

  onClickReset = () => {
    this.child.current.deleteFieldsInStepSequencerMatrix();
    this.handleDownMenuClose()
  };



  handleClickSettingsButton =  () => {
    this.state.showSettings ? 
    this.setState({showSettings: false, settingsButton: "setting", settingsText: "Settings" }) : 
    this.setState({showSettings: true, settingsButton: "sign out alternate" , settingsText: "Exit Settings"})

  }

  handleCurrentRangeToneLines = (value) => {
    this.setState({CurrentRangeToneLines:value})
    //console.log("current Value!!! = " + this.state.CurrentRangeToneLines.toString())
  }

  handlePressButton = () => {
    this.state.playButtonActive ? 
    this.setState({playButtonActive: false, playButtonName: "play circle" }) : 
    this.setState({playButtonActive: true, playButtonName: "pause circle" })

  }
  handleDownMenuClose = () => this.setState({ dropDownMenuOpen: false, modalOpen: false })
  handleDownMenuOpenClose = () => {
    if((this.state.dropDownMenuOpen) == !(this.state.modalOpen)){
      this.setState({dropDownMenuOpen: false })
    } else {
      this.setState({dropDownMenuOpen: true })
    }
  }
  handleModalOpen = () => this.setState({ modalOpen: true})
  handleModalClose = () => this.setState({ modalOpen: false })

  render() {

    const menuContainer = (
      <Menu borderless stackable inverted size='massive'>
      {/***********************************
        *           Github Icon           *
        ***********************************/}
      <Menu.Item  id="menu-item-left" position="left" className='link' href='https://github.com/danielfranze/RhythmCreator'>
          <Icon disabled={this.state.disabled} name='github' size='huge'></Icon>
      </Menu.Item>
      {/***********************************
      *               Title               *
      ***********************************/}
      <Menu.Item id="menu-item-center">
        <Header as='h1' underline='false'>
          <span className='header_title_left'>Rhythm</span> <span>
            <Icon name={this.state.playButtonName} onClick={this.handlePressButton} link></Icon>
          </span><span className='header_title_right'> creator</span> 
        </Header>
      </Menu.Item>
      {/***********************************
        *             Dropdown            *
        ***********************************/}
      <Dropdown open={this.state.dropDownMenuOpen}  onClick={this.handleDownMenuOpenClose }
      size='massive' width="100px" position="right" icon='th' pointing='top right' className='link item'>
        <Dropdown.Menu >
          <Dropdown.Item icon='folder' text='Open'/>
          <Dropdown.Item icon='file' text='Save'/>

          <Modal
            dimmer="blurring"
            trigger={<Dropdown.Item icon='trash' text='Reset' onClick={this.handleModalOpen}></Dropdown.Item>}
            open={this.state.modalOpen}
            onClose={this.handleModalClose}
            basic
            size='small'
            
          >
            <Header size='huge' icon='warning sign' content='Confirm Deletion'/>
            <Modal.Content>
              
              <p><Icon size='huge' name='angle double right'/>This will delete all of your inputs!</p> 
              <p><Icon size='huge' name='angle double right'/>Are you sure you want to continue?</p>
              
            </Modal.Content>
            <Modal.Actions>
            <Button size='huge' color='green' onClick={this.handleModalClose} inverted>
                <Icon size='huge' name='checkmark' /> <p>No</p>
              </Button>

              <Button size='huge' color='red' onClick={this.onClickReset} inverted> {/*this.onClickReset*/}
                <Icon size='huge' name='delete'/> <p>Delete</p>
              </Button>
            </Modal.Actions>
          </Modal>
          <Dropdown.Item icon={this.state.settingsButton} text={this.state.settingsText} onClick={this.handleClickSettingsButton}/>

        </Dropdown.Menu>
      </Dropdown>

    </Menu>
    )

    return (<div>
              {menuContainer}
              <Workspace  showPlayobjectProp={this.props.showPlayobjectProp && this.state.playButtonActive} 
                          round={this.props.round}
                          CurrentRangeToneLines={this.state.CurrentRangeToneLines}
                          numerOfrows={5}
                          numberOfColumns={16}
                          bpm={this.state.bpm}
                          ref={this.child}
                          />


              {/***********************************
              *             Settings Menu         *
              ***********************************/}
              <Transition visible={this.state.showSettings} animation="fade" duration={{hide:500,show: 2000}} >
                <Grid>
                <Grid.Column width={2}/>
                <Grid.Column width={4}>
                <Segment>
                  <h2>BPM {this.state.bpm}</h2>

                      <Slider color="grey" inverted={false} 
                        settings={{
                        start: this.state.bpm,
                        min:0,
                        max:200,
                        step:1,
                        onChange: (value) => {
                          this.setState({
                            bpm:value
                          })
                          //this.handleCurrentRangeToneLines(value)
                        }
                      }}/>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Segment>
                  <h2>Line spacing {this.state.CurrentRangeToneLines}</h2>

                      <Slider color="grey" inverted={false} 
                        settings={{
                        start: this.state.CurrentRangeToneLines,
                        min:0,
                        max:8,
                        step:1,
                        onChange: (value) => {
                          this.setState({
                            CurrentRangeToneLines:value
                          })
                          //this.handleCurrentRangeToneLines(value)
                        }
                      }}/>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={6}/>

                </Grid>
              </Transition>
            </div>
    


    )
  }
}
