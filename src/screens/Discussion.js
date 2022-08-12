import React,{useState} from 'react';
import {View,Text,Image,StyleSheet,StatusBar,} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import LastWatch from '../components/LastWatch';
import Received from '../components/Received';
import Sent from '../components/Sent';
import Data from '../dummy/Data.json';
import data from '../dummy/Dummy1.json'
import users from '../dummy/Dummyusers.json'
import Input from '../components/Input';

const Discussion = ({ route, navigation }) => {
    const { itemName , itemPic } = route.params;
    const [inputMessage, setMessage] = useState('');
    
    const send = () => {
        Data.push({id:inputMessage,message:inputMessage});
        setMessage('');
    };

    var txt = []
    for (var i = 5; i < Data.length; i++){
        txt.push(<Sent key={Data[i].id} message={Data[i].message}/>);
    }
    console.log(Data)

    return(
      <LinearGradient
        colors={["#69BC61","#f26a50", "#69BC61"]}
        style={styles.container}
      >
        <StatusBar
          barStyle="dark-content" 
          backgroundColor={"#FFFFFF"}
          translucent
        />
          <View style={styles.main}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={()=>navigation.goBack()}
                    >
                        <Icon name='left' color='#000119' size={24}/>
                    </TouchableOpacity>
                    <Text style={styles.username}>{itemName}</Text>
                    <Image source={{uri:itemPic}} style={styles.avatar}/>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <LastWatch  checkedOn='Yesterday'/>
                    {
                        users.map((item,index) =>{
                           const count=Math.floor(Math.random() * 3)
                            return(
                                <Received 
                                    key={index}
                                    image={item.avatar_url}
                                    message={Data[count].message}
                                />
                            )
                        })
                    }
                    <Sent
                        message={Data[1].message}
                    />
                     <Sent
                        message={Data[3].message}
                    />
                    <LastWatch  checkedOn='Today'/>
                    <View>
                        {txt}
                    </View>
                </ScrollView>
          </View>
          <Input
            inputMessage={inputMessage}
            setMessage={(inputMessage)=> setMessage(inputMessage)}
            onSendPress={send}
          />
      </LinearGradient>
    )
}
export default Discussion;

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        left:0,
        right:0,
        top:0,
        height:"100%"
    },
    main:{
        backgroundColor:'#FFF',
        height:'88%',
        paddingHorizontal:20,
        borderBottomLeftRadius:35,
        borderBottomRightRadius:35,
        paddingTop:40
    },
    headerContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    username:{
        color:"#000119",
        fontFamily:'Montserrat_700Bold',
        fontSize:20,
        flex:1,
        textAlign:'center'
    },
    avatar:{
        width:40,
        height:40,
        borderRadius:20,
    }

})