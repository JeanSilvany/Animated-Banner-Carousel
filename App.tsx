import {
  Button,
  FlatList,
  Platform,
  TouchableOpacity,
  ViewToken,
} from "react-native";

import {
  CardSpacer,
  Container,
  IMAGE_WIDTH,
  Image,
  SPACING,
  Separator,
} from "./styles";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useEffect, useRef, useState } from "react";

const data = [
  "https://picsum.photos/1920/1080",
  "https://picsum.photos/1919/1080",
  "https://picsum.photos/1918/1080",
  "https://picsum.photos/1917/1080",
  "https://picsum.photos/1916/1080",
  "https://picsum.photos/1915/1080",
  "https://picsum.photos/1914/1080",
  "https://picsum.photos/1913/1080",
  "https://picsum.photos/1912/1080",
  "https://picsum.photos/1911/1080",
  "https://picsum.photos/1910/1080",
];

export default function App() {
  const dataImages = ["left-spacer", ...data, "right-spacer"];

  const scrollX = useSharedValue(0);
  const flatListRef = useAnimatedRef<FlatList>();
  const flatListIndex = useSharedValue(1);

  const autoPlay = true;
  const timingDelay = 5000;

  const OnScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const renderItem = ({ item, index }) => {
    if (index === 0 || index === dataImages.length - 1) {
      return <CardSpacer />;
    }

    return (
      <TouchableOpacity activeOpacity={0.7}>
        <Image source={{ uri: item }} />
      </TouchableOpacity>
    );
  };

  const snapToOffsets = dataImages.map((_, index) => {
    return (
      (index === 1 ? SPACING : 0) +
      index * (IMAGE_WIDTH + SPACING) -
      (index === dataImages.length - 1 ? SPACING : 0)
    );
  });

  const getItemLayout = (_: any, index: number) => {
    return {
      length: IMAGE_WIDTH + SPACING,
      offset:
        (index === 0 ? SPACING : 0) +
        index * (IMAGE_WIDTH + SPACING) -
        (index === dataImages.length - 1 ? SPACING : 0),
      index,
    };
  };

  const decelerationRate = Platform.OS === "ios" ? "fast" : 0.66;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0].index !== null) {
        flatListIndex.value = viewableItems[0].index;
      }
    }
  );

  const handleScrollToNext = () => {
    const ITEMS_SIZE = dataImages.length - 2;
    if (flatListIndex.value < ITEMS_SIZE) {
      console.log("IF");
      flatListRef.current.scrollToIndex({
        index: flatListIndex.value + 1,
        animated: true,
      });

      flatListIndex.value += 1;
    } else {
      console.log("ELSE");

      flatListRef.current.scrollToIndex({
        index: 0,
        animated: true,
      });

      flatListIndex.value = 0;
    }
  };

  useEffect(() => {
    if (autoPlay) {
      setInterval(() => {
        handleScrollToNext();
      }, timingDelay);
    }
  }, [autoPlay]);

  return (
    <Container>
      <Animated.FlatList
        ref={flatListRef}
        data={dataImages}
        renderItem={renderItem}
        horizontal
        contentContainerStyle={{
          alignItems: "center",
          gap: SPACING,
        }}
        snapToAlignment="center"
        initialNumToRender={3}
        onScroll={OnScroll}
        onViewableItemsChanged={onViewableItemsChanged.current}
        snapToOffsets={snapToOffsets}
        getItemLayout={getItemLayout}
        decelerationRate={decelerationRate}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        // ItemSeparatorComponent={() => <Separator />}
      />
      <Button title="Next" onPress={handleScrollToNext} />
    </Container>
  );
}
