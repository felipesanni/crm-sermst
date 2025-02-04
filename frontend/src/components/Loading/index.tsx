import { Flex, Spinner, Text } from '@chakra-ui/react';

interface LoadingProps {
  message?: string;
}

export function Loading({ message = 'Carregando...' }: LoadingProps) {
  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg="blackAlpha.700"
      zIndex="overlay"
      align="center"
      justify="center"
      flexDirection="column"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        mb="4"
      />
      <Text color="white" fontSize="lg">
        {message}
      </Text>
    </Flex>
  );
}
