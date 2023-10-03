import { FlatList, Platform } from "react-native";
import {
  CardSpacer,
  Container,
  IMAGE_WIDTH,
  Image,
  SPACING,
  Separator,
} from "./styles";

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

  const renderItem = ({ item, index }) => {
    if (index === 0 || index === dataImages.length - 1) {
      return <CardSpacer />;
    }

    return <Image source={{ uri: item }} />;
  };

  const snapToOffsets = dataImages.map((_, index) => {
    return (
      (index === 0 ? SPACING : 0) +
      index * (IMAGE_WIDTH + SPACING) -
      (index === dataImages.length - 1 ? SPACING : 0)
    );
  });

  const getItemLayout = (_, index) => {
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

  return (
    <Container>
      <FlatList
        data={dataImages}
        renderItem={renderItem}
        horizontal
        contentContainerStyle={{
          alignItems: "center",
        }}
        snapToAlignment="center"
        initialNumToRender={3}
        snapToOffsets={snapToOffsets}
        getItemLayout={getItemLayout}
        decelerationRate={decelerationRate}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <Separator />}
      />
    </Container>
  );
}
