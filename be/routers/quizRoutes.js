const express = require('express');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const router = express.Router();

// GET /quizzes
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('questions');
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// GET /quizzes/:id
router.get('/:id/questions', async (req, res) => {
    try {
        const quizzes = await Quiz.findById(req.params.id).populate('questions');
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /quizzes
router.post('/', async (req, res) => {
    const quiz = new Quiz(req.body);
    try {
        const savedQuiz = await quiz.save();
        res.status(201).json(savedQuiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /quizzes/:id
router.delete('/:id', async (req, res) => {
    try {
        const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
        res.json(deletedQuiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// DELETE questions/:questionId
router.delete('/questions/:questionId', async (req, res) => {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.questionId);
        res.json(deletedQuestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//DELETE /quizzes/:quizId/questions
router.delete('/quizzes/:quizId/questions', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        await Question.deleteMany({ _id: { $in: quiz.questions } });
        quiz.questions = [];
        await quiz.save();

        res.json({ message: 'All questions deleted successfully from quiz' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /quizzes/:quizId/question
router.post('/:quizId/question', async (req, res) => {
    const question = new Question(req.body);
    try {
        const savedQuestion = await question.save();
        const quiz = await Quiz.findById(req.params.quizId);
        quiz.questions.push(savedQuestion._id);
        await quiz.save();
        res.status(201).json(savedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST /quizzes/:quizId/questions
router.post('/:quizId/questions', async (req, res) => {
    const questions = req.body; // expect an array of question objects
    try {
        const savedQuestions = await Question.insertMany(questions);
        const quiz = await Quiz.findById(req.params.quizId);
        quiz.questions.push(...savedQuestions.map(q => q._id));
        await quiz.save();
        res.status(201).json(savedQuestions);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET /quizzes/:quizId/populate
router.get('/:quizId/populate', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId).populate({
            path: 'questions',
            match: { keywords: 'capital' }
        });
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put('/:quizId', async (req, res) => {
    console.log("quiz id",req.params.quizId);
    try {
        const { title, description } = req.body;
        const updatedQuiz = await Quiz.findByIdAndUpdate(
            req.params.quizId,
            { title, description },
            { new: true }
        );
        if (!updatedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json(updatedQuiz); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put('/question/:questionId', async (req, res) => {
    const { questionId } = req.params;
    const { text, options, correctAnswerIndex } = req.body;

    try {
        const updatedQuestion = await Question.findByIdAndUpdate(
            questionId,
            { text, options, correctAnswerIndex },
            { new: true }
        );
        if (!updatedQuestion) {
            return res.status(404).send('Question not found');
        }
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(500).send('Error updating question');
    }
});

module.exports = router;
