import React from 'react';
import {Card, Skeleton} from "native-base";
import {AppColor} from "../../constants/AppColor";

function OrderSkeleton(props) {
    const SkeletonList = () => {
        return <Card backgroundColor={AppColor.accent} my={2}>
            <Skeleton.Text px="4" py={1}/>
            <Skeleton.Text px="4" py={1}/>
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

export default OrderSkeleton;