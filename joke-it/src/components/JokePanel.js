import { Flex, Spacer, Text, useMediaQuery, Heading, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Button, handleSliderChange } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import SlideBox from './SlideBox.js'
import axios from 'axios';
import { TriangleUpIcon } from '@chakra-ui/icons';

const JokePanel = () => {
  const [isLargerThanMD] = useMediaQuery('(min-width: 48em)');
  const [sliderValue, setSliderValue] = useState([0, 100]);
  const sliderVals = [0, 20, 0, 20, 0, 20];

  const slideArray = [
    {
      id: 0,
      text: 'Profanity',
      val: [0,0]
    },
    {
      id: 1,
      text: 'Popularity',
      val: [0,0]
    },
    {
      id: 2,
      text: 'Length',
      val: [0,0]
    }];
  const array = [
    {
      id: '#1',
      title: 'Title',
      text: 'Joke'
    },
    {
      id: '#2',
      title: 'Title',
      text: 'Joke'
    },
    {
      id: '#3',
      title: 'Title',
      text: 'Joke'
    },
    {
        id: '#4',
        title: 'Title',
        text: 'Joke'
    },
    {
        id: '#5',
        title: 'Title',
        text: 'Joke'
    },
    {
        id: '#6',
        title: 'Title',
        text: 'Joke'
    },
    {
        id: '#7',
        title: 'Title',
        text: 'Joke'
    },
    {
        id: '#8',
        title: 'Title',
        text: 'Joke'
    },
    {
          id: '#9',
          title: 'Title',
          text: 'Joke'
    },
    {
          id: '#10',
          title: 'Title',
          text: 'Joke'
    },
  ];

  const handleSliderChange = (value, sliderID) => {
    sliderVals[sliderID*2] = value[0];
    console.log(sliderVals[sliderID*2]);
    sliderVals[sliderID*2 + 1] = value[1];
    console.log(sliderVals[sliderID*2+1]);
  }
  console.log(sliderVals);

  const makePostRequest = (path, valArr) => {
    let queryObj = { sliderMin1: String(valArr[0]),
                    sliderMax1: String(valArr[1]),
                    sliderMin2: String(valArr[2]),
                    sliderMax2: String(valArr[3]),
                    sliderMin3: String(valArr[4]),
                    sliderMax3: String(valArr[5])};
    axios.post(path, queryObj).then(
        (response) => {
            let result = response.data;
            console.log(result);
        },
        (error) => {
            console.log(error);
        }
    );
}


  return (
    <Flex
      minH="10vh"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      py="16"
      px={isLargerThanMD ? '16' : '6'}
      flexWrap="wrap"
      flexDirection={isLargerThanMD ? 'row' : 'column'}
    >
      <Flex
      minH="10vh"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      py="16"
      px={isLargerThanMD ? '16' : '6'}
      flexWrap="wrap"
      flexDirection={isLargerThanMD ? 'row' : 'column'}
    >
      {slideArray.map((arr) => (
        <>
          <Flex
            height="100px"
            bg="blackAlpha.200"
            width={isLargerThanMD ? '32%' : 'full'}
            shadow="md"
            p="6"
            alignItems="center"
            justifyContent="center"
            borderRadius="md"
            flexDirection="column"
            textAlign="center"
            mb='0'
            border="1px solid #C4DDFF"
          >
            <Text>{arr.text}</Text>
            <RangeSlider colorScheme='red' aria-label={['min', 'max']} defaultValue={[0, 20]} onChange={(val) => handleSliderChange(val, arr.id)}>
                <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
            </RangeSlider>
          </Flex>

          <Spacer />
        </>
      ))}
    </Flex>
      <Button marginX={"47%"} marginTop={'-20px'} marginBottom={'20px'} backgroundColor={"red.300"} _hover={{bg: "red.700"}} _click={{bg: "red.700"}} color={"white"} onClick={() => makePostRequest('http://127.0.0.1:5000/test', sliderVals)}>Laugh!</Button>
      {array.map((arr) => (
        <>
          <Flex
            height="400px"
            marginY="10px"
            bg="white"
            width={isLargerThanMD ? '18%' : 'full'}
            shadow="md"
            p="6"
            alignItems="start"
            justifyContent="start"
            borderRadius="md"
            flexDirection="column"
            textAlign="center"
            mb='0'
            border="1px solid #C4DDFF"
          >
            <Heading as='h4' size='md' fontWeight={'bold'}>{arr.id}</Heading>
            <Text>{arr.title}</Text>
            <Text marginBottom={'250px'}>{arr.text}</Text>
            <TriangleUpIcon color="red">Upvotes</TriangleUpIcon>
            <Text>10000 Upvotes</Text>
          </Flex>

          <Spacer />
        </>
      ))}
    </Flex>
  );
};

export default JokePanel;