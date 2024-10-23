import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
  },
  subTitle: {
    marginBottom: 5,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 12,
  },
  dropdown: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 12,
  },
  button: {
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 6,
  },
  icon: {
    marginRight: 4,
  },
});
