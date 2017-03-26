import React, { Component, PropTypes} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class NavBar extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    renderLinks(){
        const checkLoc = this.context.router.isActive;
        if(this.props.authenticated){
            // show linkto sign out
            return [
                <li className={ 'nav-item ' + (checkLoc('/main', true) ? 'active' : '') } key={1}>
                    <Link className="nav-link" to={'/main'}>Main Page</Link>
                </li>,
                <li className='nav-item float-sm-right' key={2}>
                    <Link className="nav-link" to={'/signout'}>Signout</Link>
                </li>
            ]
        } else {
            // show link to sign in or sign up
            return(
                <li className={ 'nav-item float-sm-right ' + (checkLoc('/signin', true) ? 'active' : '') }>
                        <Link className="nav-link" to={'/signin'}>Signin</Link>
                </li>
            );
        }         
    }

    render() {
        const checkLoc = this.context.router.isActive;
        return (
            <nav className="navbar navbar-dark bg-inverse">
                <ul className="nav navbar-nav container">
                    <Link to='/' className='navbar-brand'>Test App</Link>
                    <li className={ 'nav-item ' + (checkLoc('/about', true) ? 'active' : '') }>
                        <Link className="nav-link" to={'/about'}>About author</Link>
                    </li>
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }
}

function mapStateToProps(state){
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(NavBar);
