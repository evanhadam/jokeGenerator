import './App.css';
import { ChakraProvider, Heading, Button, useColorModeValue, useControllableState } from '@chakra-ui/react'
import JokePanel from './components/JokePanel';

function App() {
  return (
    <ChakraProvider>
      <Heading marginX={"46%"} color={"red.300"}>JokeIt</Heading>
      <JokePanel></JokePanel>
    </ChakraProvider>
  );
}

export default App;
