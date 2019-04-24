import React, { Component } from 'react';
import * as StoreManager from './storeManager';

const subscribeTo = (name, prop) => (Component) => {

    const store = StoreManager.getStore(name)
    const displayName = Component.displayName || Component.name || 'Component';

    class SubscribedComponent extends Component {

        constructor(props) {
            super(props)
            this.state = {
                data: store.getData({ applicationId: 'app' })
            }
        }

        handleNewData(data) {
            if (this.state.data !== data) 
            {
                this.setState({ data })
            }
        }

        componentWillUpdate(prevProps) {
            if(prevProps.data !== this.props.data) 
            {
                this.setState({ data: store.getData({ applicationId: 'app' }) });
            }
        }

        componentWillMount() {
            this.subscriptionId = store.subscribe(this.handleNewData.bind(this));
        }

        componentWillUnmount() {
            store.unsubscribe(this.subscriptionId);
        }

        render() {
            let dispatch = (type, params = {}) => {
                if (store.isGlobal) 
                {
                    return store.dispatch(type, params)
                }
                return store.dispatch(type, params, { applicationId: 'app' })
            }
            let extras = {
                [prop]: { data: this.state.data, dispatch }
            }
            return <Component {...this.props} {...extras} />;
        }
    }
    SubscribedComponent.displayName = `subscribeTo(${displayName})`;
    SubscribedComponent.original = Component;
    return SubscribedComponent;
}

export default subscribeTo;