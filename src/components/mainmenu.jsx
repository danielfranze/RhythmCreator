import React, { Component } from "react";
import {
  Menu,
  Icon,
  Header,
  Dropdown,
  Modal,
  Button,
  Transition,
  Segment,
  Grid,
  Radio
} from "semantic-ui-react";
import { Slider } from "react-semantic-ui-range";
import Workspace from "./workspace.jsx";

export default class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      modalOpen: false,
      dropDownMenuOpen: false,
      playButtonActive: true,
      playButtonName: "pause circle",
      currentRangeToneLines: 4,
      showSettings: false,
      settingsButton: "setting",
      settingsText: "Settings",
      bpm: 40,
      tracker: true
    };
  }
  onClickTracker = () => {
    this.child.current.deleteFieldsInStepSequencerMatrixTracker();
    this.state.tracker
      ? this.setState({ tracker: false })
      : this.setState({ tracker: true });
  };
  onClickReset = () => {
    this.child.current.deleteFieldsInStepSequencerMatrix();
    this.handleDownMenuClose();
  };
  handleClickSettingsButton = () => {
    this.state.showSettings
      ? this.setState({
          showSettings: false,
          settingsButton: "setting",
          settingsText: "Settings"
        })
      : this.setState({
          showSettings: true,
          settingsButton: "sign out alternate",
          settingsText: "Exit Settings"
        });
  };
  handleCurrentRangeToneLines = value => {
    this.setState({ currentRangeToneLines: value });
  };
  handlePressButton = () => {
    this.state.playButtonActive
      ? this.setState({
          playButtonActive: false,
          playButtonName: "play circle"
        })
      : this.setState({
          playButtonActive: true,
          playButtonName: "pause circle"
        });
  };
  handleDownMenuClose = () => {
    this.setState({
      dropDownMenuOpen: false,
      modalOpen: false
    });
  };
  handleDownMenuOpenClose = () => {
    if (this.state.dropDownMenuOpen == !this.state.modalOpen) {
      this.setState({ dropDownMenuOpen: false });
    } else {
      this.setState({ dropDownMenuOpen: true });
    }
  };
  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };
  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const menuContainer = (
      <Menu borderless stackable inverted size="massive">
        {/***********************************
         *  Github Icon
         ***********************************/}
        <Menu.Item
          id="menu-item-left"
          position="left"
          className="link"
          href="https://github.com/danielfranze/RhythmCreator"
        >
          <Icon disabled={this.state.disabled} name="github" size="huge" />
        </Menu.Item>
        {/***********************************
         *  Mainmenu Title & Playbutton
         ***********************************/}
        <Menu.Item id="menu-item-center">
          <Header as="h1" underline="false">
            <span className="header_title_left">Rhythm </span>
            <span>
              <Icon
                name={this.state.playButtonName}
                onClick={this.handlePressButton}
                link
              />
            </span>
            <span className="header_title_right"> creator</span>
          </Header>
        </Menu.Item>
        {/***********************************
         *  Dropdown
         ***********************************/}
        <Dropdown
          open={this.state.dropDownMenuOpen}
          onClick={this.handleDownMenuOpenClose}
          size="massive"
          width="100px"
          position="right"
          icon="th"
          pointing="top right"
          className="link item"
        >
          <Dropdown.Menu>
            <Dropdown.Item
              icon="file"
              text="Save"
              onClick={() => this.child.current.saveSettings()}
            />
            <Dropdown.Item
              icon="download"
              text="Load"
              onClick={() => this.child.current.loadSettings()}
            />
            <Modal
              dimmer="blurring"
              trigger={
                <Dropdown.Item
                  icon="trash"
                  text="Reset"
                  onClick={this.handleModalOpen}
                />
              }
              open={this.state.modalOpen}
              onClose={this.handleModalClose}
              basic
              size="small"
            >
              <Header
                size="huge"
                icon="warning sign"
                content="Confirm Deletion"
              />
              <Modal.Content>
                <p>
                  <Icon size="huge" name="angle double right" />
                  This will delete all of your inputs!
                </p>
                <p>
                  <Icon size="huge" name="angle double right" />
                  Are you sure you want to continue?
                </p>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  size="huge"
                  color="green"
                  onClick={this.handleModalClose}
                  inverted
                >
                  <Icon size="huge" name="checkmark" /> <p>No</p>
                </Button>
                <Button
                  size="huge"
                  color="red"
                  onClick={this.onClickReset}
                  inverted
                >
                  <Icon size="huge" name="delete" /> <p>Delete</p>
                </Button>
              </Modal.Actions>
            </Modal>
            <Dropdown.Item
              icon={this.state.settingsButton}
              text={this.state.settingsText}
              onClick={this.handleClickSettingsButton}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    );
    const workspaceContainer = (
      <Workspace
        playButtonActive={this.state.playButtonActive}
        hideTimeOfStartDimmer={this.props.hideTimeOfStartDimmer}
        currentRangeToneLines={this.state.currentRangeToneLines}
        numerOfrows={5}
        numberOfColumns={16}
        bpm={this.state.bpm}
        ref={this.child}
        tracker={this.state.tracker}
      />
    );
    const settingsMenuContainer = (
      <Transition
        visible={this.state.showSettings}
        animation="fade"
        duration={{ hide: 500, show: 2000 }}
      >
        <Grid>
          <Grid.Column width={2} />
          <Grid.Column width={4}>
            <Segment>
              <h2>Tracker</h2>
              <Radio
                toggle
                checked={this.state.tracker}
                onClick={() => this.onClickTracker()}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment>
              <h2>BPM {this.state.bpm}</h2>
              <Slider
                color="grey"
                inverted={false}
                settings={{
                  start: this.state.bpm,
                  min: 0,
                  max: 120,
                  step: 10,
                  onChange: value => {
                    this.setState({ bpm: value });
                  }
                }}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment>
              <h2>Time {this.state.currentRangeToneLines}</h2>
              <Slider
                color="grey"
                inverted={false}
                settings={{
                  start: this.state.currentRangeToneLines,
                  min: 0,
                  max: 8,
                  step: 1,
                  onChange: value => {
                    if (this.state.playButtonActive) {
                      this.setState({ playButtonActive: false });
                      this.setState({ currentRangeToneLines: value });
                      this.setState({ playButtonActive: true });
                    } else {
                      this.setState({ currentRangeToneLines: value });
                    }
                  }
                }}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column width={2} />
        </Grid>
      </Transition>
    );

    return (
      <div
        style={{
          maxWidth: "1920px",
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        {menuContainer}
        {workspaceContainer}
        {settingsMenuContainer}
      </div>
    );
  }
}
