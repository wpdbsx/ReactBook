import { createContext, useState } from "react";

const ColorContext = createContext({
  state: { color: "blue", subcolor: "red" },
  actions: {
    setColor2: () => {},
    setSubcolor2: () => {},
  },
});

const ColorProvider = ({ children }) => {
  const [color, setColor] = useState("yellow");
  const [subcolor, setSubcolor] = useState("red");

  const value = {
    state: { color, subcolor },
    actions: { setColor, setSubcolor },
  };
  console.log({ children });
  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

//const ColorConsumer = ColorContext.Consumer와 같은 의미
const { Consumer: ColorConsumer } = ColorContext;
console.log(ColorConsumer);
// ColorProvider 와 ColorConsumer 내보내기
export { ColorProvider, ColorConsumer };
export default ColorContext;
