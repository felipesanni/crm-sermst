import { Box, Flex, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { BiTrendingUp, BiTrendingDown } from 'react-icons/bi';

interface CardProps {
  title: string;
  value: string | number;
  icon: IconType;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function Card({ title, value, icon, description, trend }: CardProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const iconBgColor = useColorModeValue('blue.50', 'blue.900');
  const iconColor = useColorModeValue('blue.500', 'blue.200');

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      p="6"
      boxShadow="sm"
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'md',
      }}
    >
      <Flex justify="space-between" align="center" mb="4">
        <Text fontSize="lg" fontWeight="medium" color={textColor}>
          {title}
        </Text>
        <Flex
          bg={iconBgColor}
          p="2"
          borderRadius="full"
          color={iconColor}
          align="center"
          justify="center"
        >
          <Icon as={icon} fontSize="xl" />
        </Flex>
      </Flex>

      <Text fontSize="3xl" fontWeight="bold" mb="2">
        {value}
      </Text>

      {description && (
        <Text fontSize="sm" color={textColor}>
          {description}
        </Text>
      )}

      {trend && (
        <Flex align="center" mt="2">
          <Icon
            as={trend.isPositive ? BiTrendingUp : BiTrendingDown}
            color={trend.isPositive ? 'green.500' : 'red.500'}
            mr="1"
            fontSize="20px"
          />
          <Text
            fontSize="sm"
            color={trend.isPositive ? 'green.500' : 'red.500'}
            fontWeight="medium"
          >
            {trend.value}%
          </Text>
          <Text fontSize="sm" color={textColor} ml="1">
            em relação ao mês anterior
          </Text>
        </Flex>
      )}
    </Box>
  );
}
