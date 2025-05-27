import { Flex, Text, Link, Icon } from "@chakra-ui/react";
import { FaGithub, FaHeart } from "react-icons/fa";

export const Footer = () => (
  <Flex
    as="footer"
    w="100vw"
    py={5}
    px={{ base: 4, md: 16 }}
    align="center"
    justify="center"
    bg="rgba(41, 87, 105, 0.92)"
    color="#F9F7F2"
    fontSize="md"
    mt="auto"
    direction="column"
    boxShadow="0 -2px 32px 0 rgba(44,98,117,0.10)"
  >
    <Text>
      <Icon as={FaHeart} color="#b8807c" mx={1} /> 
      Proyecto académico - ManageMyStay © {new Date().getFullYear()}
    </Text>
    <Text fontSize="sm" mt={1}>
      Código en{" "}
      <Link href="https://github.com/IN6CV-Grupo-2/Frontend-ManageMyStay" isExternal color="#7bc2c4">
        <Icon as={FaGithub} mx={1} /> GitHub
      </Link>
    </Text>
  </Flex>
);