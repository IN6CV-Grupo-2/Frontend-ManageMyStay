import {
  Box,
  Stack,
  HStack,
  VStack,
  Link,
  Divider,
  Image,
  Text,
  Button, 
} from '@chakra-ui/react';

import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box p={{ base: 5, md: 8 }} maxW="100%" marginInline="auto" bg='black' color="white">
      <Stack
        spacing={{ base: 8, md: 0 }}
        justifyContent="space-between"
        direction={{ base: 'column', md: 'row' }}
      >
        <Box maxW="300px">
          <Text mt={2} color="gray.500" fontSize="md">
            Build fully functional accessible web applications faster than ever
          </Text>
        </Box>
        <HStack
          spacing={4}
          d={{ base: 'none', sm: 'flex' }}
          justifyContent={{ sm: 'space-between', md: 'normal' }}
        >
          <VStack spacing={4} alignItems="flex-start">
            <Text fontSize="md" fontWeight="bold">
              About
            </Text>
            <VStack spacing={2} alignItems="flex-start" color="gray.500">
              <CustomLink>Contrinute</CustomLink>
              <CustomLink>Media assets</CustomLink>
              <CustomLink>Changelog</CustomLink>
              <CustomLink>Releases</CustomLink>
            </VStack>
          </VStack>
          <VStack spacing={4} alignItems="flex-start">
            <Text fontSize="md" fontWeight="bold">
              Community
            </Text>
            <VStack spacing={2} alignItems="flex-start" color="gray.500">
              <CustomLink>Chat on Discord</CustomLink>
              <CustomLink>Follow on Twitter</CustomLink>
              <CustomLink>Follow on Github</CustomLink>
              <CustomLink>Github discussions</CustomLink>
            </VStack>
          </VStack>
          <VStack spacing={4} alignItems="flex-start">
            <Text fontSize="md" fontWeight="bold">
              Project
            </Text>
            <VStack spacing={2} alignItems="flex-start" color="gray.500">
              <CustomLink>TemplatesKart</CustomLink>
              <CustomLink>Documentation</CustomLink>
              <CustomLink>Github organization</CustomLink>
              <CustomLink>npm organization</CustomLink>
            </VStack>
          </VStack>
        </HStack>
      </Stack>

      <Divider my={4} />

      <Stack direction={{ base: 'column', md: 'row' }} spacing={3} justifyContent="space-between">
        <Stack spacing={2} direction={{ base: 'column', md: 'row' }}>
          <Button leftIcon={<FaGithub />} as={Link} href="#" rounded="md" colorScheme="gray">
            Github Discussions
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

const CustomLink = ({ children, ...props }) => {
  return (
    <Link href="#" fontSize="sm" _hover={{ textDecoration: 'underline' }} {...props}>
      {children}
    </Link>
  );
};

export default Footer;