import logo from './logo.svg';
import './App.css';
import { ChakraProvider, Heading, Button, useColorModeValue } from '@chakra-ui/react'
import SlideBox from './components/SlideBox';

function App() {
  return (
    <ChakraProvider>
      <Heading marginX={"46%"} color={"red.300"}>JokeIt</Heading>
      <SlideBox></SlideBox>
      <Button marginX={"47%"} backgroundColor={"red.300"} _hover={{bg: "red.700"}} _click={{bg: "red.700"}} color={"white"}>Laugh!</Button>
    </ChakraProvider>
  );
}

export default App;
