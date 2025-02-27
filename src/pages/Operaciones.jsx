import React, { useEffect, useState } from "react";
import { getOperacionesByUsuario } from "../api/axiosInstance";

const Operaciones = ({ usuarioId }) => {
    const [operaciones, setOperaciones] = useState([]);

    useEffect(() => {
        getOperacionesByUsuario(usuarioId).then(setOperaciones);
    }, [usuarioId]);

    return (
        <div>
            <h2>Mis Operaciones</h2>
            {operaciones.length === 0 ? (
                <p>No tienes operaciones registradas.</p>
            ) : (
                <ul>
                    {operaciones.map((op) => (
                        <li key={op.id}>
                            {op.tipo} - Item ID: {op.itemId} - Fecha: {new Date(op.fecha).toLocaleString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Operaciones;
