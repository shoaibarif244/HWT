// import {View, Text} from 'react-native';
// import React from 'react';

// const EmojiPickerKeyboard = () => {
//   return (
//     <View>
//       <Text>EmojiPickerKeyboard</Text>
//     </View>
//   );
// };

// export default EmojiPickerKeyboard;
// import React, {useState, useEffect, useRef} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   Keyboard,
//   TouchableWithoutFeedback,
//   BackHandler,
// } from 'react-native';
// import EmojiSelector, {Categories} from 'react-native-emoji-selector';

// export default function Splash() {
//   const inputRef = useRef();
//   const [text, setText] = useState('');
//   const [selection, setSelection] = useState({start: 0, end: 0});

//   const [show, setShow] = useState(false);
//   const [isFocus, setisFocus] = useState(false);

//   const onClick = emoji => {
//     setText(prev => prev + emoji);
//   };

//   useEffect(() => {
//     // Keyboard.dismiss()?
//     if (isFocus) {
//       inputRef.current.focus();
//       // setisFocus(false)
//     }
//   }, [isFocus]);
//   return (
//     <View style={{flex: 1}}>
//       <Text>
//         {selection.start}, {selection.end}
//       </Text>

//       {show === false ? (
//         <TouchableOpacity
//           onPress={() => {
//             Keyboard.dismiss();

//             setisFocus(false);
//             // inputRef.current.focus()
//             setShow(!show);
//           }}>
//           <Text>Emoji</Text>
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity
//           onPress={() => {
//             setisFocus(true);
//             // inputRef.current.focus()
//             setShow(!show);
//           }}>
//           <Text>Keyboard</Text>
//         </TouchableOpacity>
//       )}

//       {show == true ? (
//         <View style={{height: 400, position: 'absolute', bottom: 0}}>
//           <EmojiSelector
//             category={Categories.symbols}
//             onEmojiSelected={onClick}
//             columns={10}
//           />
//         </View>
//       ) : null}

//       <TextInput
//         ref={inputRef}
//         autoFocus={true}
//         showSoftInputOnFocus={isFocus}
//         onPressIn={() => {
//           if (!show) {
//             // inputRef.current.focus()
//             setisFocus(true);
//           } else {
//             // inputRef.current.focus()
//             setisFocus(false);
//           }
//         }}
//         style={{width: 300, borderColor: 'gray', borderWidth: 1}}
//         onChangeText={text => setText(text)}
//         value={text}
//       />
//     </View>
//   );
// }
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';

// import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import EmojiBoard from 'react-native-emoji-board';
// import EmojiPicker, { EmojiKeyboard } from 'rn-emoji-keyboard';

const EmojiPickerKeyboard = () => {
  const [message, setMessage] = useState('');
  const inputRef = useRef();

  const [show, setShow] = useState(false);
  const [isFocus, setisFocus] = useState(false);

  const onClick = emoji => {
    setText(prev => prev + emoji);
  };

  //   useEffect(() => {
  //     // Keyboard.dismiss()?
  //     if (isFocus) {
  //       inputRef.current.focus();
  //       // setisFocus(false)
  //     }
  //   }, [isFocus]);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ScrollView>
          <Text>red</Text>
        </ScrollView>
      </View>

      {/* <View style={styles.messageWrap}> */}
      <View>
        <View>
          <View>
            {show === false ? (
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();
                  setisFocus(false);
                  // inputRef.current.focus()
                  setShow(!show);
                }}>
                <Entypo name="emoji-happy" size={24} color={Theme.bluelight} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setisFocus(true);
                  // inputRef.current.focus()
                  setShow(!show);
                }}>
                <Entypo name="keyboard" size={24} color={Theme.bluelight} />
              </TouchableOpacity>
            )}

            <TextInput
              placeholder="Type a message"
              placeholderTextColor={'gray'}
              style={{color: '#000'}}
              ref={inputRef}
              autoFocus={true}
              showSoftInputOnFocus={isFocus}
              value={message}
              onChangeText={text => setMessage(text)}
              onPressIn={() => {
                if (!show) {
                  // inputRef.current.focus()
                  setisFocus(true);
                } else {
                  // inputRef.current.focus()
                  setisFocus(false);
                }
              }}
            />
          </View>
        </View>
        <View>
          <View>
            <TouchableOpacity style={{marginLeft: 3}}>
              <Text>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {show == true ? <EmojiBoard showBoard={show} onClick={onClick} /> : null}
      {/* </View> */}
    </View>
  );
};
export default EmojiPickerKeyboard;

{
  /* <View style={{ height: 400, position: 'absolute', bottom: 0, left: 0, right: 0 }}>
<EmojiSelector
  category={Categories.symbols}
  onEmojiSelected={onClick}
  columns={10}
/>

</View> */
}
