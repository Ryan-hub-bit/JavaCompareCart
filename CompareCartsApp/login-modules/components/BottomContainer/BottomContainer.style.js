import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const container = backgroundColor => {
  return {
    height: 220,
    bottom: 125,
    backgroundColor,
    borderRadius: 24,
    width: width * 0.9,
    alignSelf: "center",
    position: "absolute"
  };
};

export default {
  containerGlue: {
    marginTop: 10
  },
  footerContainer: {
    flex: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  rememberMeContainer: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  switchTextStyle: {
    color: "blue",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Roboto",
    marginBottom: 10
  }
};
