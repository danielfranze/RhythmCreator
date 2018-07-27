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

    componentDidMount() {
        this.initPlayers()
        // wait for buffer
        Tone.Buffer.on('load', () => {this.initLoop()})
        
      }

    render(){

        //this.initPlayers()
        /*var pitch = new Tone.PitchShift ({
            pitch  : 0 ,
            windowSize  : 0.01 ,
            delayTime  : 0 ,
            feedback  : 0
            }).toMaster();
    
    
        var player = new Tone.Player({
            "url" : sound2,
            "loop" : false,
            "volume": 10
        }).connect(pitch);*/
        /*let loop = new Tone.Sequence(function(time, col){
            console.log(col);

        }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");*/
        this.state.loop.start()
        
        Tone.Transport.start();
        Tone.Transport.bpm.value = 100;

        //Tone.Buffer.on('load', () => {
            //all buffers are loaded.	
            //player.volume.value = 0
            //player.start()
        //    this.state.players[4][0].start();

            //player1.start()
        //})









        /*Tone.Buffer.onload = ()  => {
            player.start();
        }*/
        /*var sawtoothWave = new Pizzicato.Sound('../audio/hh.wav', function() {
            sawtoothWave.play();
        });
        var sawtoothWave = new Pizzicato.Sound({ 
            source: 'wave',
            options: {
                type: 'sawtooth'
            }
        });
        var delay = new Pizzicato.Effects.Delay();
        sawtoothWave.addEffect(delay);
        sawtoothWave.play();
        sawtoothWave.frequency = 1780;*/
        //var drums = new Pizzicato.Sound('./kick.mp3');
        //drums.play();
        //var acousticGuitar = new Pizzicato.Sound({Audio});
        //acousticGuitar.play();
        //console.log();
        this.props.handleParent();
        //var pwm = new Tone.PWMOscillator("Bb3").toMaster().start();
        //var pwm = new Tone.PWMOscillator("Bb3").toMaster().start();

        //var vel = Math.random() * 0.5 + 0.5;
        //var player = new Tone.Player('../assets/audio/hh.wav').toMaster().start(3, 0, "32n", 0, vel);
        //player.start()

       /*var player1 = new Tone.Player(mp3).toMaster();

         Tone.Buffer.onload = ()  => {
            player1.start();
         }


        var PLAYERS = {}

        var player = new Tone.Player(mp3, ()  => { });
        player.toMaster();
        
        function playNotes() {
          player.start;
        }

        playNotes()*/


        //var player = new Tone.Player("./sound.mp3", function(){
            //the player is now ready	
        //}).toMaster().start();





















        /*var sound = new Pizzicato.Sound(mp3, function() {
            //snare.frequency = 66666;
            var lowPassFilter = new Pizzicato.Effects.LowPassFilter({
                frequency: 500,
                peak: 0
            });
            sound.addEffect(lowPassFilter);
            sound.play();
            sound.play();
            
        });*/

        
        /*this.state.sound2.play();*/
        /*var drums = new Pizzicato.Sound(mp3);
        var guitar = new Pizzicato.Sound(mp3);
        var group = new Pizzicato.Group();
        
        group.addSound(drums)
        group.addSound(guitar)*/
        
        /*var acousticGuitar = new Pizzicato.Sound(mp3, () => {
            // Sound loaded!
            acousticGuitar.play();
        });*/
        //ar acousticGuitar = new Pizzicato.Sound(mp3, );
       // acousticGuitar[1] = () => {acousticGuitar.play()}
        //var bass = new Pizzicato.Sound(mp3);
        //bass.play();

        //var sawtoothWave = new Pizzicato.Sound(mp3);
        //var delay = new Pizzicato.Effects.Delay();
        //sawtoothWave.addEffect(delay);
        //sawtoothWave.play();

       // var drums = new Pizzicato.Sound(mp3);


        

        return  (<div></div>)
    }
}
