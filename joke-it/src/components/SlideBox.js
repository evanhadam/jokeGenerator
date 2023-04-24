import { Flex, Spacer, Text, useMediaQuery, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, onChangeEnd } from '@chakra-ui/react';
import { useState } from 'react';
import { Icon } from '@chakra-ui/react';
import { FaTools, FaHandshake, FaStar } from 'react-icons/fa';
import React from 'react';

const SlideBox = () => {
  const [isLargerThanMD] = useMediaQuery('(min-width: 48em)');
  const [sliderName, setSliderName] = '';
  const [sliderValue, setSliderValue] = useState([0, 100]);

  const handleSliderChange = (value) => {
    setSliderValue(value);
    console.log(sliderValue);
  }

  const array = [
    {
      id: 1,
      text: 'Profanity',
      val: [0,0]
    },
    {
      id: 2,
      text: 'Popularity',
      val: [0,0]
    },
    {
      id: 3,
      text: 'Length',
      val: [0,0]
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
            <RangeSlider colorScheme='red' aria-label={['min' + arr.id, 'max' + arr.id]} defaultValue={[0, 20]} onChange={(val) => handleSliderChange(val)}>
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
  );
};

export default SlideBox;