import {useMutation, useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {RefreshControl, View} from 'react-native';
import {createPayment, getPendingBills, payWithKhalti} from '../api/rest_client';
import {Button, Dialog, Divider, Text, TouchableRipple} from 'react-native-paper';
import {useToast} from 'react-native-toast-notifications';
import {ScrollView} from 'react-native-gesture-handler';
import KhaltiWrapper from '../components/KhaltiWrapper';
import {useData} from '../hooks';
import {KhatiSdk} from "rn-all-nepal-payment";
import {v4 as uuidv4} from 'uuid';

const Bills = () => {
    const toast = useToast();
    const {user} = useData()

    const query = useQuery(['key'], {
        queryFn: () => {
            return getPendingBills(parseInt(user.user.room_no));
        }
    })

    const [pendingBills, setPendingBills] = useState([])
    const [billToClear, setBillToClear] = useState(null)
    const [khaltiViewVisible, setKhaltiViewVisible] = useState()

    useEffect(() => {
        if (query.isSuccess) setPendingBills(query.data)
    }, [query.isSuccess]);

    const createPaymentMutation = useMutation(({paid_amount, due_amount, room_number, remarks, bill}) => {
        return createPayment(paid_amount, due_amount, room_number, remarks, bill)
    }, {
        onError: (e) => {
            toast.hideAll();
            toast.show(e.toString(), {type: 'danger'})
        }, onSuccess: (e) => {
            setPendingBills(pendingBills.filter((b) => {
                // console.log(b.id, billToClear.id)
                return b.id !== billToClear.id
            }))
            // setBillToClear(null)
            toast.hideAll()
            toast.show('Successfully paid', {type: 'success'})
        }
    })

    if (!query.isSuccess) return <View></View>

    return (<View style={{marginBottom: 120}}>
        <Text style={{fontSize: 20, margin: 10, textAlign: 'center'}}>Bill History</Text>
        <RefreshControl onRefresh={() => query.refetch()} refreshing={query.isLoading}>
            <ScrollView>
                {(pendingBills || []).map(b => (<View key={b.id}>
                    {
                        billToClear !== null &&
                        <KhatiSdk
                            amount={b.total * 100} // Number in paisa
                            isVisible={khaltiViewVisible === b.id} // Bool to show model
                            paymentPreference={[
                                // Array of services needed from Khalti
                                'KHALTI',
                                'EBANKING',
                                'MOBILE_BANKING',
                                'CONNECT_IPS',
                                // 'SCT',
                            ]}
                            productName={`${uuidv4()}-fee-${billToClear.month}-namef`} // Name of product
                            productIdentity={`${uuidv4()}-${billToClear.id}-test-${billToClear.month}-id`} // Unique product identifier at merchant
                            onPaymentComplete={(p) => {
                                setKhaltiViewVisible(null)
                                setBillToClear(null)
                                const str = p.nativeEvent.data;
                                const resp = JSON.parse(str);
                                console.log(resp.event)
                                if (resp.event === 'CLOSED') {
                                    toast.show('Payment cancelled', {type: 'warning'})
                                    return
                                }
                                const data = {
                                    paid_amount: b.total,
                                    due_amount: 0,
                                    room_number: parseInt(user.user.room_no),
                                    remarks: '',
                                    bill: b.id
                                }
                                createPaymentMutation.mutate(data)
                            }} // Callback from Khalti Web Sdk
                            productUrl={`http://gameofthrones.wikia.com/wiki/dragons`} // Url of product
                            publicKey={'test_public_key_1afd1d2aa7cb409e9a89df9e83c10741'} // Test or live public key which identifies the merchant
                        />
                    }
                    <TouchableRipple
                        rippleColor="rgba(0, 0, 0, .32)"
                        style={{backgroundColor: 'gray', margin: 8, padding: 12, borderRadius: 8}}
                    >
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                        }}>
                            <View>
                                <Text>{`Month: ${b.month}`}</Text>
                                <Text>{`Room rent: ${b.monthly_room_rent}`}</Text>
                                <Text>{`Previous electricity unit: ${b.previous_electricity_unit}`}</Text>
                                <Text>{`Present electricity unit: ${b.present_electricity_unit}`}</Text>
                                <Text>{`Units consumed this month: ${b.present_electricity_unit - b.previous_electricity_unit} units`}</Text>
                                <Text>{`Electricity amount: ${(b.present_electricity_unit - b.previous_electricity_unit) * b.electricity_rate}`}</Text>
                                <Text>{`Water & waste amount: ${b.water_and_waste}`}</Text>
                                <Text>{`Due amount: ${b.due_amount}`}</Text>
                                {b.remarks && <Text>Remarks: {b.remarks}</Text>}
                            </View>
                            <Button onPress={() => {
                                // setProductToPay(b)
                                setBillToClear(b)
                                setKhaltiViewVisible(b.id)
                            }} style={{backgroundColor: 'green'}}><Text>Pay Rs. {b.total}</Text></Button>
                        </View>
                    </TouchableRipple>
                    <Divider/>
                </View>))}
            </ScrollView>
        </RefreshControl>
    </View>);
}

export default Bills;
