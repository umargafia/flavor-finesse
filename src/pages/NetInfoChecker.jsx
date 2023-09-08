// import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';
// import { Snackbar } from 'react-native-paper';
// import * as Network from 'expo-network';

// const NetInfoChecker = () => {
//   const [isConnected, setIsConnected] = useState(true);

//   useEffect(() => {
//     const checkNetwork = async () => {
//       try {
//         const networkState = await Network.getNetworkStateAsync();
//         const newIsConnected = networkState.isConnected;

//         if (newIsConnected !== isConnected) {
//           setIsConnected(newIsConnected);
//           if (newIsConnected) {
//             // Internet connection is back
//             Snackbar.show({
//               text: 'Internet connection is back!',
//               duration: Snackbar.LENGTH_SHORT,
//             });
//           } else {
//             // Internet connection is lost
//             Snackbar.show({
//               text: 'No internet connection!',
//               duration: Snackbar.LENGTH_INDEFINITE,
//               action: {
//                 label: 'Dismiss',
//                 onPress: () => Snackbar.dismiss(),
//               },
//             });
//           }
//         }
//       } catch (error) {
//         console.error('Error checking network state:', error);
//       }
//     };

//     checkNetwork();

//     // Subscribe to network state changes
//     const unsubscribe = Network.addNetworkChangeListener(checkNetwork);

//     return () => {
//       unsubscribe.remove();
//     };
//   }, [isConnected]);

//   return (
//     <View>
//       <Text>Network Status: {isConnected ? 'Connected' : 'Disconnected'}</Text>
//     </View>
//   );
// };

// export default NetInfoChecker;
