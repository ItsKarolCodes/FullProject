
import { useState } from 'react';

export const useConfirmDelete = (deleteAction) => {
    const [isOpen, setIsOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    // 1. Cuando pulsamos el botón de la papelera
    const askToDelete = (id) => {
        setIdToDelete(id);
        setIsOpen(true);
    };

    // 2. Cuando confirmamos en el modal "SÍ, BORRAR"
    const confirm = async () => {
        if (idToDelete) {
            await deleteAction(idToDelete); // Ejecutamos la función que nos pasan (ej: deleteMovie)
            close();
        }
    };

    // 3. Cuando cancelamos o cerramos
    const close = () => {
        setIsOpen(false);
        setIdToDelete(null);
    };

    return {
        isOpen,
        askToDelete,
        confirm,
        close
    };
};