import { CohereClient } from "cohere-ai";

export default function handler(req, res) {

    const {searchTerm} = req.body;

    if (!searchTerm) {
        return res.status(400).json({ error: "Search term is required." });
    }

    const fetchCohereData = async () => {    
        try {
            const cohere = new CohereClient({
                token: "token", // Replace with your actual API key
            });
            const response = await cohere.generate({
                model: "command",
                prompt: `Humorously describe what a charity called ${searchTerm} does`,
                maxTokens: 300,
                temperature: 0.9,
                k: 0,
                stopSequences: [],
                returnLikelihoods: "NONE"
            });

            if (response && response.generations) {
                return res.status(200).json({ data: response.generations[0].text });
            } else {
                return res.status(500).json({ error: "Error fetching data from Cohere." });
            }
        } catch (error) {
            console.error("Error fetching data from Cohere:", error);
            return res.status(500).json({ error: "Error fetching data from Cohere." });
        }
        
    }
    fetchCohereData();
}  