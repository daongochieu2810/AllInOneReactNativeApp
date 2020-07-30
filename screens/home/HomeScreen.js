import React, { useRef, useState } from "react";
import { Animated, Dimensions, FlatList } from "react-native";
import { CARD_HEIGHT, Cards } from "./Card";
import GameCard from "./GameCard";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const useLazyRef = (initializer) => {
  const ref = useRef();
  if (ref.current === undefined) {
    ref.current = initializer();
  }
  return ref.current;
};

const cards = [
  {
    index: 1,
    type: Cards.Card1,
  },
  {
    index: 2,
    type: Cards.Card2,
  },
  {
    index: 3,
    type: Cards.Card3,
  },
  {
    index: 4,
    type: Cards.Card4,
  },
  {
    index: 5,
    type: Cards.Card5,
  },
  {
    index: 6,
    type: Cards.Card6,
  },
];

const HomeScreen = () => {
  const y = useLazyRef(() => new Animated.Value(0));
  const onScroll = useLazyRef(() =>
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: { y },
          },
        },
      ],
      { useNativeDriver: true }
    )
  );
  return (
    <AnimatedFlatList
      scrollEventThrottle={16}
      bounces={false}
      {...{ onScroll }}
      data={cards}
      style={{
        marginTop: 20
      }}
      renderItem={({ index, item: { type } }) => (
        <GameCard {...{ index, y, type }} />
      )}
      keyExtractor={(item) => `${item.index}`}
    />
  );
};

export default HomeScreen;
