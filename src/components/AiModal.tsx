import React, { useState, useEffect } from "react";
import styles from "./AiModal.module.css";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onGenerate: (prompt: string, apiKey: string) => Promise<void>;
};

export default function AiModal({ isOpen, onClose, onGenerate }: Props) {
    const [apiKey, setApiKey] = useState("");
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedKey = localStorage.getItem("openai_api_key");
        if (storedKey) setApiKey(storedKey);
    }, []);

    if (!isOpen) return null;

    const handleGenerate = async () => {
        if (!prompt.trim() || !apiKey.trim()) return;

        setLoading(true);
        // Save key for future use
        localStorage.setItem("openai_api_key", apiKey);

        try {
            await onGenerate(prompt, apiKey);
            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to generate drawing. Please check your API key and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>
                    LX AI
                    <span style={{ fontSize: "16px" }}>✨</span>
                    (BETA)
                </h2>

                <div>
                    <label className={styles.label}>OpenAI API Key (BYOK)</label>
                    <input
                        type="password"
                        className={styles.input}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="sk-..."
                    />
                    <p className={styles.subtitle}>
                        Your key is stored locally in your browser and sent directly to OpenAI.
                    </p>
                </div>

                <div>
                    <label className={styles.label}>What should I draw?</label>
                    <textarea
                        className={styles.textarea}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="A happy cat sitting on a fence..."
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleGenerate();
                            }
                        }}
                    />
                </div>

                <div className={styles.actions}>
                    <button className={`${styles.button} ${styles.cancel_button}`} onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className={`${styles.button} ${styles.generate_button}`}
                        onClick={handleGenerate}
                        disabled={!prompt.trim() || !apiKey.trim() || loading}
                    >
                        {loading ? <div className={styles.spinner} /> : "Generate"}
                    </button>
                </div>
            </div>
        </div>
    );
}
