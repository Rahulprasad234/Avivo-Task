import React from 'react';
import {
  Box,
  Container,
  Heading,
  HStack,
  Button,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, RepeatIcon } from '@chakra-ui/icons';

interface HeaderProps {
  onRefresh: () => void;
  onAddUser: () => void;
  isLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onRefresh,
  onAddUser,
  isLoading,
}) => {
  const toast = useToast();

  const handleAddClick = () => {
    onAddUser();
    toast({
      title: 'User added',
      description: 'New user has been added to the list',
      status: 'success',
      duration: 3,
      isClosable: true,
      position: 'top-right',
    });
  };

  return (
    <Box bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" py={6} mb={8} shadow="md">
      <Container maxW="7xl">
        <Flex justify="space-between" align="center">
          <Heading size="2xl" color="white">
            User Management
          </Heading>

          <HStack spacing={3}>
            <Button
              colorScheme="whiteAlpha"
              leftIcon={<RepeatIcon />}
              onClick={onRefresh}
              isLoading={isLoading}
              loadingText="Refreshing..."
            >
            </Button>

            <Button
              colorScheme="green"
              leftIcon={<AddIcon />}
              onClick={handleAddClick}
            >
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};
