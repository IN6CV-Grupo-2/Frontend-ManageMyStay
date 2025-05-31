import { useBills } from '../hooks/useBills.jsx';
import BillTable from '../components/bills/BillTable.jsx';
import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

const BillsPage = () => {
  const {
    bills,
    removeBill,
    editBill,
    getBillById,
  } = useBills();

  const [editingBill, setEditingBill] = useState(null);

  const handleEdit = (bill) => {
    setEditingBill(bill);
    // aquí puedes abrir un modal de edición si lo tienes
  };

  const handleDelete = async (id) => {
    await removeBill(id);
  };

  return (
    <>
      <BillTable bills={bills} onEdit={handleEdit} onDelete={handleDelete} />
      {/* Aquí podrías mostrar un modal con <BillEditForm bill={editingBill} /> */}
    </>
  );
};

export default BillsPage;