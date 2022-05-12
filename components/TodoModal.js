import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Animated,
} from "react-native";
import colors from "../Colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
export default class TodoModal extends React.Component {
  state = {
    newTodo: ""
  };


  toggleTodoComplete = index => {
    let list = this.props.list
    list.todos[index].completed = !list.todos[index].completed;

    this.props.updateList(list);
  }

  addTodo = () => {
    let list = this.props.list
    if(!list.todos.some(todo => todo.title === this.state.newTodo)) {
      list.todos.push({title: this.state.newTodo, completed:false})
      this.props.updateList(list);

    }
    
    this.setState({newTodo: ""})
    Keyboard.dismiss()
  }

  deleteTodo = (index) => {
    let list = this.props.list
    console.log(list)
    list.todos.splice(index, 1)
    this.props.updateList(list)
  }





  renderTodo = (todo,index) => {
    return (
      <Swipeable renderRightActions={(_, dragX) => this.rightActions(dragX, index)}>

        <View style={styles.todoContainer}>
          <TouchableOpacity onPress={() => this.toggleTodoComplete(index)}>
          <Ionicons
              name={todo.completed ? "ios-square" : "ios-square-outline"}
              size={24}
              color={colors.gray}
              style={{ width: 32 }}
            />
          </TouchableOpacity>

            <Text
              style={[
                styles.todo,
                {
                  textDecorationLine: todo.completed ? "line-through" : "",
                  color: todo.completed ? colors.gray : colors.black,
                },
              ]}
            >
              {todo.title}
            </Text>
        </View>
      </Swipeable>
    );
  };


  rightActions = (dragX, index) => {
    return(
      <TouchableOpacity onPress={()=> this.deleteTodo(index)}>
          <Animated.View style ={styles.btnDelete}>
          <AntDesign name="delete" size={25} color={colors.black} />
          </Animated.View>
      </TouchableOpacity>
    );
  }
  render() {
    const list = this.props.list;
    const taskCount = list.todos.length;
    const completedCount = list.todos.filter((todo) => todo.completed).length;
    return (
      <KeyboardAvoidingView style={{flex :1}} behavior="padding">

      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" size={24} color={colors.black}></AntDesign>
        </TouchableOpacity>

      {/* Display number of task completed */}
        <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
          <View>
            <Text style={styles.title}>{list.name}</Text>
            <Text style={styles.taskCount}>
              {completedCount} of {taskCount} tasks
            </Text>
          </View>
        </View>


        <View style={[styles.section, { flex: 3, marginVertical: 16 }]}>
          <FlatList
            data={list.todos}
            renderItem={({ item, index }) => this.renderTodo(item, index)}
            keyExtractor={item=> item.title}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={[styles.section, styles.footer]} >
          <TextInput 
            style={[styles.input,{borderColor: list.color}]} 
            onChangeText={text => this.setState({newTodo:text})} 
            value = {this.state.newTodo}
            />
          <TouchableOpacity style={[styles.addTodo, { backgroundColor: list.color }]} onPress={()=> this.addTodo()}>
            <AntDesign name="plus" size={16} color={colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20
  },
  todo: {
    color: colors.black,
    fontWeight: "700",
    fontSize: 16,
  },
  btnDelete: {
    flex: 1,
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    borderRadius: 10,
  }
});
