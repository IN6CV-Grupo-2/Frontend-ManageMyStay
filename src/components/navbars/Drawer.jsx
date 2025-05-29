import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerCloseButton,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    Button,
    Input,
    DrawerFooter,
    Avatar,
    AvatarBadge,
} from '@chakra-ui/react'

import React from 'react'
export const DrawerButton = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
        <>
            <Button ref={btnRef} colorScheme='teal' onClick={onOpen} w="50px" h="50px" borderRadius="full">
                <Avatar w="52px" h="52px">
                    <AvatarBadge boxSize='1.25em' bg='green.500' />
                </Avatar>
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create your account</DrawerHeader>

                    <DrawerBody>
                        <Input placeholder='Type here...' />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}