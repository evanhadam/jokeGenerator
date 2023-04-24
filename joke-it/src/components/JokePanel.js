import { Flex, Spacer, Text, useMediaQuery, Heading, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { FaTools, FaHandshake, FaStar } from 'react-icons/fa';
import React from 'react';
import { TriangleUpIcon } from '@chakra-ui/icons';

const JokePanel = () => {
  const [isLargerThanMD] = useMediaQuery('(min-width: 48em)');
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
      {array.map((arr) => (
        <>
          <Flex
            height="400px"
            marginY="5"
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