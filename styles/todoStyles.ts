import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F8F9FA",
  },
  headerText: {
    marginBottom: 20,
    color: "#333",
  },
  listContent: {
    paddingBottom: 20,
  },
  taskContainer: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  taskHead: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  taskContent: {
    borderLeftWidth: 5,
    borderLeftColor: "#4CAF50",
    paddingLeft: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  taskInfo: {
    fontSize: 12,
    color: "#999",
  },
  emptyText: {
    textAlign: "center",
    color: "#AAA",
    marginTop: 50,
  },
});