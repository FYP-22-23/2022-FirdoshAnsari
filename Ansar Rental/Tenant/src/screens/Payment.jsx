import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import {View, } from 'react-native';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import {TouchableRipple, Text, Button, Divider} from 'react-native-paper'
import { getPayments } from '../api/rest_client';
import { useData } from '../hooks';

const Payment = () => {
    const {user} = useData()
    console.log(parseInt(user.user.room_no))
    const query = useQuery(['key'], {queryFn: ()=>getPayments(parseInt(user.user.room_no))})

    if(!query.isSuccess) return null

    return (
        <View>
        <Text style={{fontSize:20, margin:10, textAlign:'center'}}>Payment History</Text>
                <ScrollView>
                <RefreshControl onRefresh={()=>query.refetch()} refreshing={query.isLoading}>
                {query.data && query.data.map(b=>(
                <View key={b.id}>
                <TouchableRipple
                    rippleColor="rgba(0, 0, 0, .32)"
                    style={{backgroundColor: 'grey', margin: 8, padding: 12, borderRadius: 8,}}
                >
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View>
                            <Text>{`Month: ${b.month}`}</Text>
                            <Text>{`Paid Amount: ${b.paid_amount}`}</Text>
                            <Text>{`Due Amount: ${b.due_amount}`}</Text>
                            <Text>{`Paid on: ${b.created_at}`}</Text>
                            {b.remarks!=='' && <Text>{`Remarks: ${b.remarks}`}</Text>}
                        </View>
                    </View>
                </TouchableRipple>
                <Divider/>
                </View>
            ))}
                </RefreshControl>
            </ScrollView>
        </View>
    );
}

export default Payment;
