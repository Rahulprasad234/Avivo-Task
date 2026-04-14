import React from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Stack,
  StackDivider,
  Badge,
  Button,
  HStack,
  Avatar,
  Flex,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { User } from '../types/User';

interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  return (
    <Card
      h="full"
      transition="all 0.3s ease"
      _hover={{
        shadow: 'lg',
        transform: 'translateY(-4px)',
      }}
    >
      <CardHeader pb={4}>
        <Flex justify="space-between" align="center">
          <HStack spacing={4}>
            <Avatar
              src={user.image}
              name={`${user.firstName} ${user.lastName}`}
              size="md"
            />
            <Box>
              <Heading size="md">
                {user.firstName} {user.lastName}
              </Heading>
              <Badge colorScheme="blue" mt={1}>
                {user.role}
              </Badge>
            </Box>
          </HStack>
          <Button
            colorScheme="red"
            size="sm"
            leftIcon={<DeleteIcon />}
            onClick={() => onDelete(user.id)}
            variant="ghost"
          >
            Delete
          </Button>
        </Flex>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing={3}>
          <Box>
            <Heading size="xs" textTransform="uppercase" mb={2}>
              Contact
            </Heading>
            <Text fontSize="sm">
              <strong>Email:</strong> {user.email}
            </Text>
            <Text fontSize="sm">
              <strong>Phone:</strong> {user.phone}
            </Text>
            <Text fontSize="sm">
              <strong>Username:</strong> {user.username}
            </Text>
          </Box>

          <Box>
            <Heading size="xs" textTransform="uppercase" mb={2}>
              Company
            </Heading>
            <Text fontSize="sm">
              <strong>Name:</strong> {user.company.name}
            </Text>
            <Text fontSize="sm">
              <strong>Title:</strong> {user.company.title}
            </Text>
            <Text fontSize="sm">
              <strong>Department:</strong> {user.company.department}
            </Text>
          </Box>

          <Box>
            <Heading size="xs" textTransform="uppercase" mb={2}>
              Location
            </Heading>
            <Text fontSize="sm">
              <strong>City:</strong> {user.address.city}
            </Text>
            <Text fontSize="sm">
              <strong>State:</strong> {user.address.state}
            </Text>
            <Text fontSize="sm">
              <strong>Country:</strong> {user.address.country}
            </Text>
          </Box>

          <Box>
            <Heading size="xs" textTransform="uppercase" mb={2}>
              Personal
            </Heading>
            <Text fontSize="sm">
              <strong>Age:</strong> {user.age}
            </Text>
            <Text fontSize="sm">
              <strong>Gender:</strong> {user.gender}
            </Text>
            <Text fontSize="sm">
              <strong>Blood Group:</strong> {user.bloodGroup}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};
