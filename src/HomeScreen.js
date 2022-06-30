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

  const [todos,setTodos] = useState([]) //Flat-list

  const [textInput,setTextInput] = useState('')  //quan ly TextInput

  const [inputText,setInputText]  = useState() // TextInput cua modal

  const [editIdItemSelected,setEditIdItemSelected] = useState()

  const onPressSave = ()=>{                    //Save function
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
  const onPressItem = (todo)=>{        // textInput modal function
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

        <TouchableOpacity  //fix button
          style={styles.FixIcon} onPress={()=>onPressItem(todo)}>
          <Text style={styles.fixText}> Fix</Text>
        </TouchableOpacity>

        <TouchableOpacity //Delete button
          style={styles.DeleteIcon}
          onPress={()=>deleteTodo(todo?.id)}>
          <Text style={styles.fixText}> Delete</Text>
        </TouchableOpacity>
      </View>
    )
  }
  const clearAllItem = ()=>{     //clearAll button
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
  const addTodo = () => { //add function
    if(!textInput.trim()){
      Alert.alert("Error","Please !!! Note your works to text.")
    }else {
      Keyboard.dismiss()
      const newTodo = {
        id:Math.random(),
        task:textInput,
      }
      setTodos([...todos,newTodo]);
      setTextInput("")
    }

  }
  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.nameClearAllText}>
          TodoApp
        </Text>
        <TouchableOpacity onPress={clearAllItem}>
          <Text style={styles.nameClearAllText}> Clear All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item)=>item.id.toString()}
        contentContainerStyle={styles.contentContainer} //
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
            placeholder={"Add your new works"}
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
            <Text style={styles.saveText}> Save</Text>
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
            <Text style={styles.addText}>Add</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#C0C0C0"
  },

  contentContainer:{
    padding:20,
    paddingBottom:100,

  },
  listItemView:{
    flex:1,
    justifyContent:"center",
  },
  addText:{
    color:"red",
    fontWeight:"bold",
  },
  saveText:{
    fontSize:35,
    fontWeight:"bold",
    color:"black"
  },
  nameClearAllText:{
  fontWeight:"bold",
    fontSize:25,
    color:"red"
  },

  fixText:{
    fontWeight:"bold",
    color:"black"
  },
  touchableSave:{
    backgroundColor:'orange',
    paddingHorizontal:50,
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
    justifyContent:"center",
    backgroundColor:"grey"
  },
  textInputModal:{
    width:"90%",
    height:70,
    borderColor:"white",
    borderWidth:1,
    backgroundColor:"white",
    fontSize:25,
    color:"black",
    borderRadius:10
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
    backgroundColor:'#FFF8DC',
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
    backgroundColor:"white",
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
