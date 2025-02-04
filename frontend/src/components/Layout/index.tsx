import { ReactNode } from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Flex direction="column" h="100vh">
      <Header />
      
      <Flex flex="1">
        <Sidebar />
        
        <Box
          flex="1"
          bg={bgColor}
          p="8"
          ml="64"
          overflowY="auto"
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
