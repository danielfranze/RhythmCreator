import _ from 'lodash'
import React, { Component }from 'react'
import { Grid, Icon, Transition} from 'semantic-ui-react'
import StepSequencer from './stepSequencer.jsx';
//import grey from '../assets/sass/main.sass';
import colors from "../assets/js/colors"
//import update from 'immutability-helper';

export default class Workspace extends Component {
    //state = { visible: false }
    constructor(props){
        super(props)

        this.state = {
            visible: false,
            visibleLeft: false,
            visibleRight: false,
            iconSize: 'huge',
            iconColor: colors.grey,
            animationName: 'jiggle',
            animationDuration: 1800,
            numerOfrows: this.props.numerOfrows,
            numberOfColumns: this.props.numberOfColumns,
            displayToneLines: false,
            showToneLineAnimationHide: 0,
            showToneLineAnimationShow: 2000, //mill secs
            stepSequencerMatrix: Array.from(Array(this.props.numerOfrows), () => Array(this.props.numberOfColumns).fill(0)),
            stepSequencerMatrix2: Array.from(Array(this.props.numerOfrows), () => Array(this.props.numberOfColumns).fill(0))
            //bpm: this.props.bpm

        }
        //_.times(this.state.numberOfColumns, column  => (0))

        if(this.props.round == "secound_round"){
            setTimeout(() =>{
                this.setState({displayToneLines: true});
            }, (this.state.animationDuration + 400))
            setTimeout(() =>{
                this.setState({showToneLineAnimationShow: 0 });
            }, this.state.showToneLineAnimationShow + 2000 )



            /*var arrayhelper = []
            _.times(this.state.numerOfrows, row => {
                arrayhelper.push([0])
                _.times(this.state.numberOfColumns, column  => (
                arrayhelper[row][column] = 0
            ))})
            for (var elements in this.state.stepSequencerMatrix){
                _.times(this.state.numberOfColumns, column  => (
                    elements.push(0)
                ))
            }*/
            //console.log("stepSequencerMatrix: " +  this.state.stepSequencerMatrix[1])
            //console.log("single stepSequencerMatrix: " +  this.state.stepSequencerMatrix[0][0])
            
        }
        setTimeout(() =>{
            this.setState({visible: true});
        }, 0)
        setTimeout(() =>{
            this.setState({visibleLeft: true, visibleRight: true});
            //this.setState({visibleRight: true});
        }, 0)
    }

