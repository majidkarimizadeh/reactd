import { Map }           from 'immutable'
import { registerStore } from './lib/storeManager'

export const ActionTypes = {
    FETCH: 'FETCH',
    CREATE_CLASS: 'CREATE_CLASS',
    DROP_CLASS: 'DROP_CLASS',
    ADD_COLUMN: 'ADD_COLUMN',
    DROP_COLUMN: 'DROP_COLUMN',
    SET_CLP: 'SET_CLP',
}

function MainViewStore(state, action) {
    
    switch (action.type) 
    {
        case ActionTypes.FETCH:
            if (state && new Date() - state.get('lastFetch') < 60000) 
            {
                return Promise.resolve(state)
            }
            return action.app.apiRequest(
                'GET',
                'schemas',
                {},
                { useMasterKey: true }
            ).then(({ results }) => {
                let classes = {}
                let CLPs = {}
                if (results) {
                    results.forEach(({ className, fields, classLevelPermissions }) => {
                        classes[className] = Map(fields)
                        CLPs[className] = Map(classLevelPermissions)
                    })
                }
                return Map({
                    lastFetch: new Date(),
                    classes: Map(classes),
                    CLPs: Map(CLPs)
                })
            })
        case ActionTypes.CREATE_CLASS:
            return action.app.apiRequest(
                'POST',
                'schemas/' + action.className,
                { className: action.className },
                { useMasterKey: true }
            ).then(({ fields }) => {
                return state
                    .setIn(['classes', action.className], Map(fields))
                    .setIn(['CLPs', action.className], Map({}))
            })
        case ActionTypes.DROP_CLASS:
            return action.app.apiRequest(
                'DELETE',
                'schemas/' + action.className,
                {},
                { useMasterKey: true }
            ).then(() => {
                return state
                    .deleteIn(['classes', action.className])
                    .deleteIn(['CLPs', action.className])
            })
        case ActionTypes.ADD_COLUMN:
            let newField = {
                [action.name]: {
                    type: action.columnType
                }
            }
            if (action.columnType === 'Pointer' || action.columnType === 'Relation') {
                newField[action.name].targetClass = action.targetClass
            }
            return action.app.apiRequest(
                'PUT',
                'schemas/' + action.className,
                { className: action.className, fields: newField },
                { useMasterKey: true }
            ).then(({ fields }) => {
                return state.setIn(['classes', action.className], Map(fields))
            })
        case ActionTypes.DROP_COLUMN:
            let droppedField = {
                [action.name]: {
                    __op: 'Delete'
                }
            }
            return action.app.apiRequest(
                'PUT',
                'schemas/' + action.className,
                { className: action.className, fields: droppedField },
                { useMasterKey: true }
            ).then(({ fields }) => {
                return state.setIn(['classes', action.className], Map(fields))
            })
        case ActionTypes.SET_CLP:
            return action.app.apiRequest(
                'PUT',
                'schemas/' + action.className,
                { classLevelPermissions: action.clp },
                { useMasterKey: true }
            ).then(({ classLevelPermissions, className }) => {
                return state.setIn(['CLPs', className], Map(classLevelPermissions))
            })
    }
}

registerStore('MainView', MainViewStore)
