import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./AIGenerator.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default function AIGenerator({ dishId, dishName }) {
  const { t, i18n } = useTranslation("dishDetail");
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [introductions, setIntroductions] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || generating) return;

    try {
      setGenerating(true);
      const token = localStorage.getItem("access_token");
      const headers = {
        "Content-Type": "application/json",
        "x-lang": i18n.language || "vi"
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE}/ai/generate-introduction`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          dish_id: dishId,
          context: prompt,
          target_audience: prompt
        })
      });

      if (!response.ok) {
        throw new Error(t("error"));
      }

      const data = await response.json();
      
      // API có thể trả về một introduction hoặc array
      const newIntros = Array.isArray(data) ? data : (data.introductions || [data.introduction || data]);
      
      if (newIntros.length > 0) {
        setIntroductions(prev => [...newIntros, ...prev].slice(0, 4));
      }
    } catch (err) {
      console.error("Error generating introduction:", err);
      alert(err.message || t("error"));
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleSaveTemplate = async (introText) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("Vui lòng đăng nhập để lưu template");
        return;
      }

      const response = await fetch(`${API_BASE}/saved-templates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          dish_id: dishId,
          template_text: introText
        })
      });

      if (response.ok) {
        alert("Đã lưu template thành công!");
      } else {
        throw new Error(t("error"));
      }
    } catch (err) {
      console.error("Error saving template:", err);
      alert(err.message || t("error"));
    }
  };

  const getIntroTags = (intro) => {
    // Phân tích intro để tạo tags
    const tags = [];
    const text = intro.toLowerCase();
    if (text.includes("formal") || text.includes("ビジネス") || text.includes("フォーマル")) {
      tags.push("フォーマル");
    }
    if (text.includes("casual") || text.includes("友達") || text.includes("カジュアル")) {
      tags.push("カジュアル");
    }
    if (text.includes("friend") || text.includes("友達")) {
      tags.push("友達");
    }
    if (text.includes("business") || text.includes("ビジネス")) {
      tags.push("ビジネス");
    }
    return tags.length > 0 ? tags : ["一般"];
  };

  return (
    <div className="ai-generator-card">
      <div className="ai-generator-header">
        <h2 className="ai-generator-title">
          <span className="ai-icon">✨</span>
          {t("ai_generator_title")}
        </h2>
        <p className="ai-generator-subtitle">{t("ai_generator_subtitle")}</p>
      </div>

      <div className="ai-generator-input">
        <label htmlFor="ai-prompt">{t("ai_prompt_label")}</label>
        <textarea
          id="ai-prompt"
          rows={4}
          placeholder={t("ai_prompt_placeholder")}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={generating}
        />
        <button
          className="generate-button"
          onClick={handleGenerate}
          disabled={!prompt.trim() || generating}
        >
          {generating ? t("generating") : t("generate_button")}
        </button>
      </div>

      {introductions.length > 0 && (
        <div className="recommended-intros">
          <h3>{t("recommended_intros")} ({introductions.length})</h3>
          <div className="intros-list">
            {introductions.map((intro, index) => {
              const introText = typeof intro === "string" ? intro : (intro.text || intro.introduction || "");
              const tags = typeof intro === "object" && intro.tags ? intro.tags : getIntroTags(introText);
              
              return (
                <div key={index} className="intro-card">
                  <div className="intro-tags">
                    {tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="intro-tag">{tag}</span>
                    ))}
                  </div>
                  <p className="intro-text">{introText}</p>
                  <div className="intro-actions">
                    <button
                      className="copy-button"
                      onClick={() => handleCopy(introText, index)}
                    >
                      {copiedIndex === index ? t("copied") : t("copy_button")}
                    </button>
                    <button
                      className="save-button"
                      onClick={() => handleSaveTemplate(introText)}
                    >
                      {t("save_template")}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

