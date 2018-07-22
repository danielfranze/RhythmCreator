import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MainMenu from './components/mainmenu.jsx';
import Workspace from './components/workspace.jsx';
import ControlArea from './components/controlarea.jsx';

import { Dimmer, Header,Icon} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './sass/main.sass';


class Index extends Component {

    handleShow = () => this.setState({ active: true })
    handleHide = () => this.setState({ active: false })

    constructor(props){
        super(props)

        this.state = {
            active: true,
            
        }

        setTimeout(() =>{
            this.setState({active: false});
        }, 2500)

    }

    exitWithoutDimmer(){
        const { active } = this.state
        const getComponentsFromComponentsListProps = (
            <div>
                {this.props.componentsList.map(function(listValue, i){
                    return <div key={i}>{listValue}</div>;
                })}
            </div>
        )

        if(this.state.active == true){
            return(
            <Dimmer.Dimmable   blurring dimmed={active} onClick={this.handleHide} dimmer={{active}} >

                {getComponentsFromComponentsListProps}

                <Dimmer active={active} inverted page>
                    <Icon name="warning sign" size="massive" /><Header size='huge' content='WORK IN PROGRESS'/>
                </Dimmer>
            </Dimmer.Dimmable>)
        } else {
            return(<div>{getComponentsFromComponentsListProps}</div>)
        }
    }
    render(){
        
        return (
            this.exitWithoutDimmer()

            
        );
    }
}


ReactDOM.render(<Index componentsList={[<MainMenu />,<Workspace />,<ControlArea />]}/>, document.getElementById('root'));