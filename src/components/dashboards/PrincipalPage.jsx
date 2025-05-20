import { Box, Card, CardBody, CardFooter,CardHeader, Heading,Button, Text, Stack, Image } from "@chakra-ui/react";


export const  PrincipalPage = () => {

    return(
        <Box>
            <Box bgImg="https://i0.wp.com/foodandpleasure.com/wp-content/uploads/2021/02/hoteles-con-las-mejores-vistas-maroma.jpg?w=1200&ssl=1" width="100vw" height="100vh" alignContent="center" pl="33%" >
                <Card align='center' w="500px" bg="transparent">
                    <CardHeader>
                        <Heading size='md'> Welcome to Manage My Stay</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>Booking your stay has never been so easy</Text>
                    </CardBody>
                    <CardFooter>
                        <Button colorScheme='blue'>View here</Button>
                    </CardFooter>
                </Card>
            </Box>
            <Box border="0px">
                <Card
                    overflow='hidden'
                    variant='outline'
                    >

                    <Stack m="75px" textAlign="center">
                        <CardBody>
                        <Heading size='md'>The perfect latte</Heading>

                        <Text py='2'>
                        Manage My Stay is the easiest and fastest way to find and book hotels anywhere in the world. Whether you are traveling for business,
                         vacation, or a weekend getaway, our app offers you thousands of options with the best prices and exclusive deals.
                        </Text>
                        </CardBody>
                    </Stack>
                </Card>
            </Box>
            <Box>
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    >
                    <Stack m="75px">
                        <CardBody>
                        <Heading size='md'>The perfect latte</Heading>

                        <Text py='2'>
                            Caffè latte is a coffee beverage of Italian origin made with espresso
                            and steamed milk.
                        </Text>
                        </CardBody>

                        <CardFooter>
                        <Button variant='solid' colorScheme='blue'>
                            Buy Latte
                        </Button>
                        </CardFooter>
                    </Stack>
                    <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '2100px' }}
                        h="500px"
                        m="75px"
                        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                        alt='Caffe Latte'
                    />
                </Card>
            </Box>
            <Box>
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    >
                    <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '2100px' }}
                        h="500px"
                        m="75px"
                        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                        alt='Caffe Latte'
                    />

                    <Stack m="75px">
                        <CardBody>
                        <Heading size='md'>The perfect latte</Heading>

                        <Text py='2'>
                            Caffè latte is a coffee beverage of Italian origin made with espresso
                            and steamed milk.
                        </Text>
                        </CardBody>

                        <CardFooter>
                        <Button variant='solid' colorScheme='blue'>
                            Buy Latte
                        </Button>
                        </CardFooter>
                    </Stack>
                </Card>
            </Box>
        </Box>
    )
}