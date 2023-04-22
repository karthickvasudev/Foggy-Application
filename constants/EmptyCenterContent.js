import React from 'react';
import {Center, Text} from "native-base";

function EmptyCenterContent({content}) {
    return (
        <Center mt={5}>
            <Text>{content}</Text>
        </Center>
    );
}

export default EmptyCenterContent;