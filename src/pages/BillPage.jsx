import { useBills } from '../hooks/useBills.jsx';
    import BillTable from '../components/bills/BillTable.jsx';
    import { useDisclosure } from '@chakra-ui/react';
    import { useState } from 'react';
    import BillForm from '../components/bills/BillForm.jsx';
    import { Button } from '@chakra-ui/react';

    const BillsPage = () => {
    const {
        bills,
        removeBill,
    } = useBills();

    const [editingBill, setEditingBill] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDelete = async (id) => {
        await removeBill(id);
    };

    return (
        <>
        <Button
            colorScheme="teal"
            onClick={onOpen}
            mb={4}
            ml={4}
        >
            Generar Factura
        </Button>

        <BillTable bills={bills} onEdit={setEditingBill} onDelete={handleDelete} />

        <BillForm isOpen={isOpen} onClose={onClose} />
        </>
    );
    };

    export default BillsPage;