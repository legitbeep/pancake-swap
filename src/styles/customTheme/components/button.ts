import { DeepPartial, Theme } from "@chakra-ui/react";
import { whiten } from '@chakra-ui/theme-tools';

const Button = {
    baseStyle : {
        borderRadius : "full",
    },
    variants : {
        primary : {
            bg: "brand.primary",
            color : 'white',
            boxShadow:  "10px 8px 100px brand.prShadow",
            _hover : {
                boxShadow: "lg",
                opacity:  "0.75"
            },
            transition: "all 2s ease",
        },
        
        secondary : {
            bg: "brand.secondary",
            color : 'white',
            _hover : {
                opacity : "0.75"
            }
        }
    }
}

export default Button;