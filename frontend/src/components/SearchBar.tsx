import React, { useState, useCallback } from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  HStack,
  Select,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface SearchBarProps {
  onSearch: (query: string, searchType: string) => void;
  placeholder?: string;
}

type SearchType = 'all' | 'name' | 'company' | 'role' | 'country';

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search users...',
}) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('all');

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      onSearch(value, searchType);
    },
    [searchType, onSearch]
  );

  const handleSearchTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const type = e.target.value as SearchType;
      setSearchType(type);
      onSearch(query, type);
    },
    [query, onSearch]
  );

  return (
    <Box mb={6}>
      <HStack spacing={4}>
        <InputGroup flex={1}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleSearchChange}
            borderRadius="md"
            size="lg"
          />
        </InputGroup>

        <Select
          value={searchType}
          onChange={handleSearchTypeChange}
          w="200px"
          size="lg"
          borderRadius="md"
        >
          <option value="all">Search All</option>
          <option value="name">Name</option>
          <option value="company">Company</option>
          <option value="role">Role</option>
          <option value="country">Country</option>
        </Select>
      </HStack>
    </Box>
  );
};
