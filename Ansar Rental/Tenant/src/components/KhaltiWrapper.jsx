import React from 'react';

import {Platform} from 'react-native';

import WebView from 'react-native-webview';

export default function KhaltiWrapper(props) {

const webRef = React.createRef();

const myvar =

'<html>' +

'<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">' +

'<head>' +

' <script src="https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.22.0.0.0/khalti-checkout.iffe.js"></script>' +

'</head>' +

'<body>' +

' <script>' +

' var config = {' +

` "publicKey": "${props.secretKey}",` +

` "productIdentity": "${props.productIdentity}",` +

` "productName": "${props.productName}",` +

` "productUrl": "${props.productUrl}",` +

` "paymentPreference": [

"KHALTI",

"EBANKING",

"MOBILE_BANKING",

"SCT",

],` +

' "eventHandler": {' +

' onSuccess(payload) {' +

' console.log(JSON.stringify(payload));' +

' window.ReactNativeWebView.postMessage(JSON.stringify(payload));' +

' },' +

' onError(error) {' +

' console.log(error);' +

' window.ReactNativeWebView.postMessage(JSON.stringify(error));' +

' },' +

' onClose() {' +

" var message = 'closed';"+

' window.ReactNativeWebView.postMessage(JSON.stringify(message));' +

' }' +

' }' +

' };' +

' var checkout = new KhaltiCheckout(config);' +

` checkout.show({ amount: ${props.amount} });` +

' </script>' +

'</body>' +

'</html>';

return (

<WebView

source={{html: myvar}}

javaScriptEnabled

style={{flex: 1}}

nativeConfig={{props: {webContentsDebuggingEnabled: true}}}

ref={webRef}

domStorageEnabled

mixedContentMode="always"

useWebKit={Platform.OS === 'ios'}

onMessage={props.response}

startInLoadingState

/>

);

}