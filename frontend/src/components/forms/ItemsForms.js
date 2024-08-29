import { useState, useEffect } from 'react';
import ItemForm from './ItemForm';

const ItemsForms = ({ onFormsChange, initialItems }) => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    console.log('Initial items:', initialItems);
    setForms(
      initialItems.length > 0
        ? initialItems.map((item, index) => ({ id: index + 1, data: item }))
        : [{ id: 1, data: { idMarcoItemTransaccion: '', cantidadItemTransaccion: '' } }]
    );
    console.log('Forms:', forms);
  }, [initialItems]);

  const addForm = () => {
    setForms([...forms, { id: forms.length + 1, data: { idMarco: '', cantidad: '' } }]);
  };

  const handleFormChange = (id, data) => {
    const updatedForms = forms.map((form) => (form.id === id ? { ...form, data } : form));
    setForms(updatedForms);
    onFormsChange(updatedForms);
  };

  return (
    <div>
      {forms.map((form) => (
        <ItemForm key={form.id} id={form.id} data={form.data} handleChange={handleFormChange} />
      ))}
      <button onClick={addForm}>Agregar otro marco</button>
    </div>
  );
};

export default ItemsForms;