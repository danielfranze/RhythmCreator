//import _ from 'lodash'
import React, { Component } from 'react'
import { Grid, Image, Icon, Transition} from 'semantic-ui-react'
//import Pizzicato from "pizzicato";
import Tone from "tone";


import sound1 from '../assets/audio/drum-samples/R8/hihat.wav';
import sound2 from '../assets/audio/drum-samples/R8/kick.wav';
import sound3 from '../assets/audio/drum-samples/R8/snare.wav';
import sound4 from '../assets/audio/drum-samples/R8/tom2.wav';
import sound5 from '../assets/audio/drum-samples/R8/tom3.wav';

/*var freqEnv = new Tone.FrequencyEnvelope({
    baseFrequency  : 3200 ,
    octaves  : 4 ,
    exponent  : 2
    }).toMaster();*/
//player.frequency.value = 100;
//freqEnv.connect(player).toMaster();


export default class StepSequencer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            players: Array.from(Array(this.props.numerOfrows), () => Array(2).fill(0)),
            loop: new Tone.Sequence()


        }

    }




    initPlayers = () => {
        var sounds = [sound1,sound2,sound3,sound4,sound5]
        var newPlayers = this.state.players

        newPlayers.forEach((element, index) => {
            //console.log("element0: " + element[0].toString());
            //console.log("element1: " + element[1].toString());
            element[1] = new Tone.PitchShift ({
                pitch  : 0 ,
                windowSize  : 0.01 ,
                delayTime  : 0 ,
                feedback  : 0
                }).toMaster();
                
            element[0] = new Tone.Player({
                "url" : sounds[index],
                "loop" : false,
                "volume": -10
            }).connect(element[1]);
                
          });

        this.setState({players: newPlayers})
    }

    initLoop = () => {
        this.setState({loop: new Tone.Sequence((time, column) => {
            //console.log(col)
            this.props.stepSequencerMatrix.forEach((element, index)=>{
                if(element[column] == 1){
                    this.state.players[index][0].start()
                }
            })
            //this.state.players[4][0].start()
        }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n")})
    }

    startAndStopLoop = () =>{
        if(this.props.play){
            Tone.Transport.stop()
        }else{
            Tone.Transport.start()
        }
    }

    componentDidMount() {
        this.initPlayers()
        // wait for buffer
        Tone.Buffer.on('load', () => {this.initLoop()})
        
      }

    render(){

        
        this.state.loop.start()
        Tone.Transport.bpm.value = this.props.bpm;
        Tone.Transport.swing = this.props.swing;


        //this.state.play = this.props.playButtonActive

        this.props.playButtonActive ? Tone.Transport.start() : (
            Tone.Transport.pause())

        this.props.handleParent();
        
        return  (<div></div>)
    }
}
