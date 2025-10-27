import {Alert, ChakraProvider, CloseButton} from "@chakra-ui/react";
import theme from "@/theme/theme.js";

export const AlertField = ({description, index, setState}) => {
  return (
      <ChakraProvider value={theme}>
          <Alert.Root status="error" variant="surface">
              <Alert.Indicator />
              <Alert.Content>
                  <Alert.Title>Invalid Fields</Alert.Title>
                  <Alert.Description>
                      {description}.
                  </Alert.Description>
              </Alert.Content>
              <CloseButton pos="relative" top="-2" insetEnd="-2"
                   onClick={() => {
                       setState(prevState => {
                           return prevState.map((item, key) => {
                               if (key !== index) {
                                   return item
                               }else {
                                   return "";
                               }
                           })
                       })
                   }}
              />
          </Alert.Root>
      </ChakraProvider>
  );
}