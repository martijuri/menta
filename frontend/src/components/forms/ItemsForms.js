import { useState, useEffect } from 'react';
import ItemForm from './ItemForm';

const ItemsForms = ({ onFormsChange, initialItems, onItemRemove }) => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    setForms(
      initialItems.length > 0
        ? initialItems.map((item, index) => ({ id: index + 1, data: item }))
        : []
    );
  }, [initialItems]);

  const addForm = () => {
    setForms([...forms, { id: forms.length + 1, data: { idMarcoItemTransaccion: '', cantidadItemTransaccion: '' } }]);
  };

  const handleFormChange = (id, data) => {
    const updatedForms = forms.map((form) => (form.id === id ? { ...form, data } : form));
    setForms(updatedForms);
    onFormsChange(updatedForms);
  };

  const removeForm = (id) => {
    const formToRemove = forms.find((form) => form.id === id);
    if (formToRemove && formToRemove.data.idItemTransaccion) {
      onItemRemove(formToRemove.data);
    }
    const updatedForms = forms.filter((form) => form.id !== id);
    setForms(updatedForms);
    onFormsChange(updatedForms);
  };

  return (
    <div>
      {forms.length > 0 ? (
        forms.map((form) => (
          <ItemForm key={form.id} id={form.id} data={form.data} handleChange={handleFormChange} onRemove={removeForm} />
        ))
      ) : (
        <p>Agrega un nuevo marco.</p>
      )}
      <button type="button" onClick={addForm}>Agregar marco</button>
    </div>
  );
};

export default ItemsForms;