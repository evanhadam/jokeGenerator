import { Flex, Spacer, Text, useMediaQuery, Heading, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Button, handleSliderChange } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const JokePanel = () => {
  // used to make site responsive: https://chakra-ui.com/docs/hooks/use-media-query
  const [size] = useMediaQuery('(min-width: 48em)');
  const sliderVals = [0, 20, 0, 20, 0, 20]
  const [times, setTimes] = useState({'quick_time': '', 'bucket_time': ''})
  // constant and makePostRequest hook structure based on GeeksForGeeks link here: https://www.geeksforgeeks.org/how-to-connect-reactjs-with-flask-api/
  const [data, setData] = useState({
    joke: [
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

    // updates slider values based on user input
    const handleSliderChange = (value, sliderID) => {
      sliderVals[sliderID*2] = value[0];
      sliderVals[sliderID*2 + 1] = value[1];
    }

  // makes API calls to send slider values and get back sort times and 10 jokes
  const makePostRequest = (path, valArr) => {
    setTimes({'quick_time': 'Loading...', 'bucket_time': 'Loading...'})
    
    let queryObj = { sliderMin1: String(valArr[0]),
                    sliderMax1: String(valArr[1]),
                    sliderMin2: String(valArr[2]),
                    sliderMax2: String(valArr[3]),
                    sliderMin3: String(valArr[4]),
                    sliderMax3: String(valArr[5])};
    axios.post(path, queryObj).then(
        (response) => {
            const result = response.data;
            var database = JSON.parse(result);
            console.log(typeof result);
            console.log(typeof database);
            console.log(String(result.bucketsort_time));
            console.log(String(database.bucketsort_time));
            // setData, edit all titles and jokes according to JSON output
            setData(
              {joke: [
                {
                  id: '#1',
                  title: database.jokes[0].title,
                  text: database.jokes[0].body,
                  upvotes: database.jokes[0].score
                },
                {
                  id: '#2',
                  title: database.jokes[1].title,
                  text: database.jokes[1].body,
                  upvotes: database.jokes[1].score
                },
                {
                  id: '#3',
                  title: database.jokes[2].title,
                  text: database.jokes[2].body,
                  upvotes: database.jokes[2].score
                },
                {
                    id: '#4',
                    title: database.jokes[3].title,
                    text: database.jokes[3].body,
                    upvotes: database.jokes[3].score
                },
                {
                    id: '#5',
                    title: database.jokes[4].title,
                    text: database.jokes[4].body,
                    upvotes: database.jokes[4].score
                },
                {
                    id: '#6',
                    title: database.jokes[5].title,
                    text: database.jokes[5].body,
                    upvotes: database.jokes[5].score
                },
                {
                    id: '#7',
                    title: database.jokes[6].title,
                    text: database.jokes[6].body,
                    upvotes: database.jokes[6].score
                },
                {
                    id: '#8',
                    title: database.jokes[7].title,
                    text: database.jokes[7].body,
                    upvotes: database.jokes[7].score
                },
                {
                      id: '#9',
                      title: database.jokes[8].title,
                      text: database.jokes[8].body,
                      upvotes: database.jokes[8].score
                },
                {
                      id: '#10',
                      title: database.jokes[9].title,
                      text: database.jokes[9].body,
                      upvotes: database.jokes[9].score
                },
              ]}
            )
            setTimes({'quick_time': String(database.quicksort_time) + ' nanoseconds', 'bucket_time': String(database.bucketsort_time) + ' nanoseconds'})
        },
        (error) => {
            console.log(error);
            setTimes({'quick_time': 'Error! Not 10 jokes in this category!', 'bucket_time': 'Error! Not 10 jokes in this category!'})
        }
    );
}

  // Chakra UI Flex: https://chakra-ui.com/docs/components/flex
  // Chakra UI Range Slider: https://chakra-ui.com/docs/components/range-slider
  // generates all UI elements
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
      <Text>Quick Sort: {times.quick_time}</Text>
      <Text>Bucket Sort: {times.bucket_time}</Text>
      <Button id = 'button' marginX={"47%"} marginTop={'-20px'} marginBottom={'20px'} backgroundColor={"red.300"} _hover={{bg: "red.700"}} _click={{bg: "red.700"}} color={"white"} onClick={() => makePostRequest('http://127.0.0.1:5000/pull', sliderVals)}>Laugh!</Button>
      {data.joke.map((arr) => (
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
            <Text marginBottom={'auto'}>{arr.text}</Text>
            <Text>Upvotes</Text>
            <Text>{arr.upvotes}</Text>
          </Flex>

          <Spacer />
        </>
      ))}
      <Text marginX={'13%'}>Disclaimer: We do not condone offensive or overly out-of-pocket content within these jokes. We're simply compiling what's out there for you.</Text>
    </Flex>
  );
};

// allows for call to JokePanel in App.js
export default JokePanel;