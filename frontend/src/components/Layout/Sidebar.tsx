import {
  Box,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
  Tooltip,
  Divider,
  Badge,
} from '@chakra-ui/react';
import {
  RiDashboardLine,
  RiContactsLine,
  RiUserLine,
  RiMoneyDollarCircleLine,
  RiBuilding4Line,
  RiSettings4Line,
  RiPieChartLine,
  RiCalendarLine,
} from 'react-icons/ri';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { IconType } from 'react-icons';

interface NavItemProps {
  icon: IconType;
  children: string;
  to: string;
  badge?: {
    text: string;
    colorScheme: string;
  };
}

function NavItem({ icon, children, to, badge }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  const activeBg = useColorModeValue('blue.50', 'blue.900');
  const activeColor = useColorModeValue('blue.600', 'blue.200');
  const inactiveColor = useColorModeValue('gray.600', 'gray.300');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Tooltip label={children} placement="right" hasArrow>
      <Link
        as={RouterLink}
        to={to}
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
        w="full"
        borderRadius="lg"
        overflow="hidden"
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          role="group"
          cursor="pointer"
          bg={isActive ? activeBg : 'transparent'}
          color={isActive ? activeColor : inactiveColor}
          _hover={{
            bg: isActive ? activeBg : hoverBg,
            color: isActive ? activeColor : inactiveColor,
          }}
          transition="all 0.2s"
        >
          <Icon
            mr="4"
            fontSize="18"
            as={icon}
            transition="all 0.2s"
            _groupHover={{
              transform: 'scale(1.1)',
            }}
          />
          <Text fontSize="md" flex="1">
            {children}
          </Text>
          {badge && (
            <Badge
              colorScheme={badge.colorScheme}
              borderRadius="full"
              px="2"
              fontSize="xs"
            >
              {badge.text}
            </Badge>
          )}
        </Flex>
      </Link>
    </Tooltip>
  );
}

export function Sidebar() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const dividerColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={bgColor}
      borderRight="1px"
      borderRightColor={borderColor}
      w="64"
      pos="fixed"
      h="full"
      pt="20"
      pb="6"
      overflowY="auto"
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: borderColor,
          borderRadius: '24px',
        },
      }}
    >
      <Stack spacing="1">
        <NavItem icon={RiDashboardLine} to="/dashboard">
          Dashboard
        </NavItem>
        <NavItem
          icon={RiContactsLine}
          to="/contacts"
          badge={{ text: 'Novo', colorScheme: 'green' }}
        >
          Contatos
        </NavItem>
        <NavItem icon={RiBuilding4Line} to="/clients">
          Clientes
        </NavItem>
        <NavItem
          icon={RiMoneyDollarCircleLine}
          to="/deals"
          badge={{ text: '3', colorScheme: 'blue' }}
        >
          Negócios
        </NavItem>

        <Divider my="4" borderColor={dividerColor} />

        <NavItem icon={RiCalendarLine} to="/calendar">
          Calendário
        </NavItem>
        <NavItem icon={RiPieChartLine} to="/reports">
          Relatórios
        </NavItem>

        <Divider my="4" borderColor={dividerColor} />

        <NavItem icon={RiUserLine} to="/users">
          Usuários
        </NavItem>
        <NavItem icon={RiSettings4Line} to="/settings">
          Configurações
        </NavItem>
      </Stack>
    </Box>
  );
}
