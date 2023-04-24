import logo from './logo.svg';
import './App.css';
import { ChakraProvider, Heading, Button, useColorModeValue, useControllableState } from '@chakra-ui/react'
import SlideBox from './components/SlideBox';
import JokePanel from './components/JokePanel';

function App() {
  return (
    <ChakraProvider>
      <Heading marginX={"46%"} color={"red.300"}>JokeIt</Heading>
      <SlideBox></SlideBox>
      <Button marginX={"47%"} marginBottom={'-50px'} backgroundColor={"red.300"} _hover={{bg: "red.700"}} _click={{bg: "red.700"}} color={"white"} onClick={() => console.log("CLICLK")}>Laugh!</Button>
      <JokePanel></JokePanel>
    </ChakraProvider>
  );
}

export default App;
