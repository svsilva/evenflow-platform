const { Avaliacao, Evento, Usuario } = require('../models/associations/index');
const { validationResult } = require('express-validator');

class AvaliacaoController {
    // Criar uma avaliação
    async criarAvaliacao(req, res) {
        try {
            // Capturar erros de validação
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ erros: errors.array() });
            }

            const { nota, comentario, eventoId } = req.body;
            const usuarioId = req.usuario.id;

            // Verificar se o evento existe
            const evento = await Evento.findByPk(eventoId);
            if (!evento) {
                return res.status(404).json({ mensagem: 'Evento não encontrado!' });
            }

            // Verificar se o usuário já avaliou este evento
            const avaliacaoExistente = await Avaliacao.findOne({
                where: { usuarioId, eventoId }
            });
            if (avaliacaoExistente) {
                return res.status(400).json({ mensagem: 'Você já avaliou este evento!' });
            }

            // Criar a avaliação
            const novaAvaliacao = await Avaliacao.create({
                nota,
                comentario,
                usuarioId,
                eventoId
            });

            res.status(200).json(novaAvaliacao);
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao criar avaliação', erro: error.message });
        }
    }

    // Listar avaliações de um evento
    async listarAvaliacoesPorEvento(req, res) {
        try {
            const { eventoId } = req.params;

            // Verificar se o evento existe
            const evento = await Evento.findByPk(eventoId);
            if (!evento) {
                return res.status(404).json({ mensagem: 'Evento não encontrado!' });
            }

            // Buscar avaliações do evento
            const avaliacoes = await Avaliacao.findAll({
                where: { eventoId },
                include: [
                    {
                        model: Usuario,
                        as: 'usuario',
                        attributes: ['id', 'nome']
                    }
                ]
            });

            res.json(avaliacoes);
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao listar avaliações', erro: error.message });
        }
    }

    // Atualizar uma avaliação
    async atualizarAvaliacao(req, res) {
        try {
            // Capturar erros de validação
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ erros: errors.array() });
            }

            const { id } = req.params;
            const { nota, comentario } = req.body;

            // Buscar a avaliação
            const avaliacao = await Avaliacao.findByPk(id);
            if (!avaliacao) {
                return res.status(404).json({ mensagem: 'Avaliação não encontrada!' });
            }

            // Verificar se o usuário é o autor da avaliação
            if (avaliacao.usuarioId !== req.usuario.id) {
                return res.status(403).json({ mensagem: 'Você não tem permissão para atualizar esta avaliação!' });
            }

            // Atualizar a avaliação
            avaliacao.nota = nota || avaliacao.nota;
            avaliacao.comentario = comentario || avaliacao.comentario;
            await avaliacao.save();

            res.json(avaliacao);
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao atualizar avaliação', erro: error.message });
        }
    }

    // Deletar uma avaliação
    async deletarAvaliacao(req, res) {
        try {
            const { id } = req.params;

            // Buscar a avaliação
            const avaliacao = await Avaliacao.findByPk(id);
            if (!avaliacao) {
                return res.status(404).json({ mensagem: 'Avaliação não encontrada!' });
            }

            // Verificar se o usuário é o autor da avaliação
            if (avaliacao.usuarioId !== req.usuario.id) {
                return res.status(403).json({ mensagem: 'Você não tem permissão para deletar esta avaliação!' });
            }

            // Deletar a avaliação
            await avaliacao.destroy();
            res.json({ mensagem: 'Avaliação deletada com sucesso!' });
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao deletar avaliação', erro: error.message });
        }
    }
}

module.exports = new AvaliacaoController();