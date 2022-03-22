import { Input, InputGroup, InputRightElement, Button, NumberInput, NumberInputField } from "@chakra-ui/react";
import {ChangeEventHandler} from 'react';

type InputType = {
    val:any;
    onChange: any;
}

const CustomInput = ({val,onChange}:InputType) => {
    return (     
      <NumberInput color="white" value={val} onChange={onChange} border="transparent" placeholder="0.0" maxW="200px">
        <NumberInputField placeholder="0.0" />
      </NumberInput>
    )
}

export default CustomInput;