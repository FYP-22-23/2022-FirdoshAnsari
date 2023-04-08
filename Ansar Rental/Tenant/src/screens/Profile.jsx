import React from 'react';
import {Platform} from 'react-native';

import {Block, Image, Text} from '../components';
import {useData, useTheme, useTranslation} from '../hooks';

const isAndroid = Platform.OS === 'android';

const Profile = () => {
    const {t} = useTranslation();
    // const navigation = useNavigation();
    const {assets, colors, sizes} = useTheme();

    const {user} = useData()

    if (user === null) return null

    return (<Block safe marginTop={sizes.md}>
        <Block
            scroll
            paddingHorizontal={sizes.s}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: sizes.padding}}>
            <Block flex={0}>
                <Image
                    background
                    resizeMode="cover"
                    padding={sizes.sm}
                    paddingBottom={sizes.l}
                    radius={sizes.cardRadius}
                    source={assets.background}>
                </Image>

                {/* profile: stats */}
                <Block
                    flex={0}
                    radius={sizes.sm}
                    shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                    marginTop={-sizes.l}
                    marginHorizontal="8%"
                    color="rgba(255,255,255,0.2)">
                    <Block
                        row
                        blur
                        flex={0}
                        intensity={100}
                        radius={sizes.sm}
                        overflow="hidden"
                        tint={colors.blurTint}
                        justify="space-evenly"
                        paddingVertical={sizes.sm}
                        renderToHardwareTextureAndroid>
                        <Block align="center">
                            <Text h5>{user.user.room_no}</Text>
                            <Text>Room Number</Text>
                        </Block>
                        <Block align="center">
                            <Text h5>{user.user.monthly_room_rent}</Text>
                            <Text>Monthly Rent</Text>
                        </Block>
                    </Block>
                </Block>
            </Block>
        </Block>
    </Block>);
};

export default Profile;
