import { Box, Card, CardBody, CardFooter,CardHeader, Heading,Button, Text } from "@chakra-ui/react";


export const  PrincipalPage = () => {

    return(
        <Box>
            <Box bgImg="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/47/5f/58/hotel-soleil-pacifico.jpg?w=1200&h=-1&s=1" width="96vw" height="100vh" alignContent="center" pl="33%" >
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
        </Box>
    )
}