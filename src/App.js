import React, {Component} from 'react'
import MainView from './components/MainView'
import classNames from 'classnames'
import { AppTopbar } from './components/partial/AppTopbar'
import { AppFooter } from './components/partial/AppFooter'
import { AppMenu } from './components/partial/AppMenu'
import { AppInlineProfile } from './components/partial/AppInlineProfile'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel'
import { MenuService } from './service/MenuService'
import 'font-awesome/css/font-awesome.min.css'
import 'primereact/resources/themes/nova-colored/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'fullcalendar/dist/fullcalendar.css'
import './layout/layout.css'
import './layout/App.css'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menu: [],
            user: {},
            err: null,
            layoutMode: 'static',
            layoutColorMode: 'dark',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false
        }

        this.menuService = new MenuService()
        this.onWrapperClick = this.onWrapperClick.bind(this)
        this.onToggleMenu = this.onToggleMenu.bind(this)
        this.onSidebarClick = this.onSidebarClick.bind(this)
        this.onMenuItemClick = this.onMenuItemClick.bind(this)
    }

    componentDidMount() {
        this.menuService.getMenuItem()
        .then(res => this.setState({ menu: res.menu, user: res.user }))
        .catch(err => this.setState({ err: err.response })  ) 
    }

    onWrapperClick(event) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            })
        }

        this.menuClick = false
    }

    onToggleMenu(event) {
        this.menuClick = true

        if (this.isDesktop()) {
            if (this.state.layoutMode === 'overlay') {
                this.setState({
                    overlayMenuActive: !this.state.overlayMenuActive
                })
            }
            else if (this.state.layoutMode === 'static') {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive
                })
            }
        }
        else {
            const mobileMenuActive = this.state.mobileMenuActive
            this.setState({
                mobileMenuActive: !mobileMenuActive
            })
        }
       
        event.preventDefault()
    }

    onSidebarClick(event) {
        this.menuClick = true
        // setTimeout(() => {this.layoutMenuScroller.moveBar() }, 500)
    }

    onMenuItemClick(event) {
        if(!event.item.items) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            })
        }
    }

    addClass(element, className) {
        if (element.classList)
            element.classList.add(className)
        else
            element.className += ' ' + className
    }

    removeClass(element, className) {
        if (element.classList)
            element.classList.remove(className)
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
    }

    isDesktop() {
        return window.innerWidth > 1024
    }

    componentDidUpdate() {
        if (this.state.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden')
        else
            this.removeClass(document.body, 'body-overflow-hidden')
    }

    render() {

        const { err } = this.state
        if (err) {
            throw err
        }

        let logo = '/assets/layout/images/logo-white.png'

        let wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive
        })
        let sidebarClassName = classNames("layout-sidebar", {'layout-sidebar-dark': this.state.layoutColorMode === 'dark'})

        const { match } = this.props
        return (
            <div className={wrapperClass} onClick={this.onWrapperClick}>
                <AppTopbar onToggleMenu={this.onToggleMenu}/>
                <div ref={(el) => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}>
                    <ScrollPanel ref={(el) => this.layoutMenuScroller = el} style={{height:'100%'}}>
                        <div className="layout-sidebar-scroll-content" >
                            <div className="layout-logo">
                                <img alt="Logo" src={logo} style={{width:'50%'}} />
                            </div>
                            <AppInlineProfile user={this.state.user} />
                            <AppMenu model={this.state.menu} onMenuItemClick={this.onMenuItemClick} />
                        </div>
                    </ScrollPanel>
                </div>
                <div className="layout-main">
                    <Route 
                        path={`${match.url}/:table`}
                        render={props => <MainView {...props} />}
                    />
                </div>
                <AppFooter />
                <div className="layout-mask"></div>
            </div>
        )
    }
}
export default withRouter(App)
