import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends ChakraSelectProps {
  name: string;
  label?: string;
  error?: FieldError;
  options: Option[];
  placeholder?: string;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { name, label, error = null, options, placeholder, ...rest },
  ref
) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const focusBorderColor = useColorModeValue('blue.500', 'blue.200');
  const errorBorderColor = useColorModeValue('red.500', 'red.300');
  const labelColor = useColorModeValue('gray.600', 'gray.300');
  const placeholderColor = useColorModeValue('gray.400', 'gray.500');

  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name} color={labelColor}>
          {label}
        </FormLabel>
      )}

      <ChakraSelect
        id={name}
        name={name}
        borderColor={borderColor}
        focusBorderColor={focusBorderColor}
        errorBorderColor={errorBorderColor}
        bgColor={useColorModeValue('white', 'gray.800')}
        variant="outline"
        size="lg"
        _hover={{
          borderColor: useColorModeValue('gray.300', 'gray.600'),
        }}
        ref={ref}
        placeholder={placeholder}
        sx={{
          '& option': {
            background: useColorModeValue('white', 'gray.800'),
            color: useColorModeValue('gray.800', 'white'),
          },
          '& option:first-of-type': {
            color: placeholderColor,
          },
        }}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </ChakraSelect>

      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export const Select = forwardRef(SelectBase);
