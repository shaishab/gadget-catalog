import React from 'react';
import { Container } from 'semantic-ui-react';
import Footer from '../../components/Footer';
import MessageContainer from '../../containers/MessageContainer';
import NavbarContainer from '../../containers/NavbarContainer';

require('semantic-ui-css/semantic.css');
require('toastr/build/toastr.css');
require('draft-js/dist/Draft.css');
require('./app.css');

export default class App extends React.Component {
    constructor(props) {
        super();
        const { provider, token } = props.location.query;

        if(provider && token) {
            props.loadMeFromExternalApplicationToken(provider, token);
        } else {
            props.loadMeFromApplicationToken();
        }
    }

    render() {
        return (
            <div>
                { this.props.isLoggedIn &&
                    <NavbarContainer/>
                }
                <Container>
                    {this.props.children}
                </Container>
                { this.props.isLoggedIn &&
                    <Footer/>
                }
                <MessageContainer/>
            </div>
        );
    }
}
