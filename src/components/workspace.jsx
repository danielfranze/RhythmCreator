import React, { Component } from "react";
import _ from "lodash";
import { Grid, Icon, Transition, Popup, Button } from "semantic-ui-react";
import { Slider } from "react-semantic-ui-range";
import StepSequencer from "./stepSequencer.jsx";
import colors from "../assets/js/colors";

export default class Workspace extends Component {
  constructor(props) {
    super(props);
    const empty2DArray = this.twoDimensionalArray(
      this.props.numerOfrows,
      this.props.numberOfColumns,
      0
    );
    const startPitch = this.twoDimensionalArray(this.props.numerOfrows, 1, 0);
    const startVolume = this.twoDimensionalArray(
      this.props.numerOfrows,
      1,
      -12
    );
    const delay = 500;
    this.child = React.createRef();
    this.state = {
      visible: false,
      visibleLeft: true,
      visibleRight: true,
      iconSize: "huge",
      iconColor: colors.grey,
      animationName: "jiggle",
      toneFieldsAnimationName: "flash",
      animationDuration: 1800,
      numerOfrows: this.props.numerOfrows,
      numberOfColumns: this.props.numberOfColumns,
      displayToneLines: false,
      showToneLineAnimationHide: 0,
      showToneLineAnimationShow: 2000,
      stepSequencerMatrix: empty2DArray,
      stepSequencerMatrixTracker: empty2DArray,
      pitch: startPitch,
      volume: startVolume,
      settings: {
        stepSequencerMatrix: empty2DArray,
        pitch: startPitch,
        volume: startVolume
      }
    };
    setTimeout(() => {
      this.setState({ visible: true });
    }, this.props.hideTimeOfStartDimmer + delay);

    setTimeout(() => {
      this.setState({ displayToneLines: true });
    }, this.props.hideTimeOfStartDimmer + this.state.animationDuration + delay);

    setTimeout(() => {
      this.setState({
        stepSequencerMatrix: [
          [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
          [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
          [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
          [0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
          [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0]
        ],
        showToneLineAnimationShow: 0
      });
    }, this.props.hideTimeOfStartDimmer + this.state.animationDuration +
       this.state.showToneLineAnimationShow + delay);
  }

  twoDimensionalArray = (rows, columns, initValue) =>
    Array.from(Array(rows), () => Array(columns).fill(initValue));

  loadSettings = () => {
    this.setState({
      stepSequencerMatrix: this.state.settings.stepSequencerMatrix,
      pitch: this.state.settings.pitch,
      volume: this.state.settings.volume
    });
  };
  saveSettings = () => {
    this.setState({
      settings: {
        stepSequencerMatrix: this.state.stepSequencerMatrix,
        pitch: this.state.pitch,
        volume: this.state.volume
      }
    });
  };
  handleParent = newValues => {
    var newStepSequencerMatrixTracker = this.twoDimensionalArray(
      this.props.numerOfrows,
      this.props.numberOfColumns,
      0
    );
    newValues.forEach((element, i) => {
      newStepSequencerMatrixTracker[element[0]][element[1]] = 2;
    });
    this.setState({
      stepSequencerMatrixTracker: newStepSequencerMatrixTracker
    });
  };
  deleteFieldsInStepSequencerMatrix = () => {
    this.setState({
      stepSequencerMatrix: this.twoDimensionalArray(
        this.props.numerOfrows,
        this.props.numberOfColumns,
        0
      )
    });
  };
  deleteFieldsInStepSequencerMatrixTracker = () => {
    this.setState({
      stepSequencerMatrixTracker: this.twoDimensionalArray(
        this.props.numerOfrows,
        this.props.numberOfColumns,
        0
      )
    });
  };
  setValueInStepSequencerMatrix = (row, column) => {
    this.child.current.playSound(row);
    var newStepSequencerMatrix = _.cloneDeep(this.state.stepSequencerMatrix);
    if (newStepSequencerMatrix[row][column] == 0) {
      newStepSequencerMatrix[row][column] = 1;
    } else {
      newStepSequencerMatrix[row][column] = 0;
    }
    this.setState({ stepSequencerMatrix: newStepSequencerMatrix });
  };
  setIconName(row, column) {
    if (this.state.stepSequencerMatrix[row][column] == 0) {
      return "asexual";
    } else if (this.state.stepSequencerMatrix[row][column] == 1) {
      switch (row) {
        case 0:
          return "circle";
        case 1:
          return "stop";
        case 2:
          return "circle";
        case 3:
          return "stop";
        case 4:
          return "circle";
      }
    }
  }
  setIconColor(row, column) {
    if (this.state.stepSequencerMatrix[row][column] == 0) {
      return colors.grey;
    } else if (
      this.state.stepSequencerMatrix[row][column] == 1 &&
      this.state.stepSequencerMatrixTracker[row][column] != 2
    ) {
      switch (row) {
        case 0:
          return colors.adobeColorCCred01;
        case 1:
          return colors.adobeColorCCred02;
        case 2:
          return colors.adobeColorCCred03;
        case 3:
          return colors.adobeColorCCred04;
        case 4:
          return colors.adobeColorCCred05;
      }
    } else if (this.state.stepSequencerMatrixTracker[row][column] == 2) {
      return colors.yellow;
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible });
  };

  helperShowToneLine = row => {
    if (row == 0) {
      return (
        <Transition
          visible={false}
          animation="fade"
          duration={{
            hide: this.state.showToneLineAnimationHide,
            show: this.state.showToneLineAnimationShow
          }}
        >
          <span className="toneLineOne" />
        </Transition>
      );
    } else {
      return (
        <Transition
          visible={this.state.displayToneLines}
          animation="fade"
          duration={{
            hide: this.state.showToneLineAnimationHide,
            show: this.state.showToneLineAnimationShow
          }}
        >
          <span className="toneLineOne" />
        </Transition>
      );
    }
  };
  showToneLine = (column, row) => {
    var element = this.helperShowToneLine(row);

    var elementInvis = (
      <Transition
        visible={false}
        animation="fade"
        duration={{
          hide: this.state.showToneLineAnimationHide,
          show: this.state.showToneLineAnimationShow
        }}
      >
        <span className="toneLineOne" />
      </Transition>
    );
    return (column + this.props.currentRangeToneLines) %
      this.props.currentRangeToneLines ==
      0
      ? element
      : elementInvis;
  };

  setPattern = (row, numberOfColumnsForPattern) => {
    var newStepSequencerMatrix = _.cloneDeep(this.state.stepSequencerMatrix);
    var newRow = [];
    var pattern = this.state.stepSequencerMatrix[row].slice(
      0,
      numberOfColumnsForPattern
    );

    _.times(
      newStepSequencerMatrix[row].length / numberOfColumnsForPattern,
      round => (newRow = newRow.concat(pattern))
    );

    if (newStepSequencerMatrix[row].length % numberOfColumnsForPattern) {
      newRow = newRow.concat([pattern[0]]);
    }
    newStepSequencerMatrix[row] = newRow;
    this.setState({ stepSequencerMatrix: newStepSequencerMatrix });
  };

  render() {
    const {
      numberOfColumns,
      numerOfrows,
      visible,
      visibleLeft,
      visibleRight,
      animationName,
      toneFieldsAnimationName,
      animationDuration,
      iconSize,
      iconColor,
      stepSequencerMatrix,
      pitch,
      volume
    } = this.state;

    const grid = _.times(numerOfrows, row => (
      <Grid.Row key={row}>
        {/***********************************
         *  Tone Name
         ***********************************/}
        <Grid.Column width={1} textAlign="right">
          <Transition
            visible={visibleLeft}
            animation={animationName}
            duration={animationDuration}
          >
            <Popup
              trigger={
                <Icon
                  name="music"
                  size={iconSize}
                  style={{ color: iconColor, cursor: "pointer" }}
                />
              }
              on="hover"
              hoverable
            >
              <Button.Group size="massive">
                {_.times(5, index => (
                  <React.Fragment key={"pattern_button" + index.toString()}>
                    <Button onClick={() => this.setPattern(row, index + 1)}>
                      <h4>{index + 1}</h4>
                    </Button>
                    {index != 4 ? <Button.Or /> : <div />}
                  </React.Fragment>
                ))}
              </Button.Group>
            </Popup>
          </Transition>
        </Grid.Column>
        {/***********************************
         *  Tone Fields
         ***********************************/}
        <Grid.Column width={14}>
          <Grid textAlign="center">
            <Grid.Row>
              {_.times(numberOfColumns, column => (
                <Grid.Column key={"tonefield" + row.toString() + column.toString()}>
                  <Transition
                    visible={visible}
                    animation={toneFieldsAnimationName}
                    duration={animationDuration}
                  >
                    <Icon
                      id={row.toString() + column.toString()}
                      name={this.setIconName(row, column)}
                      size={iconSize}
                      style={{
                        color: this.setIconColor(row, column),
                        cursor: "pointer"
                      }}
                      onClick={() =>
                        this.setValueInStepSequencerMatrix(row, column)
                      }
                    />
                  </Transition>
                  {this.showToneLine(column, row)}
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </Grid.Column>
        {/***********************************
         *  Tone Menu
         ***********************************/}
        <Grid.Column width={1}>
          <Transition
            visible={visibleRight}
            animation={animationName}
            duration={animationDuration}
          >
            <Popup
              trigger={
                <Icon
                  name="ellipsis vertical"
                  size={iconSize}
                  style={{ color: iconColor }}
                  link
                />
              }
              flowing
              hoverable
              on="click"
            >
              <Grid centered divided columns={2}>
                <Grid.Column textAlign="center">
                  <h3>
                    Pitch <br />
                    {this.state.pitch[row]}
                  </h3>

                  <Slider
                    color="grey"
                    inverted={false}
                    settings={{
                      start: 0,
                      min: -30,
                      max: 30,
                      step: 1,
                      onChange: value => {
                        var newPitch = _.clone(this.state.pitch);
                        newPitch[row] = value;
                        this.setState({ pitch: newPitch });
                      }
                    }}
                  />
                </Grid.Column>
                <Grid.Column textAlign="center">
                  <h3>
                    Volume <br />
                    {this.state.volume[row]}
                  </h3>
                  <Slider
                    color="grey"
                    inverted={false}
                    settings={{
                      start: -12,
                      min: -20,
                      max: 0,
                      step: 1,
                      onChange: value => {
                        var newVolume = _.clone(this.state.volume);
                        newVolume[row] = value;
                        this.setState({ volume: newVolume });
                      }
                    }}
                  />
                </Grid.Column>
              </Grid>
            </Popup>
          </Transition>
        </Grid.Column>
      </Grid.Row>
    ));

    const result = <Grid celled>{grid}</Grid>;

    return (
      <div>
        {result}
        <StepSequencer
          handleParent={this.handleParent}
          numerOfrows={numerOfrows}
          numberOfColumns={numberOfColumns}
          stepSequencerMatrix={stepSequencerMatrix}
          bpm={this.props.bpm}
          playButtonActive={this.props.playButtonActive}
          tracker={this.props.tracker}
          pitch={pitch}
          volume={volume}
          ref={this.child}
        />
      </div>
    );
  }
}
