import { Input, InputGroup, InputRightElement, Button, NumberInput, NumberInputField } from "@chakra-ui/react";
import {ChangeEventHandler} from 'react';

type InputType = {
    val:any;
    onChange: any;
}

const CustomInput = ({val,onChange}:InputType) => {
    return (     
      <NumberInput value={val} onChange={onChange} border="transparent" placeholder="0.0" >
        <NumberInputField />
      </NumberInput>
    )
}

export default CustomInput;