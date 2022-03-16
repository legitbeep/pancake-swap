import { DeepPartial, Theme } from "@chakra-ui/react";

/** @extend additional colors here */
const extendedColors = {
    brand: {
        primary : "rgb(31, 199, 212)",
        prShadow : "rgba(31, 199, 212,0.75)",
        secondary : "rgb(162, 139, 212)",
        srShadow : "rgba(162, 139, 212,0.5)",
      },
}

/** @override chakra colors here */
const overrideChakraColors: DeepPartial<Theme["colors"]> = {};

const colors = {
    ...overrideChakraColors,
    ...extendedColors,
};

export default colors;