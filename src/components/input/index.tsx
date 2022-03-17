import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import {ChangeEventHandler} from 'react';

type InputType = {
    val:any;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

const CustomInput = ({val,onChange}:InputType) => {
    return (
        
    <InputGroup size='md' width="100%">
        <Input placeholder='0.0' color="white" value={val} onChange={onChange} step="0.00001" border="transparant"  />
    {/* <InputRightElement width='4.5rem'>
      <Button h='1.75rem' size='sm' >
        Clear
      </Button>
    </InputRightElement> */}
  </InputGroup>
    )
}

export default CustomInput;