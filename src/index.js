import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import MainMenu from "./components/mainmenu.jsx";
import "./assets/css/main.sass";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true
    };
    setTimeout(() => {
      this.setState({ active: false });
    }, this.props.hideTimeOfStartDimmer);
  }

  handleHide = () => this.setState({ active: false });

  render() {
    const { active } = this.state;
    const { hideTimeOfStartDimmer } = this.props;
    return (
      <Dimmer.Dimmable
        blurring
        dimmed={active}
        onClick={this.handleHide}
        dimmer={{ active }}
      >
        <MainMenu hideTimeOfStartDimmer={hideTimeOfStartDimmer} />
        <Dimmer active={active} page>
          <Loader size="massive">press F11 for a better experience</Loader>
        </Dimmer>
      </Dimmer.Dimmable>
    );
  }
}

ReactDOM.render(
  <Index hideTimeOfStartDimmer={3000} />,
  document.getElementById("root")
);
