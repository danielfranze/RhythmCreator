import React from 'react';
import ReactDOM from 'react-dom';
import MainMenu from './components/mainmenu.jsx';
import Workspace from './components/workspace.jsx';
import ControlArea from './components/controlarea.jsx';

import { Dimmer, Segment, Loader, Header,Icon, Button} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './sass/main.sass';
//import * as semantic from 'semantic-ui-react';

//import { Menu, Icon, Header, Dropdown, Modal, Button, Dimmer, Loader} from 'semantic-ui-css/semantic.min.css';


class Index extends React.Component {
    //state = {active:true}

    handleShow = () => this.setState({ active: true })
    handleHide = () => this.setState({ active: false })

    constructor(props){
        super(props)

        this.state = {
            active: true
        }

        setTimeout(() =>{
            this.setState({active: false});
        }, 2500)

    }

    exitWithoutDimmer(){
        const { active } = this.state

        const content = (
            <div>
              <Header as='h2' inverted>
                Title
              </Header>
      
              <Button primary>Add</Button>
              <Button>View</Button>
            </div>
          )

        if(this.state.active == true){
            return(
            <Dimmer.Dimmable   blurring dimmed={active} onClick={this.handleHide} 
            
            dimmer={{active, content }}
            >

                <MainMenu />
                <Workspace />
                <ControlArea />
                <Dimmer active={active} inverted page>
                <Icon name="warning sign" size="massive" /><Header size='huge' content='WORK IN PROGRESS'/>
          </Dimmer>
            </Dimmer.Dimmable>)
        } else {
            return(
            <div>
                <MainMenu />
                <Workspace />
                <ControlArea />
            </div>)
        }
    }
    render(){
        
        return (
            this.exitWithoutDimmer()

            
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));