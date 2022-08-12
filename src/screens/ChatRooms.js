import React , {useState, useEffect, useRef} from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Animated,
    StatusBar,
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ScrollView } from 'react-native-gesture-handler';
import Profiles from '../components/Profiles';
import Messages from '../components/Messages';
import Data from '../dummy/Dummy1.json'

const ChatRooms = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    
    const pan = useRef(new Animated.ValueXY()).current;
    const list = useRef(new Animated.ValueXY()).current;

    useEffect(function() {
        // const getData = async () => {
        //     const resp = await fetch(URL);
        //     const data = await resp.json();
        //     setData(data);
        //     setLoading(false);
        //     console.log(data);
        // };
        // getData();

        Animated.timing(pan, {
            toValue:{x:-400,y:0},
            delay:400,
            useNativeDriver:false
        }).start();

        Animated.timing(list, {
            toValue:{x:0,y:-300},
            delay:400,
            useNativeDriver:false
        }).start();

    }, [])

    // console.log(data.login)

    return(
       <LinearGradient
        colors={['#69BC61', '#2D2D2D', '#537140']}
        style={styles.gradient}
       >
        <StatusBar
          barStyle="dark-content" 
          backgroundColor={"#64b05c"}
          translucent
        />
           <View style={styles.headerContainer}>
                <Text style={styles.header}>ChatRooms</Text>
                <Icon name='add' color='#fff' size={30}/>
           </View>
           <ScrollView
                horizontal
                style={styles.proContainer}
                showsHorizontalScrollIndicator={false}
           >
                {/* {loading ? 
                    (
                        <ActivityIndicator size='small' color='#FFF'/>
                    ):(
                        <Animated.View style={[pan.getLayout(),styles.card]}>
                            {
                                data.map((item, index) => (
                                    <Profiles
                                        key={item.id}
                                        username={item.login}
                                        uri={item.avatar_url}
                                    />
                                ))
                            }
                        </Animated.View>
                    )
                } */}
           </ScrollView>
           <View style={styles.ops}>
                <View style={styles.col}>
                    <Text style={styles.day}>Sunday</Text>
                    <Entypo name='dots-three-horizontal' color='#2D2D2D' size={30}/>
                </View>
                <ScrollView>
                    {
                        loading ? 
                        (
                            <ActivityIndicator size='large' color='#2D2D2D'/>
                        ):(
                            <Animated.View style={[list.getLayout(), styles.list]}>
                                {
                                    Data.map((item, index) => (
                                            <Messages
                                                key={item.id}
                                                username={item.login}
                                                uri={item.avatar_url}
                                                // count={Math.floor(Math.random() * 3)}
                                                onPress={()=>{
                                                    props.navigation.navigate('Discussion',{
                                                        itemId:item.id,
                                                        itemName:item.login,
                                                        itemPic:item.avatar_url
                                                    });
                                                }}
                                            />
                                    ))}
                            </Animated.View>
                        )}
                </ScrollView>
           </View>
       </LinearGradient>
    )
}
export default ChatRooms;

const styles = StyleSheet.create({
    list:{
        marginTop:300,
    },
    card:{
        marginLeft:400,
        width:400,
        flexDirection:'row'
    },
    gradient:{
        height:'100%',
        position:"absolute",
        left:0,
        right:0,
        top:0,
        paddingHorizontal:20,
        paddingTop:30
    },
    headerContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    header:{
        fontFamily:'Montserrat_800ExtraBold',
        color:'#FFF',
        flex:1,
        fontSize:24
    },
    proContainer:{
        marginRight:-20,
        alignSelf:'center'
    },
    ops:{
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        height:660,
        backgroundColor:'#FFF',
        marginHorizontal:-20
    },
    col:{
        flexDirection:'row',
        marginTop:25,
        marginHorizontal:20,
        alignItems:'center'
    },
    day:{
        fontFamily:'Montserrat_800ExtraBold',
        color:'#2D2D2D',
        flex:1,
        fontSize:20
    }
})