import React,{useState} from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Keyboard,
  Alert,
  Modal
} from "react-native";

const HomeScreen = () => {


  const [textInput,setTextInput] = useState('')  //quan ly TextInput

  const [todos,setTodos] = useState([]) //Flat-list

  const [inputText,setInputText]  = useState() // TextInput cua modal

  const [editIdItemSelected,setEditIdItemSelected] = useState()

  const onPressSave = ()=>{
    if(!inputText?.trim() ){
      Alert.alert("Error","Please ! Note your works to text.")
    }else{
      const newData = todos.map(item=>{
        if(item.id === editIdItemSelected  ){
          return { ...item, task: inputText } // ... => spread operator.
        }
        return item
      })
      setTodos(newData)
      setEditIdItemSelected(undefined)
    }
    }
  const onPressItem = (todo)=>{
    setInputText(todo.task);
    setEditIdItemSelected(todo.id);
    setInputText("")
  }
  const ListItem = ({todo}) => {
    return(
      <View style={styles.listItem}>
        <View style={styles.listItemView}>
          <Text style={
            {color:"black"}
          }>{todo?.task}</Text>
        </View>

        <TouchableOpacity style={styles.FixIcon} onPress={()=>onPressItem(todo)}>
          <Text style={{fontWeight:"bold",color:"black"}}> Fix</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.DeleteIcon}
          onPress={()=>deleteTodo(todo?.id)}>
          <Text style={{fontWeight:"bold",color:"black"}}> Delete</Text>
        </TouchableOpacity>
      </View>
    )
  }
  const clearAllItem = ()=>{
    if (todos===""){
      Alert.alert("Error !!!")
    }else{
      Alert.alert("Confirm !!!", "Clear all ???",[
        {
          text:"Yes",
          onPress: ()=> setTodos([]),
        },
        {
          text:"No",
        }
      ])
    }
  }
  const deleteTodo = (todoId) =>{
    const newTodos = todos.filter(item => item.id !== todoId)
    setTodos(newTodos)
  }
  const addTodo = () => {
    if(!textInput.trim()){
      Alert.alert("Error","Please ! Note your works to text.")
    }else {
      Keyboard.dismiss()
      const newTodo = {
        id:Math.random(),
        task:textInput,
        completed:false,
      }
      setTodos([...todos,newTodo]);
      setTextInput("")
    }




  }
  return(
    <SafeAreaView style={{flex:1}}>
      <View style={styles.header}>
        <Text style={{fontWeight:"bold",fontSize:25,color:"red"}}>
          TodoApp
        </Text>
        <TouchableOpacity onPress={clearAllItem}>
          <Text style={{fontWeight:"bold",fontSize:25,color:"red"}}> Clear All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item)=>item.id.toString()}
        contentContainerStyle={{padding:20,paddingBottom:100}}
        data={todos}
        renderItem={({item})=><ListItem todo={item}/>}/>
      <Modal
        animationType="fade"
        visible={!!editIdItemSelected} // hien thi modal khi clcik vo item( fix)
        onRequestClose={()=>setEditIdItemSelected(undefined)} //khi click de tat modal, set modal == false
      >
        <View style={styles.modalView}>
          <Text style={styles.text1}>
            Change text:
          </Text>
          <TextInput
            style={styles.textInputModal}
            onChangeText={setInputText}
            defaultValue={inputText}
            editable={true}
            multiline={false}
            maxLength={200}
          />
          <TouchableOpacity
            style={styles.touchableSave}
            onPress={onPressSave}  //Save
          >
            <Text style={{fontSize:35, fontWeight:"bold", color:"black"}}> Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Add work"
            value={textInput}
            onChangeText={(text)=>setTextInput(text)}
          />
        </View>

        <TouchableOpacity onPress={()=>addTodo()}>
          <View style={styles.AddContainer}>
            <Text style={{color:"red", fontWeight:"bold"}}>Add</Text>
          </View>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  listItemView:{
    flex:1,
    justifyContent:"center",
  },
  touchableSave:{
    backgroundColor:'orange',
    paddingHorizontal:100,
    alignItems:'center',
    marginTop:20
  },
  text1:{
    marginVertical:30,
    fontSize:25,
    fontWeight:"bold",
    marginLeft:10,
    color:"red"
  },
  modalView:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  textInputModal:{
    width:"90%",
    height:70,
    borderColor:"grey",
    borderWidth:1,
    fontSize:25,
    color:"black"
  },
  FixIcon:{
    width:50,
    height:50,
    margin:5,
    backgroundColor:"grey",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
  },
  DeleteIcon:{
    width:55,
    height:50,
    margin:5,
    backgroundColor:"red",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center"
  },
  header:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    padding:20
  },
  footer:{
    bottom:0,
    position:"absolute",
    color:"white",
    flexDirection:"row",
    width:"100%",
    alignItems:"center",
    paddingHorizontal:20
  },
  inputContainer:{
    backgroundColor:'grey',
    elevation:40,
    flex:1,
    height:50,
    marginVertical:20,
    borderRadius:15
  },
  AddContainer:{
    width:50,
    height:50,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"grey",
    margin:15,
    borderRadius:20,
    elevation:40,
  },
  listItem:{
    padding:10,
    backgroundColor:"white",
    flexDirection:"row",
    elevation:12,
    borderRadius:10,
    margin:5,

  }
})
export default HomeScreen;
