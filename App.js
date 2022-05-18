import React from "react";

// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "./Colors";
import TodoList from "./components/ToDoList";
import AddListModal from "./components/AddListModal";
import Fire from "./Fire";
import {AppRegistry} from 'react-native'
import database from '@react-native-firebase/'
export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists: [],
    user: {},
    loading: true
  };



  //Kết nối firebase
  componentDidMount() {
    firebase = new Fire((error,user) => {
      if(error) {
        return alert("Something error")
      }
      
      firebase.getLists(lists => {
        this.setState({lists, user }, () => {
          this.setState({loading: false});
        })
      })
      this.setState({ user })
    });
  }
  componentWillUnMount() {
    firebase.detach()
  }

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }
  // Render ra từng list
  renderList = (list) => {
    return <TodoList list={list} updateList={this.updateList} deleteTask={this.deleteTask}/>;
  };

  addList = list => {
    firebase.addList({
      name: list.name,
      color: list.color,
      todos: []
    })
  };

  deleteTask = id =>{
    firebase.deleteTask(id)
  };

  updateList = list => {
    firebase.updateList(list)
  };

  render() {
    if(this.state.loading) {
      return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.blue}/>
        </View>
      )
    }


    return (
      <View style={styles.container}>
        {/* Chuyển Modal */}
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <AddListModal closeModal={() => this.toggleAddTodoModal()}  addList = {this.addList}/>
        </Modal>
        {/* Tên Ứng dụng*/}
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            ToDo <Text style={{ fontWeight: "300", color: colors.blue }}>App</Text>
          </Text>
          <View style={styles.divider} />
        </View>

        {/* Thêm danh sách ghi chú */}
        <View style={{ marginVertical: 40 }}>
          <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddTodoModal()}>
            <AntDesign name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>
          <Text style={styles.add}>Add List</Text>
        </View>

        {/* Danh mục các danh sách ToDo */}
        <View style={{ height: 400, marginTop: 30 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.id.toString()}
            horizontal={false} //HIển thị các list theo 
            showsVerticalScrollIndicator={false}   //Hiển thị thanh cuộn
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps = "always"
          />
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 2,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: colors.black,
    paddingHorizontal: 30,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
});
