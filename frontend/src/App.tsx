import React, { useState, useEffect, useMemo } from 'react';
import { Container, Box, useToast } from '@chakra-ui/react';
import { Header, SearchBar, UserList } from './components';
import { User } from './types/User';
import { userService } from './services/userService';
import { generateMockUser } from './utils';

function App(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<string>('all');
  const [nextUserId, setNextUserId] = useState<number>(1000);
  const toast = useToast();

  // Fetch users from API
  const fetchUsers = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const apiUsers = await userService.getAllUsers();
      setUsers(apiUsers);
      setFilteredUsers(apiUsers);
      if (apiUsers.length > 0) {
        setNextUserId(Math.max(...apiUsers.map((u) => u.id)) + 1);
      }
      toast({
        title: 'Users loaded',
        description: `${apiUsers.length} users loaded successfully`,
        status: 'success',
        duration: 2,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch users from the API. Please check your backend connection.',
        status: 'error',
        duration: 5,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter users based on search query and type
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredUsers(users);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = users.filter((user) => {
      switch (searchType) {
        case 'name':
          return (
            user.firstName.toLowerCase().includes(query) ||
            user.lastName.toLowerCase().includes(query)
          );
        case 'company':
          return user.company.name.toLowerCase().includes(query);
        case 'role':
          return user.role.toLowerCase().includes(query);
        case 'country':
          return user.address.country.toLowerCase().includes(query);
        default: // 'all'
          return (
            user.firstName.toLowerCase().includes(query) ||
            user.lastName.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.company.name.toLowerCase().includes(query) ||
            user.address.country.toLowerCase().includes(query) ||
            user.role.toLowerCase().includes(query)
          );
      }
    });

    setFilteredUsers(filtered);
  }, [searchQuery, searchType, users]);

  // Handle search
  const handleSearch = (query: string, type: string): void => {
    setSearchQuery(query);
    setSearchType(type);
  };

  // Handle refresh
  const handleRefresh = (): void => {
    fetchUsers();
  };

  // Handle add user
  const handleAddUser = (): void => {
    const newUser = generateMockUser(nextUserId);
    setUsers((prev) => [newUser, ...prev]);
    setNextUserId((prev) => prev + 1);

    // Apply current filter to new list
    if (searchQuery.trim()) {
      handleSearch(searchQuery, searchType);
    }
  };

  // Handle delete user
  const handleDeleteUser = (id: number): void => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    setFilteredUsers((prev) => prev.filter((user) => user.id !== id));
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box minH="100vh" bg="gray.50">
      <Header
        onRefresh={handleRefresh}
        onAddUser={handleAddUser}
        isLoading={isLoading}
      />

      <Container maxW="7xl" py={8}>
        <SearchBar onSearch={handleSearch} />
        <UserList
          users={filteredUsers}
          isLoading={isLoading}
          onDelete={handleDeleteUser}
        />
      </Container>
    </Box>
  );
}

export default App;
