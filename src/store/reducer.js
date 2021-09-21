import * as constants from './constants'

const defaultState = {
    myData: null
}

export default (state = defaultState, action) => {
    let newState = Object.assign({}, state)
    switch(action.type) {
        case constants.SETDATA:
            newState.myData = action.data
            return newState
        default:
            return state
    }
}