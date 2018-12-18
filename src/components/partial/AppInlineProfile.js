import React, { Component } from 'react';
import { AuthService } from '../../service/AuthService'
import history from '../../utils/history'
import classNames from 'classnames';

export class AppInlineProfile extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.setState({expanded: !this.state.expanded});
        event.preventDefault();
    }

    onLogoutClick() {
        let authService = new AuthService()
        authService.logout()
            .then(() => {
                localStorage.removeItem('token')
                localStorage.removeItem('user_full_name')
                localStorage.removeItem('user_img')
                history.push('/login')
            })
    }

    render() {
        const user_full_name = localStorage.getItem('user_full_name')
        const user_img = localStorage.getItem('user_img')
        return  (
            <div className="profile">
                <div>
                    <img 
                        src={user_img ? user_img : '/assets/layout/images/profile.png'} 
                        alt={user_full_name ? user_full_name : 'welcome'}
                    />
                </div>
                <a className="profile-link" onClick={this.onClick}>
                    <span className="username">
                        {user_full_name ? user_full_name : 'welcome'}
                    </span>
                    <i className="pi pi-fw pi-cog"/>
                </a>
                <ul className={classNames({'profile-expanded': this.state.expanded})}>
                    {/*<li>
                        <a>
                            <span>حساب شما</span>
                            <i className="pi pi-fw pi-user"/>
                        </a>
                    </li>*/}
                    <li onClick={this.onLogoutClick}>
                        <a>
                            <span>Logout</span>
                            <i className="pi pi-fw pi-power-off"/>
                        </a>
                    </li>
                    {/*<li><a><span>پیغام ها</span><i className="pi pi-fw pi-inbox"/><span className="menuitem-badge">2</span></a></li>*/}
                </ul>
            </div>
        );
    }
}