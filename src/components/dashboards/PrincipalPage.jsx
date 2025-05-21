import { Box, Card, CardBody, CardFooter,CardHeader, Heading,Button, Text, Stack, Image, IconButton, } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon  } from "@chakra-ui/icons";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef } from 'react';

export const  PrincipalPage = () => {

    const sliderRef = useRef(null);
    const images = [
        'https://www.hotelbiltmore.com.gt/wp-content/uploads/2024/09/KIKO6670.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/28/76/94/17/good-hotel-guatemala.jpg',
        'https://static1.eskypartners.com/travelguide/vancouver-hotels.jpg',

    ];

    const imagesEvents = [
        'https://www.hotelescenter.es/wp-content/blogs.dir/1601/files/bodas/hoteles-center-boda-banquete-detalle.jpg',
        'https://luxze.mx/wapp/vistas/assets/Hilton1.jpg',

    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return(
        <Box>
            <Box
                bgImage="url('https://i0.wp.com/foodandpleasure.com/wp-content/uploads/2021/02/hoteles-con-las-mejores-vistas-maroma.jpg?w=1200&ssl=1')"
                bgSize="cover"
                bgPosition="center"
                bgRepeat="no-repeat"
                width="100vw"
                height="100vh"
                display="flex"
                justifyContent="center"
                alignItems="center"
                >
                <Card w="500px" bg="rgba(255, 255, 255, 0.8)" boxShadow="lg">
                    <CardHeader textAlign="center">
                    <Heading size="md">Welcome to Manage My Stay</Heading>
                    </CardHeader>
                    <CardBody>
                    <Text textAlign="center">Booking your stay has never been so easy</Text>
                    </CardBody>
                    <CardFooter justifyContent="center">
                    <Button colorScheme="blue">View here</Button>
                    </CardFooter>
                </Card>
                </Box>
            <Box>
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    bg='#F9F7F2'
                    >
                    <Stack m="75px">
                        <CardBody>
                        <Heading size='md'>Book at the hotel of your choice</Heading>

                        <Text py='2' mt="30px">
                            We offer a wide range of hotels so you can choose the one that best suits your needs,
                            preferences, and budget. Whether you're looking for a luxurious resort with top-tier amenities,
                            a cozy boutique hotel in the heart of the city, or a practical and comfortable option for business travel,
                            our platform provides detailed information and real-time availability to help you make the best decision.
                            Each listing includes photos, guest reviews, location details, and a full breakdown of services offered,
                            allowing you to compare and select the perfect stay with confidence. From family vacations to corporate trips,
                            we make it easy for you to find the ideal hotel that aligns with your travel goals and expectations.
                        </Text>
                        </CardBody>

                        <CardFooter>
                        <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline'>
                            Book Now
                        </Button>
                        </CardFooter>
                    </Stack>
                    <Box
                        maxW={{ base: '100%', sm: '60%' }}
                        m="75px auto"
                        position="relative"
                        >
                        <Slider ref={sliderRef} {...settings}>
                            {images.map((src, idx) => (
                            <Box
                                key={idx}
                                height="450px"
                                borderRadius="md"
                                overflow="hidden"
                                position="relative"
                            >
                                <Image
                                src={src}
                                alt={`Hotel ${idx + 1}`}
                                objectFit="contain"  
                                width="100%"
                                height="100%"
                                />
                            </Box>
                            ))}
                        </Slider>

                        <IconButton
                            icon={<ArrowBackIcon />}
                            position="absolute"
                            top="50%"
                            left="10px"
                            transform="translateY(-50%)"
                            zIndex={2}
                            onClick={() => sliderRef.current?.slickPrev()}
                            aria-label="Previous"
                            colorScheme="teal"
                            borderRadius="full"
                        />

                        <IconButton
                            icon={<ArrowForwardIcon />}
                            position="absolute"
                            top="50%"
                            right="10px"
                            transform="translateY(-50%)"
                            zIndex={2}
                            onClick={() => sliderRef.current?.slickNext()}
                            aria-label="Next"
                            colorScheme="teal"
                            borderRadius="full"
                        />
                    </Box>
                </Card>
            </Box>
            <Box border="0px">
                <Card
                    overflow='hidden'
                    variant='outline'
                      bg="#2E2A29"
                      color="white"
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
                        bg="#F9F7F2"
                        >
                        <Box
                            maxW={{ base: '100%', sm: '60%' }}
                            m="75px auto"
                            position="relative"
                            >
                            <Slider ref={sliderRef} {...settings}>
                                {imagesEvents.map((src, idx) => (
                                <Box
                                    key={idx}
                                    height="450px"
                                    borderRadius="md"
                                    overflow="hidden"
                                    position="relative"
                                >
                                    <Image
                                    src={src}
                                    alt={`Hotel ${idx + 1}`}
                                    objectFit="contain"  
                                    width="100%"
                                    height="100%"
                                    />
                                </Box>
                                ))}
                            </Slider>

                            <IconButton
                                icon={<ArrowBackIcon />}
                                position="absolute"
                                top="50%"
                                left="10px"
                                transform="translateY(-50%)"
                                zIndex={2}
                                onClick={() => sliderRef.current?.slickPrev()}
                                aria-label="Previous"
                                colorScheme="teal"
                                borderRadius="full"
                            />

                            <IconButton
                                icon={<ArrowForwardIcon />}
                                position="absolute"
                                top="50%"
                                right="10px"
                                transform="translateY(-50%)"
                                zIndex={2}
                                onClick={() => sliderRef.current?.slickNext()}
                                aria-label="Next"
                                colorScheme="teal"
                                borderRadius="full"
                            />
                        </Box>
                        <Stack m="75px">
                            <CardBody>
                            <Heading size='md'>Find the best place to hold your event</Heading>

                            <Text py='2'>
                                Our hotel booking site not only allows you to find and book accommodations in the best destinations,
                                but is also designed to help you plan and organize special events such as conferences, weddings,
                                business meetings, or family celebrations. With a wide selection of hotels offering event venues, customized packages,
                                and catering services, you can manage every detail from one place. Whether it's an intimate event or a grand occasion,
                                our platform connects you with the ideal venues and trained staff to make your event a success.
                            </Text>
                            </CardBody>

                            <CardFooter>
                            <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline'>
                                Schedule your event now
                            </Button>
                            </CardFooter>
                        </Stack>
                </Card>
            </Box>
        </Box>
    )
}