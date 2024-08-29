const Translation = require('../models/Translation');
const { errorHandler } = require('../utils/errorHandler');

// Mock translation service for demonstration
const translateText = async (text, sourceLang, targetLang) => {
    return `${text} (translated from ${sourceLang} to ${targetLang})`;
};

exports.translate = async (req, res) => {
    try {
        const { text, sourceLanguage, targetLanguage } = req.body;
        const translatedText = await translateText(text, sourceLanguage, targetLanguage);
        const newTranslation = await Translation.create({
            text,
            sourceLanguage,
            targetLanguage,
            translatedText
        });
        res.status(201).json({ success: true, data: newTranslation });
    } catch (error) {
        errorHandler(error, res);
    }
};

exports.getAllTranslations = async (req, res) => {
    try {
        const translations = await Translation.find();
        res.status(200).json({ success: true, data: translations });
    } catch (error) {
        errorHandler(error, res);
    }
};
