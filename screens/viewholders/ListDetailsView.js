import React from 'react';
import {Box, Heading, Spacer, Text, VStack} from "native-base";

function ListDetailsView({heading, value}) {
    return (
        <Box borderBottomColor={"black"}
             borderBottomWidth={1}
             py={3}>
            <VStack>
                <Heading fontSize={"sm"} my={2}>{heading}</Heading>
                <Text>{value}</Text>
                <Spacer/>
            </VStack>
        </Box>
    );
}

export default ListDetailsView;