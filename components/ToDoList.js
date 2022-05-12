import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal,Animated  } from "react-native";
import colors from "../Colors";
import ToDoModal from "./TodoModal";
import { Swipeable } from "react-native-gesture-handler";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default class TodoList extends React.Component {
  state = {
    addTodoVisible: false,
  };
  // Đóng mở Modal
  toggleListModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }
  deleteTask = (index) => {
    let list = this.props.list
    console.log(list)
    // list.todos.splice(index, 1)
    // this.props.updateList(list)
  }
  render() {
    const list = this.props.list;
    const completedCount = list.todos.filter((todo) => todo.completed).length;
    const remainingCount = list.todos.length - completedCount;
    return (
      <View>
        {/* Hiển thị/ tắt modal */}

        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleListModal()}
        >
          <ToDoModal 
            list={list} 
            closeModal={() => this.toggleListModal()} 
            updateList={this.props.updateList}
          />
        </Modal>
        <TouchableOpacity
          style={[styles.listContainer, { backgroundColor: list.color }]}
          onPress={() => this.toggleListModal()}
        >
          <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
          </Text>

          {/* Một task của todoList */}

          <View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{completedCount}</Text>
              <Text style={styles.subtitle}>Remaining</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.count}>{remainingCount}</Text>
              <Text style={styles.subtitle}>Completed</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> this.deleteTask(index)}>        
          <AntDesign name="delete" size={25} color={colors.black} />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: "200",
    color: colors.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
});
