import { Flex, Spacer, Text, useMediaQuery, Heading, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Button, handleSliderChange } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const JokePanel = () => {
  // used to make site responsive: https://chakra-ui.com/docs/hooks/use-media-query
  const [size] = useMediaQuery('(min-width: 48em)');
  const sliderVals = [0, 20, 0, 20, 0, 20];
  // constant and makePostRequest hook structure based on GeeksForGeeks link here: https://www.geeksforgeeks.org/how-to-connect-reactjs-with-flask-api/
  const [data, setData] = useState({
    jokes: [
      {
        id: '#1',
        title: '',
        text: '',
        upvotes: ''
      },
      {
        id: '#2',
        title: '',
        text: '',
        upvotes: '' 
      },
      {
        id: '#3',
        title: '',
        text: '',
        upvotes: ''
      },
      {
          id: '#4',
          title: '',
          text: '',
          upvotes: ''
      },
      {
          id: '#5',
          title: '',
          text: '',
          upvotes: ''
      },
      {
          id: '#6',
          title: '',
          text: '',
          upvotes: ''
      },
      {
          id: '#7',
          title: '',
          text: '',
          upvotes: ''
      },
      {
          id: '#8',
          title: '',
          text: '',
          upvotes: ''
      },
      {
            id: '#9',
            title: '',
            text: '',
            upvotes: ''
      },
      {
            id: '#10',
            title: '',
            text: '',
            upvotes: ''
      },
    ]
});

  const slideArray = [
    {
      id: 0,
      text: 'Profanity'
    },
    {
      id: 1,
      text: 'Popularity'
    },
    {
      id: 2,
      text: 'Length'
    }];

  const handleSliderChange = (value, sliderID) => {
    sliderVals[sliderID*2] = value[0];
    sliderVals[sliderID*2 + 1] = value[1];
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
            // setData, edit all titles and jokes according to JSON output
            setData(
              {jokes: [
                {
                  id: '#1',
                  title: result.Result,
                  text: '',
                  upvotes: ''
                },
                {
                  id: '#2',
                  title: '',
                  text: '',
                  upvotes: '' 
                },
                {
                  id: '#3',
                  title: '',
                  text: '',
                  upvotes: ''
                },
                {
                    id: '#4',
                    title: '',
                    text: '',
                    upvotes: ''
                },
                {
                    id: '#5',
                    title: '',
                    text: '',
                    upvotes: ''
                },
                {
                    id: '#6',
                    title: '',
                    text: '',
                    upvotes: ''
                },
                {
                    id: '#7',
                    title: '',
                    text: '',
                    upvotes: ''
                },
                {
                    id: '#8',
                    title: '',
                    text: '',
                    upvotes: ''
                },
                {
                      id: '#9',
                      title: '',
                      text: '',
                      upvotes: ''
                },
                {
                      id: '#10',
                      title: '',
                      text: '',
                      upvotes: ''
                },
              ]}
            )
        },
        (error) => {
            console.log(error);
        }
    );
}

  // Chakra UI Flex: https://chakra-ui.com/docs/components/flex
  // Chakra UI Range SLider: https://chakra-ui.com/docs/components/range-slider
  return (
    <Flex
      minH="10vh"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      py="16"
      px={size ? '16' : '6'}
      flexWrap="wrap"
      flexDirection={size ? 'row' : 'column'}
    >
      <Flex
      minH="10vh"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      py="16"
      px={size ? '16' : '6'}
      flexWrap="wrap"
      flexDirection={size ? 'row' : 'column'}
    >
      {slideArray.map((arr) => (
        <>
          <Flex
            height="100px"
            bg="blackAlpha.200"
            width={size ? '32%' : 'full'}
            shadow="md"
            p="6"
            alignItems="center"
            justifyContent="center"
            borderRadius="md"
            flexDirection="column"
            textAlign="center"
            mb='0'
            marginTop='-70px'
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
      <Button isLoading colorScheme='red' variant='solid' marginX={"47%"} marginTop={'-20px'} marginBottom={'20px'} backgroundColor={"red.300"} _hover={{bg: "red.700"}} _click={{bg: "red.700"}} color={"white"} onClick={() => makePostRequest('http://127.0.0.1:5000/test', sliderVals)}>Laugh!</Button>
      {data.jokes.map((arr) => (
        <>
          <Flex
            id="card"
            height="400px"
            marginY="10px"
            bg="white"
            width={size ? '18%' : 'full'}
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
            <Text marginBottom={'285px'}>{arr.text}</Text>
            <Text>Upvotes</Text>
            <Text>{arr.upvotes}</Text>
          </Flex>

          <Spacer />
        </>
      ))}
    </Flex>
  );
};

export default JokePanel;