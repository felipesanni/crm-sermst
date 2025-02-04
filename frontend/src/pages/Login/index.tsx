import { Box, Flex, Heading, Stack, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Button';
import { FiMail, FiLock } from 'react-icons/fi';

interface LoginFormData {
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: yup.string().required('Senha obrigatória'),
});

export function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.900')}
      p={4}
    >
      <Stack spacing={8} mx="auto" maxW="md" w="full">
        <Stack align="center" spacing={6}>
          <Heading
            fontSize={{ base: '3xl', md: '4xl' }}
            bgGradient="linear(to-r, blue.400, blue.600)"
            bgClip="text"
            letterSpacing="tight"
          >
            CRM
          </Heading>
          <Text fontSize="lg" color={textColor} textAlign="center">
            Faça login para acessar o sistema
          </Text>
        </Stack>
        <Box
          rounded="xl"
          bg={bgColor}
          boxShadow="xl"
          p={8}
          as="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={5}>
            <Input
              label="E-mail"
              type="email"
              error={errors.email}
              icon={FiMail}
              {...register('email')}
            />
            <Input
              label="Senha"
              type="password"
              error={errors.password}
              icon={FiLock}
              {...register('password')}
            />
            <Button
              type="submit"
              isLoading={isSubmitting}
              w="full"
              mt={2}
              size="lg"
            >
              Entrar
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
