import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  useColorModeValue,
  useColorMode,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Badge,
  MenuDivider,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, BellIcon } from '@chakra-ui/icons';
import { useAuth } from '../../contexts/AuthContext';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, signOut } = useAuth();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const menuBg = useColorModeValue('white', 'gray.700');
  const menuHoverBg = useColorModeValue('gray.100', 'gray.600');

  return (
    <Box
      bg={bgColor}
      px={4}
      borderBottom="1px"
      borderStyle="solid"
      borderColor={borderColor}
      position="fixed"
      w="100%"
      zIndex="sticky"
      boxShadow="sm"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          bgGradient="linear(to-r, blue.400, blue.600)"
          bgClip="text"
          cursor="pointer"
          _hover={{
            bgGradient: "linear(to-r, blue.500, blue.700)",
          }}
        >
          CRM
        </Text>

        <HStack spacing={4} alignItems="center">
          <Tooltip label="Notificações" hasArrow>
            <IconButton
              aria-label="Notificações"
              icon={
                <>
                  <BellIcon />
                  <Badge
                    position="absolute"
                    top="-1"
                    right="-1"
                    colorScheme="red"
                    variant="solid"
                    borderRadius="full"
                    w="4"
                    h="4"
                    fontSize="xs"
                  >
                    3
                  </Badge>
                </>
              }
              variant="ghost"
              size="md"
            />
          </Tooltip>

          <Tooltip label="Alternar tema" hasArrow>
            <IconButton
              aria-label="Alternar tema"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              size="md"
            />
          </Tooltip>

          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
              minW={0}
              _hover={{ textDecoration: 'none' }}
            >
              <HStack spacing={3}>
                <Avatar
                  size="sm"
                  name={user?.name}
                  src={user?.avatar}
                  bg="blue.500"
                />
                <Text
                  display={{ base: 'none', md: 'block' }}
                  color={useColorModeValue('gray.700', 'gray.200')}
                >
                  {user?.name}
                </Text>
              </HStack>
            </MenuButton>
            <MenuList bg={menuBg} borderColor={borderColor}>
              <MenuItem
                icon={<FiUser />}
                _hover={{ bg: menuHoverBg }}
              >
                Perfil
              </MenuItem>
              <MenuItem
                icon={<FiSettings />}
                _hover={{ bg: menuHoverBg }}
              >
                Configurações
              </MenuItem>
              <MenuDivider />
              <MenuItem
                icon={<FiLogOut />}
                onClick={signOut}
                _hover={{ bg: menuHoverBg }}
                color="red.500"
              >
                Sair
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
}