    handleParent = (newValues) => {
        var newStepSequencerMatrix2 = [ [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ]
        newValues.forEach((element, i) =>{

            newStepSequencerMatrix2[element[0]][element[1]] = 2
        })

        this.setState({stepSequencerMatrix2: newStepSequencerMatrix2})

        /*newValues.forEach((element, i) =>{
            newStepSequencerMatrix[element[0]][element[1]] = 1
        })
        
        setTimeout(() =>{
            this.setState({stepSequencerMatrix2: newStepSequencerMatrix})

        }, 100)*/

      }


    deleteFieldsInStepSequencerMatrix = () => {
        this.setState({stepSequencerMatrix: Array.from(Array(this.props.numerOfrows), 
                                            () => Array(this.props.numberOfColumns).fill(0))})
    }
    deleteFieldsInStepSequencerMatrix2 = () => {
        this.setState({stepSequencerMatrix2: Array.from(Array(this.props.numerOfrows), 
                                            () => Array(this.props.numberOfColumns).fill(0))})
    }
    setValueInStepSequencerMatrix = (row, column) =>{
        var newStepSequencerMatrix = _.cloneDeep(this.state.stepSequencerMatrix)
        if(newStepSequencerMatrix[row][column] == 0){
            newStepSequencerMatrix[row][column] = 1
        } else {
            newStepSequencerMatrix[row][column] = 0
        }
        this.setState({stepSequencerMatrix: newStepSequencerMatrix });

    }

    
    setIconColor(row, column){
        if(this.state.stepSequencerMatrix[row][column] == 0){
            return(colors.grey)
        } else if((this.state.stepSequencerMatrix[row][column] == 1) && (this.state.stepSequencerMatrix2[row][column] != 2)){
            return("black")
        } else if(this.state.stepSequencerMatrix2[row][column] == 2){
            return("yellow")
        }

    }

    toggleVisibility = () => {
        this.setState({visible: !this.state.visible })}

    //setAnimation = () =>  this.setState({showToneLineAnimationShow: 0})
    componentDidMount() {
        //this.toggleVisibility
      }

    helperShowToneLine = (row) => {
            if(row == 0){
                return(<Transition visible={false} animation="fade" 
                duration={{hide:this.state.showToneLineAnimationHide,
                show:this.state.showToneLineAnimationShow}}>
                        <span className="toneLineOne"></span>
                      </Transition>)
            } else {
                return (<Transition visible={this.state.displayToneLines} animation="fade" 
                duration={{hide:this.state.showToneLineAnimationHide,
                show:this.state.showToneLineAnimationShow}}>
                            <span className="toneLineOne"></span>
                        </Transition>)
            }
            

    }
    showToneLine = (column, row) => {
        var element =  (this.helperShowToneLine(row))

        var elementInvis =  (<Transition visible={false} animation="fade" 
                                duration={{hide:this.state.showToneLineAnimationHide,
                                show:this.state.showToneLineAnimationShow}}>
                                <span className="toneLineOne"></span>
                            </Transition>)
        return (
            (((column + this.props.CurrentRangeToneLines) % 
            this.props.CurrentRangeToneLines) == 0)  ?  
            element : elementInvis
        )
    }

    render(){
        const { numberOfColumns,
                numerOfrows,
                visible, 
                visibleLeft, 
                visibleRight, 
                animationName,
                animationDuration,
                iconSize,
                iconColor,
                stepSequencerMatrix
        } = this.state


        


        const grid = _.times(numerOfrows, row => (
        <Grid.Row key={row}>
            {/***********************************
            *             Tone Name             *
            ***********************************/}
            <Grid.Column width={1}  textAlign="right" >
                <Transition visible={visibleLeft} 
                            animation={animationName} 
                            duration={animationDuration}>
                    <Icon name="volume up" size={iconSize} onClick={this.toggleVisibility} style={{color:iconColor}}></Icon>
                </Transition>
            </Grid.Column>
            {/***********************************
            *             Tone Fields           *
            ***********************************/}
            <Grid.Column width={14}>
                <Grid textAlign='center'>
                
                    <Grid.Row>{
                        _.times(numberOfColumns, column => (
                            <Grid.Column key={column}> 
                                <Transition visible={visible} animation={animationName} duration={animationDuration}>
                                    <Icon   id={row.toString() + column.toString()} 
                                            name="circle" 
                                            size={iconSize} 
                                            style={{color:this.setIconColor(row, column), cursor: "pointer"}}
                                            /*onClick={this.setValueInStepSequencerMatrix(row, column)}*/
                                            onClick={() => this.setValueInStepSequencerMatrix(row, column)}
                                            //link
                                            >

                                        {/*this.setState({rangeToneLines: this.props.CurrentRangeToneLines})*/}
                                       

                                    </Icon>
                                    
                                </Transition>
                                {/*<Icon name="close" style={{position:"absolute", left: "0.32em", top: "0px"}} size={iconSize}></Icon>*/}
                                {this.showToneLine(column, row)}
                            </Grid.Column>
                          ))
                    }
                    </Grid.Row>
                </Grid>
            </Grid.Column>
            {/***********************************
            *             Tone Menu             *
            ***********************************/}
            <Grid.Column width={1}>
                <Transition visible={visibleRight} animation={animationName} duration={animationDuration}>
                    <Icon name="ellipsis vertical" size={iconSize} style={{color:iconColor}}></Icon>
                </Transition>
            </Grid.Column>
        </Grid.Row>
        ))
        //const columns = _.times(16, i => (
        //    <Icon name="circle" key={i} style={{position:"relative"}} size="large"/>))   style={{display: "none"}}
        
        
        const result = (
            <Grid celled>
                {/*this.props.showPlayobjectProp ? (<div className="playobject" ></div>) : (<div/>)*/}
                {grid}
            </Grid>
        )

        return  (<div>
                    {console.log("Workspace")}
                    {result}<StepSequencer    handleParent={this.handleParent}
                                                numerOfrows ={numerOfrows}
                                                numberOfColumns={numberOfColumns}
                                                stepSequencerMatrix={stepSequencerMatrix}
                                                bpm={this.props.bpm}
                                                playButtonActive={this.props.showPlayobjectProp}
                                                tracker={this.props.tracker}
                                                /></div> )
    }
}
