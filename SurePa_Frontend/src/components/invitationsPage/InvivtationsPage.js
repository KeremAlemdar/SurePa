import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import commonStyle from '../../commonStyle';
import { acceptInvitation, denyInvitation, getInviations } from '../../services/PatientController';
import List from '../list/List';
import { toastConfig } from '../toast';
import Toast from 'react-native-toast-message';


const InvivtationsPage = ({ navigation }) => {
    const [invivtations, setInvitations] = useState([]);
    const [reloadPage, setReloadPage] = useState(true);

    useEffect(() => {
        if (reloadPage) {
            getInviations().then(res => {
                console.log(res);
                setInvitations(res);
                setReloadPage(false);
            });
        }
    }, [reloadPage]);

    const accept = (id) => {
        acceptInvitation(id).then(res => {
            if (res === 'success') {
                Toast.show({
                    type: 'success',
                    props: { text1: 'Invitation Accepted Successfully' },
                });
                setReloadPage(true);
            } else {
                Toast.show({
                    type: 'error',
                    props: { text1: res },
                });
            }
        });
    };

    const deny = (id) => {
        denyInvitation(id).then(res => {
            if (res === 'success') {
                Toast.show({
                    type: 'success',
                    props: { text1: 'Invitation Denied Successfully' },
                });
                setReloadPage(true);
            } else {
                Toast.show({
                    type: 'error',
                    props: { text1: res },
                });
            }
        });
    };

    return (
        <View style={commonStyle.mainDiv}>
            {invivtations.length > 0 ? (
            <List
                data={invivtations}
                accept={accept}
                deny={deny}
            /> 
            ) : (
                <View style={commonStyle.container}>
                    <Text style={commonStyle.text}>
                        Henüz bir kullanıcı davet etmemişsiniz.
                    </Text>
                </View>
            )}
            <Toast config={toastConfig} />
        </View>
    )
};

export default InvivtationsPage;
