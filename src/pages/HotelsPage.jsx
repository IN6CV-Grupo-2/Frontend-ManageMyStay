import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { Box, Heading, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import HotelList from "../components/hotels/HotelList";
import HotelDetails from "../components/hotels/HotelDetails";
import HotelForm from "../components/hotels/HotelForm.jsx";
import { fetchHotels } from "../services/hotelService.js";

export const HotelsPage = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const headingColor = useColorModeValue("meddle.teal", "meddle.aqua");

  // Función para cargar los hoteles desde el backend
  const reloadHotels = () => {
    setLoading(true);
    fetchHotels()
      .then((data) => {
        setHotels(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar hoteles:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    reloadHotels();
  }, []);

  return (
    <Flex
      direction="column"
      minH="100vh"
      px={{ base: 4, md: 12 }}
      py={10}
      align="center"
      width="100vw"
      overflowX="hidden"
    >
      <Heading
        as="h2"
        size="xl"
        mb={6}
        textAlign="center"
        color={headingColor}
        fontWeight="bold"
        letterSpacing="wide"
      >
        Explora hoteles destacados
      </Heading>

      <Routes>
        <Route
          index
          element={
            <>
              <Button
                color="#2E576A"
                bg="meddle.aqua"
                _hover={{ bg: "#6db7b9" }}
                mb={6}
                onClick={() => navigate("new")}
              >
                Añadir Hotel
              </Button>

              <HotelList
                onSelectHotel={(hotel) => navigate(`${hotel.uid}`)}
                onEditHotel={(hotel) => navigate(`edit/${hotel.uid}`)}
              />
            </>
          }
        />

        <Route
          path="new"
          element={
            <HotelForm
              onSave={() => {
                reloadHotels();
                navigate("/hotels");
              }}
              onCancel={() => navigate("/hotels")}
            />
          }
        />

        <Route
          path="edit/:id"
          element={
            <HotelEditWrapper
              hotels={hotels}
              reloadHotels={reloadHotels}
              onSave={() => navigate("/hotels")}
            />
          }
        />

        <Route
          path=":id"
          element={<HotelDetailsWrapper hotels={hotels} onBack={() => navigate("/hotels")} />}
        />
      </Routes>
    </Flex>
  );
};

const HotelEditWrapper = ({ hotels, reloadHotels, onSave }) => {
  const { id } = useParams();
  const hotel = hotels.find((h) => h.uid === id);

  const handleSave = () => {
    reloadHotels(); // Actualiza los datos luego de guardar
    onSave();       // Vuelve a la lista
  };

  return <HotelForm hotel={hotel} onSave={handleSave} onCancel={onSave} />;
};

const HotelDetailsWrapper = ({ hotels, onBack }) => {
  const { id } = useParams();
  const hotel = hotels.find((h) => h.uid === id);
  return <HotelDetails hotel={hotel} onBack={onBack} />;
};

export default HotelsPage;
