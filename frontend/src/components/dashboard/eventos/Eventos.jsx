import React, { useState, useEffect } from 'react';
import{
    Box,
    Typography,
    Grid,
    Paper,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Divider,
    Chip,
    MenuItem
}from '@mui/material';
import{
    Event,
    Add,
    Edit,
    Delete,
    Visibility
} from '@mui/icons-material';


const Eventos = ({ mostrarMensagem }) => {
    const [eventos, setEventos] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedEvento, setSelectedEvento] = useState(null);
    const [formData, setFormData] = useState({
        titulo: '',
        data: '',
        local: '',
        descricao: '',
        preco: '',
        quantidadeIngressos: '',
        categoria: '',
        status: 'ativo',
    });

    useEffect(() => {
        carregarEventos();
    }, []);

    
};

