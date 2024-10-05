// import React from 'react';
// import { Button, View, Text } from 'react-native';
// import { CardField, useStripe } from '@stripe/stripe-react-native';

// export default function CheckoutForm({ amount }) {
//   const { confirmPayment } = useStripe();

//   const handlePayment = async () => {
//     // Make a call to your backend to create a PaymentIntent and retrieve the client secret
//     const clientSecret = await fetchPaymentIntentClientSecret();  // Define this backend call

//     const { error, paymentIntent } = await confirmPayment(clientSecret, {
//       type: 'Card',
//     });

//     if (error) {
//       console.log('Payment failed: ', error);
//     } else if (paymentIntent) {
//       console.log('Payment successful ', paymentIntent);
//     }
//   };

//   return (
//     <View>
//       <CardField
//         postalCodeEnabled={true}
//         placeholders={{
//           number: '4242 4242 4242 4242',
//         }}
//         cardStyle={{
//           backgroundColor: '#FFFFFF',
//           textColor: '#000000',
//         }}
//         style={{
//           width: '100%',
//           height: 50,
//           marginVertical: 30,
//         }}
//       />
//       <Button onPress={handlePayment} title="Pay" />
//     </View>
//   );
// }
