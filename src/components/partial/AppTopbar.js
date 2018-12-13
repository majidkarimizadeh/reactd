import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';

export class AppTopbar extends Component {

    static defaultProps = {
        onToggleMenu: null
    }

    static propTypes = {
        onToggleMenu: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="layout-topbar clearfix">
                <a href='#' className="layout-menu-button"
                    onClick={this.props.onToggleMenu}>
                    <span className="pi pi-bars"/>
                </a>
                <div>
                    <Menu 
                        popup={true}
                        model={[
                            {label: 'حساب شما', icon: 'pi pi-fw pi-user'},
                            {label: 'خروج', icon: 'pi pi-fw pi-power-off'}
                        ]} 
                        ref={ el => this.menu=el }
                    />
                    <i
                        className='fa fa-user layout-topbar-fa-icon'
                        onClick={ e => this.menu.toggle(e) }
                    />

                    {/*<span className="layout-topbar-search">
                        <InputText type="text" placeholder="Search" />
                        <span className="layout-topbar-search-icon pi pi-search"/>
                    </span>
                    <a>
                        <span className="layout-topbar-item-text">Events</span>
                        <span className="layout-topbar-icon pi pi-calendar"/>
                        <span className="layout-topbar-badge">5</span>
                    </a>
                    <a>
                        <span className="layout-topbar-item-text">Settings</span>
                        <span className="layout-topbar-icon pi pi-cog"/>
                    </a>
                    <a>
                        <span className="layout-topbar-item-text">User</span>
                        <span className="layout-topbar-icon pi pi-user"/>
                    </a>*/}
                </div>
            </div>
        );
    }
}