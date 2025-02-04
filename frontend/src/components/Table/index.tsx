import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Text,
  useColorModeValue,
  Spinner,
  Flex,
} from '@chakra-ui/react';

interface Column {
  key: string;
  header: string;
  render?: (value: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function Table({
  columns,
  data,
  isLoading = false,
  emptyMessage = 'Nenhum dado encontrado',
}: TableProps) {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  if (isLoading) {
    return (
      <Flex justify="center" align="center" py="8">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  if (!data.length) {
    return (
      <Flex justify="center" align="center" py="8">
        <Text color={textColor}>{emptyMessage}</Text>
      </Flex>
    );
  }

  return (
    <Box overflowX="auto">
      <ChakraTable>
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column.key} whiteSpace="nowrap">
                {column.header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr
              key={rowIndex}
              _hover={{ bg: hoverBg }}
              transition="background-color 0.2s"
            >
              {columns.map((column) => (
                <Td
                  key={`${rowIndex}-${column.key}`}
                  borderColor={borderColor}
                  whiteSpace="nowrap"
                >
                  {column.render
                    ? column.render(row[column.key])
                    : row[column.key]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </Box>
  );
}
