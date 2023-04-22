import React from 'react';
import {Card, Center, Skeleton, VStack} from "native-base";
import {AppColor} from "../../constants/AppColor";

function ProductSkeleton(props) {

    const SkeletonList = () => {
        return <Card backgroundColor={AppColor.accent} mx={4} my={2}>
                <Skeleton.Text px="4"/>
            </Card>

    }
    return (
        <>
            <SkeletonList/>
            <SkeletonList/>
            <SkeletonList/>
            <SkeletonList/>
            <SkeletonList/>
            <SkeletonList/>
        </>
    );
}

export default ProductSkeleton;