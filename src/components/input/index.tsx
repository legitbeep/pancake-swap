import { Input } from "@chakra-ui/react";
import {ChangeEventHandler} from 'react';

type InputType = {
    val:any;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

const CustomInput = ({val,onChange}:InputType) => {
    return (
        <Input placeholder='0.0' value={val} onChange={onChange} step="0.00001" min="0.0" />
    )
}

export default CustomInput;