export const updateState = (state, property) => {
    return{
        ...state,
        ...property
    }
}