import _ from "lodash";
import React, { Component } from "react";
import Tone from "tone";
import sound1 from "../assets/audio/drum-samples/R8/hihat.wav";
import sound2 from "../assets/audio/drum-samples/R8/kick.wav";
import sound3 from "../assets/audio/drum-samples/R8/snare.wav";
import sound4 from "../assets/audio/drum-samples/R8/tom2.wav";
import sound5 from "../assets/audio/drum-samples/R8/tom3.wav";

export default class StepSequencer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: Array.from(Array(this.props.numerOfrows), () =>
        Array(2).fill(0)
      ),
      loop: new Tone.Sequence()
    };
  }

  initPlayers = () => {
    var sounds = [sound1, sound2, sound3, sound4, sound5];
    var newPlayers = this.state.players;

    newPlayers.forEach((element, index) => {
      element[1] = new Tone.PitchShift({
        pitch: this.props.pitch[index],
        windowSize: 0.01,
        delayTime: 0,
        feedback: 0
      }).toMaster();

      element[0] = new Tone.Player({
        url: sounds[index],
        loop: false,
        volume: this.props.volume[index]
      }).connect(element[1]);
    });

    this.setState({ players: newPlayers });
  };

  initLoop = () => {
    this.setState({
      loop: new Tone.Sequence(
        (time, column) => {
          if (this.props.tracker) {
            var newValuesForStepSequencerMatrix = [];
          }

          this.props.stepSequencerMatrix.forEach((element, row) => {
            if (element[column] == 0) {
            } else if (element[column] == 1 || element[column] == 2) {
              this.state.players[row][0].volume.value = this.props.volume[row];
              this.state.players[row][1].pitch = this.props.pitch[row];
              this.state.players[row][0].start();

              if (this.props.tracker) {
                newValuesForStepSequencerMatrix.push([row, column]);
              }
            }
          });
          if (
            this.props.tracker &&
            newValuesForStepSequencerMatrix.length != 0
          ) {
            this.props.handleParent(newValuesForStepSequencerMatrix);
          }
        },
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        "16n"
      )
    });
  };

  componentDidMount() {
    this.initPlayers();

    Tone.Buffer.on("load", () => {
      this.initLoop();
    });
  }

  playSound = row => {
    this.state.players[row][0].start();
  };

  render() {
    this.state.loop.start();

    Tone.Transport.bpm.value = this.props.bpm;

    this.props.playButtonActive
      ? Tone.Transport.start()
      : Tone.Transport.pause();

    return <div />;
  }
}
