import React from 'react';

import classes from './Input.css';

const input = (props) => {

    let input;

    switch(props.inputtype){
        case 'input': input = <input onChange={props.input} {...props.tagattributes} />
            break;
        case 'textarea': input = <textarea onChange={props.input} {...props.tagattributes}/> 
            break;
        case 'select' : input = 
                                <select onChange={props.input} {...props.tagattributes}>
                                    {props.options.map((option)=>{
                                        return <option key={option.value} value={option.value}>{option.viewValue}</option>
                                    })}
                                </select>
            break;
        default:
            input = <input {...props} />
    }

    let classNames = [classes.Input];
    if(props.shouldValidate && props.touched && props.invalid ){
        classNames.push(classes.Invalid);
    }
    return(
        <div className={classNames.join(' ')}>
            {input}
        </div>
    );
}

export default input;