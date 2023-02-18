import { ActivityIndicator, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'

export default function LoadingIndicator() {
  return (
    <View style={tailwind`absolute left-0 right-0 top-0 bottom-0 items-center justify-center bg-[#302227A5]`}>
      < ActivityIndicator size="large" color="#0000ff" />
    </View >
  )
}
