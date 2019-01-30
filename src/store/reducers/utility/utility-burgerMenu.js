import { PRICES } from '../../../components/BurgerMenu/BurgerMenu';

export const updateState = (state, property={}, ing={}) => {
    return {
        ...state,
        ingredients:{
            ...state.ingredients,
            ...ing
        },
        ...property
    }
}

export const getPrice = (ingredients) => {
    let price = 3.00;
    for(let ing in ingredients){
        price += PRICES[ing] * ingredients[ing]
    }
    return price;
}