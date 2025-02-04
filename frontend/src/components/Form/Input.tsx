import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Icon,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
  icon?: IconType;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, icon, ...rest },
  ref
) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const focusBorderColor = useColorModeValue('blue.500', 'blue.200');
  const errorBorderColor = useColorModeValue('red.500', 'red.300');
  const labelColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name} color={labelColor}>
          {label}
        </FormLabel>
      )}

      <InputGroup>
        {icon && (
          <InputLeftElement pointerEvents="none" h="full">
            <Icon as={icon} fontSize="lg" color={useColorModeValue('gray.400', 'gray.500')} />
          </InputLeftElement>
        )}
        <ChakraInput
          id={name}
          name={name}
          borderColor={borderColor}
          focusBorderColor={focusBorderColor}
          errorBorderColor={errorBorderColor}
          bgColor={useColorModeValue('white', 'gray.800')}
          variant="outline"
          size="lg"
          pl={icon ? "10" : "4"}
          _hover={{
            borderColor: useColorModeValue('gray.300', 'gray.600'),
          }}
          ref={ref}
          {...rest}
        />
      </InputGroup>

      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
