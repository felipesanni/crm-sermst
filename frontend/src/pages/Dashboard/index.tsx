import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  useColorModeValue,
  Flex,
  Icon,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  HStack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api';
import { Layout } from '../../components/Layout';
import { Card } from '../../components/Card';
import {
  RiContactsLine,
  RiBuilding4Line,
  RiMoneyDollarCircleLine,
  RiPieChartLine,
  RiArrowUpLine,
  RiArrowDownLine,
} from 'react-icons/ri';
import { Loading } from '../../components/Loading';

interface DashboardStats {
  totalContacts: number;
  totalClients: number;
  totalDeals: number;
  totalRevenue: number;
  revenueGrowth: number;
  topDeals: Array<{
    id: string;
    title: string;
    value: number;
    status: string;
    client: string;
    probability: number;
  }>;
  monthlyGoal: {
    current: number;
    target: number;
    percentage: number;
  };
}

export function Dashboard() {
  const { data: stats, isLoading } = useQuery<DashboardStats>(['dashboard-stats'], async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  type DealStatus = 'em andamento' | 'ganho' | 'perdido' | 'prospectando';

  const getStatusColor = (status: string): string => {
    const colors: Record<DealStatus, string> = {
      'em andamento': 'yellow',
      'ganho': 'green',
      'perdido': 'red',
      'prospectando': 'blue',
    };
    return colors[status.toLowerCase() as DealStatus] || 'gray';
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Box>
        <Flex justify="space-between" align="center" mb="8">
          <Heading size="lg">Dashboard</Heading>
          <Text color="gray.500">
            Última atualização: {new Date().toLocaleString('pt-BR')}
          </Text>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="4" mb="8">
          <Card
            title="Contatos"
            value={stats?.totalContacts || 0}
            icon={RiContactsLine}
            description="Total de contatos"
          />
          <Card
            title="Clientes"
            value={stats?.totalClients || 0}
            icon={RiBuilding4Line}
            description="Clientes ativos"
          />
          <Card
            title="Negócios"
            value={stats?.totalDeals || 0}
            icon={RiMoneyDollarCircleLine}
            description="Negociações em andamento"
          />
          <Card
            title="Receita"
            value={formatCurrency(stats?.totalRevenue || 0)}
            icon={RiPieChartLine}
            description="Receita total"
            trend={{
              value: stats?.revenueGrowth || 0,
              isPositive: (stats?.revenueGrowth || 0) > 0,
            }}
          />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="4" mb="8">
          <Box
            bg={useColorModeValue('white', 'gray.800')}
            p="6"
            borderRadius="lg"
            boxShadow="sm"
          >
            <Heading size="md" mb="4">Meta Mensal</Heading>
            <Text mb="2">
              {formatCurrency(stats?.monthlyGoal.current || 0)} de {formatCurrency(stats?.monthlyGoal.target || 0)}
            </Text>
            <Progress
              value={stats?.monthlyGoal.percentage || 0}
              colorScheme="blue"
              borderRadius="full"
              size="lg"
              mb="2"
            />
            <Text color="gray.500" fontSize="sm">
              {stats?.monthlyGoal.percentage || 0}% da meta atingida
            </Text>
          </Box>

          <Box
            bg={useColorModeValue('white', 'gray.800')}
            p="6"
            borderRadius="lg"
            boxShadow="sm"
          >
            <Heading size="md" mb="4">Principais Negócios</Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Negócio</Th>
                  <Th>Cliente</Th>
                  <Th>Valor</Th>
                  <Th>Status</Th>
                  <Th>Prob.</Th>
                </Tr>
              </Thead>
              <Tbody>
                {stats?.topDeals.map((deal) => (
                  <Tr key={deal.id}>
                    <Td>{deal.title}</Td>
                    <Td>{deal.client}</Td>
                    <Td>{formatCurrency(deal.value)}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(deal.status)}>
                        {deal.status}
                      </Badge>
                    </Td>
                    <Td>
                      <HStack spacing="1">
                        <Text>{deal.probability}%</Text>
                        <Icon
                          as={deal.probability >= 50 ? RiArrowUpLine : RiArrowDownLine}
                          color={deal.probability >= 50 ? 'green.500' : 'red.500'}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </SimpleGrid>
      </Box>
    </Layout>
  );
}
