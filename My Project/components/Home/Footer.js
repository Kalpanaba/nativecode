// import React from 'react';
// import { View, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Icon, Text } from 'react-native-elements';




// const BottomView = () => {


   
//   return (
//     <View style={styles.footer}>
//       <View style={styles.menuContainer}>
//         {menuItems.map((item, index) => (
//           <TouchableOpacity 
//             key={index} 
//             style={styles.menuItem} 
//             onPress={() => handleMenuItemPress(item.name)}>
//             <Icon name={item.iconName} type="ionicon" size={24} color="black" />
//             <Text style={styles.menuText}>{item.name}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   footer: {
//     width: '100%',
//     // backgroundColor: 'white',
//      shadowColor: '#000',
//     position: 'absoulate',
//     left: 0,
//     right: 0,
//     bottom: 0,
//     height: 100,
//     shadowOffset: {
//       width: 0,
//       height: -1, 
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 3,
//     borderTopWidth: 0,
//     borderTopColor: '#ccc',
//     position: 'fixed',
//     bottom: 0,
   
//   },
//   menuContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 4,
//   },
//   menuItem: {
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   menuText: {
//     fontSize: 10,
//     marginTop: 9,
//   },
// });

// export  default   BottomView ;
