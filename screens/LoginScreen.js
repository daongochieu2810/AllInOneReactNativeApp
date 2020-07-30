import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  LayoutAnimation,
  Dimensions,
  Platform,
} from "react-native";
import { useNavigation, useNavigationParam } from "react-navigation-hooks";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import fb from "../backend.js";
import actions from "../actions";
import { connect } from "react-redux";
function LoginScreen(props) {
  const firebase = fb;
  const { navigate } = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
          props.reduxSetCurrentUser({
              email: email,
              password: password
          })
          console.log(props.currentUser)
      })
      .catch((error) => setErrorMessage(error.message));
  };
  useEffect(() => {
    LayoutAnimation.easeInEaseOut();
  });
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={true}
      enableAutomaticScroll={Platform.OS === "ios"}
    >
      <StatusBar barStyle="light-content"></StatusBar>
      <Image
        source={require("../assets/background.png")}
        style={styles.background}
      ></Image>
      <ScrollView>
        <Text style={styles.greeting}>{"Hello! \nWelcome back."}</Text>
        <View style={styles.errorMessage}>
          <Text style={styles.error}>{errorMessage}</Text>
        </View>
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(emailInput) => setEmail(() => emailInput)}
              value={email}
            ></TextInput>
          </View>
          <View>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(passwordInput) => setPassword(() => passwordInput)}
              value={password}
            ></TextInput>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={{ color: "white", fontWeight: "500" }}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignSelf: "center", marginTop: 32 }}
            onPress={() => navigate("Register")}
          >
            <Text style={{ color: "#9e9e9e", fontSize: 13 }}>
              Not one of us?
              <Text style={{ color: "#ff8080", fontWeight: "500" }}>
                {" "}
                Sign up!
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  form: {
    marginBottom: 40,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "black",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8a8a8a",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "black",
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#f56969",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "red",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
});
const mapDispatchToProps = (dispatch) => {
  return {
    reduxSetCurrentUser: (user) => dispatch(actions.setCurrentUser(user)),
  };
};
const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
