import { createContext, useContext } from "react";
import {
  getItemsTransaccion,
  postItemTransaccion,
  patchItemTransaccion,
  deleteItemTransaccion,
} from "../api/transacciones.api";

export const ItemsTransaccionContext = createContext();

export const ItemsTransaccionProvider =  ({ children }) => {
  const getItemsTransaccionContext = async (idTransaccion) => {
    await getItemsTransaccion(idTransaccion);
  };

  const postItemTransaccionContext = async (itemTransaccion) => {
    await postItemTransaccion(itemTransaccion);
  };

  const patchItemTransaccionContext = async (idItemTransaccion, itemTransaccion) => {
    console.log("patchItemTransaccionContext: ", idItemTransaccion, itemTransaccion);
    const response = await patchItemTransaccion(idItemTransaccion, itemTransaccion);
    console.log(response);
  };

  const deleteItemTransaccionContext = async (idItemTransaccion) => {
    await deleteItemTransaccion(idItemTransaccion);
  };

  const deleteAllItemsTransaccionContext = () => {

  };

  return (
    <ItemsTransaccionContext.Provider
      value={{
        postItemTransaccionContext,
        deleteItemTransaccionContext,
        patchItemTransaccionContext,
        getItemsTransaccionContext,
        deleteAllItemsTransaccionContext,
      }}
    >
      {children}
    </ItemsTransaccionContext.Provider>
  );
};

export const useItemsTransaccion = () => {
  const context = useContext(ItemsTransaccionContext);
  if (!context) {
    throw new Error(
      "useItemsTransaccion must be used within a ItemsTransaccionProvider"
    );
  }
  return context;
};
