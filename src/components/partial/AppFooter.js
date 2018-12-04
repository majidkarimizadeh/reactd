import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class AppFooter extends Component {

    render() {
        return  (
            <div className="layout-footer">
                <span className="footer-text">
                	Powered by&#160;
            		<Link target="_blank" to="//github.com/majidkarimizadeh/reactd">
            			Reactd
            		</Link>
                </span>
                {/*<img src="assets/layout/images/logo.svg" alt="" width="80"/>
                <span className="footer-text" style={{'marginLeft': '5px'}}>Theme and Layout</span>*/}
            </div>
        );
    }
}