import React from 'react';
import { View, Platform } from 'react-native';
import tw from 'twrnc';

const MarginWrapper = ({ children }) => {
    // if platform is Android, wrap children with MarginWrapper
    if (Platform.OS === 'android') {
        return <View style={tw`mt-10`}>{children}</View>;
    }

    // if platform is not Android, render children as is
    return <>{children}</>;
};

export default MarginWrapper;