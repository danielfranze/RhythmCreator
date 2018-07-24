//import _ from 'lodash'
import React, { Component }from 'react'
import { Grid, Image, Icon, Transition} from 'semantic-ui-react'
import Pizzicato from "pizzicato";

import mp3 from '../audio/hh.wav';


export default class StepSequencer extends React.Component {
    constructor(props){
        super(props)
        this.state = {


        }
    }

    render(){
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
        
        var sound = new Pizzicato.Sound(mp3, function() {
            //snare.frequency = 66666;
            var lowPassFilter = new Pizzicato.Effects.LowPassFilter({
                frequency: 500,
                peak: 0
            });
            sound.addEffect(lowPassFilter);
            sound.play();
            sound.play();
        });
        //var bass = new Pizzicato.Sound(mp3);
        //bass.play();

        //var sawtoothWave = new Pizzicato.Sound(mp3);
        //var delay = new Pizzicato.Effects.Delay();
        //sawtoothWave.addEffect(delay);
        //sawtoothWave.play();



        return  (<div></div>)
    }
}
