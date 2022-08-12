import React , {useState, useEffect, useRef} from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Animated,
    StatusBar,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ScrollView } from 'react-native-gesture-handler';
import { Colors, Fonts } from '../constants';
import { Chip } from 'react-native-paper';
import NumericInput from 'react-native-numeric-input'
import FormButton from '../components/FormButton';

const HomeScreen = ({navigation}) => {
    const [data, setData] = useState([]);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const categories = ['All', 'Popular', 'Top Rated', 'Featured', 'Luxury'];
    const [loading, setLoading] = useState(false)
    const [selectedTags, setSelectedTags] = useState([])
    const [values, setValues] = useState(0);
    const pan = useRef(new Animated.ValueXY()).current;
    const list = useRef(new Animated.ValueXY()).current;

    const CategoryList = ({navigation}) => {
        return (
          <View style={styles.categoryListContainer}>
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => setSelectedCategoryIndex(index)}>
                <View>
                  <Text
                    style={{
                      ...styles.categoryListText,
                      color:
                        selectedCategoryIndex == index
                          ? Colors.PRIMARY
                          : Colors.GREY,
                    }}>
                    {item}
                  </Text>
                  {selectedCategoryIndex == index && (
                    <View
                      style={{
                        height: 3,
                        width: 30,
                        backgroundColor: Colors.PRIMARY,
                        marginTop: 2,
                      }}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );
      };

    useEffect(function() {
        
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

    return(
       <LinearGradient
        colors={['#69BC61', '#2D2D2D', '#537140']}
        //  to get plane white colors={['white', 'black', 'white']}
        style={styles.gradient}
       >
        <View style={styles.header}>
        <View style={styles.headerContainer}>
            <Fontisto style={styles.icon} color="white" name="holiday-village" size={28} />
            <Text style={styles.header}>Adventures</Text>
        </View>
        <View style={{paddingBottom: 15,marginTop:20}}>
          <Text style={{fontSize: 30, fontWeight: 'bold',color:"white"}}>
            Find your places
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold',color:"white"}}>to </Text>
            <Text
              style={{fontSize: 30, fontWeight: 'bold', color: Colors.PRIMARY}}>
              hangout
            </Text>
          </View>
        </View>
      </View>
        <StatusBar
          barStyle="dark-content" 
          backgroundColor={"#64b15d"}
          translucent
        />
           <ScrollView
                horizontal
                style={styles.proContainer}
                showsHorizontalScrollIndicator={false}
           >
           </ScrollView>
           <View style={styles.ops}>
           <ScrollView showsVerticalScrollIndicator={false}>
        <CategoryList />

          <View style={{flexDirection:'row',marginTop:10,}}>
            <Chip style={{width:'30%',margin:5}} icon="food" onPress={() => console.log('Pressed')}>Restaurants</Chip>
            <Chip style={{width:'20%',margin:5}} onPress={() => console.log('Pressed')}>Resorts</Chip>
            <Chip style={{width:'16%',margin:5}} onPress={() => console.log('Pressed')}>clubs</Chip>
            <Chip style={{width:'20%',margin:5}} onPress={() => console.log('Pressed')}>Stores</Chip>
          </View>
          <View style={{flexDirection:'row'}}>
            <Chip style={{width:'35%',margin:5}} onPress={() => console.log('Pressed')}>Shopping Centers</Chip>
            <Chip style={{width:'20%',margin:5}} onPress={() => console.log('Pressed')}>Beaches</Chip>
            <Chip style={{width:'14%',margin:5}} onPress={() => console.log('Pressed')}>Bars</Chip>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:10,margin:10}}>
          <Text style={{fontSize:16,fontFamily:Fonts.POPPINS_MEDIUM,color:Colors.BLACK}}>Add peoples</Text>
            <NumericInput 
              value={0} 
              onChange={values => setValues({values})} 
              onLimitReached={(isMax,msg) => console.log(isMax,msg)}
              totalWidth={100} 
              totalHeight={30} 
              minValue={0}
              maxValue={100}
              iconSize={25}
              step={1}
              valueType='real'
              rounded 
              textColor='#B0228C' 
              iconStyle={{ color: 'white' }} 
              rightButtonBackgroundColor='#69BC61' 
              leftButtonBackgroundColor='#3D504B'
            />
        </View>

      </ScrollView>
        <FormButton backgroundColor={'black'} width={'90%'} alignSelf={'center'} buttonTitle={'continue'} onPress={()=>navigation.navigate('ChatRooms')}/>
                
           </View>
       </LinearGradient>
    )
}
export default HomeScreen;

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
        justifyContent:'space-between',
        height:30,
        width:200,
    },
    header:{
        fontFamily:Fonts.POPPINS_MEDIUM,
        color:'#FFF',
        fontSize:24,
    },
    headers: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    proContainer:{
        marginRight:-20,
        alignSelf:'center'
    },
    ops:{
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        height:530,
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
    },
    searchInputContainer: {
        height: 50,
        backgroundColor: Colors.LIGHT_GREY,
        marginTop: 15,
        marginLeft: 20,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
      },
      categoryListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 30,
      },
      categoryListText: {
        fontSize: 17,
        fontWeight: 'bold',
      },
      card: {
        height: 280,
        width: 20,
        elevation: 15,
        marginRight: 20,
        borderRadius: 15,
        backgroundColor: Colors.white,
      },
      cardImage: {
        height: 200,
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      },
      priceTag: {
        height: 60,
        width: 80,
        backgroundColor: Colors.PRIMARY,
        position: 'absolute',
        zIndex: 1,
        right: 0,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
      },
      cardDetails: {
        height: 100,
        borderRadius: 15,
        backgroundColor: Colors.white,
        position: 'absolute',
        bottom: 0,
        padding: 20,
        width: '100%',
      },
      cardOverLay: {
        height: 280,
        backgroundColor: Colors.white,
        position: 'absolute',
        zIndex: 100,
        width: 20,
        borderRadius: 15,
      },
      topHotelCard: {
        height: 120,
        width: 120,
        backgroundColor: Colors.white,
        elevation: 15,
        marginHorizontal: 10,
        borderRadius: 10,
      },
      topHotelCardImage: {
        height: 80,
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
      },
})