import { Dimensions, FlatList, Platform, View } from "react-native";
import { Container, Image } from "./styles";

const WIDTH = Dimensions.get("screen").width;
const IMAGE_WIDTH = WIDTH * 0.88;
const SPACING = WIDTH * 0.02;

const data = [
  "https://picsum.photos/1920/1080",
  "https://picsum.photos/1919/1080",
  "https://picsum.photos/1918/1080",
  "https://picsum.photos/1917/1080",
  "https://picsum.photos/1916/1080",
  "https://picsum.photos/1915/1080",
];

export default function App() {
  const dataImages = ["left-spacer", ...data, "right-spacer"];

  const renderItem = ({ item, index }) => {
    if (index === 0 || index === dataImages.length - 1) {
      return (
        <View
          style={{
            width: (WIDTH - IMAGE_WIDTH) / 3,
            backgroundColor: "red",
            height: 200,
            borderRadius: 8,
          }}
        />
      );
    }

    return (
      <Image
        source={{ uri: item }}
        style={{
          width: IMAGE_WIDTH,
          height: 200,
          borderRadius: 8,
        }}
      />
    );
  };

  return (
    <Container>
      <FlatList
        data={dataImages}
        renderItem={renderItem}
        horizontal
        contentContainerStyle={{
          alignItems: "center",
        }}
        showsHorizontalScrollIndicator={false}
        snapToOffsets={dataImages.map((_, index) => {
          return (
            (index === 0 ? SPACING : 0) +
            index * (IMAGE_WIDTH + SPACING) -
            (index === dataImages.length - 1 ? SPACING : 0)
          );
        })}
        initialNumToRender={5}
        getItemLayout={(_, index) => {
          return {
            length: IMAGE_WIDTH + SPACING,
            offset:
              (index === 0 ? SPACING : 0) +
              index * (IMAGE_WIDTH + SPACING) -
              (index === dataImages.length - 1 ? SPACING : 0),
            index,
          };
        }}
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate={Platform.OS === "ios" ? "fast" : 0.66}
        ItemSeparatorComponent={() => <View style={{ width: SPACING }} />}
      />
    </Container>
  );
}
