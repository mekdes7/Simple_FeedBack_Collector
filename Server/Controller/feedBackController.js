import path from "path";
import Feedback from "../Model/feedBackModel.js";
import fs from "fs";
const _dirname=path.resolve();
export const createFeedback = async (req, res) => {
    try {
        const { name, email, message, rating } = req.body;

       
        if (!name || !email || !message || rating === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

       
        const newFeedback = new Feedback({
            name,
            email,
            message,
            rating
        });

        
        await newFeedback.save();

        res.status(201).json({ message: "Feedback created successfully", feedback: newFeedback });  
        const filepath= path.join(_dirname, 'Feedbacks.json');
        const existingFeedbacks =JSON.parse(fs.readFileSync(filepath));
        existingFeedbacks.push(newFeedback);
        fs.writeFileSync(filepath, JSON.stringify(existingFeedbacks, null, 2));
    } catch (error) {
        console.error("Error creating feedback:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}
export const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const getFeedbackById = async (req, res) => {
    try {
       const { id } = req.params;
        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        res.status(200).json(feedback);
         
    } catch (error) {
        console.error("Error fetching feedback by ID:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}
export const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await Feedback.findByIdAndDelete(id);
        
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (error) {
        console.error("Error deleting feedback:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const updateFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, message, rating } = req.body;

        if (!name || !email || !message || rating === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const updatedFeedback = await Feedback.findByIdAndUpdate(id, {
            name,
            email,
            message,
            rating
        }, { new: true });

        if (!updatedFeedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        res.status(200).json({ message: "Feedback updated successfully", feedback: updatedFeedback });
    } catch (error) {
        console.error("Error updating feedback:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
