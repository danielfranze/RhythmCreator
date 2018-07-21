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
            iconColor: '#D3D3D3'
        }

        setTimeout(() =>{
            this.setState({visible: true});
        }, 700)
        setTimeout(() =>{
            this.setState({visibleLeft: true});
            this.setState({visibleRight: true});
        }, 1700)
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })
    
    componentDidMount() {
        this.toggleVisibility
      }
    


    render(){
        const { visible, visibleLeft, visibleRight  } = this.state

        const toneFields = _.times(16, i => (
            //this.test.bind(i)
            //this.initColumns(i)

            <Grid.Column key={i}> 
                <Transition visible={visible} animation='jiggle' duration={1000}>
                    <Icon name="circle" size={this.state.iconSize} style={{color:this.state.iconColor}}/>  
                </Transition>
            </Grid.Column>

          ))

        const columns = _.times(5, i => (
        <Grid.Row key={i}>
            <Grid.Column width={1}  textAlign="right" >
                <Transition visible={visibleRight} animation='jiggle' duration={2000}>
                    <Icon name="volume up" size={this.state.iconSize} onClick={this.toggleVisibility} style={{color:this.state.iconColor}}></Icon>
                </Transition>
            </Grid.Column>

            <Grid.Column width={14}>
                <Grid textAlign='center'><Grid.Row>{toneFields}</Grid.Row></Grid>
            </Grid.Column>

            <Grid.Column width={1}>
                <Transition visible={visibleLeft} animation='jiggle' duration={2000}>
                    <Icon name="ellipsis vertical" size={this.state.iconSize} style={{color:this.state.iconColor}}></Icon>
                </Transition>
            </Grid.Column>
        </Grid.Row>
        ))
        //const columns = _.times(16, i => (
        //    <Icon name="circle" key={i} style={{position:"relative"}} size="large"/>))
        
        
        const result = (
            <Grid celled>{columns}</Grid>
        )

        return  (result)
    }
}
