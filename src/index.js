import React from 'react';
import ReactDOM from 'react-dom';

import MainMenu from './components/mainmenu.jsx';
import Workspace from './components/workspace.jsx';
import ControlArea from './components/controlarea.jsx';

import './sass/main.sass';
//import * as semantic from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class Main extends React.Component {
    render(){
        return (
            <div>
                <MainMenu />
                <Workspace />
                <ControlArea />
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));