import styled from "styled-components/native";
import { Dimensions } from "react-native";

export const WIDTH = Dimensions.get("screen").width;
export const IMAGE_WIDTH = WIDTH * 0.88;
export const SPACING = WIDTH * 0.02;

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const CardSpacer = styled.View`
  width: ${(WIDTH - IMAGE_WIDTH) / 3}px;
  background-color: red;
  height: 210px;
  border-radius: 8px;
`;

export const Image = styled.Image`
  width: ${IMAGE_WIDTH}px;
  height: 210px;
  border-radius: 8px;
`;

export const Separator = styled.View`
  width: ${SPACING}px;
`;
