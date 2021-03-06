import { Input, InputGroup, InputRightElement, Button, NumberInput, NumberInputField } from "@chakra-ui/react";
import {ChangeEventHandler} from 'react';

type InputType = {
    val:any;
    onChange: any;
    onBlur?: () => void;
}

const CustomInput = ({val,onChange, onBlur}:InputType) => {
    return (     
      <NumberInput color="white" value={val} onBlur={onBlur} onChange={onChange} border="transparent" placeholder="0.0" maxW="200px">
        <NumberInputField placeholder="0.0" />
      </NumberInput>
    )
}

export default CustomInput;