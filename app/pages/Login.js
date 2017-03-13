import React from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Segment, Header, Icon, Divider } from 'semantic-ui-react';

import store from '../store';
import { login } from '../actions/AuthActions';
import { TextInput } from '../components/FieldInput/SemanticFieldInputs';

const required = value => value ? undefined : 'This field must not be empty';

class Login extends React.Component {
    handleSubmit(formValues) {
        store.dispatch(login({
            email: formValues.email,
            password: formValues.password
        }));
    }

    render() {
        const { handleSubmit, submitting, invalid } = this.props;

        const loginPageStyle = {
            paddingTop: '60px'
        };
        const columnStyle = {
            maxWidth: '450px'
        };

        return (
            <div style={loginPageStyle}>
                <div class="ui middle aligned center aligned grid">
                    <div style={columnStyle}>
                        <Header as="h2" class="teal center aligned">
                            <div class="content">
                                Log-in to your account
                            </div>
                        </Header>
                        <Form className="large" onSubmit={handleSubmit(this.handleSubmit.bind(this))} error={invalid}>
                            <Segment class="stacked">
                                <Field name="email"
                                    attributes={{ id: 'email', type: 'text', placeholder: 'E-mail address', icon: 'mail', iconPosition: 'left'}}
                                    component={TextInput}
                                    validate={[ required ]}/>
                                <Field name="password"
                                    attributes={{ id: 'password', type: 'password', placeholder: 'Password', icon: 'lock', iconPosition: 'left'}}
                                    component={TextInput}
                                    validate={[ required ]}/>
                                <Button fluid type="submit" class="large teal" disabled={submitting}>Login</Button>
                            </Segment>
                        </Form>
                        <Divider hidden/>
                        <Segment class="stacked center aligned">
                            <Link to="register">Sign up for a new account</Link>
                            <Divider horizontal>or, use social login</Divider>
                            <div>
                                <Button color="facebook" href="/auth/facebook">
                                    <Icon name="facebook"/> Facebook
                                </Button>
                                <Button color="twitter" href="/auth/twitter">
                                    <Icon name="twitter"/> Twitter
                                </Button>
                            </div>
                        </Segment>
                    </div>
                </div>
            </div>
        );
    }
}

Login = reduxForm({
    form: 'Login'
})(Login);

export default Login;
