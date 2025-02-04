import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  Icon,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface ButtonProps extends ChakraButtonProps {
  isLoading?: boolean;
  icon?: IconType;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
}

export function Button({
  children,
  isLoading = false,
  icon,
  variant = 'primary',
  ...rest
}: ButtonProps) {
  const getVariantStyles = () => {
    const styles = {
      primary: {
        bg: 'blue.500',
        color: 'white',
        _hover: { bg: 'blue.600' },
        _active: { bg: 'blue.700' },
      },
      secondary: {
        bg: useColorModeValue('gray.100', 'gray.700'),
        color: useColorModeValue('gray.800', 'white'),
        _hover: { bg: useColorModeValue('gray.200', 'gray.600') },
        _active: { bg: useColorModeValue('gray.300', 'gray.500') },
      },
      outline: {
        bg: 'transparent',
        color: useColorModeValue('blue.500', 'blue.200'),
        border: '2px solid',
        borderColor: useColorModeValue('blue.500', 'blue.200'),
        _hover: {
          bg: useColorModeValue('blue.50', 'rgba(66, 153, 225, 0.1)'),
        },
      },
      ghost: {
        bg: 'transparent',
        color: useColorModeValue('blue.500', 'blue.200'),
        _hover: {
          bg: useColorModeValue('blue.50', 'rgba(66, 153, 225, 0.1)'),
        },
      },
      danger: {
        bg: 'red.500',
        color: 'white',
        _hover: { bg: 'red.600' },
        _active: { bg: 'red.700' },
      },
    };

    return styles[variant];
  };

  return (
    <ChakraButton
      size="lg"
      fontSize="md"
      fontWeight="medium"
      borderRadius="lg"
      transition="all 0.2s"
      {...getVariantStyles()}
      {...rest}
      disabled={isLoading || rest.disabled}
    >
      {isLoading ? (
        <Spinner size="sm" color="current" />
      ) : (
        <>
          {icon && <Icon as={icon} fontSize="20" mr={children ? "2" : "0"} />}
          {children}
        </>
      )}
    </ChakraButton>
  );
}
