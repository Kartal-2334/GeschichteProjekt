import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import './CustomSurvey.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const CustomSurvey = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        origin: '',
        integration: '',
        languages: [],
        challenges: '',
        suggestions: ''
    });

    const [responses, setResponses] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setResponses([...responses, formData]);
        setShowResults(true);
        setFormData({
            name: '',
            age: '',
            origin: '',
            integration: '',
            languages: [],
            challenges: '',
            suggestions: ''
        });
    };

    const handleLanguageChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setFormData({...formData, languages: [...formData.languages, value]});
        } else {
            setFormData({...formData, languages: formData.languages.filter(lang => lang !== value)});
        }
    };

    // Prepare data for charts
    const originData = {
        labels: [...new Set(responses.map(r => r.origin))],
        datasets: [{
            data: [...new Set(responses.map(r => r.origin))].map(
                origin => responses.filter(r => r.origin === origin).length
            ),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
            ]
        }]
    };

    const integrationData = {
        labels: ['Sehr gut', 'Gut', 'Mittelmäßig', 'Schlecht', 'Sehr schlecht'],
        datasets: [{
            label: 'Integration',
            data: [
                responses.filter(r => r.integration === 'Sehr gut').length,
                responses.filter(r => r.integration === 'Gut').length,
                responses.filter(r => r.integration === 'Mittelmäßig').length,
                responses.filter(r => r.integration === 'Schlecht').length,
                responses.filter(r => r.integration === 'Sehr schlecht').length
            ],
            backgroundColor: '#36A2EB'
        }]
    };

    const languagesData = {
        labels: ['Deutsch', 'Englisch', 'Türkisch', 'Arabisch', 'Russisch', 'Andere'],
        datasets: [{
            data: [
                responses.filter(r => r.languages.includes('Deutsch')).length,
                responses.filter(r => r.languages.includes('Englisch')).length,
                responses.filter(r => r.languages.includes('Türkisch')).length,
                responses.filter(r => r.languages.includes('Arabisch')).length,
                responses.filter(r => r.languages.includes('Russisch')).length,
                responses.filter(r => r.languages.includes('Andere')).length
            ],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
            ]
        }]
    };

    return (
        <section className="custom-survey">
            <h2>Schulumfrage</h2>
            <div className="survey-container">
                <div className="survey-form">
                    <h3>Teilnehmen an der Umfrage</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name (optional)</label>
                            <input 
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="Dein Name"
                            />
                        </div>

                        <div className="form-group">
                            <label>Alter</label>
                            <input 
                                type="number"
                                value={formData.age}
                                onChange={(e) => setFormData({...formData, age: e.target.value})}
                                placeholder="Dein Alter"
                                required
                                min="10"
                                max="25"
                            />
                        </div>

                        <div className="form-group">
                            <label>Woher kommst du ursprünglich?</label>
                            <select 
                                value={formData.origin}
                                onChange={(e) => setFormData({...formData, origin: e.target.value})}
                                required
                            >
                                <option value="">Bitte wählen</option>
                                <option value="Deutschland">Deutschland</option>
                                <option value="Türkei">Türkei</option>
                                <option value="Syrien">Syrien</option>
                                <option value="Afghanistan">Afghanistan</option>
                                <option value="Ukraine">Ukraine</option>
                                <option value="Andere">Andere</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Wie gut fühlst du dich in der Schule integriert?</label>
                            <select 
                                value={formData.integration}
                                onChange={(e) => setFormData({...formData, integration: e.target.value})}
                                required
                            >
                                <option value="">Bitte wählen</option>
                                <option value="Sehr gut">Sehr gut</option>
                                <option value="Gut">Gut</option>
                                <option value="Mittelmäßig">Mittelmäßig</option>
                                <option value="Schlecht">Schlecht</option>
                                <option value="Sehr schlecht">Sehr schlecht</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Welche Sprachen sprichst du fließend?</label>
                            <div className="checkbox-group">
                                <label>
                                    <input 
                                        type="checkbox" 
                                        value="Deutsch"
                                        checked={formData.languages.includes('Deutsch')}
                                        onChange={handleLanguageChange}
                                    />
                                    Deutsch
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        value="Englisch"
                                        checked={formData.languages.includes('Englisch')}
                                        onChange={handleLanguageChange}
                                    />
                                    Englisch
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        value="Türkisch"
                                        checked={formData.languages.includes('Türkisch')}
                                        onChange={handleLanguageChange}
                                    />
                                    Türkisch
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        value="Arabisch"
                                        checked={formData.languages.includes('Arabisch')}
                                        onChange={handleLanguageChange}
                                    />
                                    Arabisch
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        value="Russisch"
                                        checked={formData.languages.includes('Russisch')}
                                        onChange={handleLanguageChange}
                                    />
                                    Russisch
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        value="Andere"
                                        checked={formData.languages.includes('Andere')}
                                        onChange={handleLanguageChange}
                                    />
                                    Andere
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Welche Herausforderungen erlebst du in der Schule?</label>
                            <textarea 
                                value={formData.challenges}
                                onChange={(e) => setFormData({...formData, challenges: e.target.value})}
                                placeholder="Beschreibe deine Herausforderungen..."
                                rows="3"
                            />
                        </div>

                        <div className="form-group">
                            <label>Hast du Vorschläge zur Verbesserung der Integration?</label>
                            <textarea 
                                value={formData.suggestions}
                                onChange={(e) => setFormData({...formData, suggestions: e.target.value})}
                                placeholder="Deine Vorschläge..."
                                rows="3"
                            />
                        </div>

                        <button type="submit" className="submit-btn">
                            Absenden
                        </button>
                    </form>
                </div>

                {showResults && (
                    <div className="survey-results">
                        <h3>Umfrageergebnisse</h3>
                        <div className="results-grid">
                            <div className="result-card">
                                <h4>Herkunftsländer</h4>
                                <Pie data={originData} />
                            </div>
                            <div className="result-card">
                                <h4>Integration</h4>
                                <Bar 
                                    data={integrationData}
                                    options={{
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                ticks: {
                                                    stepSize: 1
                                                }
                                            }
                                        }
                                    }}
                                />
                            </div>
                            <div className="result-card">
                                <h4>Sprachen</h4>
                                <Pie data={languagesData} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CustomSurvey; 