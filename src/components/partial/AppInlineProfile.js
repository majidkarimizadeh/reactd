import React, { Component } from 'react';
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

    render() {
        const { user } = this.props
        return  (
            <div className="profile">
                <div>
                    <img 
                        src={user.img ? user.img : '/assets/layout/images/profile.png'} 
                        alt=""
                    />
                </div>
                <a className="profile-link" onClick={this.onClick}>
                    <span className="username">
                        {user.name}
                    </span>
                    <i className="pi pi-fw pi-cog"/>
                </a>
                <ul className={classNames({'profile-expanded': this.state.expanded})}>
                    <li><a><span>حساب شما</span><i className="pi pi-fw pi-user"/></a></li>
                    {/*<li><a><span>پیغام ها</span><i className="pi pi-fw pi-inbox"/><span className="menuitem-badge">2</span></a></li>*/}
                    <li><a><span>خروج</span><i className="pi pi-fw pi-power-off"/></a></li>
                </ul>
            </div>
        );
    }
}