import _ from 'lodash'
import React, { Component }from 'react'
import { Grid, Icon, Transition} from 'semantic-ui-react'
//import '../sass/main.sass';

export default class Workspace extends Component {
    state = { visible: false }
    constructor(props){
        super(props)

        this.state = {
            visible: false,
            visibleLeft: false,
            visibleRight: false,
            iconSize: 'huge',
            iconColor: '#D3D3D3',
            animationName: 'jiggle',
            animationDuration: 1800,
            numerOfrows: 5,
            numberOfColumns: 16,
            displayToneLines: false,

        }

        if(this.props.round == "secound_round"){
            setTimeout(() =>{
                this.setState({displayToneLines: true});
            }, (this.state.animationDuration + 400))
        }

        setTimeout(() =>{
            this.setState({visible: true});
        }, 0)
        setTimeout(() =>{
            this.setState({visibleLeft: true, visibleRight: true});
            //this.setState({visibleRight: true});
        }, 0)
    }

    toggleVisibility = () => this.setState({visible: !this.state.visible })
    componentDidMount() {
        this.toggleVisibility
      }

    helperShowToneLine(row){
            if(row == 0){
                return(<Transition visible={false} animation="fade" duration={"0"}>
                        <span className="toneLineOne"></span>
                      </Transition>)
            } else {
                return (<Transition visible={this.state.displayToneLines} animation="fade" duration={"0"}>
                            <span className="toneLineOne"></span>
                        </Transition>)
            }
            

    }
    showToneLine(column, row){

        var hide = 0
        var show = 0

        
        var element =  (this.helperShowToneLine(row))

        var elementInvis =  (<Transition visible={false} animation="fade" duration={{hide,show}}>
                            <span className="toneLineOne"></span>
                        </Transition>)
        return (
            (((column + this.props.CurrentRangeToneLines) % this.props.CurrentRangeToneLines) == 0)  ?  element : elementInvis
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
                iconColor
        } = this.state


        const grid = _.times(numerOfrows, row => (
        <Grid.Row key={row}>
            {/***********************************
            *             Tone Name             *
            ***********************************/}
            <Grid.Column width={1}  textAlign="right" >
                <Transition visible={visibleLeft} animation={animationName} duration={animationDuration}>
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
                                    <Icon id={row.toString() + column.toString()} name="circle" size={iconSize} style={{color:iconColor}}>

                                        {/*this.setState({rangeToneLines: this.props.CurrentRangeToneLines})*/}
                                       {this.showToneLine(column, row)}

                                    </Icon>
                                </Transition>
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
                {this.props.showPlayobjectProp ? (<div className="playobject" ></div>) : (<div/>)}
                {grid}
            </Grid>
        )

        return  (result)
    }
}
