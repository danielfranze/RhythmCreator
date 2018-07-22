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
            animationDuration: 2000,
            numerOfrows: 5,
            numberOfColumns: 16
        }

        setTimeout(() =>{
            this.setState({visible: true});
        }, 0)
        setTimeout(() =>{
            this.setState({visibleLeft: true});
            this.setState({visibleRight: true});
        }, 0)
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })
    
    componentDidMount() {
        this.toggleVisibility
      }
    


    render(){
        const { visible, visibleLeft, visibleRight  } = this.state


        const columns = _.times(this.state.numerOfrows, row => (
        <Grid.Row key={row}>
            <Grid.Column width={1}  textAlign="right" >
                <Transition visible={visibleRight} animation={this.state.animationName} duration={this.state.animationDuration}>
                    <Icon name="volume up" size={this.state.iconSize} onClick={this.toggleVisibility} style={{color:this.state.iconColor}}></Icon>
                </Transition>
            </Grid.Column>

            <Grid.Column width={14}>
                <Grid textAlign='center'>
                    <Grid.Row>{
                        _.times(this.state.numberOfColumns, column => (
                            <Grid.Column key={column}> 
                                <Transition visible={visible} animation={this.state.animationName} duration={this.state.animationDuration}>
                                    <Icon id={row.toString() + column.toString()} name="circle" size={this.state.iconSize} style={{color:this.state.iconColor}}/>  
                                </Transition>
                            </Grid.Column>
                          ))
                    }
                    </Grid.Row>
                </Grid>
            </Grid.Column>

            <Grid.Column width={1}>
                <Transition visible={visibleLeft} animation={this.state.animationName} duration={this.state.animationDuration}>
                    <Icon name="ellipsis vertical" size={this.state.iconSize} style={{color:this.state.iconColor}}></Icon>
                </Transition>
            </Grid.Column>
        </Grid.Row>
        ))
        //const columns = _.times(16, i => (
        //    <Icon name="circle" key={i} style={{position:"relative"}} size="large"/>))   style={{display: "none"}}
        
        
        const result = (
            <Grid celled>
            
            

                {this.props.showPlayobjectProp ? (<div className="playobject" ></div>) : (<div></div>)}
                {columns}
            </Grid>
        )

        return  (result)
    }
}
