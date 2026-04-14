import React from 'react';
import {
  Grid,
  Box,
  Center,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { User } from '../types/User';
import { UserCard } from './UserCard';

interface UserListProps {
  users: User[];
  isLoading: boolean;
  onDelete: (id: number) => void;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  isLoading,
  onDelete,
}) => {
  const toast = useToast();

  if (isLoading) {
    return (
      <Center py={12}>
        <Box textAlign="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text mt={4}>Loading users...</Text>
        </Box>
      </Center>
    );
  }

  if (users.length === 0) {
    return (
      <Center py={12}>
        <Text fontSize="lg" color="gray.500">
          No users found
        </Text>
      </Center>
    );
  }

  const handleDelete = (id: number) => {
    onDelete(id);
    toast({
      title: 'User deleted',
      description: 'User has been removed from the list',
      status: 'success',
      duration: 3,
      isClosable: true,
      position: 'top-right',
    });
  };

  return (
    <Box>
      <Text mb={6} fontSize="lg" fontWeight="bold" color="gray.700">
        Showing {users.length} user{users.length !== 1 ? 's' : ''}
      </Text>
      <Grid
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={6}
      >
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={handleDelete}
          />
        ))}
      </Grid>
    </Box>
  );
};
